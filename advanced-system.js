import { Agent, run } from '@openai/agents';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is required. Please set it in your .env file.');
  process.exit(1);
}

// Enhanced manufacturing data with real-time simulation
class ManufacturingDataSimulator {
  constructor() {
    this.baseData = {
      plantId: process.env.MANUFACTURING_PLANT_ID || 'PLANT_001',
      lineId: process.env.PRODUCTION_LINE_ID || 'LINE_A',
      timestamp: new Date().toISOString(),
    };
  }

  // Generate realistic sensor data with noise
  generateSensorData() {
    const baseTemp = 185.5;
    const basePressure = 2.1;
    const baseVibration = 0.8;
    const baseEnergy = 85.2;

    return {
      temperature: Array.from({ length: 10 }, () => 
        baseTemp + (Math.random() - 0.5) * 4
      ),
      pressure: Array.from({ length: 10 }, () => 
        basePressure + (Math.random() - 0.5) * 0.2
      ),
      vibration: Array.from({ length: 10 }, () => 
        baseVibration + (Math.random() - 0.5) * 0.3
      ),
      energyConsumption: Array.from({ length: 10 }, () => 
        baseEnergy + (Math.random() - 0.5) * 5
      ),
      humidity: Array.from({ length: 10 }, () => 
        45 + (Math.random() - 0.5) * 10
      ),
      airQuality: Array.from({ length: 10 }, () => 
        85 + (Math.random() - 0.5) * 15
      )
    };
  }

  // Calculate derived metrics
  calculateMetrics(sensorData) {
    const avgTemp = sensorData.temperature.reduce((a, b) => a + b, 0) / sensorData.temperature.length;
    const avgPressure = sensorData.pressure.reduce((a, b) => a + b, 0) / sensorData.pressure.length;
    const avgVibration = sensorData.vibration.reduce((a, b) => a + b, 0) / sensorData.vibration.length;
    const avgEnergy = sensorData.energyConsumption.reduce((a, b) => a + b, 0) / sensorData.energyConsumption.length;

    // Calculate efficiency score based on optimal ranges
    const tempEfficiency = Math.max(0, 100 - Math.abs(avgTemp - 185.5) * 10);
    const pressureEfficiency = Math.max(0, 100 - Math.abs(avgPressure - 2.1) * 50);
    const vibrationEfficiency = Math.max(0, 100 - avgVibration * 50);
    const energyEfficiency = Math.max(0, 100 - (avgEnergy - 85) * 2);

    const overallEfficiency = (tempEfficiency + pressureEfficiency + vibrationEfficiency + energyEfficiency) / 4;

    return {
      currentProduction: {
        unitsPerHour: 150 + (overallEfficiency - 85) * 2,
        qualityScore: Math.min(100, 98.5 + (overallEfficiency - 85) * 0.1),
        energyConsumption: avgEnergy,
        temperature: avgTemp,
        pressure: avgPressure,
        vibration: avgVibration,
        efficiency: overallEfficiency
      },
      qualityMetrics: {
        defectRate: Math.max(0.1, 1.5 - (overallEfficiency - 85) * 0.02),
        customerReturns: Math.max(0.05, 0.3 - (overallEfficiency - 85) * 0.005),
        onTimeDelivery: Math.min(100, 98.2 + (overallEfficiency - 85) * 0.05)
      },
      complianceStatus: {
        safetyAudit: overallEfficiency > 90 ? 'PASS' : overallEfficiency > 80 ? 'WARNING' : 'FAIL',
        environmentalCompliance: avgEnergy < 90 ? 'PASS' : 'WARNING',
        qualityCertification: overallEfficiency > 85 ? 'VALID' : 'REVIEW_REQUIRED',
        lastInspection: new Date().toISOString().split('T')[0]
      }
    };
  }

  getCurrentData() {
    const sensorData = this.generateSensorData();
    const metrics = this.calculateMetrics(sensorData);
    
    return {
      ...this.baseData,
      sensorData,
      ...metrics,
      timestamp: new Date().toISOString()
    };
  }
}

// Enhanced Content Agent with detailed reporting capabilities
const contentAgent = new Agent({
  name: 'ContentAgent',
  instructions: `You are a Content Agent responsible for generating comprehensive production reports and ensuring compliance documentation is up to date.

Your responsibilities include:
- Generate detailed production reports with visual indicators
- Ensure all compliance documentation is current and accurate
- Create audit trails for quality control processes
- Document safety procedures and incident reports
- Maintain regulatory compliance records
- Provide trend analysis and historical comparisons

When generating reports, include:
- Production metrics and KPIs with trend analysis
- Quality control data with statistical analysis
- Safety incident reports with risk assessment
- Compliance status with regulatory requirements
- Recommendations for improvement with priority levels
- Visual indicators (✅ PASS, ⚠️ WARNING, ❌ FAIL)

Format your responses with clear sections, bullet points, and actionable insights.
Always include a summary section with key findings and recommendations.`,
});

