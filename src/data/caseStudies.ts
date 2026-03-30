export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  content: string;
  results: {
    metric: string;
    value: string;
  }[];
  link?: string;
  company?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  testimonial?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  stats?: Array<{ metric: string; value: string; description: string }>;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "E-commerce Automation Success",
    description: "How we helped an online retailer reduce operational costs by 40% through virtual assistant integration.",
    image: "/api/placeholder/600/400",
    category: "E-commerce",
    tags: ["Automation", "Cost Reduction", "Efficiency"],
    content: "Detailed case study content about e-commerce automation success...",
    results: [
      { metric: "Cost Reduction", value: "40%" },
      { metric: "Time Saved", value: "25 hours/week" },
      { metric: "ROI", value: "320%" }
    ]
  },
  {
    id: 2,
    title: "Real Estate Virtual Assistant Implementation",
    description: "Transforming a real estate agency's workflow with dedicated virtual support.",
    image: "/api/placeholder/600/400",
    category: "Real Estate",
    tags: ["Real Estate", "Workflow", "Support"],
    content: "Detailed case study content about real estate VA implementation...",
    results: [
      { metric: "Lead Conversion", value: "+35%" },
      { metric: "Response Time", value: "-80%" },
      { metric: "Client Satisfaction", value: "4.9/5" }
    ]
  },
  {
    id: 3,
    title: "Startup Scaling with Virtual Teams",
    description: "Helping a tech startup scale operations without increasing headcount.",
    image: "/api/placeholder/600/400",
    category: "Startup",
    tags: ["Scaling", "Startup", "Growth"],
    content: "Detailed case study content about startup scaling...",
    results: [
      { metric: "Growth Rate", value: "150%" },
      { metric: "Cost Efficiency", value: "60%" },
      { metric: "Team Productivity", value: "+45%" }
    ]
  }
];
