
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeCard from "@/components/ThemeCard";
import { portfolioThemes } from "@/data/portfolioData";

const PortfolioThemes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Display just the first 6 themes on the homepage
  const displayThemes = portfolioThemes.slice(0, 6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            // Don't unobserve to prevent elements from disappearing
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observer.observe(el));
    }
    
    return () => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="themes" className="section-padding relative" ref={containerRef}>
      <div className="absolute top-0 left-0 w-72 h-72 bg-theme-tech/10 rounded-full blur-3xl -translate-x-1/2"></div>
      
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="theme-tag bg-secondary text-primary px-5 py-2 rounded-full text-sm font-medium mb-4 animate-on-scroll opacity-0">
            Investment Themes
          </div>
          <h2 className="mb-6 animate-on-scroll opacity-0">Choose Themes That<br />Resonate With You</h2>
          <p className="text-muted-foreground animate-on-scroll opacity-0">
            Each portfolio is carefully curated around a central theme, comprising stocks that are leaders or innovators in their respective fields.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayThemes.map((theme, index) => (
            <div 
              key={theme.title} 
              className="opacity-0 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ThemeCard 
                title={theme.title}
                description={theme.description}
                returns={theme.returns}
                type={theme.type}
                stockCount={theme.stockCount}
                index={index}
                popularity={theme.popularity}
                riskLevel={theme.riskLevel}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-on-scroll opacity-0">
          <Button variant="outline" className="rounded-full" asChild>
            <Link to="/discover">
              View All Themes
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioThemes;
