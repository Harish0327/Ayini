const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Shipping Policy</h1>
        <p className="text-gray-600 text-center mb-12">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4">1. Shipping Areas</h2>
          <p className="mb-6">
            Taste of Ayini currently ships to all major cities and towns across India. We are continuously 
            expanding our delivery network to serve more locations.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. Delivery Timeframes</h2>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Metro Cities (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad)</h3>
            <p className="mb-4">2-3 business days</p>
            
            <h3 className="text-lg font-semibold mb-2">Tier 1 Cities</h3>
            <p className="mb-4">3-5 business days</p>
            
            <h3 className="text-lg font-semibold mb-2">Tier 2 & Tier 3 Cities</h3>
            <p className="mb-4">5-7 business days</p>
            
            <h3 className="text-lg font-semibold mb-2">Remote Areas</h3>
            <p className="mb-4">7-10 business days</p>
          </div>

          <h2 className="text-2xl font-semibold mb-4">3. Shipping Charges</h2>
          <div className="mb-6">
            <ul className="list-disc pl-6">
              <li>Free shipping on orders above ₹500</li>
              <li>₹50 shipping charge for orders below ₹500</li>
              <li>Express delivery available for ₹100 extra (1-2 days in metro cities)</li>
              <li>Cash on Delivery available with ₹25 additional charge</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold mb-4">4. Order Processing</h2>
          <p className="mb-6">
            Orders are processed within 24 hours of receipt (excluding weekends and holidays). 
            You will receive a confirmation email with tracking information once your order is shipped.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. Packaging</h2>
          <p className="mb-6">
            All products are carefully packaged to ensure freshness and prevent damage during transit. 
            We use food-grade packaging materials and seal all spice products to maintain quality.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. Tracking Your Order</h2>
          <p className="mb-6">
            Once your order is shipped, you will receive a tracking number via email and SMS. 
            You can track your package status on our website or the courier partner's website.
          </p>

          <h2 className="text-2xl font-semibold mb-4">7. Delivery Issues</h2>
          <p className="mb-4">If you experience any delivery issues:</p>
          <ul className="list-disc pl-6 mb-6">
            <li>Contact us within 24 hours of expected delivery date</li>
            <li>Provide your order number and tracking details</li>
            <li>We will investigate and resolve the issue promptly</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">8. Address Changes</h2>
          <p className="mb-6">
            Address changes are only possible before the order is shipped. Once shipped, 
            address modifications may incur additional charges or delays.
          </p>

          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="mb-6">
            For shipping-related queries, contact us at:
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

export default ShippingPolicy;