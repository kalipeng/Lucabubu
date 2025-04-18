# LUCA BUBU: Pet Trail Explorer

*“Find your next favorite walk — tails welcome.”*

## Project Scope
LUCA BUBU is a digital trail map designed to help pet owners in Bellevue discover the best pet-friendly parks and walking paths. The platform curates trails based on verified public data, highlighting key features such as leash zones, pet amenities, walk difficulty, and scenic routes. Whether it's a quick potty break or an extended weekend hike, LUCA BUBU simplifies the search for an ideal trail for you and your furry friend.

## Target Users
- **Dog Owners:** Especially new residents looking for trusted walking spots.
- **Busy Pet Parents:** In need of quick and reliable trail recommendations.
- **Seniors & Families:** Seeking safe and easily navigable paths.
- **Pet Sitters & Dog Walkers:** Requiring dependable, pet-friendly routes.
- **Visitors:** Exploring Bellevue with their pets for leisure and sightseeing.

## Features
- **Interactive Web Map:** Easily browse Bellevue's pet-friendly trails.
- **Trail Filters:** Search by distance, terrain, leash rules, shade, water fountain availability, and more.
- **Icon Markers:** Clearly identify pet-specific amenities like bathrooms, water stations, and dog parks.
- **Bookmark & Log Functionality:** Save your favorite trails and maintain a walking history.
- **Accessibility Info:** Includes ADA-accessible routes wherever available.
- **Verified Data:** All trail and amenity information is sourced from accurate, public data ensuring safe recommendations.

## Timeline
The project runs from **April 11, 2025** to **June 20, 2025**.

| Phase                            | Date Range                 | Duration   | Tasks                                                             |
| -------------------------------- | -------------------------- | ---------- | ----------------------------------------------------------------- |
| **Phase 1: Research & Planning** | April 11 - April 18, 2025  | 1 week     | Gather requirements and compile public data resources             |
| **Phase 2: Design & Prototyping**| April 19 - April 29, 2025  | 1.5 weeks  | Develop user flows, wireframes, and initial UI designs              |
| **Phase 3: Development**         | April 30 - May 20, 2025    | 3 weeks    | Implement interactive map features, filters, and marker systems     |
| **Phase 4: Testing & Refinement**| May 21 - June 3, 2025      | 2 weeks    | Conduct user testing and refine features                          |
| **Phase 5: Deployment & Wrap-up**| June 4 - June 20, 2025     | 2 weeks    | Final deployment, documentation, and post-launch updates           |

# 4/18 update Ver.1
# Lucabubu - Bellevue Dog Parks & Trails Map

A React application that displays dog parks and hiking trails in and around Bellevue, WA.

## Features

- Interactive Google Maps integration
- Black and white map styling
- Search for dog parks and trails within 30 miles of Bellevue
- Detailed information about each location
- Responsive design

## Virtual Environment Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setting up the Virtual Environment

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd lucabubu
   ```

2. Initialize the project and install dependencies:
   ```bash
   npm init -y
   npm install
   ```

3. Install required packages:
   ```bash
   npm install @react-google-maps/api @types/google-maps-react styled-components @types/styled-components
   ```

4. Create a `.env` file in the root directory and add your Google Maps API key:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

### Managing Dependencies

- To add a new package:
  ```bash
  npm install package-name --save
  ```

- To update packages:
  ```bash
  npm update
  ```

- To remove a package:
  ```bash
  npm uninstall package-name
  ```

### Environment Files
- `.env`: Contains environment variables
- `.gitignore`: Specifies files to be ignored by git
  - node_modules/
  - .env
  - build/
  - coverage/
  - .DS_Store
  - Various log files

## Technologies Used

- React
- TypeScript
- Google Maps JavaScript API
- Styled Components

## Requirements

- Node.js
- npm
- Google Maps API key with the following APIs enabled:
  - Maps JavaScript API
  - Places API
  - Geocoding API

## Development

The application uses the following key dependencies:
- @react-google-maps/api: ^2.20.6
- react: ^19.1.0
- react-dom: ^19.1.0
- styled-components: ^6.1.17
- typescript: ^4.9.5

To start development:
1. Ensure all dependencies are installed
2. Set up your Google Maps API key
3. Run `npm start`
4. Open http://localhost:3000 in your browser

## Contact Information
**Team LUCA BUBU**  
Suzy Liu
Kelly Peng Peng906@uw.edu


 🐾
