import { Button } from "@/components/common/Button";
import { Link } from "react-router";

const CallToActionSection = () => {
  return (
    <section className="bg-gradient-to-r from-surface to-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-heading mb-6">
          Ready to Experience the Difference?
        </h2>
        <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers who have made CatalogStore their
          trusted shopping destination
        </p>
        <div className="space-x-4">
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
