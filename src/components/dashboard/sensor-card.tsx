"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { SensorReading } from '@/lib/types';
import { cn } from '@/lib/utils';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  YAxis, 
  XAxis,
  Tooltip
} from 'recharts';

interface SensorCardProps {
  sensor: SensorReading;
}

export function SensorCard({ sensor }: SensorCardProps) {
  const isNormal = sensor.status === 'Normal';
  const isWarning = sensor.status === 'Warning';
  const isCritical = sensor.status === 'Critical';

  return (
    <Card className={cn(
      "p-5 bg-card/80 border-border transition-all duration-500 overflow-hidden relative",
      isWarning && "border-yellow-500/30 bg-yellow-500/5",
      isCritical && "border-red-500/30 bg-red-500/5"
    )}>
      {/* Background Glow Effect */}
      <div className={cn(
        "absolute -right-4 -top-4 w-16 h-16 blur-2xl opacity-20",
        isNormal && "bg-green-500",
        isWarning && "bg-yellow-500",
        isCritical && "bg-red-500"
      )} />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-white/80">{sensor.sensorName}</h4>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Live Stream</p>
        </div>
        <div className={cn(
          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
          isNormal && "bg-green-500/20 text-green-500",
          isWarning && "bg-yellow-500/20 text-yellow-500",
          isCritical && "bg-red-500/20 text-red-500"
        )}>
          {sensor.status}
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-headline font-bold text-white tabular-nums">
          {sensor.currentValue}
        </span>
        <span className="text-sm text-muted-foreground font-medium">{sensor.unit}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Threshold</p>
          <p className="text-xs font-mono font-medium text-white/60">{sensor.threshold} {sensor.unit}</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Updated</p>
          <p className="text-xs font-mono font-medium text-white/60">
            {new Date(sensor.timestamp).toLocaleTimeString([], { hour12: false })}
          </p>
        </div>
      </div>

      {/* Mini Trend Chart */}
      <div className="h-20 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sensor.history}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isNormal ? "#4CAF50" : isWarning ? "#FFC107" : "#F44336"} 
              strokeWidth={2} 
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
