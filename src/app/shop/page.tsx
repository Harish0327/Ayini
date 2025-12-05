import Footer from "@/components/Footer";
import Shop from "@/components/pages/Shop";

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Shop />
      </main>
      <Footer />
    </div>
  );
}