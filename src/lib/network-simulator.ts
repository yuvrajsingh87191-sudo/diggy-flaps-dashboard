// Network Simulator - Simulates data transfer flow through the network

export type DataPacket = {
  id: string;
  source: 'Sensor' | 'Gateway' | 'Broker' | 'Dashboard';
  destination: 'Sensor' | 'Gateway' | 'Broker' | 'Dashboard';
  protocol: string;
  size: number; // bytes
  latency: number; // ms
  timestamp: string;
  status: 'Sending' | 'Transmitted' | 'Processing' | 'Delivered' | 'Error';
  payload: string;
};

export type NetworkNode = {
  id: string;
  name: string;
  type: 'Sensor' | 'Gateway' | 'Broker' | 'Dashboard';
  status: 'Active' | 'Inactive' | 'Congested';
  packetsProcessed: number;
  bandwidth: number; // Mbps
  cpuUsage: number; // %
};

export type NetworkFlow = {
  id: string;
  fromNode: string;
  toNode: string;
  protocol: string;
  bytesTransferred: number;
  packetsCount: number;
  latency: number;
  errorRate: number; // %
  timestamp: string;
};

const protocols = ['MQTT', 'TCP/IP', 'TLS 1.3', 'WebSocket'];
const payloadExamples = [
  'Flap Position: 45.2°',
  'Temperature: 38.5°C',
  'Vibration: 2.1G',
  'Pressure: 1.2 bar',
  'Humidity: 65%',
  'GPS: 28.1234,-82.5678',
];

export function generateDataPacket(): DataPacket {
  const sources: Array<DataPacket['source']> = ['Sensor', 'Gateway', 'Broker'];
  const destinations: Array<DataPacket['destination']> = ['Gateway', 'Broker', 'Dashboard'];
  
  const source = sources[Math.floor(Math.random() * sources.length)];
  let destination = destinations[Math.floor(Math.random() * destinations.length)];
  
  // Ensure destination is different from source
  while (destination === source) {
    destination = destinations[Math.floor(Math.random() * destinations.length)];
  }

  return {
    id: `PKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    source,
    destination,
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    size: Math.floor(Math.random() * 1024) + 128, // 128-1152 bytes
    latency: Math.floor(Math.random() * 500) + 50, // 50-550ms
    timestamp: new Date().toISOString(),
    status: 'Sending',
    payload: payloadExamples[Math.floor(Math.random() * payloadExamples.length)],
  };
}

export function getNetworkNodes(): NetworkNode[] {
  return [
    {
      id: 'sensor-node',
      name: 'Sensors',
      type: 'Sensor',
      status: Math.random() > 0.1 ? 'Active' : 'Inactive',
      packetsProcessed: Math.floor(Math.random() * 10000) + 5000,
      bandwidth: 2.5,
      cpuUsage: Math.random() * 50 + 20,
    },
    {
      id: 'gateway-node',
      name: 'IoT Gateway',
      type: 'Gateway',
      status: 'Active',
      packetsProcessed: Math.floor(Math.random() * 50000) + 10000,
      bandwidth: 10,
      cpuUsage: Math.random() * 60 + 30,
    },
    {
      id: 'broker-node',
      name: 'Cloud Broker',
      type: 'Broker',
      status: Math.random() > 0.05 ? 'Active' : 'Congested',
      packetsProcessed: Math.floor(Math.random() * 100000) + 50000,
      bandwidth: 100,
      cpuUsage: Math.random() * 70 + 40,
    },
    {
      id: 'dashboard-node',
      name: 'Web Dashboard',
      type: 'Dashboard',
      status: 'Active',
      packetsProcessed: Math.floor(Math.random() * 50000) + 20000,
      bandwidth: 25,
      cpuUsage: Math.random() * 40 + 15,
    },
  ];
}

export function generateNetworkFlow(): NetworkFlow {
  const nodes = getNetworkNodes();
  const fromIdx = Math.floor(Math.random() * nodes.length);
  let toIdx = Math.floor(Math.random() * nodes.length);
  
  while (toIdx === fromIdx) {
    toIdx = Math.floor(Math.random() * nodes.length);
  }

  return {
    id: `FLOW-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    fromNode: nodes[fromIdx].name,
    toNode: nodes[toIdx].name,
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    bytesTransferred: Math.floor(Math.random() * 10000) + 1000,
    packetsCount: Math.floor(Math.random() * 100) + 10,
    latency: Math.floor(Math.random() * 400) + 30,
    errorRate: Math.random() > 0.98 ? Math.random() * 5 : 0,
    timestamp: new Date().toISOString(),
  };
}

export function getNetworkMetrics() {
  const flows = [generateNetworkFlow(), generateNetworkFlow(), generateNetworkFlow()];
  const totalBytes = flows.reduce((sum, f) => sum + f.bytesTransferred, 0);
  const totalPackets = flows.reduce((sum, f) => sum + f.packetsCount, 0);
  const avgLatency = flows.reduce((sum, f) => sum + f.latency, 0) / flows.length;
  const maxErrorRate = Math.max(...flows.map(f => f.errorRate));

  return {
    flows,
    totalBytes,
    totalPackets,
    avgLatency: avgLatency.toFixed(2),
    networkHealth: Math.max(0, 100 - maxErrorRate * 20),
    activeConnections: Math.floor(Math.random() * 50) + 20,
  };
}
