import { FeatureCard } from "@/components/common/Card";
import { Search, ShoppingBag, Star } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-bakground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            We provide the best shopping experience with quality products and
            excellent service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={ShoppingBag}
            title="Quality Products"
            description="Carefully curated selection of high-quality products from trusted
              brands."
          />

          <FeatureCard
            icon={Search}
            title="Easy Search"
            description="Find exactly what you're looking for with our advanced search
              features."
          />

          <FeatureCard
            icon={Star}
            title="Customer Satisfaction"
            description="Thousands of happy customers with excellent ratings and reviews."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
