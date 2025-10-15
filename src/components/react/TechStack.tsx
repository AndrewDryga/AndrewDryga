import { techStack } from "@/data/techStack";

const TechStack = () => {
  const totalFiles = techStack.reduce((sum, item) => sum + item.files, 0);
  const totalCode = techStack.reduce((sum, item) => sum + item.code, 0);

  return (
    <section id="tech-stack" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-fade-in">
          <p className="font-mono text-terminal-green mb-2">$ cloc ~/projects --by-file-by-tech</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tech <span className="text-terminal-green">Stack</span>
          </h2>
        </div>

        <div className="bg-black border-2 border-terminal-cyan/30 rounded p-4 md:p-6 animate-fade-in shadow-[0_0_40px_rgba(0,255,255,0.15)] backdrop-blur-sm">
          <div className="font-mono text-xs md:text-sm">
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 md:gap-8 py-2 border-b border-terminal-green/30">
              <div className="text-terminal-green/70 uppercase tracking-wider text-[10px] md:text-xs">technology</div>
              <div className="text-terminal-green/70 uppercase tracking-wider text-[10px] md:text-xs text-right hidden md:block w-20">files</div>
              <div className="text-terminal-green/70 uppercase tracking-wider text-[10px] md:text-xs text-right w-24 md:w-32">lines</div>
            </div>

            {/* Data rows */}
            {techStack.map((item, idx) => (
              <div
                key={item.language}
                className="grid grid-cols-[1fr_auto_auto] gap-4 md:gap-8 py-2 border-b border-terminal-green/10 hover:bg-terminal-green/5 transition-all duration-150 animate-fade-in last:border-0"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="text-terminal-cyan/90 truncate">{item.language}</div>
                <div className="text-terminal-yellow/90 text-right hidden md:block w-20 tabular-nums">
                  {item.files.toLocaleString()}
                </div>
                <div className="text-terminal-yellow text-right w-24 md:w-32 tabular-nums text-xs md:text-sm">
                  {item.code.toLocaleString()}
                </div>
              </div>
            ))}

            {/* SUM row */}
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 md:gap-8 pt-3 mt-2 border-t-2 border-terminal-green/30 font-bold">
              <div className="text-terminal-green">TOTAL:</div>
              <div className="text-terminal-green text-right hidden md:block w-20 tabular-nums">
                {totalFiles.toLocaleString()}
              </div>
              <div className="text-terminal-green text-right w-24 md:w-32 tabular-nums text-xs md:text-sm">
                {totalCode.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
