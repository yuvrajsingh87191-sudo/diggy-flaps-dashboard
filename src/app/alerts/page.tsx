"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { INITIAL_ALERTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AlertsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold text-white">Active System Alerts</h1>
            <p className="text-muted-foreground">Real-time fault detection and anomaly reporting.</p>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-red-500 uppercase">2 Critical</span>
             </div>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-bold text-yellow-500 uppercase">5 Warning</span>
             </div>
          </div>
        </div>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Alert History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Sensor/Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="max-w-xs">Message</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INITIAL_ALERTS.map((alert) => (
                  <TableRow key={alert.id} className="group hover:bg-muted/30">
                    <TableCell className="font-mono text-[10px] font-bold text-muted-foreground">{alert.id}</TableCell>
                    <TableCell className="font-bold">{alert.vehicleId}</TableCell>
                    <TableCell>
                       <div className="flex flex-col">
                          <span className="font-medium text-sm text-white">{alert.type}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">{alert.sensorId}</span>
                       </div>
                    </TableCell>
                    <TableCell>
                       <Badge className={cn(
                          "uppercase text-[10px] font-bold",
                          alert.severity === 'Critical' ? "bg-red-500" : alert.severity === 'Warning' ? "bg-yellow-500" : "bg-blue-500"
                       )}>
                          {alert.severity}
                       </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground leading-snug">
                       {alert.message}
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">
                       {new Date(alert.timestamp).toLocaleString([], { hour12: false })}
                    </TableCell>
                    <TableCell className="text-right">
                       <button className="p-2 hover:bg-green-500/10 hover:text-green-500 rounded-lg transition-all text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5" />
                       </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