// Enhanced Decision Agent with predictive analytics
const decisionAgent = new Agent({
  name: 'DecisionAgent',
  instructions: `You are a Decision Agent responsible for analyzing sensor data and optimizing production schedules using advanced analytics.

Your responsibilities include:
- Analyze real-time sensor data with trend analysis
- Optimize production schedules based on current conditions
- Identify bottlenecks and suggest improvements
- Monitor equipment performance and predict maintenance needs
- Adjust production parameters for maximum efficiency
- Provide predictive analytics for future optimization

When making decisions, consider:
- Current production capacity and utilization rates
- Equipment status and health indicators
- Quality metrics and defect analysis
- Energy consumption and efficiency trends
- Resource availability and constraints
- Market demand and production targets
- Predictive maintenance requirements

Provide specific, actionable recommendations with:
- Clear reasoning and data analysis
- Priority levels (HIGH, MEDIUM, LOW)
- Expected impact and timeline
- Risk assessment and mitigation strategies
- Cost-benefit analysis where applicable

Use visual indicators for quick assessment:
- 🟢 OPTIMAL: Parameters within optimal range
- 🟡 WARNING: Parameters approaching limits
- 🔴 CRITICAL: Parameters outside safe range
- 📈 IMPROVING: Positive trend detected
- 📉 DECLINING: Negative trend detected`,
});

// Enhanced Hybrid Agent with conflict resolution and escalation
const hybridAgent = new Agent({
  name: 'HybridAgent',
  instructions: `You are a Hybrid Agent responsible for coordinating between content and decision agents, resolving conflicts, and managing system-wide optimization.

Your responsibilities include:
- Coordinate between Content and Decision agents effectively
- Resolve conflicts between reporting requirements and production optimization
- Escalate critical issues to human operators with clear protocols
- Ensure system-wide consistency and efficiency
- Monitor overall system performance and health
- Facilitate communication between different agent types
- Implement continuous improvement strategies

When coordinating:
- Prioritize safety and compliance over pure efficiency
- Balance reporting needs with production optimization
- Identify when human intervention is required
- Maintain system stability and reliability
- Provide clear escalation protocols with severity levels
- Implement feedback loops for continuous improvement

Conflict Resolution Protocol:
1. CRITICAL (🔴): Immediate human intervention required
2. HIGH (🟠): Automated resolution with human notification
3. MEDIUM (🟡): Automated resolution with monitoring
4. LOW (🟢): Automated resolution

Always consider the broader impact of decisions on the entire manufacturing system and provide comprehensive coordination reports.`,
});

// Real-time monitoring system
class ManufacturingMonitor {
  constructor() {
    this.dataSimulator = new ManufacturingDataSimulator();
    this.history = [];
    this.alerts = [];
  }

  // Monitor system health
  checkSystemHealth(data) {
    const alerts = [];
    
    // Check temperature stability
    const tempVariance = Math.max(...data.sensorData.temperature) - Math.min(...data.sensorData.temperature);
    if (tempVariance > 3) {
      alerts.push({
        level: 'WARNING',
        message: `Temperature variance (${tempVariance.toFixed(1)}°C) exceeds normal range`,
        metric: 'temperature',
        value: tempVariance
      });
    }

    // Check energy efficiency
    const avgEnergy = data.currentProduction.energyConsumption;
    if (avgEnergy > 90) {
      alerts.push({
        level: 'CRITICAL',
        message: `Energy consumption (${avgEnergy.toFixed(1)} kWh) is above optimal range`,
        metric: 'energy',
        value: avgEnergy
      });
    }

    // Check quality metrics
    if (data.qualityMetrics.defectRate > 2) {
      alerts.push({
        level: 'HIGH',
        message: `Defect rate (${data.qualityMetrics.defectRate}%) is above target`,
        metric: 'quality',
        value: data.qualityMetrics.defectRate
      });
    }

    return alerts;
  }

  // Generate monitoring report
  generateMonitoringReport(data, alerts) {
    const healthScore = 100 - (alerts.length * 10);
    
    return {
      timestamp: data.timestamp,
      plantId: data.plantId,
      lineId: data.lineId,
      healthScore: Math.max(0, healthScore),
      alerts: alerts,
      metrics: {
        efficiency: data.currentProduction.efficiency,
        quality: data.currentProduction.qualityScore,
        energy: data.currentProduction.energyConsumption,
        production: data.currentProduction.unitsPerHour
      }
    };
  }
}

