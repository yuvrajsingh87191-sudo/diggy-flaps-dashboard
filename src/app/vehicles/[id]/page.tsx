"use client";

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useLiveSimulation } from '@/lib/simulator-hook';
import { SensorCard } from '@/components/dashboard/sensor-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bus, 
  MapPin, 
  ShieldCheck, 
  Info,
  Calendar,
  Settings,
  History
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const vehicles = useLiveSimulation();
  
  const vehicle = useMemo(() => vehicles.find(v => v.id === id), [vehicles, id]);

  if (!vehicle) {
    return <DashboardLayout><div>Vehicle not found</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top Profile Card */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30">
              <Bus className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-headline font-bold text-white">{vehicle.name}</h1>
                <Badge variant="outline" className="text-[10px] uppercase font-bold border-primary text-primary tracking-widest">{vehicle.id}</Badge>
              </div>
              <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {vehicle.route}
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Status: {vehicle.flapStatus}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 bg-card/50 p-4 rounded-xl border border-border">
            <div className="text-center pr-6 border-r border-border">
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Health Score</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-headline font-bold text-white">{vehicle.healthScore}%</span>
                <Progress value={vehicle.healthScore} className="w-20 h-2" />
              </div>
            </div>
            <div className="text-center pl-6 pr-6 border-r border-border">
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Alert Level</p>
              <Badge className={cn(
                "uppercase font-bold text-[10px]",
                vehicle.alertLevel === 'Critical' ? "bg-red-500" : vehicle.alertLevel === 'Warning' ? "bg-yellow-500" : "bg-blue-500"
              )}>
                {vehicle.alertLevel}
              </Badge>
            </div>
            <div className="text-center pl-6">
              <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Connectivity</p>
              <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", vehicle.connectivity === 'Online' ? "bg-green-500 animate-pulse" : "bg-yellow-500")} />
                <span className="text-sm font-bold">{vehicle.connectivity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Sensor Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-headline font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Live Sensor Readings
            </h2>
            <div className="text-xs font-medium text-muted-foreground italic">Updating every 3 seconds</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicle.sensors.map(sensor => (
              <SensorCard key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Maintenance & Meta Information */}
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Vehicle Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Hardware Model</p>
                  <p className="text-sm font-semibold">Diggi-Guard Pro v4.2</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Firmware</p>
                  <p className="text-sm font-semibold">1.0.8-stable</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Last Maint.</p>
                  <p className="text-sm font-semibold">{vehicle.lastMaintenance}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Serial No.</p>
                  <p className="text-sm font-semibold">DF-IOT-9921-X</p>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  Maintenance History
                </h4>
                <div className="text-sm text-white/70 border-l-2 border-primary/30 pl-4 py-1 italic">
                  "Routine inspection completed. No issues found in displacement sensors."
                  <p className="text-[10px] text-muted-foreground mt-1 font-bold">MAY 12, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights Panel */}
          <Card className="bg-card/50 border-border border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" />
                Predictive Analytics (AI)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Failure Probability</span>
                    <span className="text-sm font-bold text-green-500">1.2% (Low Risk)</span>
                  </div>
                  <Progress value={1.2} className="h-2" />
                </div>
                
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <h5 className="text-xs font-bold uppercase text-accent mb-2">Insight summary</h5>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Based on current vibration patterns and flap displacement trends, this vehicle is performing within 98% of optimal operational standards. No immediate intervention required.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Est. Next Failure</p>
                    <p className="text-sm font-bold">342 Days</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Anomaly Score</p>
                    <p className="text-sm font-bold">0.04 (Negligible)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { cn } from '@/lib/utils';
