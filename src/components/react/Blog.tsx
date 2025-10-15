import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {
  return (
    <section id="blog" className="py-16 md:py-24 px-4 bg-terminal-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-10 md:space-y-12">
          {/* Section Header */}
          <div className="space-y-4">
            <div className="font-mono text-terminal-yellow text-sm">
              $ ls -la ./blog
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-sans">
              Latest <span className="text-terminal-yellow">Posts</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Thoughts on software engineering, distributed systems, and building products.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, index) => (
              <article 
                key={post.id}
                className="group p-6 rounded-lg bg-card border border-border hover:border-terminal-yellow transition-all shadow-card hover:shadow-glow animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-terminal-yellow/10 text-terminal-yellow text-xs font-mono">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      <span className="font-mono">
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-sans text-foreground group-hover:text-terminal-yellow transition-colors">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-terminal-yellow font-mono text-sm group-hover:gap-3 transition-all"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center pt-8">
            <Button 
              asChild
              size="lg"
              className="font-mono border-2 border-terminal-yellow bg-transparent text-terminal-yellow hover:bg-terminal-yellow hover:text-background transition-all"
            >
              <Link to="/blog">
                View All Posts
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
