
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  position: string;
  stars: number;
  index: number;
}

const Testimonial = ({ content, author, position, stars, index }: TestimonialProps) => {
  return (
    <div 
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 opacity-0 animate-on-scroll"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex mb-4">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-theme-finance text-theme-finance" />
        ))}
      </div>
      <p className="text-base mb-6">{content}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{position}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const testimonials: Omit<TestimonialProps, "index">[] = [
    {
      content: "ThemeVest helped me invest in companies that align with my values. My sustainable energy portfolio has outperformed my expectations while making a positive impact.",
      author: "Emma Johnson",
      position: "Environmental Engineer",
      stars: 5
    },
    {
      content: "As someone new to investing, ThemeVest made it easy to get started with their tech-focused portfolios. Their platform is intuitive and the performance has been excellent.",
      author: "Michael Chen",
      position: "Software Developer",
      stars: 5
    },
    {
      content: "I've been able to diversify my investments across multiple themes. The automatic rebalancing has saved me time while maintaining strong returns.",
      author: "Sarah Williams",
      position: "Healthcare Professional",
      stars: 4
    }
  ];

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
    <section id="testimonials" className="section-padding relative" ref={containerRef}>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-theme-luxury/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container">
        <div className="max-w-xl mx-auto text-center mb-16">
          <div className="theme-tag bg-secondary text-primary px-5 py-2 rounded-full text-sm font-medium mb-4 animate-on-scroll opacity-0">
            Testimonials
          </div>
          <h2 className="mb-6 animate-on-scroll opacity-0">What Our Investors Say</h2>
          <p className="text-muted-foreground animate-on-scroll opacity-0">
            Discover how ThemeVest has helped thousands of investors align their portfolios with their interests and values.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={testimonial.author} 
              {...testimonial} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
