const OurTeamSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            The passionate people behind CatalogStore who work tirelessly to
            bring you the best shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 place-items-center mx-auto gap-8">
          <div className="w-fit bg-background rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src="/public/img/profile.png"
              alt="Gema Dodi Pranata"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-heading mb-1">
                Gema Dodi Pranata
              </h3>
              <p className="textforeground font-medium mb-3">
                Founder & Developer
              </p>
              <p className="text-text-secondary text-sm">
                Aspiring Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
