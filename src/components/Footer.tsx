
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "#about" },
    { title: "Themes", href: "#themes" },
    { title: "How It Works", href: "#how-it-works" },
    { title: "Pricing", href: "#pricing" },
  ];
  
  const legalLinks = [
    { title: "Privacy Policy", href: "#privacy" },
    { title: "Terms of Service", href: "#terms" },
    { title: "Cookies Policy", href: "#cookies" },
    { title: "Disclaimer", href: "#disclaimer" },
  ];
  
  const contactInfo = [
    { title: "hello@themevest.com" },
    { title: "+1 (555) 123-4567" },
    { title: "101 Investment Avenue, San Francisco, CA 94103" },
  ];
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#linkedin" },
  ];

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold">T</span>
              </div>
              <span className="font-bold text-xl">ThemeVest</span>
            </a>
            <p className="text-muted-foreground text-sm mb-6">
              Thematic investing for a new generation. Build portfolios around ideas that matter to you.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.title}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((info, index) => (
                <li key={index} className="text-muted-foreground text-sm">
                  {info.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} ThemeVest. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Investment advisory services offered through ThemeVest LLC, an SEC Registered Investment Advisor
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
