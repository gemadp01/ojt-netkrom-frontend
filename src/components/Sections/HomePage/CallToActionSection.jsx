import { Button } from "@/components/common/Button";
import { Link } from "react-router";

const CallToActionSection = () => {
  return (
    <section className="bg-gradient-to-r from-surface to-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-heading mb-6">
          Ready to Start Shopping?
        </h2>
        <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers and discover amazing products
          today
        </p>
        <Link to="/products">
          <Button>Browse Catalog</Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;
