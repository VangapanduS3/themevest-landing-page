
import { useEffect, useRef } from "react";
import { Check, ArrowRight, Search, LineChart, Wallet, Paintbrush, Lightbulb, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

const Step = ({ number, title, description, icon, isLast = false }: StepProps) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
          {number}
        </div>
        {!isLast && <div className="h-full w-0.5 bg-gray-200 my-2"></div>}
      </div>
      <div className="pb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const HowItWorksPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const steps: Omit<StepProps, 'isLast'>[] = [
    {
      number: 1,
      title: "Discover Your Investment Themes",
      description: "Browse our curated selection of investment themes based on trends, industries, and values. Each theme contains a portfolio of carefully selected stocks and ETFs that align with that theme.",
      icon: <Search className="h-5 w-5" />
    },
    {
      number: 2,
      title: "Customize Your Portfolio",
      description: "Select the themes that interest you and align with your values. Adjust the allocation percentages to build a portfolio that matches your investment goals and risk tolerance.",
      icon: <Paintbrush className="h-5 w-5" />
    },
    {
      number: 3,
      title: "Fund Your Account",
      description: "Securely link your bank account and deposit funds to start investing. We support various funding methods and ensure your financial information is always protected.",
      icon: <Wallet className="h-5 w-5" />
    },
    {
      number: 4,
      title: "Watch Your Investment Grow",
      description: "Our platform automatically invests your funds according to your selected themes. Track performance, view detailed analytics, and receive regular updates about your investments.",
      icon: <LineChart className="h-5 w-5" />
    }
  ];

  const features = [
    {
      title: "Automated Rebalancing",
      description: "Our intelligent algorithms continuously monitor your portfolio and make adjustments to maintain your desired allocation across themes."
    },
    {
      title: "Expert-Curated Themes",
      description: "Each investment theme is created by our team of financial experts who analyze market trends and company fundamentals."
    },
    {
      title: "Transparent Fee Structure",
      description: "We charge a simple, flat fee of 0.75% annually on your invested assets. No hidden costs or commissions."
    },
    {
      title: "Bank-Level Security",
      description: "Your investments are protected with military-grade encryption and multi-factor authentication."
    }
  ];

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main ref={containerRef}>
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-theme-healthcare/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <div className="theme-tag bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-medium mb-4 inline-flex items-center gap-2 animate-on-scroll opacity-0">
                <Lightbulb className="h-4 w-4" />
                <span>Simple Process</span>
              </div>
              <h1 className="mb-6 animate-on-scroll opacity-0">How ThemeVest Works</h1>
              <p className="text-muted-foreground text-lg animate-on-scroll opacity-0">
                ThemeVest makes investing in your interests and values simple. Follow these four easy steps to start building your thematic portfolio.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-20 animate-on-scroll opacity-0">
              {steps.map((step, index) => (
                <Step 
                  key={index}
                  {...step}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-16 animate-on-scroll opacity-0">
              <h2 className="text-2xl font-bold mb-8 text-center">ThemeVest Advantage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <Check className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 animate-on-scroll opacity-0">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of investors who are already building wealth through thematic investing. Create your account in minutes.
                </p>
                <Button 
                  size="lg" 
                  className="rounded-full"
                  onClick={() => navigate("/")}
                >
                  Start Investing <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-64 h-64 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
