
import { useEffect, useRef } from "react";
import { Star, Users, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface TestimonialProps {
  content: string;
  author: string;
  position: string;
  stars: number;
  avatarSrc?: string;
  featured?: boolean;
}

const TestimonialCard = ({ content, author, position, stars, avatarSrc, featured = false }: TestimonialProps) => {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${featured ? 'md:col-span-2 border-primary/20 bg-primary/5' : ''}`}>
      <div className="flex mb-4">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-theme-finance text-theme-finance" />
        ))}
      </div>
      <div className="flex gap-4 items-start">
        {avatarSrc && (
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img src={avatarSrc} alt={author} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1">
          <Quote className="h-8 w-8 text-primary/20 mb-2" />
          <p className="text-base mb-6">{content}</p>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{position}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const featuredTestimonials: TestimonialProps[] = [
    {
      content: "I've been investing for over a decade, but ThemeVest introduced me to a whole new approach. Their thematic investing platform helped me identify emerging trends I'd overlooked. My tech-focused and sustainability portfolios have consistently outperformed my previous investments by a significant margin.",
      author: "James Richardson",
      position: "Senior Investment Analyst",
      stars: 5,
      featured: true
    },
    {
      content: "ThemeVest helped me invest in companies that align with my values. My sustainable energy portfolio has outperformed my expectations while making a positive impact on the world. I feel good knowing my money is working towards a better future.",
      author: "Emma Johnson",
      position: "Environmental Engineer",
      stars: 5
    },
    {
      content: "As someone new to investing, ThemeVest made it easy to get started with their tech-focused portfolios. Their platform is intuitive and the performance has been excellent. The educational resources helped me understand what I was investing in.",
      author: "Michael Chen",
      position: "Software Developer",
      stars: 5
    },
    {
      content: "I've been able to diversify my investments across multiple themes. The automatic rebalancing has saved me time while maintaining strong returns. ThemeVest took the guesswork out of portfolio management.",
      author: "Sarah Williams",
      position: "Healthcare Professional",
      stars: 4
    },
    {
      content: "The personalized investment recommendations were spot on. I've seen a 22% return in just 18 months with my AI & Robotics portfolio. The regular insights and reports keep me informed about where my money is going.",
      author: "David Patel",
      position: "Tech Entrepreneur",
      stars: 5
    },
    {
      content: "I love the transparency of knowing exactly which companies I'm investing in. The breakdown of ESG scores and impact metrics for my Sustainable Living portfolio gives me confidence in my investment choices.",
      author: "Olivia Martinez",
      position: "Urban Planner",
      stars: 4
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-theme-technology/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <div className="theme-tag bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-medium mb-4 inline-flex items-center gap-2 animate-on-scroll opacity-0">
                <Users className="h-4 w-4" />
                <span>Our Community</span>
              </div>
              <h1 className="mb-6 animate-on-scroll opacity-0">What Our Investors Say</h1>
              <p className="text-muted-foreground text-lg animate-on-scroll opacity-0">
                Discover how ThemeVest has helped thousands of investors align their portfolios with their interests and values. Read authentic stories from our community members.
              </p>
            </div>

            <div className="stats-bar bg-white p-6 rounded-xl shadow-sm mb-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-on-scroll opacity-0">
              <div className="stat text-center">
                <p className="text-4xl font-bold text-primary">15k+</p>
                <p className="text-sm text-muted-foreground">Active Investors</p>
              </div>
              <div className="stat text-center">
                <p className="text-4xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
              <div className="stat text-center">
                <p className="text-4xl font-bold text-primary">$250M+</p>
                <p className="text-sm text-muted-foreground">Assets Managed</p>
              </div>
              <div className="stat text-center">
                <p className="text-4xl font-bold text-primary">4.9/5</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {featuredTestimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  {...testimonial}
                />
              ))}
            </div>

            <div className="text-center animate-on-scroll opacity-0">
              <Button 
                size="lg" 
                className="rounded-full px-8"
                onClick={() => navigate("/")}
              >
                Start Investing Today
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
