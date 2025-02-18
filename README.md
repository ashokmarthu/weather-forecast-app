## Live Preview

Click/Open URL [https://weather-forecast-app-ruddy.vercel.app/](https://weather-forecast-app-ruddy.vercel.app/) with your browser to see the result.

# Clone Repositry

 - git clone <repo_url>
- add origin.
 - cd <project_directory>
 - npm install

## Project Structure

The project is organized into several main folders, each responsible for different aspects of the application:

```
src/
├── api/
│   └── Weather.ts         # API calls for fetching weather and forecast data
|   └── types.ts           #  maintaining types for weather.ts
├── app/
|    └── layout.tsx        # Main entry page for the app  [Navbar, children as Page.tsx, Footer ]
|    └── Page.tsx          # Fetch SSR will be passed to dashboard component
├── components/
|   |     └── utils/constants.tsx  # Maintaing constants 
|   |     └── utils/util.tsx       # Maintaing reusable functions
│   ├── WeatherDashboard.tsx  # Main weather dashboard component
│   ├── Navbar.tsx            # Features Includes weather Icon, Navigation Button, Dark/Lightmode, Temperature categories
│   ├── Footer.tsx            # Footer Message
│   ├── WeatherDetails.tsx    # Component displaying detailed weather info
│   ├── HourlyTemp.tsx        # Component for displaying hourly temperatures
│   ├── CurrentWeather.tsx    # Component displaying current weather
│   ├── Skeleton.tsx          # Skeleton loader for UI
│   ├── SnackBar.tsx          # Snackbar component for displaying error messages
│   ├── ForecastData.tsx      # Component displaying forecast data
│   ├── SearchCity.tsx        # Search bar component for searching cities
│   ├── SearchByOptions.tsx   # Component for searching by options (e.g., cityname, pincode with countryname)
│   └── Offline.tsx           # Offline detection component
|   └── Darkmode.tsx          # To Toggele between dark mode and light mode
|   └── ErrorBoundary.tsx     # A class component that catches the error between render cycle and fall back UI displayed
|   └── Navigation.tsx        # Componenet for tracking user coordinates while user Interaction
|   └── Temperature.tsx       # Componenet for toggling between temperature categories
├── store/
│   ├── Store.ts   # configuring the store with all the slices data
│   ├── weatherDataSlice.ts   # Redux slice for managing weather data state
│   ├── forecastDataSlice.ts  # Redux slice for managing forecast data state
│   └── userSelectionSlice.ts # Redux slice for managing user selection (e.g., cityname,pincodewithCountrycode)

.env   # For Maintaing API URLS & API KEY

```

## Design Decisions

 Below are the key design decisions that were made during the development of this project:

### 1. Component Structuring

**Separation of Concerns**: Each component is responsible for a specific task, which ensures a clean and modular codebase and also helps in maintaining and testing independently.

- **WeatherDashboard**: The main component that consolidates all other components and organizes the UI layout.
- **WeatherDetails, HourlyTemp, ForecastData, CurrentWeather**: These smaller components display different parts of the weather data, improving reusability and maintainability.
- **Skeleton**: Displays a loading state while data is being fetched.
- **SnackBar**: Shows error messages to the user in case of issues.
- **SearchCity, SearchByOptions**: Allow users to search for weather data based on different criteria.
- **Offline**: Displays a Fallbac kUi when the app is offline.

### 2. State Management

**Redux** is used for managing the global state of the app. This allows for predictable state management and a centralized place to store data that can be accessed throughout the app. we can also avoid props drilling as well

- **weatherDataSlice**: Stores the current weather data.
- **forecastDataSlice**: Stores the forecast data.
- **userSelectionSlice**: Stores user preferences like temperature units (Celsius/Fahrenheit) and search criteria, units


### 3. Data Handling Strategies

**Fetching Data**: Weather and forecast data are fetched asynchronously from the weather API. The API requests are handled concurrently using `Promise.all()`, improving performance by fetching both sets of data at the same time.

**Error Handling**: Errors are captured and displayed using the `SnackBar` component. If there is an issue with the API call or the user's network connection, the app will provide feedback through this component.

**Offline Handling**: The app detects when the user goes offline using `navigator.onLine` and shows an `Offline` component to inform the user.




<p align="center">
  <img src="https://github.com/user-attachments/assets/27ffb4c2-0e3d-4fee-86d5-fe5947397979" alt="diagram"/>
</p>


