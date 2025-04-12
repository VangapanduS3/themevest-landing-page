
import { TourStep } from "./GuidedTour";

// Landing page tour steps
export const landingPageTourSteps: TourStep[] = [
  {
    target: "button:contains('Create Account')", // Target the "Create Account" button
    title: "Get Started",
    content: "Click here to create your account and start investing.",
    position: "bottom",
    nextPage: "signup" // Navigate to signup page after this step
  }
];

// Signup page tour steps
export const signupPageTourSteps: TourStep[] = [
  {
    target: "form", // Target the signup form
    title: "Create Your Account",
    content: "Fill in your details to create a new account and start investing.",
    position: "left"
  },
  {
    target: "button[type='submit']", // Target the submit button
    title: "Create Account",
    content: "Click here after filling your details to create your account.",
    position: "top",
    nextPage: "login" // Navigate to login page after signup
  }
];

// Login page tour steps
export const loginPageTourSteps: TourStep[] = [
  {
    target: "form", // Target the login form
    title: "Sign In",
    content: "Enter your credentials to access your dashboard.",
    position: "left"
  },
  {
    target: "button[type='submit']", // Target the sign in button
    title: "Sign In",
    content: "Click here to log in to your account.",
    position: "top",
    nextPage: "dashboard" // Navigate to dashboard after login
  }
];

// Dashboard page tour steps
export const dashboardPageTourSteps: TourStep[] = [
  {
    target: "button:has(.Settings)", // Target the settings button
    title: "Account Settings",
    content: "Click here to access your account settings.",
    position: "bottom",
    nextPage: "settings" // Navigate to settings page
  }
];

// Settings page tour steps
export const settingsPageTourSteps: TourStep[] = [
  {
    target: "[value='profile']", // Target the profile tab
    title: "Profile Settings",
    content: "This is where you can update your personal information.",
    position: "bottom"
  },
  {
    target: "[value='payment']", // Target the payment tab
    title: "Payment Methods",
    content: "Set up your payment methods here to fund your investments.",
    position: "right"
  },
  {
    target: "button:has(.Plus)", // The add payment method button
    title: "Add Payment Method",
    content: "Click here to add a new payment method.",
    position: "top"
  },
  {
    target: "[value='brokerage']", // Target the brokerage tab
    title: "Connect Brokerages",
    content: "Connect your existing brokerage accounts here.",
    position: "right"
  },
  {
    target: "button:has(.Plus)", // The add brokerage button
    title: "Connect New Account",
    content: "Click here to connect a new brokerage account.",
    position: "top",
    nextPage: "dashboard-return" // Return to dashboard after settings
  }
];

// Dashboard return tour steps
export const dashboardReturnTourSteps: TourStep[] = [
  {
    target: "button:has(.Plus)", // Target the Add New button
    title: "Add New Portfolio",
    content: "Click here to explore new portfolio themes and add them to your dashboard.",
    position: "bottom",
    nextPage: "discover" // Navigate to discover page
  }
];

// Discover page tour steps
export const discoverPageTourSteps: TourStep[] = [
  {
    target: ".portfolio-card", // Target the first portfolio card
    title: "Portfolio Theme",
    content: "Click on any portfolio card to see more details and invest.",
    position: "right",
    nextPage: "portfolio-detail" // Navigate to portfolio detail page
  }
];

// Portfolio detail page tour steps
export const portfolioDetailTourSteps: TourStep[] = [
  {
    target: ".portfolio-stats", // Target the portfolio stats section
    title: "Portfolio Statistics",
    content: "Review the performance metrics and allocation of this portfolio.",
    position: "left"
  },
  {
    target: ".stock-list", // Target the stocks list
    title: "Stock Allocation",
    content: "See the individual stocks included in this themed portfolio.",
    position: "top"
  },
  {
    target: "#invest-button", // Target the invest button
    title: "Invest Now",
    content: "Click here to invest in this portfolio theme.",
    position: "bottom"
  },
  {
    target: ".investment-dialog", // Target the investment dialog
    title: "Customize Investment",
    content: "Adjust allocation weights if desired, or keep the recommended weights. You can always rebalance your portfolio later.",
    position: "center"
  }
];
