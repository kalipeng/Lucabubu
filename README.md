# lucabubu
- strong-lamington-c6675b.netlify.app
A modern, minimal web app for discovering and sharing Bellevue-area dog-friendly parks and trails, with a focus on clean UI and **social dog-walking (Team Up)** features.

---

## Features

### 🐾 Minimal & Modern UI
- Centered logo in the top bar (clickable, returns to homepage).
- Warm brown/beige color scheme, modern fonts (Oswald for headings, Quicksand for body text).
- Responsive layout for desktop and mobile.

### 🗺️ Card + Map Layout
- **Left:** Scrollable list of park/trail cards. Each card shows name, dog-friendliness, and summary info.
- **Right:** Google Map with custom styling.
- Click a card to center the map on that park/trail and see distance from your location (if enabled).

### 📍 Location & Distance
- Toggle "Show My Location" to display your position on the map.
- Each card shows the distance from your current location.

### 👫 Team Up Social System
- **Team Up** is a dedicated social feature for dog owners to create and join walking groups.
- Access Team Up via the floating button or `/teamup` page.

#### Team Up Page Features:
- **Left:** List of all teams, filterable by dog size (all/small/large).
- **Right:** Map highlights all parks with active teams; selecting a team highlights its park.
- **Bottom Ikon Bar:**
  - Filter teams by dog size (paw = all, 🐶 = small, 🦮 = large).
  - 💬 icon opens a message board for the selected team (local, persistent).
  - ➕ icon opens a form to create a new team.

#### Team Card Features:
- Shows team name, park, avatars, member count, next event, and message.
- **Join** button: Add yourself to the team (avatar = your username initial).
- **Message**: Each team has a persistent message board (localStorage).

#### Team Creation:
- Create a team with: name, park (dropdown), dog size (small/large), message, and avatars.
- All teams and messages are saved locally and persist after refresh.

### 🏷️ Authentication (Local)
- Simple login/register system (localStorage, no backend).
- Username and avatar shown in the top right after login.
- Sign out button.

### 🏞️ Customizable Assets
- Logo, illustration, and paw print can be replaced in `src/assets/`.

---

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Set up Google Maps API key**
   - Create a `.env` file in the root directory:
     ```
     REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```
   - Make sure Maps JavaScript API and Places API are enabled for your key.
3. **Run the app**
   ```bash
   npm start
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `src/App.tsx` — Main layout, logo, Team Up routing, and layout logic
- `src/components/PlaceList.tsx` — Card list for parks/trails (distance, selection, English UI)
- `src/components/Map.tsx` — Google Map, shows markers for selected and team parks
- `src/pages/TeamUpPage.tsx` — Team Up social system (teams, filter, join, message, create)
- `src/pages/Login.tsx`, `src/pages/Register.tsx` — Local login/register
- `src/assets/` — Logo, illustration, paw print, etc.

---

## UI/UX Highlights

- **No sidebar**: Only a centered logo in the top bar for a clean look
- **Team Up**: Social dog-walking events are managed in a dedicated page/modal
- **All text in English**
- **Modern, minimal, brown/beige color scheme**
- **Google Fonts**: Oswald (headings), Quicksand (body)

---

## Customization
- To add real team up events, connect the modal/page to a backend.
- To change the logo, replace `src/assets/Logo/SVG/Logo.svg`.
- To change the illustration or paw print, update the files in `src/assets/`.

---

## License
MIT

## Developer Progress

This project is actively under development. The following criteria are being met for the learning outcome:

- **Features in Progress:**
  - Team Up event creation (currently demo, will support real event creation and joining)
  - Park/trail card filtering and search (planned)
  - User authentication and profile (planned)
- **Unit Tests:**
  - At least one unit test has been written (see `src/__tests__/` or `src/components/__tests__/` for details).
- **README:**
  - This README is kept up to date with the latest features, usage instructions, and development progress.

## Bug or Improvement Reported

- At least one bug or improvement suggestion has been reported using GitHub Issues for this project. This helps track progress and ensures continuous improvement.

## Updated Meeting Note

- **Features Reviewed:**
  - Minimal UI and layout
  - Card/map linking
  - Team Up modal and event cards
- **Feedback:**
  - Approval for clean UI and clear separation of features
  - Suggestions for more interactive map and real event creation
- **Bugs/Suggestions:**
  - Reported: Modal close button not always visible on mobile
  - Suggested: Add search/filter for park/trail cards
- **Reflection on Developer Progress:**
  - Steady progress on core features
  - Responsive to feedback and bug reports
  - README and documentation kept up to date
