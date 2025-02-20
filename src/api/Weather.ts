import type {
  WeatherData,
  ForecastData,
  Coordinates,
  GeocodingResponse,
} from "./types";

class WeatherAPI {
  private createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
      appid: `${process.env.NEXT_PUBLIC_API_KEY}`,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }
    return response.json();
  }

  async getCurrentWeather(
    { lat, lon }: Coordinates,
    units: string
  ): Promise<WeatherData> {
    const url = this.createUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: units,
    });
    return this.fetchData<WeatherData>(url);
  }

  async getForecast(
    { lat, lon }: Coordinates,
    units: string
  ): Promise<ForecastData> {
    const url = this.createUrl(`${process.env.NEXT_PUBLIC_BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: units,
    });
    return this.fetchData<ForecastData>(url);
  }

  async getGeoCodeByCityName(
    cityname: string,
    units: string
  ): Promise<GeocodingResponse[]> {
    console.log(cityname, units);
    const url = this.createUrl(`${process.env.NEXT_PUBLIC_GEO}/direct`, {
      q: cityname,
      units: units,
      limit: "1",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
  async getGeoCodeByPinCode(
    pincode: string,
    units: string
  ): Promise<GeocodingResponse> {
    const url = this.createUrl(`${process.env.NEXT_PUBLIC_GEO}/zip`, {
      zip: pincode,
      units: units,
      limit: "1",
    });
    return this.fetchData<GeocodingResponse>(url);
  }
}

export const weatherAPI = new WeatherAPI();
