"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  Database, 
  Table as TableIcon,
  GitBranch,
  Check,
  TrendingUp,
  ArrowDown
} from 'lucide-react';

export function DBMSDataFlowChart() {
  const [flowData, setFlowData] = useState({
    sensors: Math.floor(Math.random() * 50) + 20,
    parsing: Math.floor(Math.random() * 45) + 18,
    validation: Math.floor(Math.random() * 42) + 15,
    storage: Math.floor(Math.random() * 40) + 14,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowData({
        sensors: Math.floor(Math.random() * 50) + 20,
        parsing: Math.floor(Math.random() * 45) + 18,
        validation: Math.floor(Math.random() * 42) + 15,
        storage: Math.floor(Math.random() * 40) + 14,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const dataFlow = [
    {
      id: 1,
      stage: 'Raw Sensor Input',
      icon: Wifi,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-500/20',
      count: flowData.sensors,
      unit: 'readings/min',
      description: 'Real-time data from IoT sensors (temperature, humidity, vibration, pressure)',
      table: 'N/A'
    },
    {
      id: 2,
      stage: 'Data Parsing',
      icon: GitBranch,
      color: 'bg-indigo-500',
      lightColor: 'bg-indigo-500/20',
      count: flowData.parsing,
      unit: 'parsed/min',
      description: 'Convert binary/JSON to structured format, extract timestamp and sensor metadata',
      table: 'N/A'
    },
    {
      id: 3,
      stage: 'Validation & Alerts',
      icon: Check,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-500/20',
      count: flowData.validation,
      unit: 'validated/min',
      description: 'Check against constraints, generate alerts table entries if anomalies detected',
      table: 'Alert'
    },
    {
      id: 4,
      stage: 'Database Storage',
      icon: Database,
      color: 'bg-green-500',
      lightColor: 'bg-green-500/20',
      count: flowData.storage,
      unit: 'stored/min',
      description: 'Store in Sensor_Reading, Vehicle, and Sensor tables with referential integrity',
      table: 'Sensor_Reading, Vehicle, Sensor'
    },
  ];

  const tables = [
    {
      name: 'Vehicle',
      fields: ['vehicle_id (PK)', 'name', 'route', 'health_score', 'connectivity'],
      description: 'Vehicle master records'
    },
    {
      name: 'Sensor',
      fields: ['sensor_id (PK)', 'vehicle_id (FK)', 'sensor_type', 'current_value', 'status'],
      description: 'Sensor configuration & metadata'
    },
    {
      name: 'Sensor_Reading',
      fields: ['reading_id (PK)', 'sensor_id (FK)', 'value', 'timestamp', 'unit'],
      description: 'Time-series sensor measurements'
    },
    {
      name: 'Alert',
      fields: ['alert_id (PK)', 'vehicle_id (FK)', 'sensor_id (FK)', 'severity', 'message'],
      description: 'Generated alerts & anomalies'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Main Data Flow */}
      <Card className="bg-card/50 border-border overflow-hidden">
        <CardHeader>
          <CardTitle className="font-headline font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Sensor Data to Database Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <style>{`
            @keyframes flowDown {
              0% { transform: translateY(0); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(100%); opacity: 0; }
            }
            .flow-arrow {
              animation: flowDown 2s ease-in-out infinite;
            }
          `}</style>

          {/* Desktop Vertical Flow */}
          <div className="hidden md:block space-y-2">
            {dataFlow.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* Stage Node */}
                <div className={`${item.lightColor} border-2 border-current p-4 rounded-xl`}>
                  <div className="flex items-start gap-4">
                    <div className={`${item.color} p-3 rounded-lg flex-shrink-0`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-foreground">{item.stage}</h4>
                        <Badge className={`${item.color} text-white border-0`}>
                          {item.count} {item.unit}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      {item.table !== 'N/A' && (
                        <div className="flex items-center gap-2 text-xs">
                          <TableIcon className="w-3 h-3 text-primary" />
                          <span className="font-mono text-primary font-bold">{item.table}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Arrow between stages */}
                {index < dataFlow.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="relative h-8 flex items-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ArrowDown className="w-5 h-5 text-primary flow-arrow" />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-3">
            {dataFlow.map((item) => (
              <div key={item.id} className={`${item.lightColor} border-2 border-current p-3 rounded-lg`}>
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <h4 className="font-bold text-foreground text-sm">{item.stage}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Badge className={`${item.color} text-white border-0 text-[10px]`}>
                    {item.count} {item.unit}
                  </Badge>
                  {item.table !== 'N/A' && (
                    <span className="text-[10px] font-mono text-primary font-bold">{item.table}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Schema */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-headline font-bold flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            Data Storage Tables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tables.map((table) => (
              <div key={table.name} className="border border-border rounded-lg p-4 bg-muted/20">
                <h4 className="font-bold text-foreground mb-2">{table.name}</h4>
                <p className="text-xs text-muted-foreground mb-3">{table.description}</p>
                <div className="space-y-1">
                  {table.fields.map((field, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="font-mono text-muted-foreground">{field}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Info */}
      <Card className="bg-card/50 border-border border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            Data Integrity & Processing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-bold text-foreground mb-2">Real-time Processing</h5>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Each sensor reading is parsed within milliseconds and validated against sensor constraints before database insertion.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-foreground mb-2">Referential Integrity</h5>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Foreign key constraints ensure data consistency. When a vehicle record is deleted, all associated sensors and readings cascade delete.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-foreground mb-2">Anomaly Detection</h5>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Validation stage checks if readings exceed thresholds and automatically creates Alert table entries for critical issues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
