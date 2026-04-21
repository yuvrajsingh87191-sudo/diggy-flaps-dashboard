# **App Name**: DIGGI FLAPS Dashboard

## Core Features:

- Real-time Sensor Monitoring: Display live, continuously updating sensor values, status, units, and mini-trend charts for each vehicle and individual compartment.
- AI-Powered Alert & Fault Detection: An intelligent tool to automatically generate and display alerts (Info, Warning, Critical) when sensor values cross defined thresholds. Store and display alert history with detailed context and severity.
- Predictive Analytics & Failure Risk Tool: Leverage statistical and machine learning insights (as specified in R requirements) to identify trends, perform anomaly detection, calculate failure probability scores, and provide maintenance predictions, presented visually through dynamic charts and a 'Failure Risk Prediction' tool.
- Comprehensive Dashboard Overview: Present key performance indicators and summaries such as total vehicles, active sensors, live alerts, critical flaps, and network status, with the ability to drill down into vehicle-specific details.
- Firebase Real-time Data Management: Integrate with Firebase Firestore for robust, scalable storage of all operational data (sensor readings, alerts, maintenance records) with a continuous streaming data simulator for demo purposes when hardware is unavailable.
- Network and Connectivity Insights: Visualize data flow, communication protocols (e.g., MQTT, TCP), latency status, and device connectivity states to demonstrate network performance and reliability in real-time.
- Dynamic Database & Maintenance Views: Provide interactive views of the underlying Firestore data structure for entities like Vehicle, Sensor, Alert, and Maintenance, allowing users to track maintenance history and view structured operational data.

## Style Guidelines:

- Dark theme: A deep, professional background color of '#121316', offering a modern and futuristic feel suitable for an IoT dashboard.
- Primary color: A strong, rich blue ('#2E50B8') used for interactive elements, highlights, and primary data visualization, contrasting effectively with the dark background.
- Accent color: A vibrant purple-blue ('#643CDD') to draw attention to critical actions and provide visual dynamism, ensuring clear distinction from the primary blue.
- Functional colors: Adhere to established coding for status indicators—Green ('#4CAF50') for normal, Yellow/Orange ('#FFC107') for warning, Red ('#F44336') for critical, and a distinct Light Blue ('#2196F3') for informational statuses.
- Headline font: 'Space Grotesk' (sans-serif) for titles and primary headers, conveying a techy, scientific, and futuristic ambiance. Body text font: 'Inter' (sans-serif) for all general text, ensuring high legibility and a clean, modern aesthetic across various content blocks.
- Modern, crisp line-style or filled icons, designed for a dark theme and consistent across all modules, to represent sensors, alerts, maintenance tasks, analytics, network status, and database entities clearly.
- A responsive, grid-based dashboard layout featuring a persistent sidebar navigation. Cards will incorporate subtle glassmorphism or soft shadow effects to create depth on the dark background, maintaining a premium and organized visual structure.
- Smooth and subtle animations will be utilized for real-time data updates, gauge transitions, chart interactions, and status changes, enhancing user engagement and providing clear feedback on live system behavior.