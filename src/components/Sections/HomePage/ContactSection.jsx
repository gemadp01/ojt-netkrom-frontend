import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            We'd love to hear from you. Contact us anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Phone className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+62 812-3456-7890</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <Mail className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">hello@catalogstore.com</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <MapPin className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Location
            </h3>
            <p className="text-gray-600">Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
