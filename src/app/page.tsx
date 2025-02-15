import Navbar from "@/components/Navbar";
import WeatherDashboard from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen gap-y-4 flex flex-col px-2">
      <Navbar />
      <WeatherDashboard />
      <footer className="border-t backdrop-blur bottom-0 py-4 h-14 min-w-full">
        <div className="container mx-auto px-4 text-gray-400 text-center">
          <p>Welcome to Our Page</p>
        </div>
      </footer>
    </div>
  );
}
