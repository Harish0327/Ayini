"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);



  const handleCheckout = async () => {
    try {
      console.log('Starting checkout process...');
      console.log('Cart total:', getCartTotal());
      
      // Create order on backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getCartTotal()
        })
      });
      
      console.log('Create order response status:', response.status);
      const order = await response.json();
      console.log('Order response:', order);
      
      if (!response.ok) {
        throw new Error(order.error || order.details || 'Failed to create order');
      }
      
      if (!order.id) {
        throw new Error('Order ID not received from server');
      }
      
      // Check if Razorpay is loaded
      if (typeof (window as any).Razorpay === 'undefined') {
        throw new Error('Razorpay SDK not loaded. Please refresh the page and try again.');
      }
      
      console.log('Initializing Razorpay with options:', {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id
      });
      
      // Initialize Razorpay
      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'SpiceHeritage',
        description: 'Purchase of authentic spices and products',
        order_id: order.id,
        config: {
          display: {
            blocks: {
              card: {
                name: 'Pay by Card',
                instruments: [
                  { method: 'card' },
                  { method: 'upi' },
                  { method: 'netbanking' }
                ]
              }
            },
            sequence: ['block.card'],
            preferences: {
              show_default_blocks: true
            }
          }
        },
        handler: async function (response: any) {
          try {
            console.log('Payment successful, verifying...', response);
            
            // Verify payment on backend
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            
            const verifyResult = await verifyResponse.json();
            console.log('Verification result:', verifyResult);
            
            if (verifyResult.success) {
              await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  order_number: response.razorpay_order_id,
                  user_id: customerDetails.phone,
                  customer_name: customerDetails.name,
                  customer_email: customerDetails.email,
                  total_amount: getCartTotal(),
                  status: 'paid',
                  payment_status: 'completed',
                  payment_id: response.razorpay_payment_id,
                  phone: customerDetails.phone,
                  shipping_address: customerDetails.address,
                  shipping_city: customerDetails.city,
                  shipping_state: 'Tamil Nadu',
                  shipping_pincode: customerDetails.pincode
                })
              });
              
              // Generate PDF invoice
              const { generateInvoicePDF } = await import('@/utils/generateInvoice');
              const pdfData = generateInvoicePDF({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                customerDetails,
                items: cartItems.map(item => ({
                  name: item.name,
                  weight: item.weight || '',
                  price: item.price,
                  quantity: item.quantity
                })),
                total: getCartTotal(),
                date: new Date().toLocaleDateString()
              });
              
              // Create downloadable PDF
              const link = document.createElement('a');
              link.href = pdfData;
              link.download = `Ayini_Invoice_${response.razorpay_order_id}.pdf`;
              link.click();
              
              // Send WhatsApp message with invoice info
              const whatsappMessage = `🧾 *AYINI INVOICE*\n\nYour invoice has been generated!\n\nOrder ID: ${response.razorpay_order_id}\nTotal: ₹${getCartTotal()}\n\nThank you for shopping with Ayini! 🙏`;
              const whatsappUrl = `https://wa.me/${customerDetails.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
              window.open(whatsappUrl, '_blank');
              
              alert('Payment successful! Invoice PDF downloaded and WhatsApp opened. Order ID: ' + response.razorpay_order_id);
              window.location.href = '/order-success';
            } else {
              console.error('Payment verification failed:', verifyResult);
              alert('Payment verification failed: ' + (verifyResult.message || 'Unknown error'));
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone
        },
        theme: {
          color: '#16a34a'
        },
        modal: {
          ondismiss: function() {
            alert('Payment cancelled');
          }
        }
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        alert('Payment failed: ' + response.error.description);
      });
      
      console.log('Opening Razorpay checkout...');
      rzp.open();
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert('Failed to initiate payment: ' + (error.message || 'Unknown error'));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some delicious spices to get started!</p>
          <Link href="/shop">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.weight}`} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                  {item.weight && (
                    <p className="text-sm text-gray-500">Weight: {item.weight}</p>
                  )}
                  <p className="text-green-600 font-bold text-lg">₹{item.price}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.weight)}
                    className="p-1 border border-gray-300 rounded-md hover:border-green-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.weight)}
                    className="p-1 border border-gray-300 rounded-md hover:border-green-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id, item.weight)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{getCartTotal()}</span>
              </div>
            </div>

            {!showCheckout ? (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mb-3"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <div className="space-y-4">
                <h3 className="font-semibold">Customer Details</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-2 border rounded"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full p-2 border rounded"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                />
                <textarea
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-2 border rounded"
                  value={customerDetails.city}
                  onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full p-2 border rounded"
                  value={customerDetails.pincode}
                  onChange={(e) => setCustomerDetails({...customerDetails, pincode: e.target.value})}
                />
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  onClick={handleCheckout}
                  disabled={!customerDetails.name || !customerDetails.phone}
                >
                  Pay Now
                </Button>
              </div>
            )}
            
            <Link href="/shop">
              <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;