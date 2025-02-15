import Navbar from "@/components/Navbar";
import WeatherDashboard from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen bg-slate-50">
      <Navbar />
      <WeatherDashboard />
      <footer className="border-t backdrop-blur py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Made with Love</p>
        </div>
      </footer>
    </div>
  );
}
