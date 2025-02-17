This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Live Preview

Open [https://weather-forecast-app-ruddy.vercel.app/](https://weather-forecast-app-ruddy.vercel.app/) with your browser to see the result.

# Navbar Features

- **Weather Icon**: Displays the weather Icon.
- **Navigation Icon**: Responds to user interaction.
  - If the user denies location access, an error message is shown.
  - If the user allows access, an API call is made based on latitude, longitude, and temperature category
  - Any errors from the API response will show a error message.
- **Dark Mode**: Integrated with ShadCN UI Theme Provider, ensuring that dark mode persists across browser tabs.

# Data Layer

- **Page Component**: Utilized for server-side rendering (SSR) to fetch data for the default location.
- **Weather Component**:

  - Updates the default location in Redux which comes from SSR.
  - Monitors the user's network status and handles errors.
  - Displays a skeleton component while loading.
  - If an error exist display Snackbar

  - **SearchCity**:

    - Allows users to search based on different search options.
    - The API request is dynamically updated based on the selected search option, displaying the current weather.

  - **SearchByOptions**:
    - Enables location search by city name, postal code and country code.
    - Users can toggle between these search options.

- **CurrentWeather**: Displays today's weather conditions.
- **Weather Details**:
  - Shows information such as today's sunrise, sunset, humidity, pressure, wind direction, and wind speed.
- **HourlyTemp**: Displays hourly temperature data.

- **ForecastData**: Shows the weather forecast for the next 5 days.

# Footer

- Displays a message at the bottom of the page.
