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
|    └── layout.tsx        # Main entry page for the app  (Wrapped with ErrorBoundary,store)
|    └── Page.tsx          # Fetch SSR will be passed to dashboard component
├── components/
|     └── utils/constants.tsx  # Maintaing constants 
|     └── utils/util.tsx       # Maintaing reusable functions
│     └── WeatherDashboard.tsx  # Main weather dashboard component
│         └── Offline.tsx                  # Offline detection component
│         └── Navbar.tsx                   # Features Includes weather Icon, Navigation Button, Dark/Lightmode, Temperature categories
|              └── Navigation.tsx               # Componenet for tracking user coordinates while user Interaction
|              └── Darkmode.tsx                 # To Toggele between dark mode and light mode
|              └── Temperature.tsx              # Componenet for toggling between temperature categories
│              └──  SearchCity.tsx              # Search bar component for searching cities
│              └── SearchByOptions.tsx          # Component for searching by options (e.g., cityname, pincode with countryname)  
│         └── FavouriteLocations.tsx       # List of all locations Marked as faviourtes
│               └── FavouriteCity.tsx            # Component for showing each location info 
│         └── WeatherContent.tsx           # Features Includes Places Marked as Favourite
|               └──MarkFavourite.tsx             # Component for Marking location as Favourite
│               └──WeatherDetails.tsx            # Component displaying detailed weather info
│               └── HourlyTemp.tsx               # Component for displaying hourly temperatures
│               └── CurrentWeather.tsx           # Component displaying current weather
│               └── Skeleton.tsx                 # Skeleton loader for UI
│               └── SnackBar.tsx                 # Snackbar component for displaying error messages
│               └── ForecastData.tsx             # Component displaying forecast data
├── store/
│   ├── Store.ts   # configuring the store with all the slices data
│        └── weatherDataSlice.ts   # Redux slice for managing weather data state
│        └── userSelectionSlice.ts # Redux slice for managing user selection (e.g., cityname/pincodewithCountrycode,coordinates,units,favourites)
├── .env                    # For maintaining API URLs & API KEY

```

## Design Decisions

 Below are the key design decisions that were made during the development of this project:

### 1. Component Structuring

**Separation of Concerns**: Each component is responsible for a specific task, which ensures a clean and modular codebase and also helps in maintaining and testing independently.

- **WeatherDashboard**: The main component that consolidates all other components and organizes the UI layout.
- **WeatherDetails, HourlyTemp, ForecastData, CurrentWeather**: These smaller components display different parts of the weather data, improving reusability and 
   maintainability.
- **Skeleton**: Displays a loading state while data is being fetched.
- **SnackBar**: Shows error messages to the user in case of issues.
- **Offline**: Displays a Fallbac kUi when the app is offline.
- **MarkFavourite.tsx**: Allows users to mark a location as a favorite. This feature ensures users can easily access weather data for their preferred locations.
- **FavouriteLocations.tsx** : Displays a list of all locations marked as favorites. Users can easily access weather information for their favorite cities without needing 
     to search for them repeatedly.
- **Navbar.tsx** The **Navbar** is the navigation bar at the top of the page, providing quick access to essential features. The navbar includes:
     - **Weather Icon**: Displays a weather Logo
     - **Navigation Button**: Allows users to get current weather info of ther location.
     - **Dark/Light Mode Toggle**: Users can toggle between dark and light mode themes.
     - **Temperature Categories Toggle**: Allows users to switch between Celsius and Fahrenheit temperature units.
     - **SearchCity, SearchByOptions**: Allow users to search for weather data based on different criteria.

### 2. State Management

**Redux** is used for managing the global state of the app. This allows for predictable state management and a centralized place to store data that can be accessed throughout the app. we can also avoid props drilling as well

- **weatherDataSlice**: Stores the current weather data.
- **userSelectionSlice**: Stores user preferences like temperature units (Celsius/Fahrenheit) and search criteria, units,coordinates
- 
**State Persistence with Redux Persist**
To ensure that user preferences perist across page reloads or app restarts, Redux Persist is used. This library allows the Redux store to be persisted in local storage

### 3. Data Handling Strategies

**Fetching Data**: Weather and forecast data are fetched asynchronously from the weather API. The API requests are handled concurrently using `Promise.all()`, improving performance by fetching both sets of data at the same time.

**Error Handling**: Errors are captured and displayed using the `SnackBar` component. If there is an issue with the API call or the user's network connection, the app will provide feedback through this component.

**Offline Handling**: The app detects when the user goes offline using `navigator.onLine` and shows an `Offline` component to inform the user.

### 4. User Interface/Experience
**Dark/Light Mode**: A Dark/Light mode toggle is implemented to allow users to customize the appearance of the app according to their preference, providing a more comfortable viewing experience.

**Responsive Design**: The app is designed to be mobile-friendly and adjusts its layout based on the user's screen size, ensuring a smooth experience across devices.

**Temperature Units** Toggle: Users can switch between Celsius and Fahrenheit units for temperature display


