# 🏥 Mediscan AI - Comprehensive Healthcare Platform

<div align="center">
  
  
  [![License](https://img.shields.io/badge/License-LGPL%20v2.1-blue.svg)](LICENSE)
  [![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Backend-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-green.svg)](https://mongodb.com/)
</div>

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Web Application Features](#web-application-features)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

**Mediscan AI** is a comprehensive healthcare platform that combines mobile and web technologies to provide accessible healthcare services. Developed for AGTechathon 2k25, this platform bridges the gap between patients and healthcare providers through innovative AI-powered analysis, telemedicine services, and emergency response systems.

### Mission
To make quality healthcare accessible to everyone through technology, providing instant medical analysis, expert consultations, and emergency services in a unified platform.

## ✨ Features

### 🔬 AI-Powered Medical Analysis
- **Multi-Modal Analysis**: Support for images, videos, and real-time analysis
- **Specialized Analysis Types**:
  - 🫀 **ECG Analysis**: Electrocardiogram interpretation and heart health assessment
  - 🦴 **X-Ray Analysis**: Bone fracture detection and radiological interpretation
  - 🎗️ **Cancer Detection**: Advanced cancer screening and risk assessment
  - 🧠 **Alzheimer's Analysis**: Cognitive assessment and early detection
  - 🌟 **Skin Analysis**: Dermatological condition identification
  - 👁️ **Retinopathy Detection**: Eye health assessment and diabetic retinopathy screening
  - 🏥 **General Health Analysis**: Comprehensive health screening

### 🩺 Telemedicine Services
- **Video Consultations**: High-quality video calls with healthcare professionals
- **Real-time Chat**: Instant messaging with medical experts
- **Emergency Consultations**: Priority access for urgent medical needs
- **Multi-language Support**: Available in English and Hindi

### 🚨 Emergency Services
- **24/7 Emergency Hotline**: Instant access to emergency services (8047492503)
- **IVR System**: Interactive Voice Response for quick emergency routing
- **Location-based Services**: Automatic routing to nearest medical facilities
- **Emergency Notifications**: Real-time alerts to connected healthcare providers

### 💡 Health & Wellness
- **Daily Health Tips**: Curated health advice and wellness tips
- **Medical History Tracking**: Comprehensive health record management
- **Health Resources**: Educational content and preventive care guides

### 🔐 Security & Privacy
- **JWT Authentication**: Secure user authentication and session management
- **Data Encryption**: End-to-end encryption for sensitive medical data
- **HIPAA Compliance**: Healthcare data protection standards

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Client Applications"
        A[Mobile App<br/>React Native + Expo]
        B[Web App<br/>React + Vite]
    end
    
    subgraph "API Layer"
        C[Express.js Server<br/>REST API]
        D[Socket.IO<br/>Real-time Communication]
    end
    
    subgraph "Services"
        E[AI Analysis Service<br/>Google Generative AI]
        F[Video Call Service<br/>WebRTC]
        G[Authentication Service<br/>JWT]
        H[Emergency Service<br/>Twilio]
    end
    
    subgraph "Database"
        I[MongoDB<br/>User Data & Medical Records]
    end
    
    A --> C
    B --> C
    A --> D
    B --> D
    C --> E
    C --> F
    C --> G
    C --> H
    C --> I
```

## 🛠️ Technology Stack



### Web Application
- **Frontend**: React 19.0.0 with Vite 6.1.0
- **Styling**: Tailwind CSS 4.0.8, Material-UI 6.4.5
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router DOM 7.2.0
- **UI Components**: Material-UI, Lucide React Icons
- **Real-time Features**: Socket.IO Client 4.8.1
- **Payment Integration**: Stripe React
- **Video Calls**: ZegoCloud UI Kit

### Backend Services
- **Runtime**: Node.js with Express.js 5.1.0
- **Database**: MongoDB with Mongoose 8.15.2
- **Authentication**: JSON Web Tokens (JWT) 9.0.2
- **Real-time Communication**: Socket.IO 4.8.1
- **Security**: bcryptjs, CORS, Express Rate Limit
- **Communication**: Twilio 5.7.1, Nodemailer 7.0.3
- **Environment Management**: dotenv 16.5.0

<div align="center">
  <img src="./assets/1.jpg" alt="CureConnect Logo" width="400">
  <img src="./assets/2.jpg" alt="CureConnect Logo" width="400">
  <img src="./assets/3.jpg" alt="CureConnect Logo" width="400">
  <img src="./assets/4.jpg" alt="CureConnect Logo" width="400">
  <img src="./assets/5.jpg" alt="CureConnect Logo" width="400">
  <img src="./assets/6.jpg" alt="CureConnect Logo" width="400">
  <img src="./assets/7.jpg" alt="CureConnect Logo" width="400">
</div>

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance
- Expo CLI (for mobile development)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/CureConnect.git
cd CureConnect
```

### 2. Backend Setup
```bash
cd web/Backend
npm install

# Create .env file manually (see Environment Configuration below)
# Start the backend server
npm run dev
```

### 3. Web Frontend Setup
```bash
cd web/Frontend
npm install --legacy-peer-deps

# Create .env file manually (see Environment Configuration below)
# Start the development server
npm run dev
```

### 4. Mobile App Setup
```bash
cd app
npm install

# Start Expo development server
npx expo start
```

### 5. Environment Configuration

#### Backend (.env)
Create a file named `.env` in `web/Backend/` with the following content:

```env
MONGODB_URI=mongodb://localhost:27017/cureconnect
JWT_SECRET=your_random_secret_string
JWT_EXPIRE=7d
PORT=5001
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
GOOGLE_AI_API_KEY=your_google_ai_key
```

**How to get keys:**
- **Google AI**: [Get API key from Google AI Studio](https://aistudio.google.com/)
- **Twilio**: [Get credentials from Twilio Console](https://www.twilio.com/console)

#### Frontend (.env)
Create a file named `.env` in `web/Frontend/` with the following content:

```env
VITE_API_URL=http://localhost:5001/api/v1
VITE_SOCKET_URL=http://localhost:5001
VITE_GOOGLE_AI_API_KEY=your_google_ai_key
```

## 📁 Project Structure

```
Mediscan AI/

├── 🌐 web/                          # Web Application
│   ├── Frontend/                     # React Web Frontend
│   │   ├── src/
│   │   │   ├── pages/               # Main application pages
│   │   │   ├── components/          # Reusable React components
│   │   │   ├── actions/             # Redux actions
│   │   │   ├── reducers/            # Redux reducers
│   │   │   └── App.jsx              # Main app component
│   │   └── package.json             # Frontend dependencies
│   │
│   └── Backend/                      # Node.js Backend API
│       ├── routes/                   # API route definitions
│       ├── models/                   # MongoDB data models
│       ├── controllers/              # Business logic controllers
│       ├── middleware/               # Authentication & validation
│       ├── utils/                    # Helper functions
│       ├── server.js                 # Main server file
│       └── package.json              # Backend dependencies
│
├── 📚 Instructions/                  # Project documentation
│   ├── README.md                     # Setup and rules
│   
│
├── LICENSE                           # LGPL v2.1 License
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```



## 🌐 Web Application Features

### Analysis Dashboard
- **Comprehensive Analysis Types**: 7+ specialized medical analysis tools
- **Image & Video Support**: Multi-format medical data processing
- **Real-time Results**: Instant AI-powered analysis and recommendations
- **Export Functionality**: PDF reports and data export

### Telemedicine Platform
- **Video Consultations**: High-quality video calls with doctors
- **Chat Integration**: Real-time messaging during consultations
- **Appointment Scheduling**: Book and manage medical appointments
- **Prescription Management**: Digital prescription handling

### User Management
- **Profile System**: Comprehensive user profiles with medical history
- **Authentication**: Secure login with JWT tokens
- **Medical Records**: Centralized health record management
- **Data Privacy**: HIPAA-compliant data handling

## 🔌 API Documentation

### Authentication Endpoints
```
POST /api/v1/auth/register    # User registration
POST /api/v1/auth/login       # User login
POST /api/v1/auth/logout      # User logout
GET  /api/v1/auth/profile     # Get user profile
```

### Analysis Endpoints
```
POST /api/v1/analysis/upload     # Upload and analyze medical data
GET  /api/v1/analysis/history    # Get analysis history
GET  /api/v1/analysis/:id        # Get specific analysis
```

### Emergency Endpoints
```
POST /api/v1/emergency/alert     # Trigger emergency alert
GET  /api/v1/emergency/services  # Get nearby emergency services
```

### WebSocket Events
```
connection                    # Client connection
join-room                    # Join video call room
emergency-request            # Emergency notification
user-message                 # Chat message
```

## 🎯 Key Features Breakdown

### 🤖 AI Analysis Capabilities
1. **ECG Analysis**: Heart rhythm analysis and arrhythmia detection
2. **X-Ray Analysis**: Bone fracture detection and diagnostic insights
3. **Cancer Screening**: Multi-type cancer detection and risk assessment
4. **Alzheimer's Detection**: Cognitive assessment through various modalities
5. **Skin Analysis**: Dermatological condition identification
6. **Retinopathy Screening**: Diabetic eye disease detection
7. **General Health**: Comprehensive health status assessment

### 🏥 Healthcare Services
- **24/7 Emergency Hotline**: Always available emergency services
- **Telemedicine**: Connect with healthcare professionals remotely
- **Health Tips**: Daily wellness and preventive care advice
- **Medical History**: Comprehensive health record tracking
- **Multi-language Support**: Accessible in multiple languages

### 🔒 Security Features
- **End-to-end Encryption**: Secure data transmission
- **JWT Authentication**: Secure user session management
- **Data Privacy**: HIPAA-compliant data handling
- **Secure Storage**: Encrypted medical record storage




### Code Style
- **JavaScript/TypeScript**: ESLint configuration provided
- **React**: Follow React best practices and hooks patterns
- **Node.js**: Follow Express.js conventions and async/await patterns



---

<div align="center">
  <p><strong>MediScan-AI - Connecting Care, Empowering Health</strong></p>
  <p>Built with ❤️</p>
</div>
