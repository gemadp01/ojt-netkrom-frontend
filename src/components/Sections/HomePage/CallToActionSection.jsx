const CallToActionSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Start Shopping?
        </h2>
        <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers and discover amazing products
          today
        </p>
        <button className="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
          Browse Catalog
        </button>
      </div>
    </section>
  );
};

export default CallToActionSection;
