import { Vehicle, Alert, MaintenanceRecord, SensorReading } from './types';

// Enhanced mock data with more vehicles and detailed sensor history
export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'V-101',
    name: 'Inter-City Express A1',
    route: 'LHR - MAN',
    flapStatus: 'Locked',
    healthScore: 92,
    alertLevel: 'Info',
    lastMaintenance: '2024-05-12',
    connectivity: 'Online',
    sensors: [
      { id: 'S1', sensorName: 'Flap Displacement', currentValue: 2.4, unit: 'cm', threshold: 10, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(2.4, 'Flap Displacement') },
      { id: 'S2', sensorName: 'Vibration', currentValue: 0.8, unit: 'g', threshold: 5, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(0.8, 'Vibration') },
      { id: 'S3', sensorName: 'Load/Weight', currentValue: 320, unit: 'kg', threshold: 500, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(320, 'Load/Weight') },
      { id: 'S4', sensorName: 'Temperature', currentValue: 24.5, unit: '°C', threshold: 45, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(24.5, 'Temperature') },
      { id: 'S5', sensorName: 'Battery', currentValue: 12.6, unit: 'V', threshold: 11.5, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(12.6, 'Battery') },
      { id: 'S6', sensorName: 'Signal', currentValue: -65, unit: 'dBm', threshold: -90, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(-65, 'Signal') },
    ]
  },
  {
    id: 'V-102',
    name: 'Coastal Cruiser B5',
    route: 'BRS - PLY',
    flapStatus: 'Locked',
    healthScore: 65,
    alertLevel: 'Warning',
    lastMaintenance: '2024-03-20',
    connectivity: 'Weak',
    sensors: [
      { id: 'S1', sensorName: 'Flap Displacement', currentValue: 11.2, unit: 'cm', threshold: 10, status: 'Warning', timestamp: new Date().toISOString(), history: generateSensorHistory(11.2, 'Flap Displacement') },
      { id: 'S2', sensorName: 'Vibration', currentValue: 6.2, unit: 'g', threshold: 5, status: 'Warning', timestamp: new Date().toISOString(), history: generateSensorHistory(6.2, 'Vibration') },
      { id: 'S3', sensorName: 'Load/Weight', currentValue: 410, unit: 'kg', threshold: 500, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(410, 'Load/Weight') },
      { id: 'S4', sensorName: 'Temperature', currentValue: 28.1, unit: '°C', threshold: 45, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(28.1, 'Temperature') },
      { id: 'S5', sensorName: 'Battery', currentValue: 11.4, unit: 'V', threshold: 11.5, status: 'Warning', timestamp: new Date().toISOString(), history: generateSensorHistory(11.4, 'Battery') },
      { id: 'S6', sensorName: 'Signal', currentValue: -88, unit: 'dBm', threshold: -90, status: 'Warning', timestamp: new Date().toISOString(), history: generateSensorHistory(-88, 'Signal') },
    ]
  },
  {
    id: 'V-103',
    name: 'Mountain Runner C3',
    route: 'EDB - DUB',
    flapStatus: 'Locked',
    healthScore: 88,
    alertLevel: 'Info',
    lastMaintenance: '2024-06-15',
    connectivity: 'Online',
    sensors: [
      { id: 'S1', sensorName: 'Flap Displacement', currentValue: 3.1, unit: 'cm', threshold: 10, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(3.1, 'Flap Displacement') },
      { id: 'S2', sensorName: 'Vibration', currentValue: 1.2, unit: 'g', threshold: 5, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(1.2, 'Vibration') },
      { id: 'S3', sensorName: 'Load/Weight', currentValue: 285, unit: 'kg', threshold: 500, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(285, 'Load/Weight') },
      { id: 'S4', sensorName: 'Temperature', currentValue: 21.8, unit: '°C', threshold: 45, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(21.8, 'Temperature') },
      { id: 'S5', sensorName: 'Battery', currentValue: 12.8, unit: 'V', threshold: 11.5, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(12.8, 'Battery') },
      { id: 'S6', sensorName: 'Signal', currentValue: -58, unit: 'dBm', threshold: -90, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(-58, 'Signal') },
    ]
  },
  {
    id: 'V-104',
    name: 'Desert Hawk D7',
    route: 'CAI - ALE',
    flapStatus: 'Locked',
    healthScore: 56,
    alertLevel: 'Critical',
    lastMaintenance: '2024-02-01',
    connectivity: 'Offline',
    sensors: [
      { id: 'S1', sensorName: 'Flap Displacement', currentValue: 12.7, unit: 'cm', threshold: 10, status: 'Critical', timestamp: new Date().toISOString(), history: generateSensorHistory(12.7, 'Flap Displacement') },
      { id: 'S2', sensorName: 'Vibration', currentValue: 7.8, unit: 'g', threshold: 5, status: 'Critical', timestamp: new Date().toISOString(), history: generateSensorHistory(7.8, 'Vibration') },
      { id: 'S3', sensorName: 'Load/Weight', currentValue: 480, unit: 'kg', threshold: 500, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(480, 'Load/Weight') },
      { id: 'S4', sensorName: 'Temperature', currentValue: 42.3, unit: '°C', threshold: 45, status: 'Warning', timestamp: new Date().toISOString(), history: generateSensorHistory(42.3, 'Temperature') },
      { id: 'S5', sensorName: 'Battery', currentValue: 10.9, unit: 'V', threshold: 11.5, status: 'Critical', timestamp: new Date().toISOString(), history: generateSensorHistory(10.9, 'Battery') },
      { id: 'S6', sensorName: 'Signal', currentValue: -95, unit: 'dBm', threshold: -90, status: 'Critical', timestamp: new Date().toISOString(), history: generateSensorHistory(-95, 'Signal') },
    ]
  },
  {
    id: 'V-105',
    name: 'Arctic Explorer E2',
    route: 'RVK - KOP',
    flapStatus: 'Locked',
    healthScore: 79,
    alertLevel: 'Warning',
    lastMaintenance: '2024-04-08',
    connectivity: 'Online',
    sensors: [
      { id: 'S1', sensorName: 'Flap Displacement', currentValue: 8.9, unit: 'cm', threshold: 10, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(8.9, 'Flap Displacement') },
      { id: 'S2', sensorName: 'Vibration', currentValue: 4.3, unit: 'g', threshold: 5, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(4.3, 'Vibration') },
      { id: 'S3', sensorName: 'Load/Weight', currentValue: 375, unit: 'kg', threshold: 500, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(375, 'Load/Weight') },
      { id: 'S4', sensorName: 'Temperature', currentValue: 18.2, unit: '°C', threshold: 45, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(18.2, 'Temperature') },
      { id: 'S5', sensorName: 'Battery', currentValue: 12.1, unit: 'V', threshold: 11.5, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(12.1, 'Battery') },
      { id: 'S6', sensorName: 'Signal', currentValue: -72, unit: 'dBm', threshold: -90, status: 'Normal', timestamp: new Date().toISOString(), history: generateSensorHistory(-72, 'Signal') },
    ]
  }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'AL-901',
    vehicleId: 'V-102',
    sensorId: 'S1',
    type: 'Flap Displacement Too High',
    severity: 'Warning',
    message: 'Flap displacement exceeded safe limit of 10cm. Immediate inspection required.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    resolved: false
  },
  {
    id: 'AL-902',
    vehicleId: 'V-102',
    sensorId: 'S2',
    type: 'Abnormal Vibration',
    severity: 'Warning',
    message: 'High vibration detected in rear compartment. Possible bearing wear.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    resolved: false
  },
  {
    id: 'AL-903',
    vehicleId: 'V-104',
    sensorId: 'S1',
    type: 'Critical Flap Displacement',
    severity: 'Critical',
    message: 'CRITICAL: Flap displacement at 12.7cm. Emergency maintenance required immediately.',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    resolved: false
  },
  {
    id: 'AL-904',
    vehicleId: 'V-104',
    sensorId: 'S5',
    type: 'Critical Battery Voltage',
    severity: 'Critical',
    message: 'CRITICAL: Battery voltage below safe threshold. Risk of system shutdown.',
    timestamp: new Date(Date.now() - 2700000).toISOString(),
    resolved: false
  },
  {
    id: 'AL-905',
    vehicleId: 'V-101',
    sensorId: 'S6',
    type: 'Signal Strength Warning',
    severity: 'Info',
    message: 'Signal strength slightly below optimal. Performance may degrade in dead zones.',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    resolved: true
  },
];

