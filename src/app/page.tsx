import Navbar from "@/components/Navbar";
import WeatherDashboard from "@/components/WeatherDashboard";

export default function Home() {
  return (
    <div className="flex flex-col px-2">
      <Navbar />
      <main className="min-h-screen container mx-auto px-4 py-8">
        <WeatherDashboard />
      </main>
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 bottom-0 py-4 h-14 sticky min-w-full">
        <div className="container mx-auto px-4 text-gray-400 text-center">
          <p>Welcome to Our Page</p>
        </div>
      </footer>
    </div>
  );
}
