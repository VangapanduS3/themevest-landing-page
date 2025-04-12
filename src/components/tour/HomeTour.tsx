
import { Button } from "@/components/ui/button";
import { useTour } from "./useTour";
import { Info } from "lucide-react";

export const HomeTourButton = () => {
  const { startTour } = useTour();

  return (
    <Button 
      onClick={startTour}
      variant="ghost" 
      size="sm"
      className="flex items-center gap-2 text-primary"
    >
      <Info className="h-4 w-4" />
      Take a Tour
    </Button>
  );
};
