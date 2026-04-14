const newsItems = [
  {
    id: 1,
    name: "Moneycontrol",
    logo: "/news/moneycontrol.png",
    link: "https://www.moneycontrol.com/news/technology/japanese-firm-mynavi-acquires-indian-hr-tech-startup-awign-12708598.html"
  },
  {
    id: 2,
    name: "Business Outlook",
    logo: "/news/outlook.webp",
    link: "https://business.outlookindia.com/corporate/awign-announces-majority-stake-acquisition-from-mynavi-corporation"
  },
  {
    id: 3,
    name: "YourStory",
    logo: "/news/yourstory.webp",
    link: "https://yourstory.com/2024/04/japanese-hr-firm-mynavi-corporation-acquires-majority-stake-awign"
  },
  {
    id: 4,
    name: "PTI",
    logo: "/news/pti.webp",
    link: "https://www.ptinews.com/story/business/Japan-based-Mynavi-acquires-majority-stake-in-HR-tech-startup-Awign/1457025"
  },
  {
    id: 5,
    name: "People Matters",
    logo: "/news/peoplematters.webp",
    link: "https://www.peoplematters.in/news/business/awign-announces-a-strategic-majority-stake-acquisition-from-mynavi-41073"
  },
  {
    id: 6,
    name: "Economic Times",
    logo: "/news/EconomicTimes.webp",
    link: "https://economictimes.indiatimes.com/news/company/corporate-trends/mynavi-buys-majority-stake-in-awign/articleshow/109620662.cms?from=mdr"
  },
  {
    id: 7,
    name: "CNBC",
    logo: "/news/CNBC.webp",
    link: "https://www.cnbctv18.com/business/startup/social-digest-japan-based-mynavi-acquires-awign-blinkit-more-valuable-than-zomatos-food-delivery-biz-and-more-19403054.htm"
  }
];

const NewsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            As Featured In
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our journey and achievements recognized by leading media outlets
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-8 card-shadow hover:shadow-2xl transition-all duration-300 group flex items-center justify-center h-32"
            >
              <div className="text-center">
                {/* Placeholder for news logo */}
                <div className="w-full h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-2 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
                  <span className="text-gray-600 font-semibold text-sm">{item.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Japan-based Mynavi acquires majority stake in Awign
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
