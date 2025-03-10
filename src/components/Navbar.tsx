import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    };
    
    window.addEventListener("scroll", handleScroll);
    checkLogin();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Discover", href: "/discover" },
    { name: "Features", href: "/#features" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "How It Works", href: "/#how-it-works" },
  ];

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const getAdjustedPath = (href: string) => {
    if (href.startsWith("/#") && location.pathname !== "/") {
      return href.replace("/#", "/");
    }
    return href;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 border-b border-transparent",
        isScrolled && "bg-white/80 backdrop-blur-md border-gray-200/30 shadow-sm"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="font-bold text-xl">ThemeVest</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={getAdjustedPath(link.href)}
              className={cn(
                "text-sm font-medium transition-colors",
                (location.pathname === link.href || (location.pathname === "/" && link.href.startsWith("/#")))
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className={cn(
                "text-sm font-medium transition-colors",
                location.pathname === "/dashboard"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Dashboard
            </Link>
          )}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <Button variant="outline" className="rounded-full" onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <>
              <Button variant="outline" className="rounded-full" onClick={handleLogin}>
                Log in
              </Button>
              <Button className="rounded-full">Get Started</Button>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-fade-in">
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={getAdjustedPath(link.href)}
                className={cn(
                  "block py-2 text-base font-medium hover:text-primary",
                  (location.pathname === link.href || (location.pathname === "/" && link.href.startsWith("/#")))
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={cn(
                  "block py-2 text-base font-medium hover:text-primary",
                  location.pathname === "/dashboard"
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="pt-4 flex flex-col space-y-3">
              {isLoggedIn ? (
                <Button variant="outline" className="w-full rounded-full" onClick={handleLogout}>
                  Log out
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="w-full rounded-full" onClick={handleLogin}>
                    Log in
                  </Button>
                  <Button className="w-full rounded-full">Get Started</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
