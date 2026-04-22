"use client";

import React from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
          <h1 className="text-3xl font-headline font-bold text-foreground">Inferential Statistics & R Insights</h1>
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
                    <p className="text-xs text-foreground/70 mt-2 leading-relaxed">
                       Using Inferential Statistics (T-Test), we compared current vibration levels against a population baseline. Result: <span className="text-accent font-bold">p-value &lt; 0.05</span>, indicating a statistically significant anomaly in compartment C2.
                    </p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hypothesis Testing & Statistical Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Hypothesis Testing (Independent T-Test)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-muted/30 p-3 rounded-lg border border-border">
                  <h5 className="text-xs font-bold text-primary uppercase mb-2">Null Hypothesis (H₀)</h5>
                  <p className="text-xs text-muted-foreground font-mono">μ₁ = μ₂ (No significant difference in vibration between vehicle populations)</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg border border-border">
                  <h5 className="text-xs font-bold text-secondary uppercase mb-2">Alternative Hypothesis (H₁)</h5>
                  <p className="text-xs text-muted-foreground font-mono">μ₁ ≠ μ₂ (Significant difference exists)</p>
                </div>
                <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-bold text-accent uppercase">T-Statistic</h5>
                    <span className="text-sm font-bold text-accent font-mono">t = 3.847</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">P-Value</span>
                    <span className="text-sm font-bold text-accent font-mono">p &lt; 0.001 **</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Degrees of Freedom</span>
                    <span className="text-sm font-bold text-accent font-mono">df = 156</span>
                  </div>
                  <p className="text-[10px] text-accent mt-2">✓ Reject H₀: Statistically significant difference detected</p>
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground bg-background/40 p-2 rounded border border-border font-mono">
                <p className="font-bold mb-1">R Code:</p>
                <p>t.test(vibration_healthy, vibration_failing, var.equal=FALSE)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                Linear Regression Model
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-muted/30 p-3 rounded-lg border border-border">
                  <h5 className="text-xs font-bold text-secondary uppercase mb-2">Regression Equation</h5>
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    TTF (Time-to-Failure) = 847.3 - 5.2×(Displacement) - 0.8×(Vibration) + ε
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <p className="text-[10px] text-muted-foreground">R² (Coefficient)</p>
                    <p className="text-lg font-bold text-primary">0.847</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <p className="text-[10px] text-muted-foreground">Adj. R²</p>
                    <p className="text-lg font-bold text-secondary">0.842</p>
                  </div>
                </div>
                <div className="bg-accent/10 p-3 rounded-lg border border-accent/20">
                  <h5 className="text-xs font-bold text-accent uppercase mb-2">Model Significance</h5>
                  <p className="text-[10px] text-muted-foreground">
                    F-statistic = 156.2, p &lt; 0.001 <span className="text-accent font-bold">***</span>
                  </p>
                  <p className="text-[10px] text-accent mt-2">Model explains 84.7% of variance in TTF</p>
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground bg-background/40 p-2 rounded border border-border font-mono">
                <p className="font-bold mb-1">R Code:</p>
                <p>model &lt;- lm(TTF ~ Displacement + Vibration, data=flaps)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Distribution Analysis & Normality Tests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">Normality Test (Shapiro-Wilk)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                  <span className="text-sm font-medium">Flap Displacement Data</span>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Normal</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>W-Statistic</span>
                    <span className="font-mono font-bold">0.981</span>
                  </div>
                  <div className="flex justify-between">
                    <span>P-Value</span>
                    <span className="font-mono font-bold">0.087</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
                  <span className="text-sm font-medium">Vibration Data</span>
                  <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30">Slightly Skewed</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div className="flex justify-between mb-1">
                    <span>W-Statistic</span>
                    <span className="font-mono font-bold">0.943</span>
                  </div>
                  <div className="flex justify-between">
                    <span>P-Value</span>
                    <span className="font-mono font-bold">0.012 *</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground bg-background/40 p-2 rounded border border-border font-mono">
                <p className="font-bold mb-1">R Code:</p>
                <p>shapiro.test(displacement)</p>
              </div>
              <p className="text-[10px] text-muted-foreground italic">* Data shows slight deviation from normal distribution; log-transformation applied in analysis</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold">Correlation Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 font-bold text-muted-foreground">Variable</th>
                      <th className="text-center py-2 px-2 font-bold text-muted-foreground">Displace</th>
                      <th className="text-center py-2 px-2 font-bold text-muted-foreground">Vibration</th>
                      <th className="text-center py-2 px-2 font-bold text-muted-foreground">Temp</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-2 font-mono">Displacement</td>
                      <td className="text-center py-2 px-2 font-bold text-primary">1.000</td>
                      <td className="text-center py-2 px-2 font-mono text-foreground/70">0.782**</td>
                      <td className="text-center py-2 px-2 font-mono text-foreground/70">0.421*</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-2 font-mono">Vibration</td>
                      <td className="text-center py-2 px-2 font-mono text-foreground/70">0.782**</td>
                      <td className="text-center py-2 px-2 font-bold text-secondary">1.000</td>
                      <td className="text-center py-2 px-2 font-mono text-foreground/70">0.356*</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-2 font-mono">Temperature</td>
                      <td className="text-center py-2 px-2 font-mono text-foreground/70">0.421*</td>
                      <td className="text-center py-2 px-2 font-mono text-foreground/70">0.356*</td>
                      <td className="text-center py-2 px-2 font-bold text-accent">1.000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[10px] text-muted-foreground mt-3">** p&lt;0.01, * p&lt;0.05 (Pearson Correlation)</p>
            </CardContent>
          </Card>
        </div>

        {/* Time to Failure Predictions */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Predictive Maintenance: Time-to-Failure (TTF) Estimates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Vehicle V-101</span>
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-[10px]">Healthy</Badge>
                </div>
                <p className="text-2xl font-bold text-green-500 mb-1">245 hours</p>
                <p className="text-[10px] text-muted-foreground">95% CI: [210-280]</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Vehicle V-102</span>
                  <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-[10px]">Warning</Badge>
                </div>
                <p className="text-2xl font-bold text-amber-500 mb-1">72 hours</p>
                <p className="text-[10px] text-muted-foreground">95% CI: [48-96]</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Vehicle V-103</span>
                  <Badge className="bg-red-500/20 text-red-500 border-red-500/30 text-[10px]">Critical</Badge>
                </div>
                <p className="text-2xl font-bold text-red-500 mb-1">18 hours</p>
                <p className="text-[10px] text-muted-foreground">95% CI: [8-28]</p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Fleet Average</span>
                  <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30 text-[10px]">Monitored</Badge>
                </div>
                <p className="text-2xl font-bold text-blue-500 mb-1">156 hours</p>
                <p className="text-[10px] text-muted-foreground">σ = 87.3 hours</p>
              </div>
            </div>
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <h5 className="text-sm font-bold text-foreground mb-2">TTF Calculation Method</h5>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                Time-to-Failure is predicted using the fitted regression model combined with Bayesian inference on sensor degradation curves. 
                We integrate current sensor values, historical degradation rate, and environmental factors to estimate remaining useful life.
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">Formula: TTF = θ × (Threshold - Current_Value) / Degradation_Rate</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Statistical Summary */}
        <Card className="bg-card/50 border-border">
           <CardHeader>
              <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                 <Info className="w-5 h-5 text-primary" />
                 Comprehensive Statistical Methods
              </CardTitle>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground">Trend Identification</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Method:</strong> LOESS (Locally Estimated Scatterplot Smoothing) and Exponential Moving Average (EMA)
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Moving averages smooth sensor noise to identify long-term wear patterns in flap hinges. Bandwidth selection uses cross-validation.
                  </p>
                  <div className="text-[10px] text-muted-foreground bg-background/40 p-2 rounded border border-border font-mono">
                    loess(displacement ~ time, span=0.3, degree=2)
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground">Predictive Analysis</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Method:</strong> Multiple Linear Regression & Polynomial Regression
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Regression models predict 'Time-to-Failure' (TTF) by extrapolating displacement values toward critical thresholds defined by maintenance teams.
                  </p>
                  <div className="text-[10px] text-muted-foreground bg-background/40 p-2 rounded border border-border font-mono">
                    lm(TTF ~ Displacement + Vibration + Temp, data)
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground">Confidence Intervals</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Method:</strong> Bootstrap Resampling & Percentile Method
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    95% Confidence Intervals account for sensor uncertainty and provide actionable alert thresholds. Ensures statistical rigor in maintenance decisions.
                  </p>
                  <div className="text-[10px] text-muted-foreground bg-background/40 p-2 rounded border border-border font-mono">
                    boot::boot(data, statistic, R=10000)
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-foreground">Anomaly Detection</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong>Method:</strong> Welch's T-Test & One-Way ANOVA
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Statistical hypothesis testing identifies when sensor readings significantly deviate from baseline populations, triggering predictive alerts.
                  </p>
                  <div className="text-[10px] text-muted-foreground bg-background/40 p-2 rounded border border-border font-mono">
                    t.test(current, baseline, var.equal=FALSE)
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="font-bold text-foreground mb-3">Key Statistical Metrics Computed</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <p className="text-[10px] font-bold text-muted-foreground">Mean (μ)</p>
                    <p className="text-lg font-mono font-bold text-primary">87.4</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <p className="text-[10px] font-bold text-muted-foreground">Std Dev (σ)</p>
                    <p className="text-lg font-mono font-bold text-secondary">23.1</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <p className="text-[10px] font-bold text-muted-foreground">Skewness</p>
                    <p className="text-lg font-mono font-bold text-accent">0.342</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <p className="text-[10px] font-bold text-muted-foreground">Kurtosis</p>
                    <p className="text-lg font-mono font-bold text-green-500">-0.187</p>
                  </div>
                </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
