import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230052CC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            India&apos;s #1 Work-as-a-Service Platform!
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Part-time, Full-time, Onsite, and Remote work opportunities!
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover flexible work opportunities that match your skills and schedule. Join thousands of professionals already working with AD Sky Solution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/gig" className="btn-primary text-lg px-8 py-4">
              Explore Jobs
            </Link>
            <Link href="/business" className="btn-secondary text-lg px-8 py-4">
              Explore Solutions
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1.5M+</div>
              <div className="text-gray-600">Workforce</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">400+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10M+</div>
              <div className="text-gray-600">Tasks Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
    </section>
  );
};

export default HeroSection;
