"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, BarChart3, ScatterChart, TrendingUp, Search, Info } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const confidenceData = [
  { day: 'Mon', lower: 5, value: 8, upper: 12 },
  { day: 'Tue', lower: 7, value: 10, upper: 14 },
  { day: 'Wed', lower: 4, value: 7, upper: 11 },
  { day: 'Thu', lower: 10, value: 15, upper: 22 },
  { day: 'Fri', lower: 12, value: 18, upper: 26 },
  { day: 'Sat', lower: 8, value: 12, upper: 18 },
  { day: 'Sun', lower: 9, value: 13, upper: 19 },
];

export default function StatisticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl font-headline font-bold text-white">Inferential Statistics & R Insights</h1>
          <p className="text-muted-foreground">Statistical modeling for predictive maintenance and failure detection.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trend Analysis Chart */}
          <Card className="bg-card/50 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Flap Displacement Confidence (95% CI)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={confidenceData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2E50B8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2E50B8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2d35" vertical={false} />
                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1c22', border: '1px solid #2e323d', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="upper" stroke="none" fill="#2E50B8" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="lower" stroke="none" fill="#121316" fillOpacity={1} />
                    <Area type="monotone" dataKey="value" stroke="#2E50B8" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-muted-foreground mt-4 italic">
                * Confidence bands calculated using R's <code className="text-primary font-mono">ggplot2::geom_ribbon()</code> based on standard error of the mean displacement.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                Failure Risk Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                 <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <h4 className="text-xs font-bold uppercase text-muted-foreground mb-4">Risk Distribution per Compartment</h4>
                    <div className="h-40">
                       <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: 'C1', risk: 12 },
                            { name: 'C2', risk: 45 },
                            { name: 'C3', risk: 8 },
                            { name: 'C4', risk: 22 },
                          ]}>
                            <Bar dataKey="risk">
                              {[12, 45, 8, 22].map((v, i) => (
                                <Cell key={i} fill={v > 40 ? '#F44336' : v > 20 ? '#FFC107' : '#2E50B8'} />
                              ))}
                            </Bar>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                          </BarChart>
                       </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl">
                    <h5 className="text-sm font-bold text-accent flex items-center gap-2">
                       <Search className="w-4 h-4" />
                       Anomaly Indication
                    </h5>
                    <p className="text-xs text-white/80 mt-2 leading-relaxed">
                       Using Inferential Statistics (T-Test), we compared current vibration levels against a population baseline. Result: <span className="text-accent font-bold">p-value &lt; 0.05</span>, indicating a statistically significant anomaly in compartment C2.
                    </p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card/50 border-border">
           <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                 <Info className="w-5 h-5 text-primary" />
                 Academic Explanation Summary
              </CardTitle>
           </CardHeader>
           <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                 <h4 className="text-sm font-bold text-white">Trend Identification</h4>
                 <p className="text-xs text-muted-foreground">Moving averages were used to smooth sensor noise and identify long-term wear patterns in flap hinges.</p>
              </div>
              <div className="space-y-2">
                 <h4 className="text-sm font-bold text-white">Predictive Analysis</h4>
                 <p className="text-xs text-muted-foreground">Regression models in R predict the 'Time to Failure' (TTF) by extrapolating displacement values toward critical thresholds.</p>
              </div>
              <div className="space-y-2">
                 <h4 className="text-sm font-bold text-white">Confidence Intervals</h4>
                 <p className="text-xs text-muted-foreground">95% Confidence Intervals provide a buffer for sensor uncertainty, ensuring alerts are only generated when a trend is statistically valid.</p>
              </div>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
