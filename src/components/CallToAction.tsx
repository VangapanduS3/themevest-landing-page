
import { useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const features = [
    "Access to all theme-based portfolios",
    "Automatic rebalancing",
    "Detailed performance reports",
    "Expert investment insights",
    "No hidden fees"
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
    <section id="pricing" className="section-padding bg-primary/5" ref={containerRef}>
      <div className="container">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2">
              <div className="theme-tag bg-secondary text-primary px-5 py-2 rounded-full text-sm font-medium mb-4 animate-on-scroll opacity-0">
                Get Started
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-on-scroll opacity-0">
                Begin Your Themed Investment Journey
              </h2>
              <p className="text-muted-foreground mb-8 animate-on-scroll opacity-0">
                Start with as little as $100 and build a portfolio aligned with your interests and values.
              </p>
              
              <div className="mb-8 animate-on-scroll opacity-0">
                <p className="text-xl font-bold">$9<span className="text-base font-normal text-muted-foreground">/month</span></p>
                <p className="text-sm text-muted-foreground">Cancel anytime. No commitment.</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li 
                    key={index} 
                    className="flex items-center opacity-0 animate-on-scroll"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Check className="h-5 w-5 text-theme-sustainability mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="w-full rounded-full button-shine animate-on-scroll opacity-0" size="lg">
                Start Investing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="hidden md:block md:w-1/2 bg-primary relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-indigo-700">
                <div className="flex flex-col justify-center h-full text-white p-12">
                  <h3 className="text-2xl font-bold mb-4 animate-on-scroll opacity-0">
                    "ThemeVest has transformed how I think about investing."
                  </h3>
                  <p className="mb-6 animate-on-scroll opacity-0">
                    I've seen a 22% return on my tech portfolio in just 8 months, while supporting companies that are shaping the future.
                  </p>
                  <div className="animate-on-scroll opacity-0">
                    <p className="font-semibold">David Reynolds</p>
                    <p className="text-sm opacity-80">Investor since 2022</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
