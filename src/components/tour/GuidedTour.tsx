
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight, ChevronLeft, Circle, Target, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTourStore } from '@/components/tour/useTourStore';
import { useTour } from './useTour';

export interface TourStep {
  target: string; // CSS selector for the target element
  title: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  nextPage?: string; // Optional next page to navigate to after this step
}

interface HighlightProps {
  targetElement: Element | null;
  padding?: number;
}

const Highlight: React.FC<HighlightProps> = ({ 
  targetElement, 
  padding = 8 
}) => {
  const [position, setPosition] = useState({ 
    top: 0, 
    left: 0, 
    width: 0, 
    height: 0 
  });

  useEffect(() => {
    if (!targetElement) return;

    const updatePosition = () => {
      const rect = targetElement.getBoundingClientRect();
      setPosition({
        top: rect.top - padding + window.scrollY,
        left: rect.left - padding + window.scrollX,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetElement, padding]);

  if (!targetElement) return null;

  return (
    <div
      className="absolute rounded-full border-2 border-primary bg-primary/10 pointer-events-none z-50 animate-pulse"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
      }}
    />
  );
};

interface TooltipProps {
  targetElement: Element | null;
  title: string;
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  currentStep: number;
  totalSteps: number;
  isLastStepInPage: boolean;
  nextPage?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  targetElement,
  title,
  content,
  position = 'bottom',
  onNext,
  onPrev,
  onClose,
  currentStep,
  totalSteps,
  isLastStepInPage,
  nextPage
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ 
    top: 0, 
    left: 0 
  });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { advanceToNextPage } = useTour();

  useEffect(() => {
    if (!targetElement || !tooltipRef.current) return;

    const updatePosition = () => {
      const targetRect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltipRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
      
      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = targetRect.top - tooltipRect.height - 12 + window.scrollY;
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2 + window.scrollX;
          break;
        case 'right':
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2 + window.scrollY;
          left = targetRect.right + 12 + window.scrollX;
          break;
        case 'bottom':
          top = targetRect.bottom + 12 + window.scrollY;
          left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2 + window.scrollX;
          break;
        case 'left':
          top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2 + window.scrollY;
          left = targetRect.left - tooltipRect.width - 12 + window.scrollX;
          break;
        case 'center':
          top = window.innerHeight / 2 - tooltipRect.height / 2 + window.scrollY;
          left = window.innerWidth / 2 - tooltipRect.width / 2 + window.scrollX;
          break;
      }

      // Ensure tooltip stays within viewport
      if (left < 20) left = 20;
      if (left + tooltipRect.width > window.innerWidth - 20) {
        left = window.innerWidth - tooltipRect.width - 20;
      }
      
      if (top < 20) top = 20;
      if (top + tooltipRect.height > window.innerHeight - 20 + window.scrollY) {
        top = window.innerHeight - tooltipRect.height - 20 + window.scrollY;
      }

      setTooltipPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [targetElement, position]);

  const handleNextClick = () => {
    if (currentStep < totalSteps - 1) {
      onNext();
    } else if (isLastStepInPage && nextPage) {
      // If this is the last step in the page and there's a next page, go to it
      advanceToNextPage(nextPage);
    } else {
      onClose();
    }
  };

  if (!targetElement && position !== 'center') return null;

  return (
    <div
      ref={tooltipRef}
      className="fixed bg-white dark:bg-card shadow-xl rounded-xl p-4 w-64 z-[9999] border border-primary/20"
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <Button 
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{content}</p>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {currentStep + 1} of {totalSteps}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onPrev}
            disabled={currentStep === 0}
            className={cn(currentStep === 0 && "opacity-50 cursor-not-allowed")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Button 
            size="sm"
            onClick={handleNextClick}
            className="group"
          >
            {currentStep < totalSteps - 1 ? (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </>
            ) : isLastStepInPage && nextPage ? (
              <>
                Continue
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
              </>
            ) : (
              'Finish'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const GuidedTour: React.FC = () => {
  const { 
    isOpen, 
    currentStep, 
    steps, 
    start, 
    next, 
    prev, 
    close,
    currentPage
  } = useTourStore();
  const [targetElement, setTargetElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!isOpen || !steps.length) return;

    const currentTarget = steps[currentStep]?.target;
    if (currentTarget) {
      // Wait a bit for the DOM to settle after navigation
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(currentTarget);
        if (element) {
          setTargetElement(element);
          
          // Scroll element into view if needed
          const rect = element.getBoundingClientRect();
          const isInViewport = 
            rect.top >= 50 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight - 50 &&
            rect.right <= window.innerWidth;
            
          if (!isInViewport) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          console.warn(`Target element not found: ${currentTarget}`);
          setTargetElement(null);
        }
      }, 300);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, currentStep, steps, currentPage]);

  if (!isOpen || !steps.length) return null;

  const isLastStepInPage = currentStep === steps.length - 1;
  const nextPage = steps[currentStep]?.nextPage;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={close} />
      <Highlight targetElement={targetElement} />
      <Tooltip
        targetElement={targetElement}
        title={steps[currentStep]?.title || ''}
        content={steps[currentStep]?.content || ''}
        position={steps[currentStep]?.position}
        onNext={next}
        onPrev={prev}
        onClose={close}
        currentStep={currentStep}
        totalSteps={steps.length}
        isLastStepInPage={isLastStepInPage}
        nextPage={nextPage}
      />
    </>,
    document.body
  );
};
