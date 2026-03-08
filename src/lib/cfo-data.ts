export interface CFORecord {
  id: string;
  personName: string;
  designation: string;
  companyName: string;
  industry: string;
  subSector: string;
  employeeCount: string;
  revenue: string;
  headquarters: string;
  region: string;
  email: string;
  phone: string;
  linkedinPerson: string;
  linkedinCompany: string;
  companyWebsite: string;
  yearsExperience: string;
  previousCompany: string;
  qualifications: string;
  specialization: string;
  auditFirm: string;
  reportingTo: string;
  boardMember: string;
  companyType: string;
  listingStatus: string;
  annualBudget: string;
  techStack: string;
}

const designations = [
  "Chief Financial Officer", "Group CFO", "Executive VP - Finance",
  "Director of Finance", "Head of Finance", "Senior VP - Finance & Accounts",
  "Chief Finance & Strategy Officer", "CFO & Company Secretary",
];

const industries = [
  "Banking & Finance", "Insurance", "Pharmaceuticals", "IT & Technology",
  "Manufacturing", "Oil & Gas", "Telecom", "Automotive", "Healthcare",
  "FMCG", "Real Estate", "Infrastructure", "Power & Energy", "Chemicals",
  "Textiles", "Steel & Metals", "Aviation", "Shipping & Logistics",
  "Media & Entertainment", "Hospitality",
];

const subSectors: Record<string, string[]> = {
  "Banking & Finance": ["Commercial Banking", "Investment Banking", "NBFC", "Asset Management", "Wealth Management"],
  "Insurance": ["Life Insurance", "General Insurance", "Health Insurance", "Reinsurance", "InsurTech"],
  "Pharmaceuticals": ["Generic Drugs", "API Manufacturing", "Clinical Research", "Biotech", "Medical Devices"],
  "IT & Technology": ["Enterprise Software", "Cloud Services", "Cybersecurity", "Data Analytics", "FinTech"],
  "Manufacturing": ["Electronics", "Heavy Engineering", "Consumer Durables", "Precision Engineering", "Packaging"],
  "Oil & Gas": ["Upstream E&P", "Downstream", "Refining", "Gas Distribution", "Petrochemicals"],
  "Telecom": ["Mobile Services", "Broadband", "Tower Infrastructure", "Enterprise Telecom", "5G"],
  "Automotive": ["Passenger Vehicles", "Commercial Vehicles", "EV Manufacturing", "Auto Components", "Two-Wheelers"],
  "Healthcare": ["Hospital Chains", "Diagnostics", "Telemedicine", "Medical Equipment", "Digital Health"],
  "FMCG": ["Food & Beverages", "Personal Care", "Home Care", "Dairy Products", "Confectionery"],
  "Real Estate": ["Residential", "Commercial", "REITs", "PropTech", "Urban Development"],
  "Infrastructure": ["Roads & Highways", "Ports", "Smart Cities", "Water Infrastructure", "Railways"],
  "Power & Energy": ["Thermal Power", "Solar Energy", "Wind Energy", "Nuclear", "Transmission"],
  "Chemicals": ["Specialty Chemicals", "Agrochemicals", "Industrial Chemicals", "Dyes & Pigments", "Polymers"],
  "Textiles": ["Readymade Garments", "Technical Textiles", "Home Textiles", "Yarn Manufacturing", "Fashion Retail"],
  "Steel & Metals": ["Steel Manufacturing", "Aluminum", "Copper", "Mining", "Special Alloys"],
  "Aviation": ["Airlines", "Airport Operations", "MRO Services", "Cargo", "Aviation Tech"],
  "Shipping & Logistics": ["Container Shipping", "Freight Forwarding", "Warehousing", "3PL/4PL", "Cold Chain"],
  "Media & Entertainment": ["Broadcasting", "Digital Media", "OTT Platforms", "Publishing", "Advertising"],
  "Hospitality": ["Hotels & Resorts", "QSR Chains", "Travel & Tourism", "Catering", "Event Management"],
};