export const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'MR-001',
    vehicleId: 'V-101',
    date: '2024-05-12',
    technician: 'John Smith',
    notes: 'Standard diagnostic check. Flap hinges lubricated. Battery tested OK.',
    cost: 150,
    replacedComponents: ['Lubricant', 'Seal Clip'],
    nextDate: '2024-11-12',
    status: 'Completed'
  },
  {
    id: 'MR-002',
    vehicleId: 'V-102',
    date: '2024-03-20',
    technician: 'Sarah Johnson',
    notes: 'Vibration dampeners replaced. New pressure sensors installed.',
    cost: 450,
    replacedComponents: ['Vibration Dampeners (x2)', 'Pressure Sensor (S2)', 'Wiring Harness'],
    nextDate: '2024-09-20',
    status: 'Completed'
  },
  {
    id: 'MR-003',
    vehicleId: 'V-103',
    date: '2024-06-15',
    technician: 'Michael Chen',
    notes: 'Full system overhaul. All sensors recalibrated. Software updated to v2.1.3.',
    cost: 800,
    replacedComponents: ['Firmware Update', 'Sensor Calibration Kit', 'Battery Module'],
    nextDate: '2024-12-15',
    status: 'Completed'
  },
  {
    id: 'MR-004',
    vehicleId: 'V-104',
    date: '2024-02-01',
    technician: 'Robert Martinez',
    notes: 'Emergency repair: Flap bearing replacement. Critical moisture damage found.',
    cost: 1200,
    replacedComponents: ['Flap Bearing Assembly', 'Seal Kit', 'Protective Housing', 'Desiccant Pack'],
    nextDate: '2024-08-01',
    status: 'Completed'
  },
  {
    id: 'MR-005',
    vehicleId: 'V-105',
    date: '2024-04-08',
    technician: 'Emma Wilson',
    notes: 'Routine maintenance. Signal antenna repositioned for better coverage.',
    cost: 200,
    replacedComponents: ['Antenna Bracket', 'Coaxial Cable'],
    nextDate: '2024-10-08',
    status: 'Completed'
  },
  {
    id: 'MR-006',
    vehicleId: 'V-104',
    date: '2026-04-20',
    technician: 'James Thompson',
    notes: 'URGENT: Pending complete system replacement. Battery and flap mechanism critical.',
    cost: 2500,
    replacedComponents: ['Complete Sensor Suite', 'Battery Pack', 'Flap Mechanism', 'Control Board'],
    nextDate: '2026-10-20',
    status: 'Pending'
  }
];

