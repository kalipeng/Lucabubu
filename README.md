# lucabubu

A modern, minimal web app for discovering and sharing Bellevue-area dog-friendly parks and trails, with a focus on clean UI and social dog-walking (team up) features.

## Features (Detailed)

- **Minimal UI**
  - No text header or sidebar, only a centered logo at the top for a clean, distraction-free look.
  - Blue/white color scheme, modern fonts (Oswald for headings, Quicksand for body text).

- **Card + Map Layout**
  - The main view is split into two sections:
    - **Left:** A scrollable list of park/trail cards. Each card shows a photo, name, dog-friendliness, and summary info.
    - **Right:** A black-and-white styled Google Map.
  - The layout is responsive and adapts to desktop and mobile screens.

- **Expandable Cards**
  - Each card can be clicked to expand and show detailed information, including:
    - Trail/Park name
    - Address
    - Dog-friendliness (allowed, not allowed, leash required)
    - Length & estimated time
    - Difficulty level (with icons)
    - Terrain description
    - Parking info (with icons)
    - Facilities (restroom, water, dog bowl, etc.)
    - Crowd level, nearby cafes, weather tips
    - Dog owner reviews (demo data)
  - Only one card can be expanded at a time.

- **Card/Map Linking**
  - Only the currently expanded card will show a marker on the map.
  - Clicking a card will center the map on the corresponding location and show its marker.
  - If no card is expanded, the map shows no markers.

- **Floating Team Up Button**
  - A round, blue button with a users icon floats at the bottom right of the page.
  - Hover and click effects for modern UX.

- **Team Up Modal**
  - Clicking the Team Up button opens a modal window centered on the screen.
  - The modal displays a list of demo dog-walking team up events (3 by default).
  - Each team up card shows:
    - Time and location (collapsed view)
    - On click, expands to show:
      - Host, dog type, contact, pace, snacks/games, notes
      - A prominent "Join" button (demo: shows alert)
  - Only one team up card can be expanded at a time.
  - The modal can be closed by clicking outside the box.

- **Add Team Up**
  - A + button in the modal's bottom right corner allows users to (demo) add a new team up event (currently shows an alert).

- **English Interface**
  - All UI text, labels, and demo data are in English for international accessibility.

- **Modern Fonts**
  - Oswald is used for headings and section titles.
  - Quicksand is used for all body text and card content.

- **Responsive Design**
  - The layout and all components adapt to different screen sizes, ensuring usability on both desktop and mobile devices.

- **Customizable Assets**
  - Logo, illustration, and paw print can be replaced in `src/assets/`.

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

## Project Structure

- `src/App.tsx` — Main layout, logo, Team Up button/modal, and layout logic
- `src/components/PlaceList.tsx` — Card list for parks/trails (expandable, English UI)
- `src/components/Map.tsx` — Google Map, only shows marker for selected card
- `src/assets/` — Logo, illustration, paw print, etc.

## UI/UX Highlights

- **No sidebar**: Only a centered logo in the top bar for a clean look
- **Team Up**: Social dog-walking events are managed in a floating modal, not mixed with park/trail info
- **All text in English**
- **Modern, minimal, blue/white color scheme**
- **Google Fonts**: Oswald (headings), Quicksand (body)

## Demo Data
- The Team Up modal currently shows 3 demo events. You can expand a card for details and click Join (demo alert).
- The Add (+) button in the modal currently shows a demo alert for creating a new event.

## Customization
- To add real team up events, connect the modal to a backend or local state.
- To change the logo, replace `src/assets/Logo/SVG/Logo.svg`.
- To change the illustration or paw print, update the files in `src/assets/`.

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
