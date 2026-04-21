import { Vehicle, Alert, MaintenanceRecord, SensorReading } from './types';

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
      { id: 'S1', sensorName: 'Flap Displacement', currentValue: 2.4, unit: 'cm', threshold: 10, status: 'Normal', timestamp: new Date().toISOString(), history: [] },
      { id: 'S2', sensorName: 'Vibration', currentValue: 0.8, unit: 'g', threshold: 5, status: 'Normal', timestamp: new Date().toISOString(), history: [] },
      { id: 'S3', sensorName: 'Load/Weight', currentValue: 320, unit: 'kg', threshold: 500, status: 'Normal', timestamp: new Date().toISOString(), history: [] },
      { id: 'S4', sensorName: 'Temperature', currentValue: 24.5, unit: '°C', threshold: 45, status: 'Normal', timestamp: new Date().toISOString(), history: [] },
      { id: 'S5', sensorName: 'Battery', currentValue: 12.6, unit: 'V', threshold: 11.5, status: 'Normal', timestamp: new Date().toISOString(), history: [] },
      { id: 'S6', sensorName: 'Signal', currentValue: -65, unit: 'dBm', threshold: -90, status: 'Normal', timestamp: new Date().toISOString(), history: [] },
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
      { id: 'S1', sensorName: 'Flap Displacement', currentValue: 11.2, unit: 'cm', threshold: 10, status: 'Warning', timestamp: new Date().toISOString(), history: [] },
      { id: 'S2', sensorName: 'Vibration', currentValue: 6.2, unit: 'g', threshold: 5, status: 'Warning', timestamp: new Date().toISOString(), history: [] },
      { id: 'S3', sensorName: 'Load/Weight', currentValue: 410, unit: 'kg', threshold: 500, status: 'Normal', timestamp: new Date().toISOString(), history: [] },
      { id: 'S4', sensorName: 'Temperature', currentValue: 28.1, unit: '°C', threshold: 45, status: 'Normal', timestamp: new Date().toISOString(), history: [] },
      { id: 'S5', sensorName: 'Battery', currentValue: 11.4, unit: 'V', threshold: 11.5, status: 'Warning', timestamp: new Date().toISOString(), history: [] },
      { id: 'S6', sensorName: 'Signal', currentValue: -88, unit: 'dBm', threshold: -90, status: 'Warning', timestamp: new Date().toISOString(), history: [] },
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
    message: 'Flap displacement exceeded safe limit of 10cm.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    resolved: false
  },
  {
    id: 'AL-902',
    vehicleId: 'V-102',
    sensorId: 'S2',
    type: 'Abnormal Vibration',
    severity: 'Warning',
    message: 'High vibration detected in rear compartment.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    resolved: false
  }
];

export const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'MR-001',
    vehicleId: 'V-101',
    date: '2024-05-12',
    technician: 'John Smith',
    notes: 'Standard diagnostic check. Flap hinges lubricated.',
    cost: 150,
    replacedComponents: ['Lubricant', 'Seal Clip'],
    nextDate: '2024-11-12',
    status: 'Completed'
  }
];

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
