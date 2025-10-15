export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  link: string;
  gradient: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "introducing-sage",
    title: "Introducing Sage — a Sagas pattern implementation in Elixir",
    excerpt: "Distributed transactions are hard and expensive, if you wonder how to pragmatically handle them in a mid-size project— this article is for you.",
    category: "Architecture",
    date: "2018-05-31",
    readTime: "8 min read",
    link: "/blog/introducing-sage",
    gradient: "from-terminal-cyan to-terminal-green"
  },
  {
    id: "run-stale-tests",
    title: "Run stale tests on file change in Elixir",
    excerpt: "Mix is an awesome tool but most Elixir beginners not aware of all its features. mix test --stale is the one them and can make your workflow much better.",
    category: "Engineering",
    date: "2017-11-12",
    readTime: "1 min read",
    link: "/blog/run-stale-tests",
    gradient: "from-terminal-yellow to-terminal-cyan"
  },
  {
    id: "runtime-configuration-migrations",
    title: "Runtime configuration, migrations and deployment for Elixir applications",
    excerpt: "Shortly after moving from PHP to Elixir I've faced a common issue, the way how do we deploy applications is totally different from the one I used to work with.",
    category: "DevOps",
    date: "2017-08-20",
    readTime: "10 min read",
    link: "/blog/runtime-configuration-migrations",
    gradient: "from-terminal-green to-terminal-yellow"
  },
  {
    id: "national-health-service",
    title: "National Health Service, on Elixir and Kubernetes",
    excerpt: "By this post, I want to share a second awesome project that we built on Elixir, React.js+Redux.js and Kubernetes — eHealth for National Health Service of Ukraine.",
    category: "Architecture",
    date: "2017-08-03",
    readTime: "8 min read",
    link: "/blog/national-health-service",
    gradient: "from-terminal-cyan to-primary"
  },
  {
    id: "blockchain-properties",
    title: "Bringing blockchain properties to the centralized government databases",
    excerpt: "Right now we are building a large project in a healthcare field for our government. There are lots of interesting tasks and I want to share one of them with you.",
    category: "Database",
    date: "2017-07-27",
    readTime: "6 min read",
    link: "/blog/blockchain-properties",
    gradient: "from-terminal-yellow to-terminal-green"
  },
  {
    id: "sensitive-file-uploads",
    title: "Alternative approach for sensitive file uploads",
    excerpt: "While working on a new project we faced a task where end-user needs to upload a file with the sensitive data (eg. national ID of most Ukrainian citizens).",
    category: "Security",
    date: "2017-07-25",
    readTime: "5 min read",
    link: "/blog/sensitive-file-uploads",
    gradient: "from-terminal-green to-terminal-cyan"
  },
  {
    id: "p2p-lending-platform",
    title: "Designing a P2P Lending platform with Elixir in mind",
    excerpt: "With this post, I want to share with you the design process on one of our latest projects — a P2P marketplace that was intended to be used by hundreds of thousands of users.",
    category: "Engineering",
    date: "2017-07-09",
    readTime: "12 min read",
    link: "/blog/p2p-lending-platform",
    gradient: "from-primary to-terminal-yellow"
  }
];

export const categories = ["All", "Architecture", "Engineering", "Security", "Database", "DevOps"];