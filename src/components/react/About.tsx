import { Code2, Rocket, Users } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Users,
      title: "NHS of Ukraine",
      description: "Helped build the NHS of Ukraine with 30M+ daily users and nationwide hospital coverage.",
    },
    {
      icon: Rocket,
      title: "Revenue Growth",
      description: "Drove ~3× revenue to mid-seven figures in year one at a high-growth startup.",
    },
    {
      icon: Code2,
      title: "Scale & Performance",
      description: "Scaled & operated Elixir systems at ~25k RPS (peaks 120k) across 70+ services. Saved $1M+/year on infrastructure costs.",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-fade-in">
          <p className="font-mono text-terminal-green mb-2">$ cat about.txt</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-terminal-green">Me</span>
          </h2>
        </div>

        {/* About Content */}
        <div className="space-y-8">
          <div className="space-y-6 max-w-3xl">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a multi-hat product-minded engineering leader who lives at the intersection of product, 
              infrastructure, and UX. Pragmatic by default: I ship what matters, measure outcomes, cut waste, 
              and keep systems reliably boring where they should be - without slowing teams.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My experience spans from early-stage startups to established products, always with a focus on 
              building the right thing, the right way.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="group p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col gap-4">
                  <div className="p-3 rounded-lg bg-gradient-primary w-fit">
                    <highlight.icon className="h-6 w-6 text-terminal-cyan" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-mono text-lg font-semibold text-foreground">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
