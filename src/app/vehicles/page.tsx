"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useLiveSimulation } from '@/lib/simulator-hook';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, MapPin, Gauge, Activity, Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function VehiclesPage() {
  const vehicles = useLiveSimulation();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold text-white">Fleet Monitoring</h1>
            <p className="text-muted-foreground">Manage and track all connected vehicle compartments.</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-9 bg-card border-border" placeholder="Search vehicles..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(vehicle => (
            <Card key={vehicle.id} className="bg-card/50 border-border group hover:border-primary/50 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center border",
                      vehicle.alertLevel === 'Critical' ? "border-red-500/50 bg-red-500/10 text-red-500" :
                      vehicle.alertLevel === 'Warning' ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-500" :
                      "border-green-500/50 bg-green-500/10 text-green-500"
                    )}>
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{vehicle.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{vehicle.id}</p>
                    </div>
                  </div>
                  <Badge className={cn(
                    "uppercase text-[10px] font-bold",
                    vehicle.alertLevel === 'Critical' ? "bg-red-500" : vehicle.alertLevel === 'Warning' ? "bg-yellow-500" : "bg-blue-500"
                  )}>
                    {vehicle.alertLevel}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="w-4 h-4 text-primary" />
                  {vehicle.route}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1 flex items-center gap-1">
                      <Gauge className="w-3 h-3" />
                      Health Score
                    </p>
                    <p className={cn(
                      "text-xl font-headline font-bold",
                      vehicle.healthScore > 80 ? "text-green-500" : vehicle.healthScore > 50 ? "text-yellow-500" : "text-red-500"
                    )}>{vehicle.healthScore}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1 flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      Sensors
                    </p>
                    <p className="text-xl font-headline font-bold text-white">{vehicle.sensors.length}</p>
                  </div>
                </div>

                <Link 
                  href={`/vehicles/${vehicle.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white font-bold rounded-lg text-sm transition-all hover:bg-primary/90"
                >
                  Monitor Details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}