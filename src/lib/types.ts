export type Severity = 'Info' | 'Warning' | 'Critical';

export interface SensorReading {
  id: string;
  sensorName: string;
  currentValue: number;
  unit: string;
  threshold: number;
  status: 'Normal' | 'Warning' | 'Critical';
  timestamp: string;
  history: { value: number; time: string }[];
}

export interface Vehicle {
  id: string;
  name: string;
  route: string;
  flapStatus: 'Locked' | 'Unlocked' | 'Tampered';
  healthScore: number;
  alertLevel: Severity;
  lastMaintenance: string;
  connectivity: 'Online' | 'Offline' | 'Weak';
  sensors: SensorReading[];
}

export interface Alert {
  id: string;
  vehicleId: string;
  sensorId: string;
  type: string;
  severity: Severity;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  technician: string;
  notes: string;
  cost: number;
  replacedComponents: string[];
  nextDate: string;
  status: 'Completed' | 'Pending' | 'Scheduled';
}
