import Footer from "@/components/Footer";
import Home from "@/components/pages/Home";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
    </div>
  );
}