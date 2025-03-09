import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { portfolioThemes } from "@/data/portfolioData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const generatePerformanceData = (seed: number, volatility: number) => {
  const timeframes = {
    "1M": { points: 30, baseline: seed * 0.3 },
    "3M": { points: 90, baseline: seed * 0.5 },
    "1Y": { points: 365, baseline: seed },
    "YTD": { points: 180, baseline: seed * 0.7 },
  };

  const result: { [key: string]: any[] } = {};

  Object.entries(timeframes).forEach(([timeframe, { points, baseline }]) => {
    const data = [];
    let value = 100;

    for (let i = 0; i < points; i++) {
      const change = (Math.random() - 0.48) * volatility;
      value += change;
      
      value += (baseline / points);

      const date = new Date();
      date.setDate(date.getDate() - (points - i));

      data.push({
        date: date.toISOString().split('T')[0],
        value: value.toFixed(2),
      });
    }
    
    result[timeframe] = data;
  });

  return result;
};

const generateMarketIndicators = (returnValue: string, riskLevel: string) => {
  const returnNum = parseFloat(returnValue.replace("+", "").replace("%", ""));
  
  let volatility = 2;
  if (riskLevel === "Medium") volatility = 3;
  if (riskLevel === "High") volatility = 4.5;
  
  return {
    volatility: (volatility + Math.random()).toFixed(1) + "%",
    sharpeRatio: ((returnNum / volatility) + Math.random() * 0.5).toFixed(2),
    alpha: ((returnNum * 0.2) - 1 + Math.random() * 2).toFixed(2) + "%",
    beta: (0.8 + Math.random() * 0.4).toFixed(2),
    maxDrawdown: "-" + (5 + Math.random() * volatility * 2).toFixed(1) + "%",
  };
};

const generateStockHoldings = (count: number, type: string) => {
  const stocksByType: { [key: string]: string[] } = {
    tech: ["Apple", "Microsoft", "Google", "NVIDIA", "Amazon", "Meta", "Adobe", "Oracle", "Salesforce", "Intel", "AMD", "PayPal", "Tesla", "Cisco", "IBM"],
    sustainability: ["First Solar", "Enphase", "Vestas", "Ørsted", "Tesla", "NextEra Energy", "Ecolab", "Waste Management", "Beyond Meat", "Sunrun", "Brookfield Renewable", "Siemens Gamesa", "Plug Power"],
    healthcare: ["Johnson & Johnson", "Pfizer", "Abbott", "Thermo Fisher", "Moderna", "Medtronic", "Illumina", "Edwards Lifesciences", "Regeneron", "Amgen", "Stryker", "Danaher", "Intuitive Surgical"],
    finance: ["JPMorgan Chase", "Visa", "Mastercard", "PayPal", "Block", "Goldman Sachs", "Morgan Stanley", "Coinbase", "Robinhood", "Blackstone", "BlackRock", "S&P Global", "Moody's"],
    luxury: ["LVMH", "Hermès", "Ferrari", "Prada", "Kering", "Burberry", "Tiffany & Co", "Ralph Lauren", "Moncler", "Estée Lauder", "Richemont", "Tapestry", "Michael Kors"],
    energy: ["NextEra Energy", "Enphase", "First Solar", "SolarEdge", "Plug Power", "Bloom Energy", "Sunrun", "Clearway Energy", "Brookfield Renewable", "Vestas", "Ormat Technologies"],
    consumer: ["Amazon", "Walmart", "Costco", "Nike", "Starbucks", "McDonald's", "Coca-Cola", "PepsiCo", "Procter & Gamble", "Nestlé", "Unilever", "Target", "Home Depot", "Disney"],
    "real-estate": ["American Tower", "Prologis", "Equinix", "Crown Castle", "Digital Realty", "Public Storage", "Welltower", "AvalonBay", "Simon Property Group", "Equity Residential"],
    materials: ["Linde", "Air Products", "Sherwin-Williams", "Ecolab", "Newmont", "Freeport-McMoRan", "Albemarle", "Vulcan Materials", "Martin Marietta", "International Paper"],
    industrial: ["Honeywell", "Union Pacific", "Caterpillar", "Deere", "General Electric", "3M", "Lockheed Martin", "Boeing", "Raytheon", "Emerson Electric", "ABB", "Siemens", "Rockwell Automation"],
    telecom: ["Verizon", "AT&T", "T-Mobile", "Comcast", "Charter", "Vodafone", "American Tower", "Crown Castle", "SBA Communications", "Lumen Technologies"]
  };
  
  const available = stocksByType[type] || stocksByType.tech;
  const selected = [];
  const weights = [];
  let remainingWeight = 100;
  
  for (let i = 0; i < count && i < available.length; i++) {
    selected.push(available[i]);
    
    if (i === count - 1 || i === available.length - 1) {
      weights.push(remainingWeight);
    } else {
      const weight = Math.floor(Math.random() * 15) + 5;
      weights.push(weight);
      remainingWeight -= weight;
    }
  }
  
  return selected.map((stock, index) => ({
    name: stock,
    weight: weights[index] + "%",
    performance: "+" + (Math.random() * 30 + 5).toFixed(1) + "%"
  }));
};

