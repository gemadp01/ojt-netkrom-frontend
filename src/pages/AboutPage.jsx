import CallToActionSection from "@/components/Sections/AboutPage/CallToActionSection";
import HeroSection from "@/components/Sections/AboutPage/HeroSection";
import OurTeamSection from "@/components/Sections/AboutPage/OurTeamSection";
import OurValuesSection from "@/components/Sections/AboutPage/OurValuesSection";

const AboutPage = () => {
  // const milestones = [
  //   {
  //     year: "2014",
  //     event:
  //       "CatalogStore founded with a vision to democratize quality shopping",
  //   },
  //   {
  //     year: "2016",
  //     event:
  //       "Reached 1,000 satisfied customers and expanded product categories",
  //   },
  //   {
  //     year: "2018",
  //     event: "Launched mobile app and introduced premium membership program",
  //   },
  //   {
  //     year: "2020",
  //     event:
  //       "Adapted to pandemic with enhanced safety measures and contactless delivery",
  //   },
  //   {
  //     year: "2022",
  //     event:
  //       "Achieved 50,000+ customers milestone and opened distribution centers",
  //   },
  //   {
  //     year: "2024",
  //     event:
  //       "Launched AI-powered recommendation engine and sustainability initiative",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Our Values */}
      <OurValuesSection />

      {/* Our Team */}
      <OurTeamSection />

      {/* Timeline */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones that shaped our company and brought us to where we
              are today
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-indigo-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <h3 className="text-2xl font-bold text-indigo-600 mb-2">
                        {milestone.year}
                      </h3>
                      <p className="text-gray-700">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <CallToActionSection />
    </div>
  );
};

export default AboutPage;
