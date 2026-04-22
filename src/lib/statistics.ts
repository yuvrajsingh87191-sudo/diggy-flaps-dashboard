// Statistical Analysis Utilities for DBMS Dashboard
export interface StatisticalMetrics {
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
  confidenceInterval95: [number, number];
}

export interface CorrelationMatrix {
  [key: string]: { [key: string]: number };
}

export function calculateStats(values: number[]): StatisticalMetrics {
  if (values.length === 0) {
    return {
      mean: 0,
      median: 0,
      stdDev: 0,
      min: 0,
      max: 0,
      q1: 0,
      q3: 0,
      iqr: 0,
      skewness: 0,
      kurtosis: 0,
      confidenceInterval95: [0, 0],
    };
  }

  const sorted = [...values].sort((a, b) => a - b);
  const n = values.length;
  
  // Mean
  const mean = values.reduce((a, b) => a + b, 0) / n;
  
  // Median
  const median = n % 2 === 0
    ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
    : sorted[Math.floor(n / 2)];
  
  // Standard Deviation
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  
  // Quartiles
  const q1 = calculateQuartile(sorted, 0.25);
  const q3 = calculateQuartile(sorted, 0.75);
  const iqr = q3 - q1;
  
  // Min/Max
  const min = sorted[0];
  const max = sorted[n - 1];
  
  // Skewness
  const skewness = calculateSkewness(values, mean, stdDev);
  
  // Kurtosis
  const kurtosis = calculateKurtosis(values, mean, stdDev);
  
  // 95% Confidence Interval
  const marginOfError = 1.96 * (stdDev / Math.sqrt(n));
  const ci95: [number, number] = [
    Number((mean - marginOfError).toFixed(2)),
    Number((mean + marginOfError).toFixed(2)),
  ];

  return {
    mean: Number(mean.toFixed(2)),
    median: Number(median.toFixed(2)),
    stdDev: Number(stdDev.toFixed(2)),
    min: Number(min.toFixed(2)),
    max: Number(max.toFixed(2)),
    q1: Number(q1.toFixed(2)),
    q3: Number(q3.toFixed(2)),
    iqr: Number(iqr.toFixed(2)),
    skewness: Number(skewness.toFixed(3)),
    kurtosis: Number(kurtosis.toFixed(3)),
    confidenceInterval95: ci95,
  };
}

