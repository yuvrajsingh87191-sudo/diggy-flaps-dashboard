"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Lock, Zap, CheckCircle2, AlertCircle, BarChart3, TrendingUp } from 'lucide-react';
import {
  generateQueryOperation,
  generateTransaction,
  generateIndexOperation,
  getDBMSMetrics,
  getACIDProperties,
  type QueryOperation,
  type Transaction,
  type IndexOperation,
} from '@/lib/dbms-simulator';

interface DBMSSimulationProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function DBMSSimulation({ autoRefresh = true, refreshInterval = 2000 }: DBMSSimulationProps) {
  const [queries, setQueries] = useState<QueryOperation[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [indexes, setIndexes] = useState<IndexOperation[]>([]);
  const [metrics, setMetrics] = useState<ReturnType<typeof getDBMSMetrics> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMetrics(getDBMSMetrics());
  }, []);

  useEffect(() => {
    if (!autoRefresh || !mounted) return;

    const interval = setInterval(() => {
      setMetrics(getDBMSMetrics());
      setQueries(prev => [generateQueryOperation(), ...prev].slice(0, 6));
      setTransactions(prev => [generateTransaction(), ...prev].slice(0, 4));
      setIndexes(prev => [generateIndexOperation(), ...prev].slice(0, 3));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, mounted]);

  const getQueryTypeColor = (type: QueryOperation['type']) => {
    switch (type) {
      case 'SELECT':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'INSERT':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'UPDATE':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'DELETE':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'JOIN':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getTransactionStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'Committed':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'Rolled Back':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'Pending':
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      {!mounted || !metrics ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">Initializing DBMS metrics...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm font-bold">Execution Time</span>
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <p className="text-2xl font-bold text-primary">{metrics.totalExecutionTime}</p>
                <p className="text-[10px] text-muted-foreground">milliseconds avg</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm font-bold">Rows Affected</span>
                  <BarChart3 className="w-4 h-4 text-secondary" />
                </div>
                <p className="text-2xl font-bold text-secondary">{metrics.totalRowsAffected.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">in current batch</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm font-bold">Committed</span>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-500">{metrics.committedTransactions}</p>
                <p className="text-[10px] text-muted-foreground">transactions</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm font-bold">Cache Hit</span>
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <p className="text-2xl font-bold text-accent">{metrics.cacheHitRatio}%</p>
                <p className="text-[10px] text-muted-foreground">ratio</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Query Operations */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-headline font-bold flex items-center gap-2">
            <Database className="w-6 h-6 text-primary" />
            Live Query Operations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {!mounted ? (
              <p className="text-center text-muted-foreground text-sm py-4">Initializing queries...</p>
            ) : queries.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-4">Waiting for queries...</p>
            ) : (
              queries.map(query => (
                <div key={query.id} className="p-3 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] ${getQueryTypeColor(query.type)} border`}>
                        {query.type}
                      </Badge>
                      <span className="text-xs font-mono text-muted-foreground">{query.table}</span>
                    </div>
                    <Badge variant="outline" className={`text-[10px] ${
                      query.status === 'Completed' ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                      query.status === 'Executing' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' :
                      'bg-red-500/20 text-red-500 border-red-500/30'
                    } border`}>
                      {query.status}
                    </Badge>
                  </div>
                  
                  <code className="text-[10px] text-muted-foreground block mb-2 truncate">
                    {query.query}
                  </code>

                  <div className="grid grid-cols-3 gap-2 text-[10px]">
                    <div>
                      <span className="text-muted-foreground">Execution:</span>
                      <span className="ml-1 font-mono font-bold text-primary">{query.executionTime}ms</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rows:</span>
                      <span className="ml-1 font-mono font-bold text-secondary">{query.rowsAffected}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ID:</span>
                      <span className="ml-1 font-mono font-bold text-accent text-[9px]">{query.id.split('-')[1]}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Transactions (ACID)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map(txn => (
                <div key={txn.id} className="p-3 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{txn.id}</span>
                    <Badge variant="outline" className={`text-[10px] ${getTransactionStatusColor(txn.status)} border`}>
                      {txn.status}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Isolation:</span>
                      <span className="font-mono font-bold">{txn.isolationLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Operations:</span>
                      <span className="font-mono font-bold">{txn.operations.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Durability:</span>
                      <span className={`font-mono font-bold ${txn.durability === 'Durable' ? 'text-green-500' : 'text-red-500'}`}>
                        {txn.durability}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Indexing */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-lg font-headline font-bold">Index Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {indexes.map(idx => (
                <div key={idx.id} className="p-3 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold">{idx.table}.{idx.column}</p>
                      <p className="text-[9px] text-muted-foreground">{idx.indexType}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Search Time:</span>
                      <span className="font-mono font-bold">{idx.searchTime}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hits/Misses:</span>
                      <span className="font-mono font-bold">{idx.hits}/{idx.misses}</span>
                    </div>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-2">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(idx.hits / (idx.hits + idx.misses + 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ACID Properties */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-headline font-bold flex items-center gap-2">
            <Lock className="w-6 h-6 text-primary" />
            ACID Properties Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(getACIDProperties()).map(prop => (
              <div key={prop.name} className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                <h4 className="font-bold text-primary mb-2">{prop.name}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">{prop.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-green-500/20 text-green-500 border-green-500/30 text-[10px]">
                    ✓ {prop.status}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground">{prop.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
