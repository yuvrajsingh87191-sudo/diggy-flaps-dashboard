"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { generateDataPacket, getNetworkNodes, type DataPacket, type NetworkNode } from '@/lib/network-simulator';

interface NetworkFlowVisualizationProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function NetworkFlowVisualization({ autoRefresh = true, refreshInterval = 1500 }: NetworkFlowVisualizationProps) {
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNodes(getNetworkNodes());
  }, []);

  useEffect(() => {
    if (!autoRefresh || !mounted) return;

    const interval = setInterval(() => {
      const newPacket = generateDataPacket();
      setPackets(prev => [newPacket, ...prev].slice(0, 8));
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, mounted]);

  const getStatusColor = (status: DataPacket['status']) => {
    switch (status) {
      case 'Sending':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'Transmitted':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'Processing':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'Delivered':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'Error':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: DataPacket['status']) => {
    switch (status) {
      case 'Sending':
      case 'Transmitted':
      case 'Processing':
        return <Zap className="w-3 h-3" />;
      case 'Delivered':
        return <CheckCircle2 className="w-3 h-3" />;
      case 'Error':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Package className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="font-headline font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            Data Packet Flow Simulation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {!mounted ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">Initializing...</p>
              </div>
            ) : packets.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">Waiting for data packets...</p>
              </div>
            ) : (
              packets.map(packet => (
                <div key={packet.id} className="p-3 rounded-lg border border-border/50 bg-muted/20 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-muted-foreground">{packet.id}</span>
                        <Badge variant="outline" className={`text-[10px] ${getStatusColor(packet.status)} border`}>
                          {getStatusIcon(packet.status)}
                          <span className="ml-1">{packet.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="font-bold text-primary">{packet.source}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="font-bold text-secondary">{packet.destination}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-muted-foreground">
                        <div>
                          <span className="font-bold">Protocol:</span> {packet.protocol}
                        </div>
                        <div>
                          <span className="font-bold">Size:</span> {packet.size} bytes
                        </div>
                        <div>
                          <span className="font-bold">Latency:</span> {packet.latency}ms
                        </div>
                        <div>
                          <span className="font-bold">Payload:</span> {packet.payload}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Network Nodes Status */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-lg font-headline font-bold">Network Nodes Status</CardTitle>
        </CardHeader>
        <CardContent>
          {!mounted ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">Initializing nodes...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {nodes.map(node => (
              <div key={node.id} className="p-4 rounded-lg border border-border/50 bg-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold">{node.name}</h4>
                  <Badge variant="outline" className={`text-[10px] ${
                    node.status === 'Active' ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                    node.status === 'Congested' ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                    'bg-gray-500/20 text-gray-500 border-gray-500/30'
                  } border`}>
                    {node.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bandwidth:</span>
                    <span className="font-mono font-bold">{node.bandwidth} Mbps</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(node.bandwidth / 100) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-muted-foreground">CPU Usage:</span>
                    <span className="font-mono font-bold">{node.cpuUsage.toFixed(1)}%</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${node.cpuUsage > 70 ? 'bg-red-500' : node.cpuUsage > 50 ? 'bg-amber-500' : 'bg-green-500'}`}
                      style={{ width: `${node.cpuUsage}%` }}
                    />
                  </div>

                  <div className="flex justify-between mt-2 pt-2 border-t border-border/30">
                    <span className="text-muted-foreground">Packets:</span>
                    <span className="font-mono font-bold">{node.packetsProcessed.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}