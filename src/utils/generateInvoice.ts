import jsPDF from 'jspdf';

interface InvoiceData {
  orderId: string;
  paymentId: string;
  customerDetails: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
  };
  items: Array<{
    name: string;
    weight: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  date: string;
}

export const generateInvoicePDF = (data: InvoiceData): string => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(34, 197, 94); // Green color
  doc.text('AYINI', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE', 20, 35);
  
  // Invoice details
  doc.setFontSize(10);
  doc.text(`Invoice Date: ${data.date}`, 20, 50);
  doc.text(`Order ID: ${data.orderId}`, 20, 60);
  doc.text(`Payment ID: ${data.paymentId}`, 20, 70);
  
  // Customer details
  doc.setFontSize(12);
  doc.text('Bill To:', 20, 90);
  doc.setFontSize(10);
  doc.text(data.customerDetails.name, 20, 100);
  doc.text(data.customerDetails.phone, 20, 110);
  doc.text(`${data.customerDetails.address}`, 20, 120);
  doc.text(`${data.customerDetails.city} - ${data.customerDetails.pincode}`, 20, 130);
  
  // Items table header
  let yPos = 150;
  doc.setFontSize(10);
  doc.text('Item', 20, yPos);
  doc.text('Weight', 80, yPos);
  doc.text('Price', 120, yPos);
  doc.text('Qty', 150, yPos);
  doc.text('Total', 170, yPos);
  
  // Items
  yPos += 10;
  data.items.forEach((item) => {
    doc.text(item.name, 20, yPos);
    doc.text(item.weight, 80, yPos);
    doc.text(`₹${item.price}`, 120, yPos);
    doc.text(item.quantity.toString(), 150, yPos);
    doc.text(`₹${item.price * item.quantity}`, 170, yPos);
    yPos += 10;
  });
  
  // Total
  yPos += 10;
  doc.setFontSize(12);
  doc.text(`Total Amount: ₹${data.total}`, 120, yPos);
  
  // Footer
  yPos += 30;
  doc.setFontSize(10);
  doc.text('Thank you for shopping with Ayini!', 20, yPos);
  doc.text('Contact: bhairaventerprises2025@gmail.com | +91 99444 19859', 20, yPos + 10);
  
  return doc.output('datauristring');
};