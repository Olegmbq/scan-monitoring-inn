<p align="center">
  🌍 <strong>Languages:</strong><br><br>

  <a href="./README.md">
    <img src="https://img.shields.io/badge/Language-RU-blue?style=for-the-badge" />
  </a>

  <img src="https://img.shields.io/badge/Language-EN-red?style=for-the-badge" />
</p>

<br><hr><br>

# 🔍🔥 SCAN Monitoring (B2B)

<p align="center">
  <a href="https://scan-monitoring-inn.vercel.app">
    <img src="https://img.shields.io/badge/Live-Vercel-black?style=for-the-badge&logo=vercel" />
  </a>
  <a href="https://olegmbq.github.io/scan-monitoring-inn/">
    <img src="https://img.shields.io/badge/Live-GitHub_Pages-181717?style=for-the-badge&logo=github" />
  </a>
</p>

<br><hr><br>

<div align="center">
  <img
    src="./src/assets/brand/oleg-neuro-logo.png"
    width="260"
    alt="Oleg & Neuro Logo"
    style="border-radius:18px; box-shadow:0 0 20px rgba(173,0,255,0.6), 0 0 40px rgba(0,180,255,0.45);"
  />

  <h1>SCAN Monitoring</h1>

  <p>
    B2B analytical platform for monitoring company publications<br/>
    by INN using <b>SCAN API (Interfax)</b>
  </p>
</div>

<br>

<div align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-TS-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <br><br>
  <img src="https://img.shields.io/badge/API-SCAN-8B5CF6?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Auth-Token-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/B2B-Platform-orange?style=for-the-badge" />
</div>

<br><hr><br>

## 🇬🇧 Project Description

**SCAN Monitoring** is a B2B web application for searching and analyzing
company-related publications by INN using **SCAN API (Interfax)**.

The application provides:

- token-based authentication
- analytics and publication monitoring
- lazy loading of documents
- **Demo mode** for stable UX when the external API is unavailable

Built with **React + TypeScript**, following **clean architecture principles**
with a clear separation between business logic and UI.

<br><hr><br>

## 🔍 Key Features

- Token-based authentication with persistent session (localStorage)
- Secure access control for authorized users
- Real SCAN API integration (login, histograms, documents)
- Automatic **Demo mode** fallback
- Analytics summary with time-based histograms
- Lazy loading of documents (batch loading)
- Clean separation of business logic and UI
- Fully responsive layout (desktop & mobile)

<br><hr><br>

## 🧠 Architecture Overview

### Context API

- **AuthContext** — authentication, token handling, demo / real mode
- **SearchContext** — search state, documents, analytics data

### Services Layer

- All API communication and demo fallback logic isolated in services

### UI Layer

- Unified handling of loading, error and empty states

<br><hr><br>

## 🖼️ Screenshots

### Home page

<img src="public/screenshots/01-home.png" alt="Home page" />

### Authorization

<img src="public/screenshots/02-login.png" alt="Login page" />

### Search form

<img src="public/screenshots/03-search-form.png" alt="Search form" />

### Search results

<img src="public/screenshots/04-results.png" alt="Search results" />

### Mobile version

<img src="public/screenshots/05-mobile.png" alt="Mobile version" />

<br><hr><br>

## 🚀 Application Functionality

- User authentication with session persistence
- Automatic Demo mode when API is unavailable
- INN-based publication search with validation
- Analytical summary and risk indicators
- Detailed document preview
- Lazy loading (batch loading)
- Protected routes for unauthorized users
- Responsive UI for desktop and mobile

<br><hr><br>

## 🔐 Authentication

- Endpoint: `POST /api/v1/account/login`
- Receives `accessToken` and `expire`
- Token is stored automatically
- All protected requests include header:  
  `Authorization: Bearer <token>`

<br><hr><br>

## 🧪 Demo Mode

If SCAN API is unavailable or authentication fails:

- **Demo mode** is enabled automatically
- Mock data is displayed
- **DEMO** badge is shown
- Core business logic remains unchanged

Demo mode is implemented intentionally to ensure stable UX
and does not violate the technical requirements.

<br><hr><br>

## 🧠 Demo Mode vs Real Mode

The project supports two operating modes:

| Mode     | Description                                   |
| -------- | --------------------------------------------- |
| **Real** | Uses real SCAN API (authentication + data)    |
| **Demo** | Automatically enabled when API is unavailable |

Demo mode is transparent and clearly visible to the user.

<br><hr><br>

## 🛠️ Technologies

- React + TypeScript
- React Router
- Context API
- Axios
- SCSS (responsive layout)
- LocalStorage
- Architecture: services / context / pages / components

<br><hr><br>

## 📂 Project Structure

```text
src/
├── assets/
│   └── brand/
├── context/
├── services/
├── pages/
├── types/
├── App.tsx
└── main.tsx

```

<br><hr><br>

## 🚀 Запуск проекта

```bash
cd scan-monitoring-inn
npm install
npm run dev

```

<br><hr><br>

## 👤 Автор

**Oleg Martyanov & Neuro**
Frontend / Architecture / UX

<br><hr><br>

<div align="center"> <img src="./src/assets/brand/oleg-neuro-logo.png" width="120" style="border-radius: 12px; box-shadow: 0 0 12px rgba(173, 0, 255, 0.45);"  alt="Oleg & Neuro Logo small" /> <br/>

<strong>Oleg & Neuro</strong><br/>
<em>Logic · Design · Emotion</em>

</div>