// Helper function to generate sensor reading history
function generateSensorHistory(baseValue: number, sensorName: string): { value: number; time: string }[] {
  const history = [];
  for (let i = 9; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * (baseValue * 0.1);
    const historicalValue = Number((baseValue + variation).toFixed(2));
    const time = new Date(Date.now() - i * 3000).toLocaleTimeString();
    history.push({ value: historicalValue, time });
  }
  return history;
}

export function simulateSensorReading(sensor: SensorReading): SensorReading {
  const jitter = (Math.random() - 0.5) * (sensor.currentValue * 0.05);
  const newValue = Number((sensor.currentValue + jitter).toFixed(2));
  
  let status = sensor.status;
  if (sensor.sensorName === 'Flap Displacement') {
    status = newValue > sensor.threshold ? 'Warning' : 'Normal';
  } else if (sensor.sensorName === 'Signal') {
    status = newValue < sensor.threshold ? 'Warning' : 'Normal';
  } else if (newValue > sensor.threshold) {
    status = 'Warning';
  } else {
    status = 'Normal';
  }

  const newHistory = [...sensor.history, { value: newValue, time: new Date().toLocaleTimeString() }].slice(-10);
  
  return {
    ...sensor,
    currentValue: newValue,
    status,
    timestamp: new Date().toISOString(),
    history: newHistory
  };
}
