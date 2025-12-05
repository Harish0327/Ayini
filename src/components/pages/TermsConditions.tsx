const TermsConditions = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Terms & Conditions</h1>
        <p className="text-gray-600 text-center mb-12">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing and using the Taste of Ayini website, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Products and Services</h2>
          <p className="mb-6">
            Taste of Ayini offers authentic Indian spices, spice blends, and related food products. All products 
            are subject to availability. We reserve the right to discontinue any product at any time.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. Ordering and Payment</h2>
          <p className="mb-4">When you place an order with us, you agree to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Provide accurate and complete information</li>
            <li>Pay all charges incurred by you or any users of your account</li>
            <li>Accept responsibility for all orders placed using your account</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">4. Pricing</h2>
          <p className="mb-6">
            All prices are listed in Indian Rupees (INR) and are subject to change without notice. 
            We reserve the right to modify prices at any time. The price charged will be the price 
            in effect at the time of order placement.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
          <p className="mb-6">
            We will make every effort to deliver products within the estimated timeframe. However, 
            delivery times are estimates and not guaranteed. Risk of loss passes to you upon delivery.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Returns and Refunds</h2>
          <p className="mb-6">
            Please refer to our separate Cancellation & Refund Policy for detailed information 
            about returns, exchanges, and refunds.
          </p>

          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="mb-6">
            Taste of Ayini shall not be liable for any indirect, incidental, special, consequential, 
            or punitive damages resulting from your use of our products or services.
          </p>

          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p className="mb-6">
            These terms and conditions are governed by and construed in accordance with the laws of India. 
            Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
          </p>

          <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
          <p className="mb-6">
            For questions about these Terms & Conditions, please contact us at:
            <br />
            Email: info@tasteofayini.com
            <br />
            Phone: +91 98765 43210
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;