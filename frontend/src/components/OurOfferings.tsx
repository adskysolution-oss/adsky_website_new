import Link from 'next/link';

const offerings = [
  {
    id: 1,
    title: "Egocentric Video Data for Robotics",
    description: "High-Quality human POV datasets for imitation learning & embodied AI",
    features: [
      "4K first-person video capture at massive scale",
      "1000+ hours of egocentric video per day",
      "98%+ robotics-grade annotation accuracy"
    ],
    link: "/business/data-annotation/robotech-egocentric"
  },
  {
    id: 2,
    title: "Data Annotation",
    description: "AI/ML-ready data annotation, tech-scaled for accuracy.",
    features: [
      "10Mn+ data points labeled monthly",
      "99%+ accuracy via quality checks",
      "Supports images, text, speech & videos",
      "Industry-specific annotation solutions"
    ],
    link: "/business/data-annotation"
  },
  {
    id: 3,
    title: "AI-First Tech Capability Centers",
    description: "Build AI-First On-site Teams",
    features: [
      "On-site, time-zone aligned developers",
      "AI-tracked productivity & Integration Manager oversight",
      "Secure offices, enterprise-ready compliance",
      "Go live in ~2 weeks with 5-10 engineers"
    ],
    link: "/business/micro-capability-centers"
  },
  {
    id: 4,
    title: "Promoter Deployment",
    description: "Convert prospects to customers across sectors (e.g., retail, healthcare, telecom).",
    features: [
      "Enhancing brand value through strategic up-selling and cross-selling",
      "Target the right audience for high quality lead generation",
      "In store promotion, outstore promotion, BTL activities, and more!"
    ],
    link: "/business/promoter-deployment"
  },
  {
    id: 5,
    title: "Audit",
    description: "Full audits: stocks, compliance, fraud, competition via mystery/non-mystery audits.",
    features: [
      "4000+ audit parameters",
      "3500+ retailers & 1.5M shipments audited",
      "50% reduction in seller claims after audit completion",
      "25+ data points captured against each shipment",
      "25% average cost saved for businesses"
    ],
    link: "/business/audit"
  },
  {
    id: 6,
    title: "EdTech Solutions",
    description: "Full-cycle EdTech: educator onboarding, assessments, evaluations.",
    features: [
      "Over 500+ professional educators in Awign's network (kindergarten to post-grad)",
      "Expert tutors for advanced courses and competitive exams",
      "From lab assistants to language experts, and more!"
    ],
    link: "/business/hire-expert-educators"
  },
  {
    id: 7,
    title: "Awign Expert",
    description: "Contractual talent sourcing for 3x faster team building.",
    features: [
      "1.5 Million+ skilled professionals",
      "Get access to global talent",
      "100+ technologies and skills"
    ],
    link: "/business/hire-tech-non-tech-experts"
  }
];

const OurOfferings = () => {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Offerings
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive workforce solutions tailored to your business needs
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((offering) => (
            <div
              key={offering.id}
              className="bg-white rounded-xl p-8 card-shadow hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Card Header */}
              <div className="mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">{offering.title.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {offering.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {offering.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-6">
                {offering.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                href={offering.link}
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 group"
              >
                Know More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* App Download Section */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 card-shadow">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Get the Awign App
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Download our mobile app to access work opportunities on the go
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://play.google.com/store/apps/details?id=com.awign.intern"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.66,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
            <a
              href="https://apps.apple.com/in/app/awign/id1629391041"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.09997,22C7.78997,22.05 6.79997,20.68 5.95997,19.47C4.24997,17 2.93997,12.45 4.69997,9.39C5.56997,7.87 7.12997,6.91 8.81997,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.05,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurOfferings;
