"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  Radio, 
  Server, 
  Cloud, 
  Monitor,
  ArrowRight,
  Zap,
  Activity
} from 'lucide-react';

export function NetworkFlowChart() {
  const [activeFlows, setActiveFlows] = useState<number[]>([0, 1, 2]);
  const [flowCounts, setFlowCounts] = useState({
    sensors: Math.floor(Math.random() * 150) + 50,
    mqtt: Math.floor(Math.random() * 200) + 100,
    cloud: Math.floor(Math.random() * 180) + 90,
    dashboard: Math.floor(Math.random() * 160) + 80,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowCounts({
        sensors: Math.floor(Math.random() * 150) + 50,
        mqtt: Math.floor(Math.random() * 200) + 100,
        cloud: Math.floor(Math.random() * 180) + 90,
        dashboard: Math.floor(Math.random() * 160) + 80,
      });
      setActiveFlows([Math.floor(Math.random() * 3)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const flowStages = [
    {
      id: 'sensors',
      name: 'IoT Sensors',
      icon: Wifi,
      description: 'Temperature, Humidity, Vibration',
      count: flowCounts.sensors,
      unit: 'readings/sec',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-500/20',
    },
    {
      id: 'mqtt',
      name: 'MQTT Broker',
      icon: Radio,
      description: 'Message Queue (MQTT v5.0)',
      count: flowCounts.mqtt,
      unit: 'messages/sec',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-500/20',
    },
    {
      id: 'cloud',
      name: 'Cloud Processing',
      icon: Cloud,
      description: 'Firebase Firestore',
      count: flowCounts.cloud,
      unit: 'transactions/sec',
      color: 'bg-amber-500',
      lightColor: 'bg-amber-500/20',
    },
    {
      id: 'dashboard',
      name: 'Dashboard UI',
      icon: Monitor,
      description: 'Real-time Visualization',
      count: flowCounts.dashboard,
      unit: 'updates/sec',
      color: 'bg-green-500',
      lightColor: 'bg-green-500/20',
    },
  ];

  return (
    <Card className="bg-card/50 border-border overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline font-bold flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Complete Network Flow Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <style>{`
          @keyframes flowPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          @keyframes flowMove {
            0% { transform: scaleX(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: scaleX(1); opacity: 0; }
          }
          .flow-active {
            animation: flowMove 1.5s ease-in-out infinite;
          }
          .node-pulse {
            animation: flowPulse 2s ease-in-out infinite;
          }
        `}</style>

        {/* Desktop Flow View */}
        <div className="hidden md:block space-y-8">
          {/* Main Flow */}
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              {flowStages.map((stage, index) => (
                <React.Fragment key={stage.id}>
                  {/* Node */}
                  <div className={`flex-1 text-center ${activeFlows.includes(index) ? 'node-pulse' : ''}`}>
                    <div className={`${stage.lightColor} p-6 rounded-2xl border-2 border-current mb-3 mx-auto w-24 h-24 flex items-center justify-center`}>
                      <stage.icon className={`w-12 h-12 ${stage.color}`} />
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{stage.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{stage.description}</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-lg font-bold text-primary">{stage.count}</p>
                      <p className="text-[10px] text-muted-foreground">{stage.unit}</p>
                    </div>
                  </div>

                  {/* Arrow between nodes */}
                  {index < flowStages.length - 1 && (
                    <div className="flex-none mb-8">
                      <div className="relative w-12 h-1 flex items-center justify-center">
                        <div className={`absolute inset-0 bg-gradient-to-r from-primary to-transparent rounded-full ${activeFlows.includes(index) ? 'flow-active' : 'opacity-30'}`} />
                        <ArrowRight className="w-5 h-5 text-primary relative z-10" />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Data Flow Description */}
          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border">
            {flowStages.map((stage) => (
              <div key={stage.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <span className="text-xs font-bold text-foreground">{stage.name}</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  {stage.id === 'sensors' && 'Multiple IoT devices transmit sensor data in real-time'}
                  {stage.id === 'mqtt' && 'MQTT broker receives, routes and buffers messages'}
                  {stage.id === 'cloud' && 'Cloud processes and stores data with redundancy'}
                  {stage.id === 'dashboard' && 'Live updates displayed to end users'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Flow View */}
        <div className="md:hidden space-y-4">
          {flowStages.map((stage, index) => (
            <div key={stage.id}>
              <div className={`${stage.lightColor} p-4 rounded-xl border-2 border-current`}>
                <div className="flex items-center gap-3 mb-2">
                  <stage.icon className={`w-8 h-8 ${stage.color}`} />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">{stage.name}</h4>
                    <p className="text-xs text-muted-foreground">{stage.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{stage.count}</span>
                  <span className="text-[10px] text-muted-foreground">{stage.unit}</span>
                </div>
              </div>
              {index < flowStages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-5 h-5 text-primary rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
