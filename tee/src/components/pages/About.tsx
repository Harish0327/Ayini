const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Ayini</h1>
        <div className="prose prose-lg mx-auto">
          <p className="text-lg text-muted-foreground mb-6">
            Welcome to Ayini, where traditional Indian spices meet modern convenience. 
            Our journey began with a passion for preserving authentic flavors and 
            bringing the essence of Indian cuisine to your kitchen.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-6">
            Founded with love and dedication to authentic Indian flavors, Ayini 
            specializes in handcrafted spice blends, traditional podi varieties, 
            and premium masala powders. Each product is carefully prepared using 
            time-honored recipes passed down through generations.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            To bring the authentic taste of traditional Indian spices to homes 
            worldwide, while maintaining the highest quality standards and 
            supporting local farmers and communities.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Quality Promise</h2>
          <p>
            We source our spices directly from trusted farmers, ensuring freshness 
            and authenticity in every blend. Our products are made in small batches 
            to maintain quality and preserve the natural flavors that make Indian 
            cuisine so special.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;