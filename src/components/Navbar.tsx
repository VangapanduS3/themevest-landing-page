import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, Settings, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const getNavLinks = () => {
    const links = [
      { name: "Discover", href: "/discover" },
      { name: "Features", href: "/features" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "How It Works", href: "/how-it-works" },
    ];
    
    if (isLoggedIn) {
      return [{ name: "Dashboard", href: "/dashboard" }, ...links];
    }
    
    return links;
  };

  const navLinks = getNavLinks();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
    setMobileMenuOpen(false);
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
        isScrolled && "bg-white/80 backdrop-blur-md border-gray-200/30 shadow-sm dark:bg-gray-900/80 dark:border-gray-800/30"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <span className="font-bold text-xl">ThemeVest</span>
        </Link>
        
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
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* Notifications dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    <div className="p-4 text-center text-muted-foreground">
                      No new notifications
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Settings dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Account Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="rounded-full" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Button variant="outline" className="rounded-full" onClick={handleLogin}>
                Log in
              </Button>
              <Button className="rounded-full" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
            </>
          )}
        </div>
        
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
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-fade-in">
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
            <div className="pt-4 flex flex-col space-y-3">
              {isLoggedIn ? (
                <>
                  <Button variant="outline" className="w-full text-left justify-start" onClick={handleNavigateToSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full rounded-full" onClick={handleLogout}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full rounded-full" onClick={handleLogin}>
                    Log in
                  </Button>
                  <Button className="w-full rounded-full" onClick={() => navigate("/signup")}>
                    Get Started
                  </Button>
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
