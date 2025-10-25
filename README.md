# 🌾 Oilseed-Mitra

**A Crop Shift Mitigation Application for Promoting Oilseed Farming in India**

A digital platform leveraging predictive analytics and market intelligence to make oilseed cultivation more attractive and sustainable for Indian farmers.

## 🎯 Problem Statement

Farmers in India are increasingly shifting away from oilseed cultivation toward crops like paddy, sugarcane, and maize, driven by:
- **Assured procurement** and price stability guarantees
- **Limited profitability** of oilseeds on marginal, rainfed lands
- **Weak procurement systems** and market linkages
- **Lack of risk assurance mechanisms**

This trend threatens India's edible oil self-sufficiency roadmap and increases import dependence, affecting national food security and farmer economic sustainability.

## 💡 Solution Overview

**Oilseed-Mitra** is a comprehensive digital platform that transforms oilseed farming through:

### Core Features

#### 📊 **Crop Economics Dashboard**
- **Comparative Economics**: Real-time comparison between oilseeds and alternative crops
- **Profitability Analytics**: Historical and projected profitability trends
- **Cost-Benefit Analysis**: Detailed breakdown of cultivation expenses vs. returns
- **ROI Projections**: Long-term profitability indicators

#### 📈 **Market Intelligence**
- **Real-Time Price Alerts**: Immediate notifications on market price movements
- **Price Trends**: Historical price data and forecasting
- **Market Linkages**: Direct connections with buyers and FPOs (Farmer Producer Organizations)
- **Virtual Profitability Simulator**: Simulate returns based on different market scenarios

#### 🌦️ **Weather-Based Advisories**
- **Location-Specific Forecasts**: Tailored weather predictions for crop planning
- **Crop Health Monitoring**: Disease and pest management recommendations
- **Planting Guidelines**: Optimal sowing and harvesting schedules

#### 💰 **Government Schemes & Subsidies**
- **NMEO-OS Integration**: National Mission on Edible Oils - Oil Palm Scheme integration
- **Subsidy Access**: Information and application support for government support programs
- **Scheme Finder**: Personalized recommendations based on farm profile

#### 🤝 **Risk Assurance Tools**
- **Procurement Linkages**: Direct FPO and buyer connections
- **Insurance Options**: Crop insurance and price guarantee schemes
- **Market Assurance**: Mechanisms to reduce post-harvest risks

#### 🎮 **Gamification & Incentives**
- **Loyalty Rewards**: Incentives for maintaining/expanding oilseed acreage
- **Achievement Badges**: Recognition for farming milestones
- **Leaderboards**: Community engagement and friendly competition

#### 👤 **Farmer Profile Management**
- **Farm Details**: Land size, soil type, current crops
- **Preferences**: Crop preferences and risk tolerance
- **Performance Tracking**: Historical yield and income records

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Modern CSS/Responsive Design
- **Backend**: Firebase (Authentication, Realtime Database, Cloud Functions)
- **State Management**: React Hooks

### Application Structure
```
├── components/
│   ├── HomePage.tsx              # Landing page
│   ├── LoginPage.tsx             # Authentication
│   ├── DashboardPage.tsx         # Main dashboard
│   ├── FarmerListPage.tsx        # Farmer management
│   ├── MarketsPage.tsx           # Market intelligence
│   ├── SchemesPage.tsx           # Government schemes
│   ├── SimulatePage.tsx          # Profitability simulator
│   ├── OfficialDashboardPage.tsx # Admin panel
│   ├── ProfilePage.tsx           # User profile
│   ├── MainApp.tsx               # App router
│   └── Icons.tsx                 # UI icons
├── services/
│   └── firebase.ts               # Firebase configuration
├── App.tsx                       # Root component
├── constants.ts                  # App constants
└── types.ts                      # TypeScript types
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Venkat-Kolasani/Oilseed-Mitra.git
cd Oilseed-Mitra
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Firebase**
- Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- Copy your Firebase config
- Update `services/firebase.ts` with your credentials

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📋 Features in Detail

### For Farmers
- ✅ Easy-to-understand dashboards showing farm economics
- ✅ Real-time market price notifications
- ✅ Personalized government scheme recommendations
- ✅ Weather advisories tailored to location and crops
- ✅ Risk assessment and mitigation strategies
- ✅ Direct market linkages and procurement assurance

### For Officials/Admins
- ✅ Comprehensive farmer database
- ✅ Market insights and analytics
- ✅ Scheme management and distribution tracking
- ✅ Performance metrics and KPIs
- ✅ Incentive program management

## 🔐 Security & Privacy

- **Authentication**: Secure Firebase Authentication
- **Data Protection**: End-to-end encryption for sensitive farmer data
- **Privacy Compliance**: Adheres to data protection regulations
- **Secure Storage**: Firebase Firestore with role-based access control

## 📱 User Roles

1. **Farmer**: Access to personal dashboard, schemes, market data, and advisories
2. **FPO Representative**: Manage farmer groups, facilitate market linkages
3. **Government Official**: Monitor program impact, manage schemes and subsidies
4. **Admin**: System administration and configuration

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vite Guide](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📝 License

This project is licensed under the terms specified in the LICENSE file.

---

**Making Oilseed Farming Profitable, Sustainable, and Attractive for Indian Farmers** 🌾
