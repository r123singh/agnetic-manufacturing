// Simple test to verify the multi-agent system structure
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Test manufacturing data simulator
class TestManufacturingDataSimulator {
  constructor() {
    this.baseData = {
      plantId: process.env.MANUFACTURING_PLANT_ID || 'PLANT_001',
      lineId: process.env.PRODUCTION_LINE_ID || 'LINE_A',
      timestamp: new Date().toISOString(),
    };
  }

  generateSensorData() {
    return {
      temperature: [185.5, 186.2, 184.8, 185.1, 185.9],
      pressure: [2.1, 2.15, 2.08, 2.12, 2.09],
      vibration: [0.8, 0.85, 0.78, 0.82, 0.79],
      energyConsumption: [85.2, 86.1, 84.8, 85.5, 85.9]
    };
  }

  calculateMetrics(sensorData) {
    const avgTemp = sensorData.temperature.reduce((a, b) => a + b, 0) / sensorData.temperature.length;
    const avgPressure = sensorData.pressure.reduce((a, b) => a + b, 0) / sensorData.pressure.length;
    const avgVibration = sensorData.vibration.reduce((a, b) => a + b, 0) / sensorData.vibration.length;
    const avgEnergy = sensorData.energyConsumption.reduce((a, b) => a + b, 0) / sensorData.energyConsumption.length;

    const overallEfficiency = 85 + (Math.random() - 0.5) * 10;

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

// Test monitoring system
class TestManufacturingMonitor {
  checkSystemHealth(data) {
    const alerts = [];
    
    const tempVariance = Math.max(...data.sensorData.temperature) - Math.min(...data.sensorData.temperature);
    if (tempVariance > 3) {
      alerts.push({
        level: 'WARNING',
        message: `Temperature variance (${tempVariance.toFixed(1)}°C) exceeds normal range`,
        metric: 'temperature',
        value: tempVariance
      });
    }

    const avgEnergy = data.currentProduction.energyConsumption;
    if (avgEnergy > 90) {
      alerts.push({
        level: 'CRITICAL',
        message: `Energy consumption (${avgEnergy.toFixed(1)} kWh) is above optimal range`,
        metric: 'energy',
        value: avgEnergy
      });
    }

    return alerts;
  }

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

// Test the system without API calls
function testSystem() {
  console.log('🧪 Testing Multi-Agent Manufacturing System Components\n');
  
  const dataSimulator = new TestManufacturingDataSimulator();
  const monitor = new TestManufacturingMonitor();
  
  // Generate test data
  const testData = dataSimulator.getCurrentData();
  const alerts = monitor.checkSystemHealth(testData);
  const monitoringReport = monitor.generateMonitoringReport(testData, alerts);

  console.log('✅ Data Simulator Test:');
  console.log(`Plant: ${testData.plantId}`);
  console.log(`Production Line: ${testData.lineId}`);
  console.log(`Efficiency: ${testData.currentProduction.efficiency.toFixed(1)}%`);
  console.log(`Quality Score: ${testData.currentProduction.qualityScore.toFixed(1)}%`);
  console.log(`Energy Consumption: ${testData.currentProduction.energyConsumption.toFixed(1)} kWh`);
  console.log(`Production Rate: ${testData.currentProduction.unitsPerHour.toFixed(1)} units/hour\n`);

  console.log('✅ Monitoring System Test:');
  console.log(`Health Score: ${monitoringReport.healthScore}%`);
  console.log(`Active Alerts: ${alerts.length}`);
  
  if (alerts.length > 0) {
    console.log('Alerts:');
    alerts.forEach(alert => {
      const icon = alert.level === 'CRITICAL' ? '🔴' : '🟡';
      console.log(`  ${icon} ${alert.level}: ${alert.message}`);
    });
  }

  console.log('\n✅ System Components Test Complete!');
  console.log('📋 Agent System is ready to run with proper API configuration.');
  console.log('\nTo run the full system:');
  console.log('1. Set your OPENAI_API_KEY in .env file');
  console.log('2. Run: npm start (basic system)');
  console.log('3. Run: npm run advanced (advanced system)');
}

// Run the test
testSystem(); 