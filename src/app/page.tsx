"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { StatCard } from '@/components/dashboard/stat-card';
import { 
  Bus, 
  Activity, 
  AlertTriangle, 
  Gauge, 
  Network,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  Database
} from 'lucide-react';
import { useLiveSimulation } from '@/lib/simulator-hook';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { INITIAL_ALERTS, INITIAL_MAINTENANCE } from '@/lib/mock-data';

export default function DashboardPage() {
  const vehicles = useLiveSimulation();
  
  const totalVehicles = vehicles.length;
  const activeSensors = vehicles.reduce((acc, v) => acc + v.sensors.length, 0);
  const criticalFlaps = vehicles.filter(v => v.alertLevel === 'Critical').length;
  const warningVehicles = vehicles.filter(v => v.alertLevel === 'Warning').length;
  const onlineVehicles = vehicles.filter(v => v.connectivity === 'Online').length;
  const lastUpdated = new Date().toLocaleTimeString();
  const totalAlerts = INITIAL_ALERTS.length;
  const unresolvedAlerts = INITIAL_ALERTS.filter(a => !a.resolved).length;
  const avgHealthScore = Math.round(vehicles.reduce((sum, v) => sum + v.healthScore, 0) / vehicles.length);
  const PendingMaintenance = INITIAL_MAINTENANCE.filter(m => m.status === 'Pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold text-foreground">System Overview</h1>
            <p className="text-muted-foreground">Monitoring 24/7 Smart Vehicle Storage Compartments with MQTT Real-time Data</p>
          </div>
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border border-border">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono font-bold">{lastUpdated}</span>
          </div>
        </div>

        {/* Stat Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Total Vehicles" value={totalVehicles} icon={Bus} trend="4%" trendDirection="up" />
          <StatCard title="Active Sensors" value={activeSensors} icon={Activity} trend="0%" trendDirection="up" color="secondary" />
          <StatCard title="Critical Issues" value={criticalFlaps} icon={AlertTriangle} trend="12%" trendDirection="down" color="warning" />
          <StatCard title="Avg Health" value={`${avgHealthScore}%`} icon={Shield} trend="2%" trendDirection="up" color="success" />
          <StatCard title="Online Vehicles" value={onlineVehicles} icon={Network} trend="0%" trendDirection="up" color="secondary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Monitoring Panel */}
          <Card className="lg:col-span-2 bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline font-bold text-xl">Fleet Performance</CardTitle>
              <Link href="/vehicles" className="text-xs text-primary hover:underline font-bold">View All Vehicles</Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map(vehicle => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center border",
                        vehicle.alertLevel === 'Critical' ? "border-red-500/50 bg-red-500/10 text-red-500" :
                        vehicle.alertLevel === 'Warning' ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-500" :
                        "border-green-500/50 bg-green-500/10 text-green-500"
                      )}>
                        <Bus className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-foreground">{vehicle.name}</h4>
                        <p className="text-xs text-muted-foreground">{vehicle.route} • {vehicle.id}</p>
                      </div>
                    </div>
                    
                    <div className="hidden md:flex flex-col items-center px-4 border-l border-border">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Health Score</p>
                      <p className={cn(
                        "font-headline font-bold text-lg",
                        vehicle.healthScore > 80 ? "text-green-500" : vehicle.healthScore > 50 ? "text-yellow-500" : "text-red-500"
                      )}>{vehicle.healthScore}%</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center px-4 border-l border-border">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Network</p>
                      <Badge variant="outline" className={cn(
                        "mt-1 uppercase text-[10px]",
                        vehicle.connectivity === 'Online' ? "border-green-500 text-green-500" : "border-yellow-500 text-yellow-500"
                      )}>{vehicle.connectivity}</Badge>
                    </div>

                    <Link 
                      href={`/vehicles/${vehicle.id}`}
                      className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all rounded-lg text-xs font-bold"
                    >
                      Monitor
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Side Panels */}
          <div className="space-y-8">
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="font-headline font-bold text-lg">Network Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Communication Latency</span>
                  <span className="text-sm font-mono font-bold text-green-500">24ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Packet Delivery Rate</span>
                  <span className="text-sm font-mono font-bold text-green-500">99.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cloud Sync Status</span>
                  <Badge className="bg-primary text-white font-bold text-[10px]">SYNCING</Badge>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Network className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wider">Active Protocol</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-mono">MQTT v5.0 (Reliable TCP/IP)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
              <CardHeader>
                <CardTitle className="font-headline font-bold text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "Predictive maintenance models suggest Vehicle V-102 requires flap adjustment within next 48 hours to avoid potential mechanical failure."
                  </p>
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                     <p className="text-[10px] font-bold text-yellow-500 uppercase">System Recommendation</p>
                     <p className="text-xs mt-1 text-foreground/70">Schedule sensor calibration for V-102 and check vibration dampeners.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                     <p className="text-[10px] font-bold text-primary uppercase">ML Model: 94.2% Accuracy</p>
                     <p className="text-xs mt-1 text-foreground/70">Based on 30 days of historical data analysis and pattern recognition.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Alerts Summary */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="font-headline font-bold text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Alerts</span>
                  <Badge className="bg-primary/20 text-primary border-none">{totalAlerts}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Unresolved</span>
                  <Badge className="bg-red-500/20 text-red-500 border-none">{unresolvedAlerts}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Critical</span>
                  <Badge className="bg-red-600/20 text-red-500 border-none">{INITIAL_ALERTS.filter(a => a.severity === 'Critical').length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Warning</span>
                  <Badge className="bg-yellow-500/20 text-yellow-500 border-none">{INITIAL_ALERTS.filter(a => a.severity === 'Warning').length}</Badge>
                </div>
              </div>
              <Link 
                href="/alerts" 
                className="block mt-4 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-all rounded text-xs font-bold text-center"
              >
                View All Alerts
              </Link>
            </CardContent>
          </Card>

          {/* Maintenance Status */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="font-headline font-bold text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                Maintenance Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Records</span>
                  <Badge className="bg-primary/20 text-primary border-none">{INITIAL_MAINTENANCE.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending</span>
                  <Badge className="bg-red-500/20 text-red-500 border-none">{PendingMaintenance}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <Badge className="bg-green-500/20 text-green-500 border-none">{INITIAL_MAINTENANCE.filter(m => m.status === 'Completed').length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Cost</span>
                  <Badge className="bg-blue-500/20 text-blue-500 border-none">${INITIAL_MAINTENANCE.reduce((sum, m) => sum + m.cost, 0)}</Badge>
                </div>
              </div>
              <Link 
                href="/maintenance" 
                className="block mt-4 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-all rounded text-xs font-bold text-center"
              >
                View Maintenance
              </Link>
            </CardContent>
          </Card>

          {/* System Health Dashboard */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="font-headline font-bold text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Fleet Health</span>
                    <span className="text-sm font-bold text-primary">{avgHealthScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" 
                      style={{ width: `${avgHealthScore}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Network Connectivity</span>
                    <span className="text-sm font-bold text-green-500">100%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Data Integrity</span>
                    <span className="text-sm font-bold text-green-500">99.9%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full w-[99.9%]" />
                  </div>
                </div>
              </div>
              <Link 
                href="/analytics" 
                className="block mt-4 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-all rounded text-xs font-bold text-center"
              >
                View Analytics
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Database and Network Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/50 border-border border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="font-headline font-bold text-lg flex items-center gap-2">
                <Database className="w-5 h-5 text-accent" />
                Data Management Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] text-muted-foreground font-bold mb-1">Vehicle Records</p>
                  <p className="font-bold text-primary">{totalVehicles}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] text-muted-foreground font-bold mb-1">Sensor Count</p>
                  <p className="font-bold text-secondary">{activeSensors}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] text-muted-foreground font-bold mb-1">Alert Records</p>
                  <p className="font-bold text-yellow-500">{totalAlerts}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded border border-border">
                  <p className="text-[10px] text-muted-foreground font-bold mb-1">Maintenance Logs</p>
                  <p className="font-bold text-green-500">{INITIAL_MAINTENANCE.length}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Data stored in Firebase Firestore with real-time synchronization across all devices.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border border-l-4 border-l-secondary">
            <CardHeader>
              <CardTitle className="font-headline font-bold text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Network & Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">MQTT Message Rate</span>
                  <span className="text-sm font-mono font-bold text-primary">~50-70 msg/min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Latency</span>
                  <span className="text-sm font-mono font-bold text-green-500">~24ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Packet Integrity</span>
                  <span className="text-sm font-mono font-bold text-green-500">99.99%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Online Vehicles</span>
                  <span className="text-sm font-mono font-bold text-blue-500">{onlineVehicles}/{totalVehicles}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Using MQTT v5.0 over TCP/IP with TLS 1.3 encryption for secure data transmission.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}