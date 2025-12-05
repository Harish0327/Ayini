"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Database operations moved to API routes
import { format } from "date-fns";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight?: string;
  image?: string;
}

interface Order {
  _id?: string;
  id?: string;
  order_number: string;
  user_id: string;
  customer_name?: string;
  customer_email?: string;
  total_amount: number;
  status?: string;
  payment_status?: string;
  payment_id?: string;
  phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  created_at?: string;
  updated_at?: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing": return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped": return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered": return "bg-green-100 text-green-800 border-green-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "paid": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.order_number}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.customer_name || 'Unknown Customer'} ({order.customer_email || order.phone})
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.created_at ? format(new Date(order.created_at), "PPP 'at' p") : 'Date not available'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className={getStatusColor(order.status || 'pending')}>
                    {(order.status || 'pending').toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className={getPaymentStatusColor(order.payment_status || 'completed')}>
                    {order.payment_status === 'completed' ? 'PAID' : (order.payment_status || 'PAID').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Customer Details</h4>
                  <p className="text-sm text-gray-600">
                    <strong>Name:</strong> {order.customer_name || 'Not provided'}<br />
                    <strong>Email:</strong> {order.customer_email || 'Not provided'}<br />
                    <strong>Phone:</strong> {order.phone}<br />
                    <strong>Address:</strong> {order.shipping_address}<br />
                    <strong>City:</strong> {order.shipping_city}<br />
                    <strong>State:</strong> {order.shipping_state}<br />
                    <strong>Pincode:</strong> {order.shipping_pincode}<br />
                    <strong>Payment ID:</strong> {order.payment_id}<br />
                    <strong>Payment Status:</strong> <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.payment_status === 'completed' ? 'bg-green-100 text-green-800' : 
                      order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.payment_status === 'completed' ? 'PAID' : (order.payment_status || 'PAID').toUpperCase()}
                    </span>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Order Summary</h4>
                  <div className="border-t pt-2 mt-2">
                    <div className="font-semibold flex justify-between">
                      <span>Total Amount:</span>
                      <span className={order.payment_status === 'completed' ? 'text-green-600' : 'text-red-600'}>
                        ₹{order.total_amount} {order.payment_status === 'completed' ? '✓ PAID' : '✗ UNPAID'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Select
                  value={order.status || 'pending'}
                  onValueChange={(value) => updateOrderStatus(order._id || order.id || order.order_number, value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {orders.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No orders found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Orders;