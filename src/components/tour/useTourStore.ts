
import { create } from 'zustand';
import { TourStep } from './GuidedTour';

type TourPage = 
  'landing' | 
  'signup' | 
  'login' | 
  'dashboard' | 
  'settings' | 
  'dashboard-return' | 
  'discover' | 
  'portfolio-detail' | 
  null;

interface TourState {
  isOpen: boolean;
  isTourActive: boolean;
  currentStep: number;
  steps: TourStep[];
  currentPage: TourPage;
  
  // Actions
  setSteps: (steps: TourStep[]) => void;
  start: () => void;
  next: () => void;
  prev: () => void;
  close: () => void;
  goto: (step: number) => void;
  setCurrentPage: (page: TourPage) => void;
  getCurrentPage: () => TourPage;
  setTourActive: (active: boolean) => void;
}

export const useTourStore = create<TourState>((set, get) => ({
  isOpen: false,
  isTourActive: false,
  currentStep: 0,
  steps: [],
  currentPage: null,
  
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

  setCurrentPage: (page) => set({ currentPage: page }),

  getCurrentPage: () => get().currentPage,

  setTourActive: (active) => set({ isTourActive: active }),
}));
