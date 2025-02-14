import Navbar from "@/components/Navbar";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <SearchInput />
      </main>
    </div>
  );
}
