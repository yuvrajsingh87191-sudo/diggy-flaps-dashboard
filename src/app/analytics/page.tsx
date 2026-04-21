"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, PieChart, Activity, Brain } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

const data = [
  { name: 'Week 1', failures: 2, efficiency: 85 },
  { name: 'Week 2', failures: 1, efficiency: 88 },
  { name: 'Week 3', failures: 4, efficiency: 82 },
  { name: 'Week 4', failures: 0, efficiency: 94 },
  { name: 'Week 5', failures: 1, efficiency: 91 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white">System Analytics</h1>
          <p className="text-muted-foreground">Historical performance and predictive data visualization.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Fleet Efficiency Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2E50B8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2E50B8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1c22', border: '1px solid #2e323d' }} />
                    <Area type="monotone" dataKey="efficiency" stroke="#2E50B8" fillOpacity={1} fill="url(#colorEff)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                Incidents per Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a1c22', border: '1px solid #2e323d' }} />
                    <Bar dataKey="failures" fill="#F44336" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-border border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Predictive Insight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-white/80 leading-relaxed italic">
                "Analysis of the last 30 days suggests a strong correlation between high vibration events and flap displacement anomalies. We predict an 85% reduction in failures if vibration dampeners are serviced when vibration exceeds 4.5g."
              </p>
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary uppercase">Current Confidence Level</p>
                  <p className="text-sm font-semibold">94.2% Predictive Accuracy</p>
                </div>
                <Activity className="w-8 h-8 text-primary/30" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}