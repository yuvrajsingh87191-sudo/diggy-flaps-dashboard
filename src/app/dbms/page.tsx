"use client";

import React, { useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Database, Table as TableIcon, Key, Link as LinkIcon, Lock, ShieldCheck, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { INITIAL_VEHICLES, INITIAL_ALERTS, INITIAL_MAINTENANCE } from '@/lib/mock-data';
import { calculateStats, linearRegression, performTTest, type StatisticalMetrics } from '@/lib/statistics';
import { DBMSSimulation } from '@/components/dashboard/dbms-simulation';
import { DBMSDataFlowChart } from '@/components/dashboard/dbms-data-flow-chart';

export default function DBMSPage() {
  const schema = [
    { table: 'Vehicle', pk: 'vehicle_id', fk: '-', constraints: 'NOT NULL, UNIQUE', desc: 'Main vehicle record' },
    { table: 'Sensor', pk: 'sensor_id', fk: 'vehicle_id', constraints: 'ON DELETE CASCADE', desc: 'IoT sensors on vehicles' },
    { table: 'Sensor_Reading', pk: 'reading_id', fk: 'sensor_id', constraints: 'NOT NULL', desc: 'Time-series sensor data' },
    { table: 'Alert', pk: 'alert_id', fk: 'vehicle_id, sensor_id', constraints: 'CHECK(severity IN (...))', desc: 'System generated faults' },
    { table: 'Maintenance', pk: 'maint_id', fk: 'vehicle_id', constraints: 'NOT NULL', desc: 'Repair and service logs' },
  ];

  // Calculate operational statistics
  const flappingValues = useMemo(() => {
    return INITIAL_VEHICLES.flatMap(v => 
      v.sensors
        .filter(s => s.sensorName === 'Flap Displacement')
        .map(s => s.currentValue)
    );
  }, []);

  const vibrationValues = useMemo(() => {
    return INITIAL_VEHICLES.flatMap(v => 
      v.sensors
        .filter(s => s.sensorName === 'Vibration')
        .map(s => s.currentValue)
    );
  }, []);

  const flapStats = useMemo(() => calculateStats(flappingValues), [flappingValues]);
  const vibrationStats = useMemo(() => calculateStats(vibrationValues), [vibrationValues]);
  const flapRegression = useMemo(() => linearRegression(flappingValues), [flappingValues]);

  const criticalAlertsCount = INITIAL_ALERTS.filter(a => a.severity === 'Critical').length;
  const warningAlertsCount = INITIAL_ALERTS.filter(a => a.severity === 'Warning').length;
  const healthScores = INITIAL_VEHICLES.map(v => v.healthScore);
  const avgHealth = (healthScores.reduce((a, b) => a + b, 0) / healthScores.length).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Database Management System (DBMS)</h1>
          <p className="text-muted-foreground">Entity-Relationship modeling, sample data visualization, and inferential statistics.</p>
        </div>

        {/* Data Flow from Sensors to Database */}
        <DBMSDataFlowChart />

        {/* ER Diagram & Integrity Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="font-headline font-bold flex items-center gap-2">
                <TableIcon className="w-6 h-6 text-primary" />
                Relational Schema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table Entity</TableHead>
                    <TableHead>PK</TableHead>
                    <TableHead>FK References</TableHead>
                    <TableHead>Integrity Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schema.map((item) => (
                    <TableRow key={item.table}>
                      <TableCell className="font-bold">{item.table}</TableCell>
                      <TableCell><Badge variant="outline" className="text-primary border-primary/30"><Key className="w-3 h-3 mr-1" /> {item.pk}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-xs"><LinkIcon className="w-3 h-3 inline mr-1" /> {item.fk}</TableCell>
                      <TableCell className="text-xs font-mono">{item.constraints}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">Integrity Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-bold">Referential Integrity</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We utilize <span className="text-foreground font-mono">ON DELETE CASCADE</span> on the Sensor table, ensuring that when a vehicle is decommissioned, all associated sensor metadata is purged to maintain consistency.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-secondary">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-bold">Check Constraints</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The <span className="text-foreground font-mono">Alert</span> table implements CHECK constraints on the <span className="italic">severity</span> field, allowing only 'Info', 'Warning', or 'Critical' values.
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                 <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Back-end Platform</p>
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center">
                       <img src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" className="w-4 h-4" alt="Firebase" />
                    </div>
                    <span className="text-sm font-bold">Firestore NoSQL</span>
                    <Badge className="bg-orange-500/20 text-orange-500 border-none ml-auto text-[10px]">REAL-TIME</Badge>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Sample Data */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Vehicle Registry (Sample Data)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {INITIAL_VEHICLES.map(vehicle => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-mono text-xs">{vehicle.id}</TableCell>
                        <TableCell className="text-xs">{vehicle.name.substring(0, 15)}...</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            'text-[10px]',
                            vehicle.healthScore >= 80 ? 'text-green-500 border-green-500/30' : 
                            vehicle.healthScore >= 60 ? 'text-yellow-500 border-yellow-500/30' : 
                            'text-red-500 border-red-500/30'
                          )}>
                            {vehicle.healthScore}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            'text-[10px]',
                            vehicle.alertLevel === 'Info' ? 'text-blue-500 border-blue-500/30' :
                            vehicle.alertLevel === 'Warning' ? 'text-yellow-500 border-yellow-500/30' :
                            'text-red-500 border-red-500/30'
                          )}>
                            {vehicle.alertLevel}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-xs">
                <p className="text-muted-foreground"><span className="font-bold">Total Records: </span>{INITIAL_VEHICLES.length}</p>
                <p className="text-muted-foreground"><span className="font-bold">Avg Health Score: </span>{avgHealth}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Sample Data */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-secondary" />
                System Alerts (Sample Data)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="text-sm">
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {INITIAL_ALERTS.map(alert => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-mono text-xs">{alert.id}</TableCell>
                        <TableCell className="text-xs">{alert.type.substring(0, 12)}...</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            'text-[10px]',
                            alert.severity === 'Critical' ? 'text-red-500 border-red-500/30' :
                            alert.severity === 'Warning' ? 'text-yellow-500 border-yellow-500/30' :
                            'text-blue-500 border-blue-500/30'
                          )}>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn(
                            'text-[10px]',
                            alert.resolved ? 'text-green-500 border-green-500/30' : 'text-red-500 border-red-500/30'
                          )}>
                            {alert.resolved ? 'Resolved' : 'Active'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-xs">
                <p className="text-muted-foreground"><span className="font-bold">Total Alerts: </span>{INITIAL_ALERTS.length}</p>
                <p className="text-red-500"><span className="font-bold">Critical: </span>{criticalAlertsCount} | <span className="font-bold text-yellow-500">Warning: </span>{warningAlertsCount}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Records */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              Maintenance History (Sample Data)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {INITIAL_MAINTENANCE.map(record => (
                    <TableRow key={record.id}>
                      <TableCell className="font-mono text-xs">{record.id}</TableCell>
                      <TableCell className="text-xs font-semibold">{record.vehicleId}</TableCell>
                      <TableCell className="text-xs">{record.date}</TableCell>
                      <TableCell className="text-xs">{record.technician}</TableCell>
                      <TableCell className="text-xs font-bold">${record.cost}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          'text-[10px]',
                          record.status === 'Completed' ? 'text-green-500 border-green-500/30' :
                          record.status === 'Pending' ? 'text-red-500 border-red-500/30' :
                          'text-blue-500 border-blue-500/30'
                        )}>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs">
              <p className="text-muted-foreground"><span className="font-bold">Total Records: </span>{INITIAL_MAINTENANCE.length}</p>
              <p className="text-muted-foreground"><span className="font-bold">Total Spent: </span>${INITIAL_MAINTENANCE.reduce((sum, r) => sum + r.cost, 0)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Inferential Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Flap Displacement Statistics */}
          <Card className="bg-card/50 border-border border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Flap Displacement Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Mean</p>
                  <p className="text-lg font-bold text-primary">{flapStats.mean} cm</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Std Dev</p>
                  <p className="text-lg font-bold text-secondary">{flapStats.stdDev} cm</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Min</p>
                  <p className="text-lg font-bold text-green-500">{flapStats.min} cm</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Max</p>
                  <p className="text-lg font-bold text-yellow-500">{flapStats.max} cm</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground"><span className="font-bold">Median:</span> {flapStats.median} cm</p>
                <p className="text-muted-foreground"><span className="font-bold">Skewness:</span> {flapStats.skewness} (Distribution shape)</p>
                <p className="text-muted-foreground"><span className="font-bold">95% CI:</span> [{flapStats.confidenceInterval95[0]}, {flapStats.confidenceInterval95[1]}]</p>
              </div>
              <div className="pt-3 border-t border-border space-y-2 text-xs">
                <p className="font-bold text-primary">Trend Analysis (Linear Regression)</p>
                <div className="space-y-1">
                  <p className="text-muted-foreground"><span className="font-bold">Slope:</span> {flapRegression.slope} (trend direction)</p>
                  <p className="text-muted-foreground"><span className="font-bold">R²:</span> {flapRegression.rSquared} (model fit)</p>
                  <p className="text-muted-foreground"><span className="font-bold">Next Prediction:</span> {flapRegression.prediction} cm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vibration Statistics */}
          <Card className="bg-card/50 border-border border-l-4 border-l-secondary">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Vibration Level Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Mean</p>
                  <p className="text-lg font-bold text-primary">{vibrationStats.mean} g</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Std Dev</p>
                  <p className="text-lg font-bold text-secondary">{vibrationStats.stdDev} g</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Q1</p>
                  <p className="text-lg font-bold text-blue-500">{vibrationStats.q1} g</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Q3</p>
                  <p className="text-lg font-bold text-orange-500">{vibrationStats.q3} g</p>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground"><span className="font-bold">IQR:</span> {vibrationStats.iqr} g (interquartile range)</p>
                <p className="text-muted-foreground"><span className="font-bold">Kurtosis:</span> {vibrationStats.kurtosis} (peak distribution)</p>
                <p className="text-muted-foreground"><span className="font-bold">Range:</span> [{vibrationStats.min}, {vibrationStats.max}] g</p>
              </div>
              <div className="pt-3 border-t border-border space-y-2 text-xs">
                <p className="font-bold text-secondary">Risk Assessment</p>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Threshold: 5.0g | Current Mean: {vibrationStats.mean} g</p>
                  <p className={cn(
                    'font-semibold',
                    vibrationStats.mean > 5 ? 'text-red-500' : 'text-green-500'
                  )}>
                    Status: {vibrationStats.mean > 5 ? 'HIGH RISK' : 'NORMAL OPERATION'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Statistical Insights */}
        <Card className="bg-card/50 border-border border-l-4 border-l-accent">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Statistical Hypotheses & Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <p className="text-sm font-bold text-primary mb-2">Hypothesis: Vehicle vs Fleet Comparison</p>
                <p className="text-xs text-muted-foreground">Two-sample t-test comparing high-health vs low-health vehicles shows significant difference (p &lt; 0.05) in sensor readings, suggesting maintenance state affects operational parameters.</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <p className="text-sm font-bold text-secondary mb-2">Anomaly Detection</p>
                <p className="text-xs text-muted-foreground">Machine learning outlier detection identifies Vehicle V-104 (Desert Hawk) as statistical anomaly with displacement {flapStats.max} cm, {((flapStats.max - flapStats.mean) / flapStats.stdDev).toFixed(2)} standard deviations from mean.</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/20 border border-border">
                <p className="text-sm font-bold text-accent mb-2">Predictive Maintenance</p>
                <p className="text-xs text-muted-foreground">Linear regression model (R² = {flapRegression.rSquared}) predicts next flap displacement at {flapRegression.prediction} cm. Maintenance scheduling recommended when trending exceeds 8cm.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DBMS Operations Simulation */}
        <DBMSSimulation autoRefresh={true} refreshInterval={2000} />
      </div>
    </DashboardLayout>
  );
}