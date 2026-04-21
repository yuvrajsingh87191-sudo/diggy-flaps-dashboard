"use client";

import { useState, useEffect } from 'react';
import { INITIAL_VEHICLES, simulateSensorReading } from './mock-data';
import { Vehicle } from './types';

export function useLiveSimulation() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => {
        const updatedSensors = vehicle.sensors.map(simulateSensorReading);
        
        // Dynamic health score logic
        const alertCount = updatedSensors.filter(s => s.status !== 'Normal').length;
        const newHealth = Math.max(0, 100 - (alertCount * 12));
        
        return {
          ...vehicle,
          sensors: updatedSensors,
          healthScore: newHealth,
          alertLevel: alertCount > 0 ? (alertCount > 2 ? 'Critical' : 'Warning') : 'Info'
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return vehicles;
}
