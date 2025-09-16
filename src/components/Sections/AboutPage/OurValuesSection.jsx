import { OurValuesCard } from "@/components/common/Card";
import { Award, CheckCircle, Heart, Target } from "lucide-react";

const OurValuesSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction.",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description:
        "Every product goes through rigorous quality checks to meet our high standards before reaching you.",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "We constantly innovate to bring you the latest products and shopping experiences.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our business, from products to customer service.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">Our Values</h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            These core values guide everything we do and shape the experience we
            create for our customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <OurValuesCard
                key={index}
                icon={Icon}
                title={value.title}
                description={value.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurValuesSection;
