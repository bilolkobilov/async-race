# Async Race

**Score: 380/400**

**Deployed UI:** https://bilolkobilov.github.io/async-race/

---

## Checklist

## 🚀 UI Deployment

- [x] **Deployment Platform:** Deployed on GitHub Pages at https://bilolkobilov.github.io/async-race/

## ✅ Requirements to Commits and Repository

- [x] **Commit guidelines compliance:** All commits follow Conventional Commits format.
- [x] **Checklist included in README.md:** This checklist is included below.
- [x] **Score calculation:** Score calculated and placed at the top of README.md.
- [x] **UI Deployment link in README.md:** Deployment link is at the top of this file.

## Basic Structure (80 points)

- [x] **Two Views (10 points):** "Garage" and "Winners" views implemented.
- [x] **Garage View Content (30 points):**
  - [x] Name of view
  - [x] Car creation and editing panel
  - [x] Race control panel
  - [x] Garage section
- [x] **Winners View Content (10 points):**
  - [x] Name of view ("Winners")
  - [x] Winners table
  - [x] Pagination
- [x] **Persistent State (30 points):** Page numbers and input states are preserved when switching views (both views mount/unmount without resetting Redux state).

## Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20 points):** Create, update, delete cars. Deleting a car also removes it from winners. Empty and too-long names are blocked.
- [x] **Color Selection (10 points):** RGB color picker; selected color is reflected on the car's SVG image.
- [x] **Random Car Creation (20 points):** "Generate 100 Cars" button creates 100 random cars (10 brands × 10 models, random hex color).
- [x] **Car Management Buttons (10 points):** Edit and Delete buttons per car.
- [x] **Pagination (10 points):** 7 cars per page.
- [x] **EXTRA POINTS (20 points):**
  - [x] **Empty Garage:** "No cars in the garage yet. Create one above!" message shown.
  - [x] **Empty Garage Page:** After deleting the last car on a page, the user is moved to the previous page.

## 🏆 Winners View (50 points)

- [x] **Display Winners (15 points):** Winning car is saved/updated in winners after a race finish.
- [x] **Pagination for Winners (10 points):** 10 winners per page.
- [x] **Winners Table (15 points):** Columns: №, car image, name, wins, best time. Wins are incremented on repeated wins; best time is only updated if faster.
- [x] **Sorting Functionality (10 points):** Clickable column headers for "Wins" and "Best Time" with ASC/DESC toggle applied server-side via query params.

## 🚗 Race (170 points)

- [x] **Start Engine Animation (20 points):** Click A button → wait for velocity/distance → animate car with `requestAnimationFrame` → send drive request → stop on 500 error.
- [x] **Stop Engine Animation (20 points):** Click B button → stop engine API → car returns to start position.
- [x] **Responsive Animation (30 points):** Animations work down to 500px using CSS and relative track widths.
- [x] **Start Race Button (10 points):** "Race" button starts all cars on the current page simultaneously.
- [x] **Reset Race Button (15 points):** "Reset" button stops all engines and returns all cars to start.
- [x] **Winner Announcement (5 points):** Modal banner shows winner's name and time.
- [x] **Button States (20 points):** A button disabled when engine running; B button disabled when car is at start. Race/Reset buttons have correct disabled states.
- [x] **Actions during the race (50 points):** Edit and Delete buttons are disabled during a race, preventing manipulation mid-race.

## 🎨 Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** `format` and `ci:format` scripts in package.json.
- [x] **ESLint Configuration (5 points):** Airbnb style guide via `eslint-config-airbnb-typescript`. `lint` script in package.json.

## 🌟 Overall Code Quality (100 points)

- [x] **Modular Design:** Clear separation: `api/`, `store/`, `components/`, `pages/`, `utils/`, `types/`.
- [x] **Function Modularization:** Small functions with single responsibility; all under 40 lines.
- [x] **Code Duplication and Magic Numbers:** Constants extracted; minimal duplication.
- [x] **Readability:** TypeScript strict mode; no implicit any; clear naming throughout.
- [x] **Extra features:** Custom `useCarAnimation` hook; Redux Toolkit with typed dispatch/selector hooks.

---

## Tech Stack

- **React 18** + **TypeScript** (strict mode, `noImplicitAny`)
- **Redux Toolkit** for state management
- **Vite** build tool
- **CSS Modules** for scoped styling
- **ESLint** (Airbnb) + **Prettier**

## Running locally

```bash
# 1. Start the backend (port 3000)
git clone https://github.com/mikhama/async-race-api.git
cd async-race-api && npm install && npm start

# 2. Start the frontend (port 5173)
git clone https://github.com/bilolkobilov/async-race.git
cd async-race && npm install && npm run dev
```
