import Footer from "@/components/Footer";
import CancellationRefund from "@/components/pages/CancellationRefund";

export default function CancellationRefundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <CancellationRefund />
      </main>
      <Footer />
    </div>
  );
}