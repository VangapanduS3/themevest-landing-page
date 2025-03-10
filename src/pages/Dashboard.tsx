
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  BarChart3, 
  TrendingUp, 
  CircleDollarSign, 
  ArrowUpRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioThemes } from "@/data/portfolioData";
import { Link } from "react-router-dom";

// Mock user data
const userData = {
  name: "John Doe",
  totalInvestment: "$50,000",
  totalReturn: "+18.5%",
  portfolioValue: "$59,250",
  bestPerforming: portfolioThemes.slice(0, 3), // Top 3 portfolios
  recommendations: portfolioThemes.slice(3, 6), // Next 3 portfolios
};

const Dashboard = () => {
  const navigate = useNavigate();

  // For demo purposes, checking if user is "logged in"
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {userData.name}!</h1>
              <p className="text-muted-foreground">Here's your investment overview</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <CircleDollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.totalInvestment}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.totalReturn}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.portfolioValue}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Best Performing Portfolios</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {userData.bestPerforming.map((portfolio) => (
                <Card key={portfolio.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className={`text-xs font-medium px-2 py-1 rounded-full
                      ${portfolio.riskLevel === "Low" ? "bg-green-100 text-green-700" : ""}
                      ${portfolio.riskLevel === "Medium" ? "bg-amber-100 text-amber-700" : ""}
                      ${portfolio.riskLevel === "High" ? "bg-red-100 text-red-700" : ""}`
                    }>
                      {portfolio.riskLevel} Risk
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{portfolio.returns}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{portfolio.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{portfolio.description}</p>
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
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {userData.recommendations.map((portfolio) => (
                <Card key={portfolio.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className={`text-xs font-medium px-2 py-1 rounded-full
                      ${portfolio.riskLevel === "Low" ? "bg-green-100 text-green-700" : ""}
                      ${portfolio.riskLevel === "Medium" ? "bg-amber-100 text-amber-700" : ""}
                      ${portfolio.riskLevel === "High" ? "bg-red-100 text-red-700" : ""}`
                    }>
                      {portfolio.riskLevel} Risk
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{portfolio.returns}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{portfolio.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{portfolio.description}</p>
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
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