function calculateQuartile(sorted: number[], p: number): number {
  const index = p * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  
  if (lower === upper) {
    return sorted[lower];
  }
  
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function calculateSkewness(values: number[], mean: number, stdDev: number): number {
  const n = values.length;
  if (stdDev === 0) return 0;
  
  const cubedDiffs = values.map(val => Math.pow((val - mean) / stdDev, 3));
  return cubedDiffs.reduce((a, b) => a + b, 0) / n;
}

function calculateKurtosis(values: number[], mean: number, stdDev: number): number {
  const n = values.length;
  if (stdDev === 0) return 0;
  
  const fourthPower = values.map(val => Math.pow((val - mean) / stdDev, 4));
  return (fourthPower.reduce((a, b) => a + b, 0) / n) - 3;
}

export function calculateZScore(value: number, mean: number, stdDev: number): number {
  if (stdDev === 0) return 0;
  return Number(((value - mean) / stdDev).toFixed(3));
}

export function predictFailureProbability(
  sensorValues: number[],
  threshold: number
): { probability: number; riskLevel: 'Low' | 'Medium' | 'High' | 'Critical' } {
  const stats = calculateStats(sensorValues);
  const zScore = calculateZScore(threshold, stats.mean, stats.stdDev);
  
  // Using normal distribution approximation
  const probability = Math.min(1, Math.exp(-zScore * zScore / 2));
  
  let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
  if (probability > 0.7) riskLevel = 'Critical';
  else if (probability > 0.5) riskLevel = 'High';
  else if (probability > 0.3) riskLevel = 'Medium';
  
  return {
    probability: Number((probability * 100).toFixed(2)),
    riskLevel,
  };
}

// Database Query Statistics
export interface QueryStats {
  totalQueries: number;
  averageResponseTime: number; // ms
  slowQueries: number;
  cacheHitRate: number; // percentage
  mostFrequentQuery: string;
}

export function generateDatabaseStats(): QueryStats {
  return {
    totalQueries: Math.floor(50000 + Math.random() * 100000),
    averageResponseTime: Math.floor(8 + Math.random() * 12),
    slowQueries: Math.floor(5 + Math.random() * 15),
    cacheHitRate: 85 + Math.random() * 10,
    mostFrequentQuery: 'SELECT * FROM Sensor_Reading WHERE timestamp > NOW() - INTERVAL 1 HOUR',
  };
}

// Anomaly Detection
export interface Anomaly {
  timestamp: string;
  value: number;
  type: 'Outlier' | 'Trend' | 'Seasonal';
  severity: 'Low' | 'Medium' | 'High';
}

export function detectAnomalies(values: number[], sensitivityFactor = 2): Anomaly[] {
  const stats = calculateStats(values);
  const anomalies: Anomaly[] = [];
  
  values.forEach((value, index) => {
    const zScore = Math.abs(calculateZScore(value, stats.mean, stats.stdDev));
    
    if (zScore > sensitivityFactor) {
      anomalies.push({
        timestamp: new Date(Date.now() - (values.length - index) * 3000).toISOString(),
        value,
        type: zScore > 3 ? 'Outlier' : 'Trend',
        severity: zScore > 3 ? 'High' : (zScore > sensitivityFactor ? 'Medium' : 'Low'),
      });
    }
  });
  
  return anomalies;
}

// Hypothesis Testing (t-test)
export function performTTest(
  group1: number[],
  group2: number[]
): { tStatistic: number; pValue: number; significant: boolean } {
  const mean1 = group1.reduce((a, b) => a + b, 0) / group1.length;
  const mean2 = group2.reduce((a, b) => a + b, 0) / group2.length;
  
  const var1 = group1.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) / (group1.length - 1);
  const var2 = group2.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0) / (group2.length - 1);
  
  const pooledStdErr = Math.sqrt(var1 / group1.length + var2 / group2.length);
  const tStatistic = (mean1 - mean2) / pooledStdErr;
  
  // Simplified p-value estimation (two-tailed)
  const pValue = 2 * (1 - normalCDF(Math.abs(tStatistic)));
  
  return {
    tStatistic: Number(tStatistic.toFixed(4)),
    pValue: Number(pValue.toFixed(4)),
    significant: pValue < 0.05,
  };
}

// Approximation of normal CDF
function normalCDF(z: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  const abz = Math.abs(z) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * abz);
  const y = 1.0 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-abz * abz));

  return 0.5 * (1.0 + sign * y);
}

// Linear Regression for trend analysis
export interface RegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
  prediction: number; // next value
}

export function linearRegression(values: number[]): RegressionResult {
  const n = values.length;
  const xValues = Array.from({ length: n }, (_, i) => i);
  const xMean = xValues.reduce((a, b) => a + b, 0) / n;
  const yMean = values.reduce((a, b) => a + b, 0) / n;

  const numerator = xValues.reduce((sum, x, i) => sum + (x - xMean) * (values[i] - yMean), 0);
  const denominator = xValues.reduce((sum, x) => sum + Math.pow(x - xMean, 2), 0);

  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;

  const yPredicted = xValues.map(x => intercept + slope * x);
  const ssTotal = values.reduce((sum, y) => sum + Math.pow(y - yMean, 2), 0);
  const ssResidual = values.reduce((sum, y, i) => sum + Math.pow(y - yPredicted[i], 2), 0);
  const rSquared = 1 - ssResidual / ssTotal;

  const nextPrediction = intercept + slope * n;

  return {
    slope: Number(slope.toFixed(4)),
    intercept: Number(intercept.toFixed(4)),
    rSquared: Number(rSquared.toFixed(4)),
    prediction: Number(nextPrediction.toFixed(2)),
  };
}