const companies = [
  "Reliance Industries", "Tata Consultancy Services", "HDFC Bank", "Infosys", "ICICI Bank",
  "State Bank of India", "Bharti Airtel", "Wipro", "HCL Technologies", "Axis Bank",
  "Larsen & Toubro", "Bajaj Finance", "Maruti Suzuki", "Asian Paints", "Mahindra & Mahindra",
  "Titan Company", "Sun Pharmaceutical", "Kotak Mahindra Bank", "UltraTech Cement", "NTPC",
  "Power Grid Corp", "ITC Limited", "Adani Enterprises", "Tech Mahindra", "IndusInd Bank",
  "Hindustan Unilever", "Dr Reddy's Labs", "Cipla", "Bajaj Auto", "JSW Steel",
  "Tata Steel", "Tata Motors", "SBI Life Insurance", "HDFC Life", "Godrej Consumer",
  "Divis Labs", "Nestle India", "Britannia Industries", "Pidilite Industries", "Berger Paints",
  "Havells India", "Torrent Pharma", "LIC Housing Finance", "Muthoot Finance", "Shriram Finance",
  "Indian Oil Corp", "BPCL", "HPCL", "Gail India", "Coal India",
  "Vedanta Limited", "Hindalco Industries", "Tata Power", "Adani Green Energy", "Adani Ports",
  "DLF Limited", "Godrej Properties", "Oberoi Realty", "Phoenix Mills", "Brigade Enterprises",
  "Zomato", "Paytm", "Nykaa", "PolicyBazaar", "Info Edge",
  "Delhivery", "Firstsource Solutions", "Mphasis", "Persistent Systems", "Coforge",
  "L&T Technology", "Cyient", "KPIT Technologies", "Zensar Technologies", "Tata Elxsi",
  "Max Healthcare", "Apollo Hospitals", "Fortis Healthcare", "Narayana Health", "Aster DM",
  "Biocon", "Aurobindo Pharma", "Lupin", "Glenmark Pharma", "Alkem Labs",
  "Hero MotoCorp", "TVS Motor", "Ashok Leyland", "Eicher Motors", "MRF Limited",
  "InterGlobe Aviation", "SpiceJet", "Air India Express", "GMR Airports", "Adani Airport Holdings",
  "Marico", "Dabur India", "Emami", "Colgate Palmolive India", "Procter & Gamble India",
];

const firstNames = [
  "Ajay", "Saurabh", "Rajeev", "Smita", "Vineet", "Poonam", "Alok", "Nandini", "Ashish", "Madhuri",
  "Sudhir", "Ritu", "Deepak", "Sunanda", "Prashant", "Lakshmi", "Nikhil", "Archana", "Sanjiv", "Vandana",
  "Atul", "Chitra", "Govind", "Bhavna", "Jayant", "Tara", "Kishore", "Meenakshi", "Umesh", "Jaya",
  "Harish", "Pushpa", "Lalit", "Smriti", "Om", "Durga", "Rakesh", "Pratibha", "Dhruv", "Sapna",
];

const lastNames = [
  "Agarwal", "Bansal", "Chawla", "Dewan", "Garg", "Hora", "Juneja", "Khosla", "Lakhanpal", "Monga",
  "Nagpal", "Pahwa", "Randhawa", "Sachdeva", "Tandon", "Vaish", "Walia", "Agnihotri", "Bhasin", "Dhawan",
  "Gill", "Handa", "Jalota", "Kochhar", "Lamba", "Mehra", "Narula", "Punia", "Rawat", "Sethi",
  "Trehan", "Uppal", "Vohra", "Arora", "Bakshi", "Chhabra", "Duggal", "Goel", "Kalra", "Manchanda",
];

const qualifications = [
  "CA + CFA", "CA + MBA (Finance)", "CA + CS", "CMA + CA", "CA + CISA",
  "MBA (IIM) + CFA", "CA + FRM", "CPA + CA", "CA + PhD (Accounting)",
  "MBA (Finance) + CMA",
];

const specializations = [
  "Financial Planning & Analysis", "Treasury & Risk Management", "Mergers & Acquisitions",
  "Investor Relations & Capital Markets", "Tax Planning & Transfer Pricing", "Internal Audit & Controls",
  "IPO Readiness & Fundraising", "Cost Optimization & Budgeting", "ESG Financial Reporting",
  "Digital Finance Transformation", "Statutory & Tax Compliance", "Working Capital Management",
];

const auditFirms = [
  "Deloitte Haskins & Sells", "PricewaterhouseCoopers", "KPMG India", "Ernst & Young",
  "BSR & Co (KPMG)", "S R Batliboi & Co (EY)", "Walker Chandiok & Co (Grant Thornton)",
  "B S R & Associates", "Lodha & Co", "Sharp & Tannan",
];

