import { ContactCard } from "@/components/common/Card";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">Get in Touch</h2>
          <p className="text-xl text-text-secondary">
            We'd love to hear from you. Contact us anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ContactCard
            icon={Phone}
            iconSize="h-12 w-12"
            title="Phone"
            description="+62 812-3456-7890"
          />

          <ContactCard
            icon={Mail}
            iconSize="h-12 w-12"
            title="Email"
            description="hello@catalogstore.com"
          />

          <ContactCard
            icon={MapPin}
            iconSize="h-12 w-12"
            title="Address"
            description="Bandung, Indonesia"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
