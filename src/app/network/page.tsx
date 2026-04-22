"use client";

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, ArrowRight, Database, Cloud, Wifi, Server, ShieldCheck, Globe, Send, TrendingUp, Zap } from 'lucide-react';
import { generateMQTTMessage, getMQTTBrokerStats, generateMQTTMetrics, type MQTTMessage } from '@/lib/mqtt-simulator';
import { NetworkFlowVisualization } from '@/components/dashboard/network-flow-visualization';
import { NetworkFlowChart } from '@/components/dashboard/network-flow-chart';

export default function NetworkPage() {
  const [mqttMessages, setMqttMessages] = useState<MQTTMessage[]>([]);
  const [metrics, setMetrics] = useState(generateMQTTMetrics());
  const [brokerStats] = useState(getMQTTBrokerStats());

  useEffect(() => {
    const interval = setInterval(() => {
      const newMessage = generateMQTTMessage();
      setMqttMessages(prev => [newMessage, ...prev].slice(0, 10)); // Keep last 10 messages
      setMetrics(generateMQTTMetrics());
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-headline font-bold text-foreground">Network Architecture (CNDC)</h1>
          <p className="text-muted-foreground">Detailed visualization of the DIGGI FLAPS data communication stack.</p>
        </div>

        {/* Protocol Visualizer */}
        <Card className="bg-card/50 border-border overflow-hidden">
          <CardHeader>
            <CardTitle className="font-headline font-bold flex items-center gap-2">
              <Network className="w-6 h-6 text-primary" />
              End-to-End Data Pipeline with Live Animation
            </CardTitle>
          </CardHeader>
          <CardContent className="py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 px-4 relative">
              
              {/* Animated data flow lines */}
              <style>{`
                @keyframes dataFlow {
                  0% { transform: translateX(0); opacity: 1; }
                  100% { transform: translateX(100%); opacity: 0; }
                }
                @keyframes pulse-glow {
                  0%, 100% { opacity: 0.6; }
                  50% { opacity: 1; }
                }
                .data-flow {
                  animation: dataFlow 2s infinite;
                }
                .pulse-node {
                  animation: pulse-glow 1.5s ease-in-out infinite;
                }
              `}</style>
              
              <div className="flex flex-col items-center gap-3 text-center w-32">
                <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center pulse-node">
                  <Wifi className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Sensors</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Edge Devices</p>
                  <Badge className="text-[9px] bg-green-500/20 text-green-500 border-none">Active</Badge>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center gap-2 flex-1">
                <div className="w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-primary data-flow" />
                </div>
                <ArrowRight className="w-6 h-6 text-primary/50" />
              </div>

              <div className="flex flex-col items-center gap-3 text-center w-32">
                <div className="w-16 h-16 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center pulse-node">
                  <Server className="w-8 h-8 text-secondary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Gateway</p>
                  <p className="text-[10px] text-muted-foreground font-mono">MQTT Publisher</p>
                  <Badge className="text-[9px] bg-blue-500/20 text-blue-500 border-none">Publishing</Badge>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center gap-2 flex-1">
                <div className="w-full h-1 bg-gradient-to-r from-secondary via-secondary/50 to-transparent rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-secondary data-flow" style={{ animationDelay: '0.5s' }} />
                </div>
                <ArrowRight className="w-6 h-6 text-secondary/50" />
              </div>

              <div className="flex flex-col items-center gap-3 text-center w-32">
                <div className="w-16 h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center pulse-node">
                  <Cloud className="w-8 h-8 text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Broker</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Cloud Backend</p>
                  <Badge className="text-[9px] bg-purple-500/20 text-purple-500 border-none">Processing</Badge>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center justify-center gap-2 flex-1">
                <div className="w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-accent data-flow" style={{ animationDelay: '1s' }} />
                </div>
                <ArrowRight className="w-6 h-6 text-accent/50" />
              </div>

              <div className="flex flex-col items-center gap-3 text-center w-32">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center pulse-node">
                  <Globe className="w-8 h-8 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold">Dashboard</p>
                  <p className="text-[10px] text-muted-foreground font-mono">Web Consumer</p>
                  <Badge className="text-[9px] bg-green-500/20 text-green-500 border-none">Receiving</Badge>
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
                 <p className="text-[11px] mt-1 text-foreground/70">The system uses Firebase Firestore's real-time synchronization which handles background socket management (WebSocket) for low-latency live updates.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Flow Visualization */}
        <NetworkFlowVisualization autoRefresh={true} refreshInterval={1500} />

        {/* Complete Network Flow Chart */}
        <NetworkFlowChart />

        {/* MQTT Live Message Flow Simulation */}
        <Card className="bg-card/50 border-border overflow-hidden">
          <CardHeader>
            <CardTitle className="font-headline font-bold flex items-center gap-2">
              <Send className="w-6 h-6 text-primary" />
              MQTT Live Message Stream (Real-time Data Flow)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-muted/40 p-3 rounded-lg border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase">Messages/min</p>
                  <p className="text-lg font-bold text-primary">{metrics.messagesPerMinute}</p>
                </div>
                <div className="bg-muted/40 p-3 rounded-lg border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase">Avg Payload</p>
                  <p className="text-lg font-bold text-secondary">{metrics.averagePayloadSize}B</p>
                </div>
                <div className="bg-muted/40 p-3 rounded-lg border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase">Success Rate</p>
                  <p className="text-lg font-bold text-green-500">{metrics.successRate.toFixed(2)}%</p>
                </div>
                <div className="bg-muted/40 p-3 rounded-lg border border-border">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase">Latency</p>
                  <p className="text-lg font-bold text-accent">{metrics.latency}ms</p>
                </div>
              </div>

              {/* Message Log */}
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">Recent Messages (Live Feed)</p>
                <div className="bg-background/40 rounded-lg border border-border p-3 max-h-64 overflow-y-auto space-y-2">
                  {mqttMessages.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">Waiting for MQTT messages...</p>
                  ) : (
                    mqttMessages.map((msg) => (
                      <div key={msg.id} className="bg-muted/30 p-2 rounded border border-muted/50 text-[10px] hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-primary">{msg.topic}</span>
                          <Badge variant="outline" className="text-[8px] py-0">QoS {msg.qos}</Badge>
                        </div>
                        <div className="text-muted-foreground font-mono truncate">
                          {msg.payload}
                        </div>
                        <div className="flex justify-between mt-1 text-[9px] text-muted-foreground">
                          <span>{msg.size}B</span>
                          <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MQTT Broker Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                MQTT Broker Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-bold text-foreground">{brokerStats.uptime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Messages</span>
                  <span className="text-sm font-bold text-foreground font-mono">{brokerStats.totalMessagesProcessed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Peak Throughput</span>
                  <span className="text-sm font-bold text-secondary">{brokerStats.peakThroughput}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Throughput</span>
                  <span className="text-sm font-bold text-accent">{brokerStats.averageThroughput}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Connected Clients</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30">{brokerStats.connectedClients}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Data Transfer Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Topics</span>
                  <span className="text-sm font-bold text-foreground">{brokerStats.topicCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Subscriptions</span>
                  <span className="text-sm font-bold text-foreground font-mono">{brokerStats.subscriptions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Data Transferred</span>
                  <span className="text-sm font-bold text-secondary">{brokerStats.totalDataTransferred}</span>
                </div>
                <div className="border-t border-border pt-3 space-y-2">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Data Flow Distribution</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span>Sensor Data</span>
                      <span className="font-bold text-primary">45%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[45%]"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span>Alerts & Events</span>
                      <span className="font-bold text-yellow-500">35%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 w-[35%]"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span>Status Updates</span>
                      <span className="font-bold text-green-500">20%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[20%]"></div>
                    </div>
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
