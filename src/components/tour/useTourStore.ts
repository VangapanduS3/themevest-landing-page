
import { create } from 'zustand';
import { TourStep } from './GuidedTour';

interface TourState {
  isOpen: boolean;
  currentStep: number;
  steps: TourStep[];
  
  // Actions
  setSteps: (steps: TourStep[]) => void;
  start: () => void;
  next: () => void;
  prev: () => void;
  close: () => void;
  goto: (step: number) => void;
}

export const useTourStore = create<TourState>((set) => ({
  isOpen: false,
  currentStep: 0,
  steps: [],
  
  setSteps: (steps) => set({ steps }),
  
  start: () => set({ isOpen: true, currentStep: 0 }),
  
  next: () => set((state) => {
    if (state.currentStep < state.steps.length - 1) {
      return { currentStep: state.currentStep + 1 };
    }
    return { isOpen: false };
  }),
  
  prev: () => set((state) => {
    if (state.currentStep > 0) {
      return { currentStep: state.currentStep - 1 };
    }
    return state;
  }),
  
  close: () => set({ isOpen: false }),
  
  goto: (step) => set((state) => {
    if (step >= 0 && step < state.steps.length) {
      return { currentStep: step };
    }
    return state;
  }),
}));
