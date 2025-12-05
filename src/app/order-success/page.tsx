import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8">
        <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Successful!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link href="/shop">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}