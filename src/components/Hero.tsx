
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-50"></div>
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-theme-sustainability/10 rounded-full blur-3xl"></div>
      
      <div className="container relative">
        {/* Small chip at the top */}
        <div className="animate-on-scroll opacity-0 flex justify-center mb-6">
          <div className="theme-tag bg-secondary text-primary px-5 py-2 rounded-full text-sm font-medium">
            Theme-Based Investment Portfolios
          </div>
        </div>
        
        {/* Main heading */}
        <h1 className="animate-on-scroll opacity-0 text-center text-balance font-bold mb-6 max-w-4xl mx-auto">
          Invest in What Matters <br className="hidden sm:block" />
          <span className="text-primary">to You</span>
        </h1>
        
        {/* Subheading */}
        <p className="animate-on-scroll opacity-0 text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Discover curated investment portfolios built around themes that align with your interests, values, and vision of the future.
        </p>
        
        {/* CTA buttons */}
        <div className="animate-on-scroll opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button className="rounded-full min-w-[180px] h-12 text-base button-shine" size="lg" asChild>
            <Link to="/discover">
              Explore Themes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full min-w-[180px] h-12 text-base" size="lg" asChild>
            <Link to="/how-it-works">
              How It Works
            </Link>
          </Button>
        </div>
        
        {/* Stats */}
        <div className="animate-on-scroll opacity-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 py-5 px-8 mx-auto glass-card rounded-2xl max-w-3xl">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">$240M+</p>
            <p className="text-sm text-muted-foreground">Assets Managed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">12+</p>
            <p className="text-sm text-muted-foreground">Curated Themes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">32K+</p>
            <p className="text-sm text-muted-foreground">Happy Investors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
