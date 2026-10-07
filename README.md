# New York Life · City Simulation Game

A stylized, high-fidelity 3D city life and apartment simulation browser game set in Brooklyn, New York.

![New York Life Preview](New%20York%20Life%20Buy%20Mode%20Apartment.png)

## 🎮 Overview

**New York Life** features an isometric 3D luxury Brooklyn penthouse apartment at twilight with a comprehensive browser game HUD:
- **Top Status Capsule**: Real-time clock, mood metrics, online player count, location pill, audio controls, quick save, cash balance, and instant add-funds.
- **Quest & Objective Stack**: Job notifications, daily challenge tracker with animated progress bars.
- **Character Vitals Widget**: Glassmorphism stat card displaying energy, mood, and health along with custom player avatar.
- **Center Navigation Dock**: Floating quick dock with Home, Buy, Map, and Phone tabs.
- **Buy Mode Drawer**: Interactive furniture catalogue featuring real-time category filtering (Furniture, Decor, Electronics, Lighting, Plants, etc.), instant search, live item purchase flow with bank deduction and toasts.
- **Interactive 3D Stage**: Stylized 3D character with interactive golden glow selection ring and ambient floor contact shadows.

## 🛠️ Tech Stack

- **HTML5**: Semantic UI layout and accessible markup
- **Vanilla CSS3**: Design system tokens, glassmorphism (`backdrop-filter`), smooth spring transitions, responsive scaling
- **JavaScript (ES6+)**: Client-side state management, search filtering, audio toggles, toast notifications, live purchasing

## 🚀 Running Locally

You can serve this project with any static file server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Open `http://localhost:8080` in any modern web browser.
