# Multi-Agent System for Industrial Manufacturing Optimization

This project implements a multi-agent system for optimizing manufacturing operations using the OpenAI Agents SDK. The system consists of three specialized agents that work together to improve production efficiency, ensure compliance, and coordinate complex manufacturing tasks.

## 🏭 System Overview

The multi-agent system includes:

- **Content Agent**: Generates production reports and ensures compliance documentation
- **Decision Agent**: Analyzes sensor data and optimizes production schedules
- **Hybrid Agent**: Coordinates between agents and resolves conflicts

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- OpenAI API key

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running the System

#### Basic System
```bash
npm start
```

#### Advanced System (with real-time monitoring)
```bash
npm run advanced
```

#### Development Mode
```bash
# Basic system with auto-restart
npm run dev

# Advanced system with auto-restart
npm run advanced-dev
```

#### Testing System Components
```bash
npm test
```

## 📋 System Architecture

### Available Systems

#### Basic System (`index.js`)
A straightforward implementation of the multi-agent system with simulated manufacturing data.

#### Advanced System (`advanced-system.js`)
Enhanced version with:
- Real-time data simulation with noise
- Advanced monitoring and alerting
- Predictive analytics capabilities
- Comprehensive health scoring
- Enhanced agent instructions with visual indicators

### Agent Roles

#### Content Agent
- **Purpose**: Reporting and compliance management
- **Responsibilities**:
  - Generate detailed production reports with visual indicators
  - Ensure compliance documentation is current and accurate
  - Create audit trails for quality control processes
  - Document safety procedures and incident reports
  - Maintain regulatory compliance records
  - Provide trend analysis and historical comparisons

#### Decision Agent
- **Purpose**: Real-time production optimization
- **Responsibilities**:
  - Analyze sensor data with trend analysis
  - Optimize production schedules based on current conditions
  - Identify bottlenecks and suggest improvements
  - Monitor equipment performance and predict maintenance needs
  - Adjust production parameters for maximum efficiency
  - Provide predictive analytics for future optimization

#### Hybrid Agent
- **Purpose**: Coordination and conflict resolution
- **Responsibilities**:
  - Coordinate between Content and Decision agents effectively
  - Resolve conflicts between reporting and optimization requirements
  - Escalate critical issues to human operators with clear protocols
  - Ensure system-wide consistency and efficiency
  - Monitor overall system performance and health
  - Implement continuous improvement strategies

### Manufacturing Data Simulation

The system simulates realistic manufacturing data including:
- Production metrics (units per hour, quality score, energy consumption)
- Sensor data (temperature, pressure, vibration)
- Quality metrics (defect rate, customer returns, on-time delivery)
- Compliance status (safety audit, environmental compliance, quality certification)

## 🔧 Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `MANUFACTURING_PLANT_ID`: Plant identifier (default: PLANT_001)
- `PRODUCTION_LINE_ID`: Production line identifier (default: LINE_A)

### Customizing Agent Behavior

You can modify agent instructions in `index.js` to adapt the system to your specific manufacturing needs:

```javascript
const contentAgent = new Agent({
  name: 'ContentAgent',
  instructions: `Your custom instructions here...`,
});
```

## 📊 Output Example

When you run the system, you'll see output similar to:

```
🏭 Starting Multi-Agent Manufacturing Optimization System

Plant: PLANT_001
Production Line: LINE_A

📊 Content Agent: Generating compliance reports...
✅ Content Agent completed

⚙️ Decision Agent: Analyzing sensor data and optimizing production...
✅ Decision Agent completed

🤝 Hybrid Agent: Coordinating and resolving conflicts...
✅ Hybrid Agent completed

📋 AGENT OUTPUTS:
==================================================

📊 CONTENT AGENT OUTPUT:
------------------------------
[Detailed compliance report with quality metrics, safety status, etc.]

⚙️ DECISION AGENT OUTPUT:
------------------------------
[Production optimization recommendations based on sensor data]

🤝 HYBRID AGENT OUTPUT:
------------------------------
[Coordination results and conflict resolution recommendations]

🎯 Multi-Agent System Execution Complete!
```

## 🛠️ Extending the System

### Adding New Agents

To add a new agent, create it following the same pattern:

```javascript
const newAgent = new Agent({
  name: 'NewAgent',
  instructions: `Your agent instructions here...`,
});

const newResult = await run(newAgent, manufacturingTask);
```

### Integrating with Real Manufacturing Systems

To integrate with real manufacturing systems:

1. Replace the simulated `manufacturingData` with real data sources
2. Connect to actual sensor networks and SCADA systems
3. Implement real-time data streaming
4. Add database integration for persistent storage
5. Implement proper error handling and logging

### Adding Custom Tools

You can extend agents with custom tools for specific manufacturing tasks:

```javascript
const agentWithTools = new Agent({
  name: 'CustomAgent',
  instructions: 'Your instructions...',
  tools: [
    // Add your custom tools here
  ],
});
```

## 🔒 Security Considerations

- Keep your OpenAI API key secure and never commit it to version control
- Consider implementing rate limiting for API calls
- Add proper error handling for production environments
- Implement logging and monitoring for system health

## 📚 References

This implementation is inspired by:
- [OpenAI Agents SDK Documentation](https://openai.github.io/openai-agents-js/)
- [XMPro Multi-Agent Systems for Industry](https://xmpro.com/how-to-build-multi-agent-systems-for-industry/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

No License.