const cities = [
  "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata",
  "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi", "Nagpur", "Indore", "Vadodara",
];

const regions = ["West India", "North India", "South India", "East India", "Central India", "Pan-India"];
const companyTypes = ["Public Listed", "Private Limited", "Government PSU", "MNC Subsidiary", "Joint Venture"];
const listingStatuses = ["BSE & NSE Listed", "NSE Listed", "BSE Listed", "Unlisted", "Proposed IPO"];
const techStacks = [
  "SAP S/4HANA + Hyperion", "Oracle ERP Cloud + Anaplan", "Workday Financials + Adaptive",
  "Tally Prime + Power BI", "NetSuite + Tableau", "Microsoft Dynamics 365 + Excel",
  "Zoho Books + Freshdesk", "QuickBooks Enterprise + Looker",
];

export const CFO_COLUMNS: { key: keyof CFORecord; label: string }[] = [
  { key: "id", label: "#" },
  { key: "personName", label: "Name" },
  { key: "designation", label: "Designation" },
  { key: "companyName", label: "Company" },
  { key: "industry", label: "Industry" },
  { key: "subSector", label: "Sub-Sector" },
  { key: "employeeCount", label: "Employees" },
  { key: "revenue", label: "Revenue" },
  { key: "headquarters", label: "HQ" },
  { key: "region", label: "Region" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "linkedinPerson", label: "LinkedIn (Person)" },
  { key: "linkedinCompany", label: "LinkedIn (Company)" },
  { key: "companyWebsite", label: "Website" },
  { key: "yearsExperience", label: "Experience" },
  { key: "previousCompany", label: "Previous Company" },
  { key: "qualifications", label: "Qualifications" },
  { key: "specialization", label: "Specialization" },
  { key: "auditFirm", label: "Audit Firm" },
  { key: "reportingTo", label: "Reporting To" },
  { key: "boardMember", label: "Board Member" },
  { key: "companyType", label: "Company Type" },
  { key: "listingStatus", label: "Listing Status" },
  { key: "annualBudget", label: "Finance Budget" },
  { key: "techStack", label: "Tech Stack" },
];

export function generateCFORecords(): CFORecord[] {
  const COUNT = 50000;
  const result: CFORecord[] = new Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const ind = industries[i % industries.length];
    const subs = subSectors[ind];
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 7) % lastNames.length];
    const comp = companies[i % companies.length];
    const city = cities[i % cities.length];
    const empCount = 500 + Math.floor((i * 23) % 49500);
    result[i] = {
      id: `cfo-${i}`,
      personName: `${fn} ${ln}`,
      designation: designations[i % designations.length],
      companyName: comp,
      industry: ind,
      subSector: subs[i % subs.length],
      employeeCount: empCount.toLocaleString() + "+",
      revenue: `₹${(Math.floor((i * 17) % 80000) + 200)} Cr`,
      headquarters: city,
      region: regions[i % regions.length],
      email: `cfo.${fn.toLowerCase()}.${ln.toLowerCase()}${i}@${comp.toLowerCase().replace(/[\s&'().]/g, "")}.com`,
      phone: `+91-${9200000000 + (i * 37) % 999999999}`,
      linkedinPerson: `https://linkedin.com/in/${fn.toLowerCase()}-${ln.toLowerCase()}-cfo-${i}`,
      linkedinCompany: `https://linkedin.com/company/${comp.toLowerCase().replace(/[\s&'().]/g, "-")}`,
      companyWebsite: `https://www.${comp.toLowerCase().replace(/[\s&'().]/g, "")}.com`,
      yearsExperience: `${3 + (i % 30)} yrs`,
      previousCompany: companies[(i + 11) % companies.length],
      qualifications: qualifications[i % qualifications.length],
      specialization: specializations[i % specializations.length],
      auditFirm: auditFirms[i % auditFirms.length],
      reportingTo: ["CEO", "Managing Director", "Board of Directors", "Group CEO", "Chairman", "Promoter"][i % 6],
      boardMember: i % 3 === 0 ? "Yes" : "No",
      companyType: companyTypes[i % companyTypes.length],
      listingStatus: listingStatuses[i % listingStatuses.length],
      annualBudget: `₹${(5 + (i % 100))} Cr`,
      techStack: techStacks[i % techStacks.length],
    };
  }
  return result;
}
