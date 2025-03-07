
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1]
    }
  })
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// For hover effects
export const scaleOnHover = {
  scale: 1.03,
  transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
};

// For load animations
export const initialLoadTransition = {
  duration: 0.8,
  ease: [0.25, 0.1, 0.25, 1.0]
};
