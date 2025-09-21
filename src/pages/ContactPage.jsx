import { Send, CheckCircle } from "lucide-react";
import HeroSection from "@/components/Sections/ContactPage/HeroSection";
import { Button } from "@/components/common/Button";
import ContactInformationSection from "@/components/Sections/ContactPage/ContactInformationSection";
import { set, useForm } from "react-hook-form";
import { useState } from "react";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  const onSubmit = (data) => {
    const response = fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const error = await response.json();
          error.errors.forEach((err) => {
            setError(err.param, {
              type: "server",
              message: err.msg,
            });
          });
        }
        return response.json();
      })
      .then((data) => {
        setStatus(data.message);
      })
      .catch((error) => {
        setStatus(error.message);
      });
    // reset();
  };

  // if (isSubmitted) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
  //         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
  //           <CheckCircle className="h-8 w-8 text-green-600" />
  //         </div>
  //         <h2 className="text-2xl font-bold text-gray-900 mb-4">
  //           Message Sent Successfully!
  //         </h2>
  //         <p className="text-gray-600 mb-6">
  //           Thank you for contacting us. We'll get back to you within 24 hours.
  //         </p>
  //         <button
  //           onClick={() => setIsSubmitted(false)}
  //           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
  //         >
  //           Send Another Message
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Information Section*/}
      <ContactInformationSection />

      {/* Contact Form & Map */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-surface rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-heading mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        {...register("phone", {
                          required: "Phone is required",
                          minLength: {
                            value: 10,
                            message: "Phone must be at least 10 digits",
                          },
                          maxLength: {
                            value: 13,
                            message: "Phone must be at most 13 digits",
                          },
                          pattern: {
                            value: /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/,
                            message: "Invalid Indonesian phone number",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                        placeholder="+62 "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Category
                      </label>
                      <select
                        {...register("category", {
                          required: "Category is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                      >
                        <option value="GENERAL_INQUIRY">General Inquiry</option>
                        <option value="CUSTOMER_SUPPORT">
                          Customer Support
                        </option>
                        <option value="SALES_QUESTION">Sales Question</option>
                        <option value="PARTNERSHIP">Partnership</option>
                        <option value="FEEDBACK">Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      {...register("subject", {
                        required: "Subject is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      type="text"
                      {...register("message", {
                        required: "Message is required",
                      })}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg  resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <Button
                    width="full"
                    type="submit"
                    // disabled={isSubmitting}
                    className="flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-background mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
