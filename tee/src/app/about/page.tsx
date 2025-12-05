import Footer from "@/components/Footer";
import About from "@/components/pages/About";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <About />
      </main>
      <Footer />
    </div>
  );
}