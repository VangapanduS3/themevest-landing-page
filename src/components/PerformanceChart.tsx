
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Info } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface PerformanceChartProps {
  performanceData: any;
  portfolioType: string;
  portfolioTitle: string;
}

const PerformanceChart = ({ performanceData, portfolioType, portfolioTitle }: PerformanceChartProps) => {
  const [timeframe, setTimeframe] = useState("YTD");

  // Define colors based on portfolio type
  const getChartColor = () => {
    switch (portfolioType) {
      case "tech": return "#3b82f6";
      case "sustainability": return "#10b981";
      case "healthcare": return "#0ea5e9";
      case "finance": return "#f59e0b";
      case "luxury": return "#db2777";
      case "energy": return "#22c55e";
      case "consumer": return "#f97316";
      case "real-estate": return "#6366f1";
      case "materials": return "#f59e0b";
      case "industrial": return "#64748b";
      case "telecom": return "#06b6d4";
      default: return "#8B5CF6"; // Default to purple
    }
  };

  const primaryColor = getChartColor();
  const gradientId = `performance-gradient-${portfolioType}`;

  // Format date for tooltip
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Format date for x-axis
  const formatAxisDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border/40 shadow-lg rounded-lg p-3 text-sm">
          <p className="font-medium text-foreground mb-1">{formatDate(label)}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-foreground font-mono">
              ${parseFloat(payload[0].value).toFixed(2)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">Performance</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button type="button" className="inline-flex" aria-label="Performance information">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs text-xs">
                  Historical performance of the {portfolioTitle} portfolio. Past performance does not guarantee future results.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="YTD">YTD</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {performanceData && (
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={performanceData[timeframe]} 
              margin={{ top: 5, right: 5, left: 5, bottom: 25 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={primaryColor} stopOpacity={0.6} />
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatAxisDate}
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
                tickCount={5}
                height={30}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis 
                tickFormatter={(tick) => `$${tick}`} 
                domain={['dataMin - 5', 'dataMax + 5']}
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
                tickLine={{ stroke: "#e2e8f0" }}
                width={45}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone" 
                dataKey="value" 
                name={`${portfolioTitle} Portfolio`}
                stroke={primaryColor}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;
