import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: 'up' | 'down';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export function StatCard({ title, value, icon: Icon, trend, trendDirection, color = 'primary' }: StatCardProps) {
  const colorMap = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    success: 'text-green-500 bg-green-500/10 border-green-500/20',
    warning: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    error: 'text-red-500 bg-red-500/10 border-red-500/20',
  };

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-headline font-bold text-foreground tracking-tight">{value}</h3>
          {trend && (
            <div className={cn(
              "text-xs flex items-center gap-1 font-semibold",
              trendDirection === 'up' ? "text-green-500" : "text-red-500"
            )}>
              <span>{trendDirection === 'up' ? '↑' : '↓'}</span>
              <span>{trend}</span>
              <span className="text-muted-foreground font-normal">from last week</span>
            </div>
          )}
        </div>
        <div className={cn("p-3 rounded-xl border", colorMap[color])}>
          <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </Card>
  );
}
