
export interface PortfolioTheme {
  title: string;
  description: string;
  returns: string;
  type: string;
  stockCount: number;
  popularity: number;
  riskLevel: string;
}

export const portfolioThemes: PortfolioTheme[] = [
  // Tech Sector
  {
    title: "Future Tech",
    description: "Companies shaping the technological landscape with AI, robotics, and quantum computing.",
    returns: "+24.8%",
    type: "tech",
    stockCount: 18,
    popularity: 95,
    riskLevel: "High"
  },
  {
    title: "Cloud Computing",
    description: "Businesses providing cloud infrastructure and software as a service solutions.",
    returns: "+19.2%",
    type: "tech",
    stockCount: 15,
    popularity: 88,
    riskLevel: "Medium"
  },
  {
    title: "Cybersecurity",
    description: "Companies focused on protecting data, networks and privacy in the digital age.",
    returns: "+21.3%",
    type: "tech",
    stockCount: 12,
    popularity: 86,
    riskLevel: "Medium"
  },
  
  // Sustainability Sector
  {
    title: "Green Energy",
    description: "Renewable energy innovators and sustainable technology leaders.",
    returns: "+16.2%",
    type: "sustainability",
    stockCount: 15,
    popularity: 92,
    riskLevel: "Medium"
  },
  {
    title: "Clean Water",
    description: "Companies focused on water purification, conservation, and infrastructure.",
    returns: "+12.9%",
    type: "sustainability",
    stockCount: 11,
    popularity: 78,
    riskLevel: "Low"
  },
  {
    title: "Sustainable Agriculture",
    description: "Organizations pioneering sustainable farming practices and food technology.",
    returns: "+14.5%",
    type: "sustainability",
    stockCount: 13,
    popularity: 75,
    riskLevel: "Medium"
  },
  
  // Healthcare Sector
  {
    title: "Biotech Revolution",
    description: "Companies pioneering genomics, precision medicine, and healthcare innovation.",
    returns: "+19.5%",
    type: "healthcare",
    stockCount: 12,
    popularity: 89,
    riskLevel: "High"
  },
  {
    title: "Digital Health",
    description: "Telehealth, health analytics, and medical technology innovators.",
    returns: "+16.8%",
    type: "healthcare",
    stockCount: 14,
    popularity: 84,
    riskLevel: "Medium"
  },
  {
    title: "Senior Care",
    description: "Healthcare and service providers focused on aging population needs.",
    returns: "+9.6%",
    type: "healthcare",
    stockCount: 10,
    popularity: 72,
    riskLevel: "Low"
  },
  
  // Finance Sector
  {
    title: "FinTech Disruptors",
    description: "Digital payment, blockchain, and financial service innovators.",
    returns: "+21.7%",
    type: "finance",
    stockCount: 14,
    popularity: 91,
    riskLevel: "High"
  },
  {
    title: "Blockchain & Crypto",
    description: "Companies leveraging blockchain technology and cryptocurrency infrastructure.",
    returns: "+28.3%",
    type: "finance",
    stockCount: 12,
    popularity: 94,
    riskLevel: "High"
  },
  {
    title: "Banking Giants",
    description: "Established financial institutions with strong global presence and stable returns.",
    returns: "+11.4%",
    type: "finance",
    stockCount: 16,
    popularity: 73,
    riskLevel: "Low"
  },
  
  // Luxury Sector
  {
    title: "Luxury Brands",
    description: "Premium and luxury consumer brands with strong global presence.",
    returns: "+15.3%",
    type: "luxury",
    stockCount: 10,
    popularity: 82,
    riskLevel: "Medium"
  },
  {
    title: "Travel & Leisure",
    description: "High-end hospitality, travel, and premium entertainment companies.",
    returns: "+12.8%",
    type: "luxury",
    stockCount: 14,
    popularity: 76,
    riskLevel: "Medium"
  },
  
  // Energy Sector
  {
    title: "Clean Energy Transition",
    description: "Companies facilitating the shift from fossil fuels to renewable energy sources.",
    returns: "+18.7%",
    type: "energy",
    stockCount: 16,
    popularity: 88,
    riskLevel: "Medium"
  },
  {
    title: "Energy Storage",
    description: "Organizations developing advanced battery and energy storage solutions.",
    returns: "+22.4%",
    type: "energy",
    stockCount: 11,
    popularity: 85,
    riskLevel: "High"
  },
  
  // Consumer Sector
  {
    title: "E-Commerce Leaders",
    description: "Online retail platforms and e-commerce infrastructure providers.",
    returns: "+17.9%",
    type: "consumer",
    stockCount: 13,
    popularity: 87,
    riskLevel: "Medium"
  },
  {
    title: "Food Innovation",
    description: "Companies revolutionizing food production, distribution, and alternatives.",
    returns: "+13.6%",
    type: "consumer",
    stockCount: 12,
    popularity: 79,
    riskLevel: "Medium"
  },
  
  // Real Estate Sector
  {
    title: "Data Centers",
    description: "Real estate companies focused on hosting infrastructure for the digital economy.",
    returns: "+16.2%",
    type: "real-estate",
    stockCount: 8,
    popularity: 81,
    riskLevel: "Medium"
  },
  {
    title: "Residential REITs",
    description: "Real estate investment trusts specializing in apartment and housing properties.",
    returns: "+9.4%",
    type: "real-estate",
    stockCount: 15,
    popularity: 74,
    riskLevel: "Low"
  },
  
  // Materials Sector
  {
    title: "Battery Materials",
    description: "Companies producing and supplying critical materials for battery production.",
    returns: "+20.8%",
    type: "materials",
    stockCount: 9,
    popularity: 83,
    riskLevel: "High"
  },
  {
    title: "Sustainable Materials",
    description: "Organizations developing eco-friendly alternatives to traditional materials.",
    returns: "+14.3%",
    type: "materials",
    stockCount: 11,
    popularity: 77,
    riskLevel: "Medium"
  },
  
  // Industrial Sector
  {
    title: "Automation & Robotics",
    description: "Industrial companies specializing in factory automation and robotics.",
    returns: "+18.6%",
    type: "industrial",
    stockCount: 14,
    popularity: 86,
    riskLevel: "Medium"
  },
  {
    title: "Aerospace & Defense",
    description: "Companies involved in aircraft, spacecraft, and defense technology.",
    returns: "+12.7%",
    type: "industrial",
    stockCount: 12,
    popularity: 75,
    riskLevel: "Medium"
  },
  
  // Telecom Sector
  {
    title: "5G Infrastructure",
    description: "Telecommunications companies building next-generation wireless networks.",
    returns: "+15.9%",
    type: "telecom",
    stockCount: 10,
    popularity: 84,
    riskLevel: "Medium"
  },
  {
    title: "Satellite Communications",
    description: "Organizations providing global connectivity through satellite networks.",
    returns: "+19.2%",
    type: "telecom",
    stockCount: 8,
    popularity: 80,
    riskLevel: "High"
  }
];
