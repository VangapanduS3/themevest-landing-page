
import { Button } from "@/components/ui/button";
import { useTour } from "./useTour";
import { TourStep } from "./GuidedTour";
import { Info } from "lucide-react";

const homePageTourSteps: TourStep[] = [
  {
    target: "#themes", // The ID for the themes section
    title: "Explore Themes",
    content: "Discover investment portfolios built around themes that align with your interests and values.",
    position: "top"
  },
  {
    target: ".portfolio-card", // Target the first portfolio card
    title: "Portfolio Cards",
    content: "Each card represents a themed investment portfolio. Click to view details about the stocks included and performance metrics.",
    position: "right"
  },
  {
    target: "#testimonials", // The ID for the testimonials section
    title: "User Testimonials",
    content: "Read what other investors say about their experience with themed portfolios.",
    position: "top"
  },
  {
    target: "nav a[href='/discover']", // The discover navigation link
    title: "Discover More",
    content: "Click here to explore all available investment themes and find the ones that match your interests.",
    position: "bottom"
  }
];

export const HomeTourButton = () => {
  const { startTour } = useTour();

  return (
    <Button 
      onClick={() => startTour(homePageTourSteps)}
      variant="ghost" 
      size="sm"
      className="flex items-center gap-2 text-primary"
    >
      <Info className="h-4 w-4" />
      Take a Tour
    </Button>
  );
};
