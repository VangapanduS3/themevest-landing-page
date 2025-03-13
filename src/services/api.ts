
import { portfolioThemes, PortfolioTheme } from '@/data/portfolioData';

// Simulated delay to mimic API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface UserData {
  name: string;
  totalInvestment: string;
  totalReturn: string;
  portfolioValue: string;
  bestPerforming: PortfolioTheme[];
  recommendations: PortfolioTheme[];
  recentActivity: {
    type: string;
    amount: string;
    date: string;
    status: string;
  }[];
}

export const fetchUserData = async (): Promise<UserData> => {
  // Simulate API delay
  await delay(1500);
  
  // In a real app, this would be an API call to a backend service
  const name = localStorage.getItem("userEmail")?.split("@")[0] || "John Doe";
  
  // Simulate a backend response
  return {
    name,
    totalInvestment: "$50,000",
    totalReturn: "+18.5%",
    portfolioValue: "$59,250",
    bestPerforming: portfolioThemes.slice(0, 3), // Top 3 portfolios
    recommendations: portfolioThemes.slice(3, 6), // Next 3 portfolios
    recentActivity: [
      { type: "Deposit", amount: "+$2,000", date: "Today, 10:45 AM", status: "Completed" },
      { type: "Dividend", amount: "+$120", date: "Yesterday, 2:30 PM", status: "Completed" },
      { type: "Portfolio Rebalance", amount: "", date: "Mar 15, 9:20 AM", status: "Completed" },
    ]
  };
};

export const fetchPortfolioData = async (): Promise<PortfolioTheme[]> => {
  // Simulate API delay
  await delay(800);
  
  // In a real app, this would be an API call to a backend service
  return portfolioThemes;
};
