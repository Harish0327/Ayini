import Footer from "@/components/Footer";
import Contact from "@/components/pages/Contact";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}