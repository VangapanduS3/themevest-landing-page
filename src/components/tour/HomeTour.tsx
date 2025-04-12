
import { Button } from "@/components/ui/button";
import { useTour } from "./useTour";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HomeTourButton = () => {
  const { startTour, startDashboardTour } = useTour();

  // Determine if we're on the dashboard page
  const isDashboard = window.location.pathname === "/dashboard";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={isDashboard ? startDashboardTour : startTour}
            variant="ghost" 
            size="sm"
            className="flex items-center gap-2 text-primary"
          >
            <Info className="h-4 w-4" />
            Take a Tour
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>See how ThemeVest works with a guided tour</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
