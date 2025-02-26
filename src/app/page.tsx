import { weatherAPI } from "@/api/Weather";
import WeatherDashboard from "@/components/WeatherDashboard";

export default async function Page() {
  const coord = { lat: 28.6139, lon: 77.209 };
  try {
    const [weatherRes, foreCastRes] = await Promise.all([
      weatherAPI.getCurrentWeather(coord),
      weatherAPI.getForecast(coord),
    ]);
    return (
      <WeatherDashboard
        weatherRes={weatherRes}
        foreCastRes={foreCastRes}
        hasError=""
      />
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return (
      <WeatherDashboard
        weatherRes={null}
        foreCastRes={null}
        hasError={errorMessage}
      />
    );
  }
}
