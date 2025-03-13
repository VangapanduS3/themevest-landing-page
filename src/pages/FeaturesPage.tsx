
import { useEffect, useRef } from "react";
import { 
  BarChart3, 
  ShieldCheck, 
  Sliders, 
  RefreshCcw,
  Lightbulb,
  LineChart,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="rounded-xl p-8 bg-white shadow-sm border border-gray-100 opacity-0 animate-on-scroll"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const FeaturesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Sliders className="h-6 w-6 text-primary" />,
      title: "Personalized Portfolios",
      description: "Customize your investment strategy based on your interests, values, and financial goals. Our platform adapts to your preferences, making investing more engaging and aligned with your values."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Data-Driven Selection",
      description: "Our algorithms analyze thousands of data points to select the best-performing stocks within each theme. We use advanced analytics to identify companies poised for growth and innovation."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Risk Management",
      description: "Built-in diversification and continuous risk assessment to protect your investments. Our platform automatically balances your portfolio to reduce exposure to market volatility."
    },
    {
      icon: <RefreshCcw className="h-6 w-6 text-primary" />,
      title: "Automatic Rebalancing",
      description: "We regularly rebalance your portfolio to maintain optimal allocation and performance. This ensures your investments stay aligned with your goals even as market conditions change."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Expert Insights",
      description: "Access research, analysis, and insights from our team of investment professionals. Our experts provide context and education to help you make informed decisions."
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Performance Tracking",
      description: "Intuitive dashboards to monitor your portfolio's performance and growth over time. Track your progress toward financial goals with clear metrics and visualizations."
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-theme-tech/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <div className="theme-tag bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-medium mb-4 inline-flex items-center gap-2 animate-on-scroll opacity-0">
                <BarChart3 className="h-4 w-4" />
                <span>Platform Features</span>
              </div>
              <h1 className="mb-6 animate-on-scroll opacity-0">Intelligent Investing,<br />Simplified</h1>
              <p className="text-muted-foreground text-lg animate-on-scroll opacity-0">
                ThemeVest provides everything you need to build and manage a portfolio that reflects what matters to you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.title} 
                  {...feature} 
                  delay={index * 100} 
                />
              ))}
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 animate-on-scroll opacity-0">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Ready to Experience ThemeVest?</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of investors who are already building wealth through thematic investing. Create your account in minutes.
                </p>
                <Button 
                  size="lg" 
                  className="rounded-full"
                  onClick={() => navigate("/discover")}
                >
                  Explore Themes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-64 h-64 bg-primary/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-primary" />
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

export default FeaturesPage;
