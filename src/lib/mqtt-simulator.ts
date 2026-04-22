// MQTT Message Simulator for real-time data flow visualization
export interface MQTTMessage {
  id: string;
  topic: string;
  payload: string;
  qos: number;
  retained: boolean;
  timestamp: string;
  size: number; // bytes
  source: 'Vehicle' | 'Sensor' | 'Gateway';
  vehicleId?: string;
  sensorId?: string;
}

export interface MQTTMetrics {
  messagesPerMinute: number;
  averagePayloadSize: number; // bytes
  successRate: number; // percentage
  latency: number; // ms
  topicsActive: number;
  connectedDevices: number;
}

const VEHICLE_IDS = ['V-101', 'V-102', 'V-103', 'V-104', 'V-105'];
const SENSOR_TYPES = ['Flap Displacement', 'Vibration', 'Load/Weight', 'Temperature', 'Battery', 'Signal'];
const MQTT_TOPICS = [
  'vehicles/+/telemetry/flap',
  'vehicles/+/telemetry/vibration',
  'vehicles/+/telemetry/load',
  'vehicles/+/telemetry/temperature',
  'vehicles/+/alerts/warning',
  'vehicles/+/status/heartbeat',
  'system/gateway/stats',
  'system/broker/metrics',
];

export function generateMQTTMessage(): MQTTMessage {
  const vehicleId = VEHICLE_IDS[Math.floor(Math.random() * VEHICLE_IDS.length)];
  const sensorType = SENSOR_TYPES[Math.floor(Math.random() * SENSOR_TYPES.length)];
  
  let topicTemplate = 'vehicles/+/telemetry/';
  let value = 0;
  const source = Math.random() > 0.7 ? 'Gateway' : 'Sensor';

  switch (sensorType) {
    case 'Flap Displacement':
      value = Number((Math.random() * 12).toFixed(2));
      topicTemplate += 'flap';
      break;
    case 'Vibration':
      value = Number((Math.random() * 8).toFixed(2));
      topicTemplate += 'vibration';
      break;
    case 'Load/Weight':
      value = Math.floor(Math.random() * 500);
      topicTemplate += 'load';
      break;
    case 'Temperature':
      value = Number((20 + Math.random() * 30).toFixed(2));
      topicTemplate += 'temperature';
      break;
    case 'Battery':
      value = Number((11 + Math.random() * 2).toFixed(2));
      topicTemplate += 'battery';
      break;
    case 'Signal':
      value = Math.floor(-90 + Math.random() * 30);
      topicTemplate += 'signal';
      break;
    default:
      break;
  }

  const topic = topicTemplate.replace('+', vehicleId);
  const payload = JSON.stringify({
    vehicleId,
    sensorName: sensorType,
    value,
    unit: getUnit(sensorType),
    timestamp: new Date().toISOString(),
    status: getStatus(sensorType, value),
  });

  return {
    id: `MSG-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    topic,
    payload,
    qos: Math.floor(Math.random() * 2) + 1, // QoS 1 or 2
    retained: Math.random() > 0.9,
    timestamp: new Date().toISOString(),
    size: payload.length,
    source,
    vehicleId,
    sensorId: `${vehicleId}-${sensorType.split(' ').join('-')}`,
  };
}

function getUnit(sensorType: string): string {
  const units: Record<string, string> = {
    'Flap Displacement': 'cm',
    'Vibration': 'g',
    'Load/Weight': 'kg',
    'Temperature': '°C',
    'Battery': 'V',
    'Signal': 'dBm',
  };
  return units[sensorType] || '';
}

function getStatus(sensorType: string, value: number): string {
  const thresholds: Record<string, { warning: number; critical: number; inverse?: boolean }> = {
    'Flap Displacement': { warning: 10, critical: 12 },
    'Vibration': { warning: 5, critical: 7 },
    'Load/Weight': { warning: 450, critical: 500 },
    'Temperature': { warning: 40, critical: 50 },
    'Battery': { warning: 11.5, critical: 11, inverse: true },
    'Signal': { warning: -85, critical: -90, inverse: true },
  };

  const threshold = thresholds[sensorType];
  if (!threshold) return 'Normal';

  if (threshold.inverse) {
    if (value <= threshold.critical) return 'Critical';
    if (value <= threshold.warning) return 'Warning';
  } else {
    if (value >= threshold.critical) return 'Critical';
    if (value >= threshold.warning) return 'Warning';
  }

  return 'Normal';
}

export function generateMQTTMetrics(): MQTTMetrics {
  return {
    messagesPerMinute: Math.floor(30 + Math.random() * 70),
    averagePayloadSize: Math.floor(150 + Math.random() * 100),
    successRate: 99.5 + Math.random() * 0.4,
    latency: Math.floor(10 + Math.random() * 40),
    topicsActive: MQTT_TOPICS.length,
    connectedDevices: 5 + Math.floor(Math.random() * 10),
  };
}

export function getMQTTBrokerStats() {
  return {
    uptime: '45d 12h 34m',
    totalMessagesProcessed: '89,234,567',
    peakThroughput: '15,342 msg/s',
    averageThroughput: '6,234 msg/s',
    connectedClients: 42,
    subscriptions: 156,
    topicCount: MQTT_TOPICS.length,
    totalDataTransferred: '234.5 GB',
  };
}
