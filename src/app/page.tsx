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
  Clock
} from 'lucide-react';
import { useLiveSimulation } from '@/lib/simulator-hook';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const vehicles = useLiveSimulation();
  
  const totalVehicles = vehicles.length;
  const activeSensors = vehicles.reduce((acc, v) => acc + v.sensors.length, 0);
  const criticalFlaps = vehicles.filter(v => v.alertLevel === 'Critical').length;
  const lastUpdated = new Date().toLocaleTimeString();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-headline font-bold text-white">System Overview</h1>
            <p className="text-muted-foreground">Monitoring 24/7 Smart Vehicle Storage Compartments</p>
          </div>
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg border border-border">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono font-bold">{lastUpdated}</span>
          </div>
        </div>

        {/* Stat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Vehicles" value={totalVehicles} icon={Bus} trend="4%" trendDirection="up" />
          <StatCard title="Active Sensors" value={activeSensors} icon={Activity} trend="0%" trendDirection="up" color="secondary" />
          <StatCard title="Live Alerts" value={vehicles.filter(v => v.alertLevel !== 'Info').length} icon={AlertTriangle} trend="12%" trendDirection="down" color="warning" />
          <StatCard title="Critical Flaps" value={criticalFlaps} icon={Gauge} trend="0.5%" trendDirection="down" color="error" />
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
                        <h4 className="font-bold text-sm text-white">{vehicle.name}</h4>
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
                      className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary text-white transition-all rounded-lg text-xs font-bold"
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
                  Live Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "Predictive maintenance models suggest Vehicle V-102 requires flap adjustment within next 48 hours to avoid potential mechanical failure."
                  </p>
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                     <p className="text-[10px] font-bold text-yellow-500 uppercase">System Recommendation</p>
                     <p className="text-xs mt-1 text-white/80">Schedule sensor calibration for V-102.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}