
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
  const { startTour } = useTour();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={startTour}
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
