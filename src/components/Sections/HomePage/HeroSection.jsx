import { useEffect, useState } from "react";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Discover Amazing Products",
      subtitle: "Find the perfect items for your lifestyle",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    },
    {
      title: "Quality & Style Combined",
      subtitle: "Premium products at competitive prices",
      image:
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    },
    {
      title: "Shop with Confidence",
      subtitle: "Trusted by thousands of satisfied customers",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroSlides[currentSlide].image}
          alt="Hero"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {heroSlides[currentSlide].title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          {heroSlides[currentSlide].subtitle}
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
            Explore Products
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
              currentSlide === index ? "bg-white" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
