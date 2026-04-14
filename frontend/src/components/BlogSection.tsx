import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "How to Introduce Yourself Professionally in a Job Interview",
    excerpt: "Master the art of self-introduction with these expert tips and examples to make a lasting impression.",
    category: "Interview Tips",
    date: "Dec 15, 2024",
    image: "/blog/interview-intro.jpg",
    link: "https://blogs.awign.com/how-to-introduce-yourself-professionally-in-a-job-interview/"
  },
  {
    id: 2,
    title: "Important Documents Required for Joining a Company",
    excerpt: "Complete checklist of all essential documents you need when starting a new job opportunity.",
    category: "Career Guide",
    date: "Dec 10, 2024",
    image: "/blog/documents-join.jpg",
    link: "https://blogs.awign.com/important-documents-required-for-joining-a-company/"
  },
  {
    id: 3,
    title: "How to Answer 'Why Should We Hire You?'",
    excerpt: "Craft compelling responses to this common interview question and stand out from other candidates.",
    category: "Interview Tips",
    date: "Dec 5, 2024",
    image: "/blog/why-hire.jpg",
    link: "https://blogs.awign.com/how-to-answer-why-should-we-hire-you/"
  }
];

const BlogSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, career tips, and industry trends to help you succeed
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden card-shadow hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Blog Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-3">{post.date}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 group"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blogs"
            className="btn-primary text-lg px-8 py-4"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
