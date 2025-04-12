
import { useCallback, useEffect } from 'react';
import { useTourStore } from './useTourStore';
import { TourStep } from './GuidedTour';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  landingPageTourSteps,
  signupPageTourSteps,
  loginPageTourSteps,
  dashboardPageTourSteps,
  settingsPageTourSteps,
  dashboardReturnTourSteps,
  discoverPageTourSteps,
  portfolioDetailTourSteps
} from './TourConfig';

export function useTour() {
  const { 
    setSteps, 
    start, 
    close, 
    isOpen, 
    setCurrentPage,
    getCurrentPage,
    setTourActive,
    isTourActive,
    next
  } = useTourStore();
  
  const location = useLocation();
  const navigate = useNavigate();

  // Handle step changes that require navigation
  useEffect(() => {
    if (!isTourActive || !isOpen) return;
    
    const currentPage = getCurrentPage();
    const currentStep = useTourStore.getState().currentStep;
    const steps = useTourStore.getState().steps;
    
    // Check if the current step has nextPage defined
    if (steps[currentStep]?.nextPage) {
      const nextPage = steps[currentStep]?.nextPage;
      
      // This will be handled by the component's click handler
      // We only need to worry about auto-navigation if needed
    }
  }, [isTourActive, isOpen, getCurrentPage]);

  // Listen for route changes to update tour steps
  useEffect(() => {
    if (!isTourActive) return;

    const path = location.pathname;
    const currentPage = getCurrentPage();

    // Only continue the tour if we're actively going through it
    if (isTourActive) {
      if (path === '/' && currentPage !== 'landing') {
        setCurrentPage('landing');
        setSteps(landingPageTourSteps);
        start();
      } 
      else if (path === '/signup' && currentPage !== 'signup') {
        setCurrentPage('signup');
        setSteps(signupPageTourSteps);
        start();
      }
      else if (path === '/login' && currentPage !== 'login') {
        setCurrentPage('login');
        setSteps(loginPageTourSteps);
        start();
      }
      else if (path === '/dashboard' && currentPage !== 'dashboard' && currentPage !== 'dashboard-return') {
        setCurrentPage('dashboard');
        setSteps(dashboardPageTourSteps);
        start();
      }
      else if (path.includes('/settings') && currentPage !== 'settings') {
        setCurrentPage('settings');
        setSteps(settingsPageTourSteps);
        start();
      }
      else if (path === '/dashboard' && currentPage === 'settings') {
        setCurrentPage('dashboard-return');
        setSteps(dashboardReturnTourSteps);
        start();
      }
      else if (path === '/discover' && currentPage !== 'discover') {
        setCurrentPage('discover');
        setSteps(discoverPageTourSteps);
        start();
      }
      else if (path.includes('/portfolio/') && currentPage !== 'portfolio-detail') {
        setCurrentPage('portfolio-detail');
        setSteps(portfolioDetailTourSteps);
        start();
      }
    }
  }, [location.pathname, isTourActive, getCurrentPage, setCurrentPage, setSteps, start]);

  const startTour = useCallback(() => {
    const path = location.pathname;
    setTourActive(true);

    if (path === '/') {
      setCurrentPage('landing');
      setSteps(landingPageTourSteps);
    } else if (path === '/signup') {
      setCurrentPage('signup');
      setSteps(signupPageTourSteps);
    } else if (path === '/login') {
      setCurrentPage('login');
      setSteps(loginPageTourSteps);
    } else if (path === '/dashboard') {
      setCurrentPage('dashboard');
      setSteps(dashboardPageTourSteps);
    } else if (path.includes('/settings')) {
      setCurrentPage('settings');
      setSteps(settingsPageTourSteps);
    } else if (path === '/discover') {
      setCurrentPage('discover');
      setSteps(discoverPageTourSteps);
    } else if (path.includes('/portfolio/')) {
      setCurrentPage('portfolio-detail');
      setSteps(portfolioDetailTourSteps);
    } else {
      // Default to landing page tour if we're on another page
      navigate('/');
      setCurrentPage('landing');
      setSteps(landingPageTourSteps);
    }

    start();
  }, [location.pathname, navigate, setCurrentPage, setSteps, setTourActive, start]);

  const closeTour = useCallback(() => {
    setTourActive(false);
    close();
  }, [setTourActive, close]);

  const advanceToNextPage = useCallback((nextPage: string) => {
    if (nextPage === 'signup') {
      navigate('/signup');
    } else if (nextPage === 'login') {
      navigate('/login');
    } else if (nextPage === 'dashboard') {
      navigate('/dashboard');
    } else if (nextPage === 'settings') {
      navigate('/settings?tab=profile');
    } else if (nextPage === 'dashboard-return') {
      navigate('/dashboard');
    } else if (nextPage === 'discover') {
      navigate('/discover');
    } else if (nextPage === 'portfolio-detail') {
      // For simplicity we'll navigate to the first portfolio in the list
      navigate('/portfolio/Cloud%20Computing');
    }
  }, [navigate]);

  return {
    startTour,
    closeTour,
    isTourOpen: isOpen,
    isTourActive,
    advanceToNextPage
  };
}
