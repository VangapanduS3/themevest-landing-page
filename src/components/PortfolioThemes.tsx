
import { useEffect, useRef } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeCardProps {
  title: string;
  description: string;
  returns: string;
  type: "tech" | "sustainability" | "healthcare" | "finance" | "luxury";
  stockCount: number;
  index: number;
}

const ThemeCard = ({ title, description, returns, type, stockCount, index }: ThemeCardProps) => {
  return (
    <div 
      className="portfolio-card opacity-0 animate-on-scroll"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={cn(
        "theme-tag mb-4",
        type === "tech" && "bg-theme-tech/10 text-theme-tech",
        type === "sustainability" && "bg-theme-sustainability/10 text-theme-sustainability",
        type === "healthcare" && "bg-theme-healthcare/10 text-theme-healthcare",
        type === "finance" && "bg-theme-finance/10 text-theme-finance",
        type === "luxury" && "bg-theme-luxury/10 text-theme-luxury"
      )}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <TrendingUp className={cn(
            "h-4 w-4 mr-1",
            type === "tech" && "text-theme-tech",
            type === "sustainability" && "text-theme-sustainability",
            type === "healthcare" && "text-theme-healthcare",
            type === "finance" && "text-theme-finance",
            type === "luxury" && "text-theme-luxury"
          )} />
          <span className="font-semibold">{returns}</span>
          <span className="text-xs text-muted-foreground ml-1">YTD</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {stockCount} Stocks
        </div>
      </div>
      
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between group",
          type === "tech" && "text-theme-tech hover:text-theme-tech/90",
          type === "sustainability" && "text-theme-sustainability hover:text-theme-sustainability/90",
          type === "healthcare" && "text-theme-healthcare hover:text-theme-healthcare/90",
          type === "finance" && "text-theme-finance hover:text-theme-finance/90",
          type === "luxury" && "text-theme-luxury hover:text-theme-luxury/90"
        )}
      >
        View Portfolio
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Button>
    </div>
  );
};

const PortfolioThemes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const themes: ThemeCardProps[] = [
    {
      title: "Future Tech",
      description: "Companies shaping the technological landscape with AI, robotics, and quantum computing.",
      returns: "+24.8%",
      type: "tech",
      stockCount: 18,
      index: 0
    },
    {
      title: "Green Energy",
      description: "Renewable energy innovators and sustainable technology leaders.",
      returns: "+16.2%",
      type: "sustainability",
      stockCount: 15,
      index: 1
    },
    {
      title: "Biotech Revolution",
      description: "Companies pioneering genomics, precision medicine, and healthcare innovation.",
      returns: "+19.5%",
      type: "healthcare",
      stockCount: 12,
      index: 2
    },
    {
      title: "FinTech Disruptors",
      description: "Digital payment, blockchain, and financial service innovators.",
      returns: "+21.7%",
      type: "finance",
      stockCount: 14,
      index: 3
    },
    {
      title: "Luxury Brands",
      description: "Premium and luxury consumer brands with strong global presence.",
      returns: "+15.3%",
      type: "luxury",
      stockCount: 10,
      index: 4
    },
    {
      title: "Clean Water",
      description: "Companies focused on water purification, conservation, and infrastructure.",
      returns: "+12.9%",
      type: "sustainability",
      stockCount: 11,
      index: 5
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
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
          {themes.map((theme) => (
            <ThemeCard key={theme.title} {...theme} />
          ))}
        </div>
        
        <div className="mt-12 text-center animate-on-scroll opacity-0">
          <Button variant="outline" className="rounded-full">
            View All Themes
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioThemes;
