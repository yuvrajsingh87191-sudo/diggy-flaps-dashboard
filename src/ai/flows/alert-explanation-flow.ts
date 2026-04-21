'use server';
/**
 * @fileOverview Provides an AI-generated explanation for vehicle alerts,
 * including likely root causes and immediate impacts based on sensor data.
 *
 * - alertExplanation - A function that generates an explanation for a given alert.
 * - AlertExplanationInput - The input type for the alertExplanation function.
 * - AlertExplanationOutput - The return type for the alertExplanation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SensorReadingSchema = z.object({
  sensorName: z.string().describe('The name of the sensor (e.g., Flap Displacement Sensor, Vibration Sensor).'),
  currentValue: z.number().describe('The current value reported by the sensor.'),
  unit: z.string().describe('The unit of measurement for the sensor value (e.g., cm, g, kg, °C, %, ppm, V, dBm).'),
  threshold: z.number().describe('The threshold value that was crossed to trigger the alert.'),
  status: z.string().describe('Describes how the current value relates to the threshold (e.g., Above Threshold, Below Threshold).'),
});

const AlertExplanationInputSchema = z.object({
  alertType: z.string().describe('A brief description of the alert type (e.g., "Flap Displacement Too High", "Abnormal Vibration").'),
  severity: z.enum(['Info', 'Warning', 'Critical']).describe('The severity level of the alert.'),
  vehicleId: z.string().describe('The unique identifier for the vehicle.'),
  timestamp: z.string().datetime().describe('The ISO 8601 timestamp when the alert occurred.'),
  sensorReadings: z.array(SensorReadingSchema).describe('An array of relevant sensor readings that contributed to the alert.'),
});
export type AlertExplanationInput = z.infer<typeof AlertExplanationInputSchema>;

const AlertExplanationOutputSchema = z.object({
  explanation: z.string().describe('A clear, concise explanation of what the alert signifies.'),
  rootCause: z.string().describe('The most likely root cause of the alert, based on the provided sensor data patterns.'),
  immediateImpact: z.string().describe('Potential immediate impacts on vehicle operation, safety, or maintenance needs.'),
});
export type AlertExplanationOutput = z.infer<typeof AlertExplanationOutputSchema>;

export async function alertExplanation(input: AlertExplanationInput): Promise<AlertExplanationOutput> {
  return alertExplanationFlow(input);
}

const alertExplanationPrompt = ai.definePrompt({
  name: 'alertExplanationPrompt',
  input: { schema: AlertExplanationInputSchema },
  output: { schema: AlertExplanationOutputSchema },
  prompt: `You are an expert vehicle compartment monitoring and predictive maintenance system. Your task is to analyze an alert and the provided sensor readings to explain the alert, identify the most likely root cause, and describe the potential immediate impacts.

Alert Details:
- Type: {{{alertType}}}
- Severity: {{{severity}}}
- Vehicle ID: {{{vehicleId}}}
- Timestamp: {{{timestamp}}}

Relevant Sensor Readings:
{{#each sensorReadings}}
- Sensor: {{{sensorName}}}
  - Current Value: {{{currentValue}}} {{{unit}}}
  - Threshold: {{{threshold}}} {{{unit}}}
  - Status: {{{status}}}
{{/each}}

Please provide a detailed explanation covering the alert's significance, its probable root cause based on sensor patterns, and any immediate consequences for the vehicle's operation, safety, or maintenance schedule.`,
});

const alertExplanationFlow = ai.defineFlow(
  {
    name: 'alertExplanationFlow',
    inputSchema: AlertExplanationInputSchema,
    outputSchema: AlertExplanationOutputSchema,
  },
  async (input) => {
    const { output } = await alertExplanationPrompt(input);
    return output!;
  }
);
