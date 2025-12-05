import Footer from "@/components/Footer";
import Cart from "@/components/pages/Cart";

export default function CartPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Cart />
      </main>
      <Footer />
    </div>
  );
}