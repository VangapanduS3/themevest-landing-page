
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ThemeCardProps {
  title: string;
  description: string;
  returns: string;
  type: string;
  stockCount: number;
  index: number;
  popularity: number;
  riskLevel: string;
}

const ThemeCard = ({ 
  title, 
  description, 
  returns, 
  type, 
  stockCount, 
  index, 
  riskLevel 
}: ThemeCardProps) => {
  return (
    <div className="portfolio-card">
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "theme-tag",
          type === "tech" && "bg-theme-tech/10 text-theme-tech",
          type === "sustainability" && "bg-theme-sustainability/10 text-theme-sustainability",
          type === "healthcare" && "bg-theme-healthcare/10 text-theme-healthcare",
          type === "finance" && "bg-theme-finance/10 text-theme-finance",
          type === "luxury" && "bg-theme-luxury/10 text-theme-luxury",
          type === "energy" && "bg-green-100 text-green-700",
          type === "consumer" && "bg-orange-100 text-orange-700",
          type === "real-estate" && "bg-indigo-100 text-indigo-700",
          type === "materials" && "bg-amber-100 text-amber-700",
          type === "industrial" && "bg-slate-100 text-slate-700",
          type === "telecom" && "bg-cyan-100 text-cyan-700"
        )}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
        
        <div className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          riskLevel === "Low" && "bg-green-100 text-green-700",
          riskLevel === "Medium" && "bg-amber-100 text-amber-700",
          riskLevel === "High" && "bg-red-100 text-red-700",
        )}>
          {riskLevel} Risk
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <TrendingUp className={cn(
            "h-4 w-4 mr-1",
            type === "tech" && "text-theme-tech",
            type === "sustainability" && "text-theme-sustainability",
            type === "healthcare" && "text-theme-healthcare",
            type === "finance" && "text-theme-finance",
            type === "luxury" && "text-theme-luxury",
            type === "energy" && "text-green-700",
            type === "consumer" && "text-orange-700",
            type === "real-estate" && "text-indigo-700",
            type === "materials" && "text-amber-700",
            type === "industrial" && "text-slate-700",
            type === "telecom" && "text-cyan-700"
          )} />
          <span className="font-semibold">{returns}</span>
          <span className="text-xs text-muted-foreground ml-1">YTD</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {stockCount} Stocks
        </div>
      </div>
      
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between group",
          type === "tech" && "text-theme-tech hover:text-theme-tech/90",
          type === "sustainability" && "text-theme-sustainability hover:text-theme-sustainability/90",
          type === "healthcare" && "text-theme-healthcare hover:text-theme-healthcare/90",
          type === "finance" && "text-theme-finance hover:text-theme-finance/90",
          type === "luxury" && "text-theme-luxury hover:text-theme-luxury/90",
          type === "energy" && "text-green-700 hover:text-green-800",
          type === "consumer" && "text-orange-700 hover:text-orange-800",
          type === "real-estate" && "text-indigo-700 hover:text-indigo-800",
          type === "materials" && "text-amber-700 hover:text-amber-800",
          type === "industrial" && "text-slate-700 hover:text-slate-800",
          type === "telecom" && "text-cyan-700 hover:text-cyan-800"
        )}
      >
        View Portfolio
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </Button>
    </div>
  );
};

export default ThemeCard;
