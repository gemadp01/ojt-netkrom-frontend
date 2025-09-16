const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-surface to-background py-24">
      {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-heading mb-6">
          About CatalogStore
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
          Empowering people to discover and purchase quality products that
          enhance their lives
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
