export type BlogCategory = 'All' | 'Career Tips' | 'Interview Prep' | 'Workforce' | 'Industry Insights' | 'Product Updates';

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: Exclude<BlogCategory, 'All'>;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

export const blogCategories: BlogCategory[] = [
  'All',
  'Career Tips',
  'Interview Prep',
  'Workforce',
  'Industry Insights',
  'Product Updates',
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'how-to-introduce-yourself-professionally',
    title: 'How To Introduce Yourself Professionally In A Job Interview',
    excerpt:
      'A crisp introduction can set the tone for the entire interview. Here is how to build one that feels polished, confident, and memorable.',
    content: [
      'A strong interview introduction should cover your current role, your strongest skill area, and one relevant achievement that supports the role you are pursuing.',
      'Keep it short, specific, and tied to the opportunity. Recruiters remember clarity much more than long answers.',
      'Practice your version out loud so your pacing feels natural and confident during the actual interview.',
    ],
    category: 'Interview Prep',
    author: 'Awign Editorial Team',
    date: 'December 15, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    id: 2,
    slug: 'important-documents-required-for-joining-a-company',
    title: 'Important Documents Required For Joining A Company',
    excerpt:
      'A complete checklist of the documents most employers ask for before onboarding, plus tips for keeping everything submission-ready.',
    content: [
      'Offer letters, government IDs, bank details, educational documents, and employment proofs are usually part of the onboarding checklist.',
      'Keeping scanned copies organized in a single folder helps speed up approvals and avoids last-minute document runs.',
      'Always verify if the employer needs self-attested copies or original documents for verification.',
    ],
    category: 'Career Tips',
    author: 'Ritika Sharma',
    date: 'December 10, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    slug: 'how-to-answer-why-should-we-hire-you',
    title: "How To Answer 'Why Should We Hire You?'",
    excerpt:
      'Turn one of the toughest interview questions into a confident and concise answer that highlights fit, capability, and intent.',
    content: [
      'The best answers connect your strengths to the role requirements with one or two concrete examples.',
      'Avoid generic claims and instead use specific outcomes, such as faster turnarounds, better quality scores, or customer impact.',
      'Finish with why the role matters to you so your answer sounds motivated, not scripted.',
    ],
    category: 'Interview Prep',
    author: 'Hamza Yusuf',
    date: 'December 5, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    slug: 'future-of-flexible-work-in-india',
    title: 'The Future Of Flexible Work In India',
    excerpt:
      'Flexible work is evolving quickly across cities, categories, and customer expectations. Here are the trends shaping the next phase.',
    content: [
      'Hybrid operations, platform-led quality control, and geo-distributed teams are becoming the default across multiple industries.',
      'Candidates now expect transparency around payouts, schedules, and growth pathways before committing.',
      'Businesses that combine workforce agility with operational visibility are moving faster than ever.',
    ],
    category: 'Industry Insights',
    author: 'Awign Research Desk',
    date: 'November 28, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    slug: 'how-awign-scales-last-mile-operations',
    title: 'How Awign Scales Last-Mile Operations Without Compromising Quality',
    excerpt:
      'A look at the systems, checks, and field execution layers that help large brands scale fulfilment across India.',
    content: [
      'Scale without quality control creates churn. That is why live monitoring, audits, and fallback planning are essential.',
      'A distributed workforce needs structured onboarding and fast issue resolution to maintain SLA confidence.',
      'The strongest operating model combines local execution with platform visibility at every layer.',
    ],
    category: 'Workforce',
    author: 'Partha Arun Xavier',
    date: 'November 19, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    slug: 'building-career-momentum-through-gig-work',
    title: 'Building Career Momentum Through Gig Work',
    excerpt:
      'Gig work can become a meaningful growth path when you approach it with consistency, upskilling, and proof of performance.',
    content: [
      'Short-term roles often create strong long-term momentum because they expose you to multiple tools, teams, and industries quickly.',
      'Track what you delivered in each role so you can convert that work into strong interview narratives later.',
      'Keep upskilling between assignments so your next opportunity compounds on the last one.',
    ],
    category: 'Career Tips',
    author: 'Shanu Agrawal',
    date: 'November 8, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    slug: 'launching-new-operations-dashboard',
    title: 'Launching A New Operations Dashboard For Enterprise Teams',
    excerpt:
      'A quick overview of the new visibility tools designed to help teams track fulfilment, output quality, and workforce activity in real time.',
    content: [
      'The dashboard brings together live assignments, fulfilment status, and quality checkpoints in one view.',
      'Leads can identify blockers earlier and use the same system to review historical performance trends.',
      'This update is part of a larger push toward platform-led operating visibility for businesses.',
    ],
    category: 'Product Updates',
    author: 'Product Team',
    date: 'October 30, 2024',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    slug: 'how-to-manage-multiple-projects-without-burnout',
    title: 'How To Manage Multiple Projects Without Burning Out',
    excerpt:
      'A practical system for planning time, protecting energy, and keeping your work quality high across multiple assignments.',
    content: [
      'Use fixed planning windows and realistic capacity, not optimistic daily targets, to avoid overload.',
      'Break work into output blocks and recovery blocks so your schedule stays sustainable for the long run.',
      'Clients appreciate consistency more than over-promising, so communicate early when priorities shift.',
    ],
    category: 'Career Tips',
    author: 'Awign Editorial Team',
    date: 'October 21, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  },
];

export function getFeaturedBlog() {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0];
}

export function getRelatedBlogs(slug: string) {
  return blogPosts.filter((post) => post.slug !== slug).slice(0, 3);
}
