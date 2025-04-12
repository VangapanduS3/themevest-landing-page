
import { useCallback } from 'react';
import { useTourStore } from './useTourStore';
import { TourStep } from './GuidedTour';

export function useTour() {
  const { setSteps, start, close, isOpen } = useTourStore();
  
  const startTour = useCallback((steps: TourStep[]) => {
    setSteps(steps);
    start();
  }, [setSteps, start]);

  return {
    startTour,
    closeTour: close,
    isTourOpen: isOpen
  };
}
