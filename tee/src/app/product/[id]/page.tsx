import Footer from "@/components/Footer";
import ProductDetail from "@/components/pages/ProductDetail";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <ProductDetail id={id} />
      </main>
      <Footer />
    </div>
  );
}