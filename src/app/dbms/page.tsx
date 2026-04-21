"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Database, Table as TableIcon, Key, Link as LinkIcon, Lock } from 'lucide-react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

export default function DBMSPage() {
  const schema = [
    { table: 'Vehicle', pk: 'vehicle_id', fk: '-', constraints: 'NOT NULL, UNIQUE', desc: 'Main vehicle record' },
    { table: 'Sensor', pk: 'sensor_id', fk: 'vehicle_id', constraints: 'ON DELETE CASCADE', desc: 'IoT sensors on vehicles' },
    { table: 'Sensor_Reading', pk: 'reading_id', fk: 'sensor_id', constraints: 'NOT NULL', desc: 'Time-series sensor data' },
    { table: 'Alert', pk: 'alert_id', fk: 'vehicle_id, sensor_id', constraints: 'CHECK(severity IN (...))', desc: 'System generated faults' },
    { table: 'Maintenance', pk: 'maint_id', fk: 'vehicle_id', constraints: 'NOT NULL', desc: 'Repair and service logs' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white">Database Management System (DBMS)</h1>
          <p className="text-muted-foreground">Entity-Relationship modeling and relational integrity constraints.</p>
        </div>

        {/* ER Diagram Concept */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="font-headline font-bold flex items-center gap-2">
                <TableIcon className="w-6 h-6 text-primary" />
                Relational Schema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table Entity</TableHead>
                    <TableHead>PK</TableHead>
                    <TableHead>FK References</TableHead>
                    <TableHead>Integrity Constraints</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schema.map((item) => (
                    <TableRow key={item.table}>
                      <TableCell className="font-bold">{item.table}</TableCell>
                      <TableCell><Badge variant="outline" className="text-primary border-primary/30"><Key className="w-3 h-3 mr-1" /> {item.pk}</Badge></TableCell>
                      <TableCell className="text-muted-foreground text-xs"><LinkIcon className="w-3 h-3 inline mr-1" /> {item.fk}</TableCell>
                      <TableCell className="text-xs font-mono">{item.constraints}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">Integrity Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-bold">Referential Integrity</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We utilize <span className="text-white font-mono">ON DELETE CASCADE</span> on the Sensor table, ensuring that when a vehicle is decommissioned, all associated sensor metadata is purged to maintain consistency.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-secondary">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-sm font-bold">Check Constraints</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The <span className="text-white font-mono">Alert</span> table implements CHECK constraints on the <span className="italic">severity</span> field, allowing only 'Info', 'Warning', or 'Critical' values.
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                 <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Back-end Platform</p>
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center">
                       <img src="https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png" className="w-4 h-4" alt="Firebase" />
                    </div>
                    <span className="text-sm font-bold">Firestore NoSQL</span>
                    <Badge className="bg-orange-500/20 text-orange-500 border-none ml-auto text-[10px]">REAL-TIME</Badge>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
