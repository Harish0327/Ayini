const CancellationRefund = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Cancellation & Refund Policy</h1>
        <p className="text-gray-600 text-center mb-12">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4">1. Order Cancellation</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Before Shipping</h3>
            <p className="mb-4">
              You can cancel your order free of charge within 2 hours of placing it, provided it hasn't been shipped. 
              To cancel, contact us immediately at info@tasteofayini.com or call +91 98765 43210.
            </p>
            
            <h3 className="text-lg font-semibold mb-2">After Shipping</h3>
            <p className="mb-4">
              Once your order is shipped, cancellation is not possible. However, you may return the products 
              as per our return policy outlined below.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">2. Return Policy</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Eligible Returns</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Damaged or defective products</li>
              <li>Wrong items delivered</li>
              <li>Products past expiry date</li>
              <li>Unsealed or tampered packaging</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2">Non-Returnable Items</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Products opened or used</li>
              <li>Items returned after 7 days of delivery</li>
              <li>Products without original packaging</li>
              <li>Perishable items (unless defective)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mb-4">3. Return Process</h2>
          <div className="mb-6">
            <ol className="list-decimal pl-6">
              <li className="mb-2">Contact us within 7 days of delivery</li>
              <li className="mb-2">Provide order number and reason for return</li>
              <li className="mb-2">We will arrange pickup or provide return instructions</li>
              <li className="mb-2">Pack items in original packaging</li>
              <li className="mb-2">Refund processed within 5-7 business days after verification</li>
            </ol>
          </div>

          <h2 className="text-2xl font-semibold mb-4">4. Refund Policy</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Refund Methods</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Original payment method (for online payments)</li>
              <li>Bank transfer (for cash on delivery orders)</li>
              <li>Store credit (optional, with 10% bonus value)</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2">Refund Timeline</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Credit/Debit Cards: 5-7 business days</li>
              <li>Net Banking: 3-5 business days</li>
              <li>UPI/Wallets: 1-3 business days</li>
              <li>Bank Transfer: 3-5 business days</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mb-4">5. Exchange Policy</h2>
          <p className="mb-6">
            We offer exchanges for damaged or defective products only. Exchanges for different products 
            or sizes are not available. The exchange process follows the same timeline as returns.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Shipping Charges</h2>
          <div className="mb-6">
            <ul className="list-disc pl-6">
              <li>Return shipping is free for damaged/defective products</li>
              <li>Customer bears return shipping cost for other returns</li>
              <li>Original shipping charges are non-refundable (except for our errors)</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mb-4">7. Quality Guarantee</h2>
          <p className="mb-6">
            We guarantee the quality and freshness of all our products. If you're not satisfied with 
            the quality, contact us within 7 days for a full refund or replacement.
          </p>

          <h2 className="text-2xl font-semibold mb-4">8. Bulk Orders</h2>
          <p className="mb-6">
            Special terms apply for bulk orders (above ₹5000). Please contact us directly for 
            cancellation and refund policies on bulk purchases.
          </p>

          <h2 className="text-2xl font-semibold mb-4">9. Contact for Returns</h2>
          <p className="mb-6">
            For returns and refunds, contact us at:
            <br />
            Email: info@tasteofayini.com
            <br />
            Phone: +91 98765 43210
            <br />
            Customer Service Hours: Monday-Saturday, 9:00 AM - 7:00 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;