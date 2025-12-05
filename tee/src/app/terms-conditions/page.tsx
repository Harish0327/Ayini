import Footer from "@/components/Footer";
import TermsConditions from "@/components/pages/TermsConditions";

export default function TermsConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <TermsConditions />
      </main>
      <Footer />
    </div>
  );
}