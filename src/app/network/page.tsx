"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Network, ArrowRight, Database, Cloud, Wifi, Server, ShieldCheck, Globe } from 'lucide-react';

export default function NetworkPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white">Network Architecture (CNDC)</h1>
          <p className="text-muted-foreground">Detailed visualization of the DIGGI FLAPS data communication stack.</p>
        </div>

        {/* Protocol Visualizer */}
        <Card className="bg-card/50 border-border overflow-hidden">
          <CardHeader>
            <CardTitle className="font-headline font-bold flex items-center gap-2">
              <Network className="w-6 h-6 text-primary" />
              End-to-End Data Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 px-4">
              
              <div className="flex flex-col items-center gap-3 text-center w-32">
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <Wifi className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Sensors</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Edge Devices</p>
                </div>
              </div>

              <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground/30" />

              <div className="flex flex-col items-center gap-3 text-center w-32">
                <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center">
                  <Server className="w-8 h-8 text-secondary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Gateway</p>
                  <p className="text-[10px] text-muted-foreground font-mono">MQTT Publisher</p>
                </div>
              </div>

              <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground/30" />

              <div className="flex flex-col items-center gap-3 text-center w-32">
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center">
                  <Cloud className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Broker</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Cloud Backend</p>
                </div>
              </div>

              <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground/30" />

              <div className="flex flex-col items-center gap-3 text-center w-32">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Dashboard</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Web Consumer</p>
                </div>
              </div>

            </div>
          </CardContent>
          <div className="bg-muted/30 p-4 border-t border-border flex flex-wrap gap-4 justify-center">
            <span className="px-3 py-1 rounded bg-background border border-border text-[10px] font-mono font-bold">PROTOCOL: MQTT v5.0</span>
            <span className="px-3 py-1 rounded bg-background border border-border text-[10px] font-mono font-bold">TRANSPORT: TCP/IP</span>
            <span className="px-3 py-1 rounded bg-background border border-border text-[10px] font-mono font-bold">AUTH: TLS 1.3</span>
            <span className="px-3 py-1 rounded bg-background border border-border text-[10px] font-mono font-bold">QOS: Level 1 (At Least Once)</span>
          </div>
        </Card>

        {/* Academic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">Protocol Justification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-primary">Why MQTT?</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  MQTT is a lightweight, publish-subscribe network protocol that transports messages between devices. It is ideal for IoT because of its low bandwidth usage and support for unstable cellular networks common in moving vehicles.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-secondary">TCP Reliability</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use TCP as the transport layer to ensure packet delivery order and reliability, which is critical for safety-related flap displacement data.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">Live Traffic Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">SSL/TLS Encryption</span>
                </div>
                <span className="text-xs font-mono text-green-500 font-bold">ENABLED</span>
              </div>
              <div>
                 <div className="flex justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-bold uppercase">Packet Integrity</span>
                    <span className="text-xs font-mono font-bold">99.99%</span>
                 </div>
                 <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[99.99%]" />
                 </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                 <p className="text-[10px] font-bold text-primary uppercase">Distributed System concept</p>
                 <p className="text-[11px] mt-1 text-white/70">The system uses Firebase Firestore's real-time synchronization which handles background socket management (WebSocket) for low-latency live updates.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
