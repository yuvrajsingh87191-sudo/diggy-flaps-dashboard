'use server';
/**
 * @fileOverview A Genkit flow for generating a concise, natural language summary of a vehicle's
 * current failure risk, predictive maintenance needs, and key statistical insights for academic presentation.
 *
 * - predictiveAnalyticsSummary - A function that handles the generation of the predictive analytics summary.
 * - PredictiveAnalyticsSummaryInput - The input type for the predictiveAnalyticsSummary function.
 * - PredictiveAnalyticsSummaryOutput - The return type for the predictiveAnalyticsSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveAnalyticsSummaryInputSchema = z.object({
  vehicleId: z.string().describe('The unique identifier of the vehicle.'),
  failureProbabilityScore: z
    .number()
    .min(0)
    .max(1)
    .describe('The calculated probability of failure for the vehicle (0.0 to 1.0).'),
  failureRiskStatus: z
    .enum(['Low Risk', 'Medium Risk', 'High Risk'])
    .describe('The categorized failure risk status of the vehicle.'),
  maintenancePrediction: z
    .string()
    .describe('A natural language prediction regarding upcoming maintenance needs.'),
  anomalyDetectionSummary: z.string().describe('A summary of any detected anomalies in sensor readings.'),
  flapDisplacementTrend: z
    .string()
    .describe('A description of the trend in flap displacement over time.'),
  vibrationPatternAnalysis: z.string().describe('A summary of the vibration pattern analysis.'),
  overloadFrequency: z.string().describe('A summary of the frequency of overload events.'),
  statisticalInsights: z
    .string()
    .describe('Key statistical insights derived from the data, suitable for academic explanation.'),
});
export type PredictiveAnalyticsSummaryInput = z.infer<typeof PredictiveAnalyticsSummaryInputSchema>;

const PredictiveAnalyticsSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      "A concise, natural language summary of the vehicle's current failure risk, predictive maintenance needs, and key statistical insights for academic presentation."
    ),
});
export type PredictiveAnalyticsSummaryOutput = z.infer<typeof PredictiveAnalyticsSummaryOutputSchema>;

export async function predictiveAnalyticsSummary(
  input: PredictiveAnalyticsSummaryInput
): Promise<PredictiveAnalyticsSummaryOutput> {
  return predictiveAnalyticsSummaryFlow(input);
}

const predictiveAnalyticsSummaryPrompt = ai.definePrompt({
  name: 'predictiveAnalyticsSummaryPrompt',
  input: {schema: PredictiveAnalyticsSummaryInputSchema},
  output: {schema: PredictiveAnalyticsSummaryOutputSchema},
  prompt: `You are an expert analyst for the DIGGI FLAPS smart vehicle monitoring system. Your task is to generate a concise, professional, and natural language summary of a vehicle's current failure risk, predictive maintenance needs, and key statistical insights. This summary is intended for an academic presentation (viva and system demonstration) to effectively explain the system's advanced capabilities.

Synthesize the provided data into a clear, compelling, and insightful narrative. Focus on demonstrating the system's ability to detect, predict, and inform maintenance.

Vehicle ID: {{{vehicleId}}}

Current Failure Risk Status: {{{failureRiskStatus}}} (Failure Probability Score: {{failureProbabilityScore}})

Predictive Maintenance Needs:
- {{{maintenancePrediction}}}
- Anomaly Detection Summary: {{{anomalyDetectionSummary}}}

Key Statistical Insights:
- Flap Displacement Trend: {{{flapDisplacementTrend}}}
- Vibration Pattern Analysis: {{{vibrationPatternAnalysis}}}
- Overload Frequency: {{{overloadFrequency}}}
- Comprehensive Statistical Insights: {{{statisticalInsights}}}

Based on this information, provide a concise summary (around 150-200 words) that highlights the most critical findings, the vehicle's overall risk profile, and actionable insights for maintenance planning. This summary should clearly articulate the predictive power of the DIGGI FLAPS system.`,
});

const predictiveAnalyticsSummaryFlow = ai.defineFlow(
  {
    name: 'predictiveAnalyticsSummaryFlow',
    inputSchema: PredictiveAnalyticsSummaryInputSchema,
    outputSchema: PredictiveAnalyticsSummaryOutputSchema,
  },
  async input => {
    const {output} = await predictiveAnalyticsSummaryPrompt(input);
    return output!;
  }
);