const marketIndicatorDefinitions = {
  volatility: "Measures the degree of variation in returns over time. Higher values indicate greater risk.",
  sharpeRatio: "Measures risk-adjusted returns. Higher values indicate better risk-adjusted performance.",
  alpha: "Excess return relative to a benchmark. Positive values indicate outperformance.",
  beta: "Measures sensitivity to market movements. Values above 1 indicate higher volatility than the market.",
  maxDrawdown: "Largest drop from peak to trough. Indicates potential downside risk."
};

const PortfolioDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [timeframe, setTimeframe] = useState("YTD");
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [marketIndicators, setMarketIndicators] = useState<any>(null);
  const [stockHoldings, setStockHoldings] = useState<any[]>([]);
  
  useEffect(() => {
    if (id) {
      const decodedId = decodeURIComponent(id);
      const foundPortfolio = portfolioThemes.find(p => p.title === decodedId);
      
      if (foundPortfolio) {
        setPortfolio(foundPortfolio);
        
        const returnValue = parseFloat(foundPortfolio.returns.replace("+", "").replace("%", ""));
        const volatility = foundPortfolio.riskLevel === "Low" ? 2 : 
                          foundPortfolio.riskLevel === "Medium" ? 3 : 4.5;
        
        setPerformanceData(generatePerformanceData(returnValue, volatility));
        setMarketIndicators(generateMarketIndicators(foundPortfolio.returns, foundPortfolio.riskLevel));
        setStockHoldings(generateStockHoldings(foundPortfolio.stockCount, foundPortfolio.type));
      }
    }
  }, [id]);
  
  if (!portfolio) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 container">
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-semibold mb-2">Portfolio not found</h2>
            <p className="text-muted-foreground mb-6">The portfolio you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/discover">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Discover
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/discover" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Discover
              </Link>
            </Button>
          </div>
          
          <div className="mb-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "theme-tag",
                    portfolio.type === "tech" && "bg-theme-tech/10 text-theme-tech",
                    portfolio.type === "sustainability" && "bg-theme-sustainability/10 text-theme-sustainability",
                    portfolio.type === "healthcare" && "bg-theme-healthcare/10 text-theme-healthcare",
                    portfolio.type === "finance" && "bg-theme-finance/10 text-theme-finance",
                    portfolio.type === "luxury" && "bg-theme-luxury/10 text-theme-luxury",
                    portfolio.type === "energy" && "bg-green-100 text-green-700",
                    portfolio.type === "consumer" && "bg-orange-100 text-orange-700",
                    portfolio.type === "real-estate" && "bg-indigo-100 text-indigo-700",
                    portfolio.type === "materials" && "bg-amber-100 text-amber-700",
                    portfolio.type === "industrial" && "bg-slate-100 text-slate-700",
                    portfolio.type === "telecom" && "bg-cyan-100 text-cyan-700"
                  )}>
                    {portfolio.type.charAt(0).toUpperCase() + portfolio.type.slice(1)}
                  </div>
                  
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs",
                      portfolio.riskLevel === "Low" && "bg-green-100 text-green-700 border-green-200",
                      portfolio.riskLevel === "Medium" && "bg-amber-100 text-amber-700 border-amber-200",
                      portfolio.riskLevel === "High" && "bg-red-100 text-red-700 border-red-200",
                    )}
                  >
                    {portfolio.riskLevel} Risk
                  </Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{portfolio.title}</h1>
                <p className="text-muted-foreground max-w-2xl">{portfolio.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-md font-medium text-lg",
                  parseFloat(portfolio.returns) > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {parseFloat(portfolio.returns) > 0 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                  {portfolio.returns}
                  <span className="text-xs ml-1">YTD</span>
                </div>
                
                <Button variant="outline">
                  Invest Now
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Performance</h3>
                    
                    <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
                      <TabsList>
                        <TabsTrigger value="1M">1M</TabsTrigger>
                        <TabsTrigger value="3M">3M</TabsTrigger>
                        <TabsTrigger value="YTD">YTD</TabsTrigger>
                        <TabsTrigger value="1Y">1Y</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {performanceData && (
                    <div className="h-80">
                      <ResponsiveContainer width="95%" height="100%">
                        <LineChart 
                          data={performanceData[timeframe]} 
                          margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(tick) => {
                              const date = new Date(tick);
                              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                            }}
                            tick={{ fontSize: 12 }}
                            tickCount={5}
                            height={30}
                            padding={{ left: 10, right: 10 }}
                          />
                          <YAxis 
                            tickFormatter={(tick) => `${tick}`} 
                            domain={['dataMin - 5', 'dataMax + 5']}
                            tick={{ fontSize: 12 }}
                            width={45}
                          />
                          <RechartsTooltip 
                            formatter={(value: any) => [`${value}`, 'Value']}
                            labelFormatter={(label) => {
                              const date = new Date(label);
                              return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                            }}
                            contentStyle={{ padding: '10px', borderRadius: '4px' }}
                          />
                          <Legend wrapperStyle={{ paddingTop: 10 }} />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            name={`${portfolio.title} Portfolio`}
                            stroke={
                              portfolio.type === "tech" ? "#3b82f6" :
                              portfolio.type === "sustainability" ? "#10b981" :
                              portfolio.type === "healthcare" ? "#0ea5e9" :
                              portfolio.type === "finance" ? "#f59e0b" :
                              portfolio.type === "luxury" ? "#db2777" :
                              portfolio.type === "energy" ? "#22c55e" :
                              portfolio.type === "consumer" ? "#f97316" :
                              portfolio.type === "real-estate" ? "#6366f1" :
                              portfolio.type === "materials" ? "#f59e0b" :
                              portfolio.type === "industrial" ? "#64748b" :
                              portfolio.type === "telecom" ? "#06b6d4" : "#3b82f6"
                            } 
                            strokeWidth={2} 
                            dot={false}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6">Holdings ({portfolio.stockCount} Stocks)</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-2">Company</th>
                          <th className="text-right pb-2">Weight</th>
                          <th className="text-right pb-2">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stockHoldings.map((stock, index) => (
                          <tr key={index} className="border-b last:border-b-0">
                            <td className="py-3 font-medium">{stock.name}</td>
                            <td className="py-3 text-right">{stock.weight}</td>
                            <td className="py-3 text-right text-green-600">{stock.performance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Market Indicators</h3>
                  
                  {marketIndicators && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">Volatility</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" aria-label="More information about volatility">
                                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{marketIndicatorDefinitions.volatility}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="font-medium">{marketIndicators.volatility}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" aria-label="More information about sharpe ratio">
                                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{marketIndicatorDefinitions.sharpeRatio}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="font-medium">{marketIndicators.sharpeRatio}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">Alpha</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" aria-label="More information about alpha">
                                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{marketIndicatorDefinitions.alpha}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="font-medium">{marketIndicators.alpha}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">Beta</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" aria-label="More information about beta">
                                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{marketIndicatorDefinitions.beta}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="font-medium">{marketIndicators.beta}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-muted-foreground">Max Drawdown</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button type="button" aria-label="More information about max drawdown">
                                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{marketIndicatorDefinitions.maxDrawdown}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <span className="font-medium text-red-600">{marketIndicators.maxDrawdown}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Portfolio Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Risk Level</span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          portfolio.riskLevel === "Low" && "bg-green-100 text-green-700 border-green-200",
                          portfolio.riskLevel === "Medium" && "bg-amber-100 text-amber-700 border-amber-200",
                          portfolio.riskLevel === "High" && "bg-red-100 text-red-700 border-red-200",
                        )}
                      >
                        {portfolio.riskLevel}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <span className="font-medium capitalize">{portfolio.type}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Number of Stocks</span>
                      <span className="font-medium">{portfolio.stockCount}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Popularity</span>
                      <span className="font-medium">{portfolio.popularity}/100</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Minimum Investment</span>
                      <span className="font-medium">$1,000</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">Invest Now</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioDetail;
