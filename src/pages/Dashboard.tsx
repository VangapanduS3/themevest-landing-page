import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  BarChart3, 
  TrendingUp, 
  CircleDollarSign, 
  ArrowUpRight,
  Briefcase,
  LineChart,
  Bell,
  Settings,
  Plus,
  Clock,
  ChevronRight,
  Activity,
  RefreshCw,
  LogOut,
  UserCog,
  Wallet,
  HelpCircle,
  Moon,
  Bell as BellIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchUserData, fetchPortfolioData } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HomeTourButton } from "@/components/tour/HomeTour";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const { 
    data: userData, 
    isLoading: isUserDataLoading, 
    error: userDataError,
    refetch: refetchUserData
  } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    staleTime: 300000, // 5 minutes
    retry: 2
  });

  const { 
    data: portfolioData, 
    isLoading: isPortfolioDataLoading
  } = useQuery({
    queryKey: ['portfolioData'],
    queryFn: fetchPortfolioData,
    staleTime: 300000, // 5 minutes
    retry: 2
  });

  useEffect(() => {
    if (userDataError) {
      toast({
        title: "Error",
        description: "Failed to load your dashboard data. Please try again.",
        variant: "destructive"
      });
    }
  }, [userDataError, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/login");
  };

  const handleNavigateToSettings = (tab = "profile") => {
    console.log(`Navigating to settings page tab: ${tab} from Dashboard`);
    navigate(`/settings?tab=${tab}`);
  };

  const handleNotificationClick = () => {
    setHasUnreadNotifications(false);
  };

  const handleAddNew = () => {
    navigate('/discover');
  };

  if (isUserDataLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold">Failed to load dashboard</h2>
          <p className="text-muted-foreground">We couldn't load your investment data. Please try refreshing.</p>
          <Button onClick={() => refetchUserData()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="border-b border-border">
        <div className="container mx-auto py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl">ThemeVest</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <HomeTourButton />
            
            <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={handleNotificationClick}
                >
                  <Bell className="h-5 w-5" />
                  {hasUnreadNotifications && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Notifications</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Your recent notifications
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {[
                    {
                      icon: <Wallet className="h-4 w-4 text-green-600" />,
                      title: "Dividend Received",
                      description: "You received a dividend payment of $45.30",
                      time: "2 hours ago"
                    },
                    {
                      icon: <TrendingUp className="h-4 w-4 text-blue-600" />,
                      title: "Portfolio Up 3.2%",
                      description: "Your tech portfolio is up 3.2% today",
                      time: "5 hours ago"
                    },
                    {
                      icon: <Activity className="h-4 w-4 text-amber-600" />,
                      title: "Portfolio Rebalanced",
                      description: "Your portfolio has been automatically rebalanced",
                      time: "Yesterday"
                    }
                  ].map((notification, i) => (
                    <DropdownMenuItem 
                      key={i} 
                      className="flex cursor-pointer items-start gap-3 px-4 py-3"
                    >
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="justify-center text-center cursor-pointer font-medium text-primary" 
                  asChild
                >
                  <Link to="/notifications">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => handleNavigateToSettings("profile")}
                >
                  <UserCog className="h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => handleNavigateToSettings("payment")}
                >
                  <Wallet className="h-4 w-4" />
                  <span>Payment Methods</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer flex items-center gap-2"
                  onClick={() => handleNavigateToSettings("appearance")}
                >
                  <Moon className="h-4 w-4" />
                  <span>Appearance</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="bg-primary/5 border-b border-border">
        <div className="container py-4">
          <div className="flex items-center justify-between dashboard-welcome">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center animate-fade-in">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <h1 className="text-2xl font-bold">Welcome, {userData.name}!</h1>
                <p className="text-muted-foreground">Here's your investment overview</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid gap-4 md:grid-cols-3 mb-8 portfolio-overview">
            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                <CircleDollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{userData.totalInvestment}</div>
                <div className="text-xs text-muted-foreground mt-1">Initial capital</div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="text-sm font-medium">Total Return</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-500">{userData.totalReturn}</div>
                <div className="text-xs text-muted-foreground mt-1">Since inception</div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                <BarChart3 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{userData.portfolioValue}</div>
                <div className="text-xs text-muted-foreground mt-1">Current market value</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="portfolios" className="mb-8 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <TabsList className="mb-4">
              <TabsTrigger value="portfolios" className="data-[state=active]:bg-primary data-[state=active]:text-white">My Portfolios</TabsTrigger>
              <TabsTrigger value="activity" className="data-[state=active]:bg-primary data-[state=active]:text-white">Recent Activity</TabsTrigger>
              <TabsTrigger value="recommendations" className="data-[state=active]:bg-primary data-[state=active]:text-white">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolios" className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">Your Best Performing Portfolios</h2>
                <Button 
                  size="sm" 
                  className="group bg-primary hover:bg-primary/90" 
                  onClick={handleAddNew}
                >
                  <Plus className="mr-1 h-4 w-4 transition-transform group-hover:rotate-90" />
                  Add New
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                {isPortfolioDataLoading ? (
                  Array(3).fill(0).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <Skeleton className="h-6 w-24" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-20 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  userData.bestPerforming.map((portfolio, index) => (
                    <Card 
                      key={portfolio.title}
                      className="overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 group animate-fade-in portfolio-card"
                      style={{ animationDelay: `${(index + 6) * 100}ms` }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-transparent">
                        <div className={`text-xs font-medium px-2 py-1 rounded-full
                          ${portfolio.riskLevel === "Low" ? "bg-green-100 text-green-700" : ""}
                          ${portfolio.riskLevel === "Medium" ? "bg-amber-100 text-amber-700" : ""}
                          ${portfolio.riskLevel === "High" ? "bg-red-100 text-red-700" : ""}`
                        }>
                          {portfolio.riskLevel} Risk
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-semibold">{portfolio.returns}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="font-semibold">{portfolio.title}</h3>
                        </div>
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Allocation</p>
                            <p className="font-medium">${Math.floor(Math.random() * 20000) + 5000}</p>
                          </div>
                          <div className="h-8 w-20 bg-muted rounded-md overflow-hidden relative">
                            <div 
                              className="absolute bottom-0 left-0 h-full bg-primary/20"
                              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-primary hover:text-primary/90 group"
                          asChild
                        >
                          <Link to={`/portfolio/${encodeURIComponent(portfolio.title)}`}>
                            View Details
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
              
              <Link className="flex items-center justify-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors" to="/discover">
                Browse all portfolio themes
                <ChevronRight className="h-4 w-4" />
              </Link>
            </TabsContent>
            
            <TabsContent value="activity">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
              </div>
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {userData.recentActivity.map((activity, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${(index + 1) * 150}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center",
                            activity.type === "Deposit" ? "bg-green-100" : "bg-blue-100"
                          )}>
                            {activity.type === "Deposit" && <CircleDollarSign className="h-5 w-5 text-green-600" />}
                            {activity.type === "Dividend" && <LineChart className="h-5 w-5 text-blue-600" />}
                            {activity.type === "Portfolio Rebalance" && <Activity className="h-5 w-5 text-amber-600" />}
                          </div>
                          <div>
                            <p className="font-medium">{activity.type}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.amount && (
                            <p className={cn(
                              "font-medium",
                              activity.amount.startsWith("+") ? "text-green-600" : "text-red-600"
                            )}>
                              {activity.amount}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">{activity.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Recommended for You</h2>
                <p className="text-sm text-muted-foreground">Based on your investment preferences and goals</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                {isPortfolioDataLoading ? (
                  Array(3).fill(0).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <Skeleton className="h-6 w-24" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-24 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  userData.recommendations.map((portfolio, index) => (
                    <Card 
                      key={portfolio.title} 
                      className="overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 group border-l-4 animate-fade-in"
                      style={{ 
                        borderLeftColor: `${portfolio.riskLevel === "Low" ? "#10b981" : 
                                          portfolio.riskLevel === "Medium" ? "#f59e0b" : "#ef4444"}`,
                        animationDelay: `${(index + 9) * 100}ms`
                      }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className={`text-xs font-medium px-2 py-1 rounded-full
                          ${portfolio.riskLevel === "Low" ? "bg-green-100 text-green-700" : ""}
                          ${portfolio.riskLevel === "Medium" ? "bg-amber-100 text-amber-700" : ""}
                          ${portfolio.riskLevel === "High" ? "bg-red-100 text-red-700" : ""}`
                        }>
                          {portfolio.riskLevel} Risk
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-semibold">{portfolio.returns}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <h3 className="font-semibold mb-2">{portfolio.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{portfolio.description}</p>
                        <div className="flex items-center justify-between mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">5+ Years</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Match: </span>
                            <span className="font-medium text-primary">{Math.floor(Math.random() * 20) + 80}%</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-primary hover:text-primary/90 group"
                          asChild
                        >
                          <Link to={`/portfolio/${encodeURIComponent(portfolio.title)}`}>
                            View Details
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
