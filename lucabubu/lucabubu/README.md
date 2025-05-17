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
