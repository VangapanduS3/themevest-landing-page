
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    <section id="pricing" className="section-padding bg-primary/5" ref={containerRef}>
      <div className="container">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-full">
              <div className="theme-tag bg-secondary text-primary px-5 py-2 rounded-full text-sm font-medium mb-4 animate-on-scroll opacity-0">
                Get Started
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-on-scroll opacity-0">
                Begin Your Themed Investment Journey
              </h2>
              <p className="text-muted-foreground mb-8 animate-on-scroll opacity-0">
                Start with as little as $100 and build a portfolio aligned with your interests and values.
              </p>
              
              <Button className="w-full md:w-auto rounded-full button-shine animate-on-scroll opacity-0" size="lg">
                Start Investing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
