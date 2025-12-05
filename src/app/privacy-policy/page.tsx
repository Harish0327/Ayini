import Footer from "@/components/Footer";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <PrivacyPolicy />
      </main>
      <Footer />
    </div>
  );
}