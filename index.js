import { Agent, run } from '@openai/agents';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is required. Please set it in your .env file.');
  process.exit(1);
}

// Define a Content Agent for reporting and compliance
const contentAgent = new Agent({
  name: 'ContentAgent',
  instructions: `You are a Content Agent responsible for generating production reports and ensuring compliance documentation is up to date.

Your responsibilities include:
- Generate detailed production reports based on manufacturing data
- Ensure all compliance documentation is current and accurate
- Create audit trails for quality control processes
- Document safety procedures and incident reports
- Maintain regulatory compliance records

When generating reports, include:
- Production metrics and KPIs
- Quality control data
- Safety incident reports
- Compliance status
- Recommendations for improvement

Always format your responses clearly and provide actionable insights.`,
});

// Define a Decision Agent for real-time production optimization
const decisionAgent = new Agent({
  name: 'DecisionAgent',
  instructions: `You are a Decision Agent responsible for analyzing sensor data and adjusting production schedules to maximize efficiency.

Your responsibilities include:
- Analyze real-time sensor data from manufacturing equipment
- Optimize production schedules based on current conditions
- Identify bottlenecks and suggest improvements
- Monitor equipment performance and predict maintenance needs
- Adjust production parameters for maximum efficiency

When making decisions, consider:
- Current production capacity
- Equipment status and health
- Quality metrics
- Energy consumption
- Resource availability
- Market demand

Provide specific, actionable recommendations with clear reasoning.`,
});

// Define a Hybrid Agent for complex tasks and coordination
const hybridAgent = new Agent({
  name: 'HybridAgent',
  instructions: `You are a Hybrid Agent responsible for coordinating between content and decision agents, resolving conflicts, and escalating issues to human operators when needed.

Your responsibilities include:
- Coordinate between Content and Decision agents
- Resolve conflicts between reporting requirements and production optimization
- Escalate critical issues to human operators
- Ensure system-wide consistency and efficiency
- Monitor overall system performance
- Facilitate communication between different agent types

When coordinating:
- Prioritize safety and compliance over pure efficiency
- Balance reporting needs with production optimization
- Identify when human intervention is required
- Maintain system stability and reliability
- Provide clear escalation protocols

Always consider the broader impact of decisions on the entire manufacturing system.`,
});

// Simulate manufacturing data
const manufacturingData = {
  plantId: process.env.MANUFACTURING_PLANT_ID || 'PLANT_001',
  lineId: process.env.PRODUCTION_LINE_ID || 'LINE_A',
  currentProduction: {
    unitsPerHour: 150,
    qualityScore: 98.5,
    energyConsumption: 85.2,
    temperature: 185.5,
    pressure: 2.1,
    vibration: 0.8
  },
  sensorData: {
    temperature: [185.5, 186.2, 184.8, 185.1, 185.9],
    pressure: [2.1, 2.15, 2.08, 2.12, 2.09],
    vibration: [0.8, 0.85, 0.78, 0.82, 0.79],
    energyConsumption: [85.2, 86.1, 84.8, 85.5, 85.9]
  },
  qualityMetrics: {
    defectRate: 1.5,
    customerReturns: 0.3,
    onTimeDelivery: 98.2
  },
  complianceStatus: {
    safetyAudit: 'PASS',
    environmentalCompliance: 'PASS',
    qualityCertification: 'VALID',
    lastInspection: '2024-01-15'
  }
};

// Manufacturing task simulation
const manufacturingTask = `
Manufacturing Task for ${manufacturingData.plantId} - ${manufacturingData.lineId}:

1. Generate a comprehensive compliance report for the last production batch including:
   - Quality metrics and defect analysis
   - Safety compliance status
   - Environmental impact assessment
   - Regulatory compliance verification

2. Analyze real-time sensor data and suggest production schedule adjustments:
   - Current sensor readings: ${JSON.stringify(manufacturingData.sensorData, null, 2)}
   - Production metrics: ${JSON.stringify(manufacturingData.currentProduction, null, 2)}
   - Quality metrics: ${JSON.stringify(manufacturingData.qualityMetrics, null, 2)}

3. If conflicts arise between reporting requirements and production optimization, resolve them or escalate to human operators.

4. Provide recommendations for:
   - Production efficiency improvements
   - Quality enhancement strategies
   - Safety protocol updates
   - Compliance maintenance
`;

// Run the multi-agent system
async function runManufacturingOptimization() {
  console.log('🏭 Starting Multi-Agent Manufacturing Optimization System\n');
  console.log(`Plant: ${manufacturingData.plantId}`);
  console.log(`Production Line: ${manufacturingData.lineId}\n`);

  try {
    // Run Content Agent for reporting and compliance
    console.log('📊 Content Agent: Generating compliance reports...');
    const contentResult = await run(contentAgent, manufacturingTask);
    console.log('✅ Content Agent completed\n');

    // Run Decision Agent for optimization
    console.log('⚙️ Decision Agent: Analyzing sensor data and optimizing production...');
    const decisionResult = await run(decisionAgent, manufacturingTask);
    console.log('✅ Decision Agent completed\n');

    // Run Hybrid Agent for coordination
    console.log('🤝 Hybrid Agent: Coordinating and resolving conflicts...');
    const hybridResult = await run(hybridAgent, manufacturingTask);
    console.log('✅ Hybrid Agent completed\n');

    // Display results
    console.log('📋 AGENT OUTPUTS:');
    console.log('='.repeat(50));
    
    console.log('\n📊 CONTENT AGENT OUTPUT:');
    console.log('-'.repeat(30));
    console.log(contentResult.finalOutput);
    
    console.log('\n⚙️ DECISION AGENT OUTPUT:');
    console.log('-'.repeat(30));
    console.log(decisionResult.finalOutput);
    
    console.log('\n🤝 HYBRID AGENT OUTPUT:');
    console.log('-'.repeat(30));
    console.log(hybridResult.finalOutput);

    console.log('\n🎯 Multi-Agent System Execution Complete!');

  } catch (error) {
    console.error('❌ Error in multi-agent system:', error.message);
    process.exit(1);
  }
}

// Run the system
runManufacturingOptimization(); 