// Advanced manufacturing task with real-time data
async function runAdvancedManufacturingOptimization() {
  console.log('🏭 Starting Advanced Multi-Agent Manufacturing Optimization System\n');
  
  const monitor = new ManufacturingMonitor();
  const dataSimulator = new ManufacturingDataSimulator();
  
  // Generate current manufacturing data
  const currentData = dataSimulator.getCurrentData();
  const alerts = monitor.checkSystemHealth(currentData);
  const monitoringReport = monitor.generateMonitoringReport(currentData, alerts);

  console.log(`Plant: ${currentData.plantId}`);
  console.log(`Production Line: ${currentData.lineId}`);
  console.log(`System Health Score: ${monitoringReport.healthScore}%`);
  console.log(`Active Alerts: ${alerts.length}\n`);

  // Display alerts if any
  if (alerts.length > 0) {
    console.log('🚨 ACTIVE ALERTS:');
    alerts.forEach(alert => {
      const icon = alert.level === 'CRITICAL' ? '🔴' : alert.level === 'HIGH' ? '🟠' : '🟡';
      console.log(`${icon} ${alert.level}: ${alert.message}`);
    });
    console.log('');
  }

  // Enhanced manufacturing task
  const advancedManufacturingTask = `
Advanced Manufacturing Task for ${currentData.plantId} - ${currentData.lineId}:

SYSTEM STATUS:
- Health Score: ${monitoringReport.healthScore}%
- Active Alerts: ${alerts.length}
- Current Efficiency: ${currentData.currentProduction.efficiency.toFixed(1)}%
- Quality Score: ${currentData.currentProduction.qualityScore.toFixed(1)}%

REAL-TIME DATA:
- Sensor Readings: ${JSON.stringify(currentData.sensorData, null, 2)}
- Production Metrics: ${JSON.stringify(currentData.currentProduction, null, 2)}
- Quality Metrics: ${JSON.stringify(currentData.qualityMetrics, null, 2)}
- Compliance Status: ${JSON.stringify(currentData.complianceStatus, null, 2)}

TASKS:
1. Generate a comprehensive compliance report including:
   - Quality metrics and defect analysis with trend analysis
   - Safety compliance status with risk assessment
   - Environmental impact assessment with recommendations
   - Regulatory compliance verification with audit trails

2. Analyze real-time sensor data and provide optimization recommendations:
   - Identify performance bottlenecks and improvement opportunities
   - Suggest production schedule adjustments based on current conditions
   - Provide predictive maintenance recommendations
   - Optimize energy consumption and efficiency

3. Coordinate system-wide optimization:
   - Resolve any conflicts between reporting and optimization requirements
   - Provide escalation protocols for critical issues
   - Ensure system stability and reliability
   - Implement continuous improvement strategies

4. Provide actionable recommendations for:
   - Production efficiency improvements with ROI analysis
   - Quality enhancement strategies with implementation timeline
   - Safety protocol updates with risk mitigation
   - Compliance maintenance with regulatory requirements
`;

  try {
    // Run Content Agent for reporting and compliance
    console.log('📊 Content Agent: Generating comprehensive compliance reports...');
    const contentResult = await run(contentAgent, advancedManufacturingTask);
    console.log('✅ Content Agent completed\n');

    // Run Decision Agent for optimization
    console.log('⚙️ Decision Agent: Analyzing sensor data and optimizing production...');
    const decisionResult = await run(decisionAgent, advancedManufacturingTask);
    console.log('✅ Decision Agent completed\n');

    // Run Hybrid Agent for coordination
    console.log('🤝 Hybrid Agent: Coordinating and resolving conflicts...');
    const hybridResult = await run(hybridAgent, advancedManufacturingTask);
    console.log('✅ Hybrid Agent completed\n');

    // Display comprehensive results
    console.log('📋 ADVANCED AGENT OUTPUTS:');
    console.log('='.repeat(60));
    
    console.log('\n📊 CONTENT AGENT OUTPUT:');
    console.log('-'.repeat(40));
    console.log(contentResult.finalOutput);
    
    console.log('\n⚙️ DECISION AGENT OUTPUT:');
    console.log('-'.repeat(40));
    console.log(decisionResult.finalOutput);
    
    console.log('\n🤝 HYBRID AGENT OUTPUT:');
    console.log('-'.repeat(40));
    console.log(hybridResult.finalOutput);

    console.log('\n📈 SYSTEM MONITORING SUMMARY:');
    console.log('-'.repeat(40));
    console.log(`Health Score: ${monitoringReport.healthScore}%`);
    console.log(`Efficiency: ${monitoringReport.metrics.efficiency.toFixed(1)}%`);
    console.log(`Quality: ${monitoringReport.metrics.quality.toFixed(1)}%`);
    console.log(`Energy Consumption: ${monitoringReport.metrics.energy.toFixed(1)} kWh`);
    console.log(`Production Rate: ${monitoringReport.metrics.production.toFixed(1)} units/hour`);

    console.log('\n🎯 Advanced Multi-Agent System Execution Complete!');

  } catch (error) {
    console.error('❌ Error in advanced multi-agent system:', error.message);
    process.exit(1);
  }
}

// Run the advanced system
runAdvancedManufacturingOptimization(); 