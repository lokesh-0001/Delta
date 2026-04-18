# Delta
human body twin visualization
# 🧬 Human Body Digital Twin Simulator

**AI-Powered Health Risk Prediction & Visualization System**

![Status](https://img.shields.io/badge/Status-Ready-green)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20AI-blue)

---

## 🎯 Overview

A cutting-edge health simulation platform that creates a **digital twin** of your body using AI algorithms. Input your health metrics and watch as the system predicts disease risks, visualizes your body's health status, and provides personalized recommendations.

### ✨ Key Features

- **📊 AI Health Risk Analysis** - Advanced algorithms predict diabetes, heart disease, and lifestyle-related health risks
- **🎨 Interactive 2D Body Visualization** - Real-time organ health mapping with color-coded risk indicators
- **💡 Smart Recommendations** - Personalized health advice based on your unique profile
- **⚡ Real-time Predictions** - Instant analysis as you adjust your health parameters
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# 1. Extract the project
cd human-digital-twin

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies (in new terminal)
cd frontend
npm install
```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

---

## 📖 User Guide

### Step 1: Enter Your Health Details
- **Age**: Your current age in years (affects baseline risk calculations)
- **BMI**: Body Mass Index - calculate yours at [CDC BMI Calculator](https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/english_bmi_calculator/bmi_calculator.html)
- **Sleep**: Average hours of sleep per night

### Step 2: Run Simulation
Click **"Run AI Simulation"** to analyze your health profile

### Step 3: View Results
- **Overall Risk Score**: 0-100% health risk indicator
- **Organ-Specific Risks**: Diabetes, Heart Disease, Lifestyle scores
- **2D Body Map**: Interactive visualization of organ health
- **AI Recommendations**: Personalized health improvement tips

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │  RiskPanel   │  │  BodyViewer  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP/REST
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend (Node.js + Express)                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AI Prediction Engine (JavaScript)                   │  │
│  │  • Diabetes Risk Model                               │  │
│  │  • Heart Disease Risk Model                          │  │
│  │  • Lifestyle Score Calculator                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 How It Works

### AI Prediction Models

#### 1. **Diabetes Risk**
```javascript
Risk factors:
- Age > 45: +20% risk
- BMI > 30: +30% risk
- BMI 25-30: +15% risk  
- Sleep < 6 hours: +10% risk
```

#### 2. **Heart Disease Risk**
```javascript
Risk factors:
- Age > 50: +25% risk
- BMI > 28: +25% risk
- Sleep < 7 hours: +15% risk
```

#### 3. **Lifestyle Score**
```javascript
Positive factors:
- BMI 18.5-24.9: 90% score
- Sleep 7-9 hours: +10% bonus

Negative factors:
- BMI > 30: -60%
- Inadequate sleep: -20%
```

### Overall Risk Calculation
```
Overall Risk = (Diabetes Risk × 0.35) + (Heart Risk × 0.45) + (Lifestyle Risk × 0.20)
```

---

## 📁 Project Structure

```
human-digital-twin/
├── backend/
│   ├── server.js              # Express server
│   ├── routes/
│   │   └── predict.js         # AI prediction endpoint
│   ├── ai_service/            # Original Python models (optional)
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html         # Entry HTML
│   ├── src/
│   │   ├── App.js             # Root component
│   │   ├── app.css            # Global styles
│   │   ├── components/
│   │   │   ├── Dashboard.js   # Main interface
│   │   │   ├── RiskPanel.js   # Risk visualization
│   │   │   └── BodyViewer.js  # 2D body map
│   │   └── index.js           # React entry
│   └── package.json
│
└── README.md                  # This file
```

---

## 🎨 UI Components

### Dashboard
Main control center with health input form and navigation

### Risk Panel
- Overall risk score with color coding (Green/Yellow/Red)
- Individual risk breakdowns for diabetes, heart disease, lifestyle
- Progress bars showing risk levels
- AI-generated recommendations

### Body Viewer
- Interactive SVG body illustration
- Organ health color mapping:
  - 🟢 **Green**: Low risk (< 30%)
  - 🟡 **Yellow**: Medium risk (30-60%)
  - 🔴 **Red**: High risk (> 60%)
- Hover tooltips for detailed organ info
- Toggle between 2D and 3D views (3D in development)

---

## 🔧 API Reference

### POST `/predict`

Analyzes health metrics and returns risk predictions.

**Request Body:**
```json
{
  "age": 35,
  "bmi": 27.5,
  "sleep": 6.5
}
```

**Response:**
```json
{
  "risk_score": 0.425,
  "explanation": "Moderate health risk. Consider improving diet, exercise, and sleep habits.",
  "diabetes": "Medium Risk - 35%",
  "heart": "Medium Risk - 40%",
  "lifestyle": "Good - Room for improvement",
  "age": 35,
  "bmi": "27.5",
  "sleep": "6.5"
}
```

---

## 🎯 Hackathon Demo Script

### 1. Introduction (30 sec)
"Healthcare is reactive - we wait until people are sick. What if we could predict and prevent disease? This is Digital Twin - your AI health simulator."

### 2. Feature Demo (2 min)
- Enter sample data: Age 45, BMI 32, Sleep 5.5 hours
- Show high-risk result
- Highlight specific risks: diabetes 50%, heart 55%
- Show body visualization with red organs
- Demonstrate recommendations

### 3. What-If Scenario (1 min)
- Adjust to: BMI 24, Sleep 8 hours
- Show risk drop to 25%
- Organs turn green
- Emphasize prevention power

### 4. Technical Highlight (30 sec)
"Built with React for smooth UX, Node.js backend with custom AI algorithms. Real-time predictions, no page reloads."

---

## 🚨 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend connection error
- Check backend is running on port 5000
- Check console for CORS errors
- Verify `npm install` completed in backend folder

### Port already in use
```bash
# Kill process on port 3000 or 5000
# Mac/Linux:
lsof -ti:3000 | xargs kill
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 🔮 Future Enhancements

- [ ] User authentication & profile saving
- [ ] Historical health tracking graphs
- [ ] Integration with fitness wearables (Fitbit, Apple Health)
- [ ] Doctor dashboard for patient monitoring
- [ ] Real 3D human model with Three.js
- [ ] Treatment simulation (medication effects)
- [ ] Export PDF health reports
- [ ] Multi-language support

---

## 📊 Technologies Used

| Category | Technology | Purpose |
|----------|-----------|---------|
| Frontend | React 18 | UI framework |
| Backend | Node.js + Express | REST API server |
| AI/ML | Custom JavaScript algorithms | Health risk prediction |
| Visualization | SVG + CSS animations | 2D body mapping |
| HTTP Client | Axios | API communication |
| Styling | CSS3 + Gradients | Modern UI design |

---

## ⚖️ Disclaimer

**This application is for educational and demonstration purposes only.**

- Not a substitute for professional medical advice
- Predictions are based on simplified models
- Always consult qualified healthcare providers for medical decisions
- Not intended for diagnostic or treatment purposes

---

## 👥 Team & Credits

Built for hackathon demonstration of AI in healthcare.

**Core Features:**
- AI-powered risk prediction
- Interactive health visualization
- Real-time simulation engine

---

## 📄 License

MIT License - Free to use for educational purposes

---

## 🎉 Getting Started Now

```bash
# Quick start in 3 commands:
cd backend && npm install && node server.js &
cd frontend && npm install && npm start
# Visit http://localhost:3000
```

**Your digital health twin awaits! 🧬**