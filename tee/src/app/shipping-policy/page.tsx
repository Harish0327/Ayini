import Footer from "@/components/Footer";
import ShippingPolicy from "@/components/pages/ShippingPolicy";

export default function ShippingPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <ShippingPolicy />
      </main>
      <Footer />
    </div>
  );
}