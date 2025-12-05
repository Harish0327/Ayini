import Footer from "@/components/Footer";
import ProductDetail from "@/components/pages/ProductDetail";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <ProductDetail id={params.id} />
      </main>
      <Footer />
    </div>
  );
}