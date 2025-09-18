import { ContactInformationCard } from "@/components/common/Card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+62 812-3456-7890"],
    description: "Mon-Fri 9AM-6PM, Sat 9AM-2PM",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["hello@catalogstore.com", "support@catalogstore.com"],
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["Bandung, Indonesia"],
    description: "Visit our office Mon-Fri 9AM-5PM",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 9:00 AM - 2:00 PM",
    ],
    description: "Sunday: Closed",
  },
];

const ContactInformationSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">
            Contact Information
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Multiple ways to reach us - choose what works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <ContactInformationCard key={index} icon={Icon} info={info} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInformationSection;
