
import { useEffect, useRef } from "react";
import { 
  BarChart3, 
  ShieldCheck, 
  Sliders, 
  RefreshCcw,
  Lightbulb,
  LineChart
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Feature = ({ icon, title, description, index }: FeatureProps) => {
  return (
    <div 
      className="rounded-xl p-6 opacity-0 animate-on-scroll"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const features: Omit<FeatureProps, "index">[] = [
    {
      icon: <Sliders className="h-6 w-6 text-primary" />,
      title: "Personalized Portfolios",
      description: "Customize your investment strategy based on your interests, values, and financial goals."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Data-Driven Selection",
      description: "Our algorithms analyze thousands of data points to select the best-performing stocks within each theme."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Risk Management",
      description: "Built-in diversification and continuous risk assessment to protect your investments."
    },
    {
      icon: <RefreshCcw className="h-6 w-6 text-primary" />,
      title: "Automatic Rebalancing",
      description: "We regularly rebalance your portfolio to maintain optimal allocation and performance."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Expert Insights",
      description: "Access research, analysis, and insights from our team of investment professionals."
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Performance Tracking",
      description: "Intuitive dashboards to monitor your portfolio's performance and growth over time."
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
    <section id="features" className="section-padding bg-secondary/50" ref={containerRef}>
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="theme-tag bg-white text-primary px-5 py-2 rounded-full text-sm font-medium mb-4 animate-on-scroll opacity-0">
            Key Features
          </div>
          <h2 className="mb-6 animate-on-scroll opacity-0">Intelligent Investing,<br />Simplified</h2>
          <p className="text-muted-foreground animate-on-scroll opacity-0">
            Everything you need to build and manage a portfolio that reflects what matters to you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={feature.title} 
              {...feature} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
