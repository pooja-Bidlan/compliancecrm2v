export interface ComplianceHeadRecord {
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
  yearsInRole: string;
  previousCompany: string;
  certifications: string;
  regulatoryFocus: string;
  complianceTeamSize: string;
  reportingTo: string;
  boardMember: string;
  companyType: string;
  listingStatus: string;
  complianceBudget: string;
  techStack: string;
}

const designations = [
  "Chief Compliance Officer", "Group Compliance Head", "Head of Compliance",
  "VP Compliance & Ethics", "Director of Regulatory Compliance", "Senior VP Compliance",
  "Global Head of Compliance", "Chief Ethics & Compliance Officer",
];

const industries = [
  "Banking & Finance", "Insurance", "Pharmaceuticals", "IT & Technology",
  "Manufacturing", "Oil & Gas", "Telecom", "Automotive", "Healthcare",
  "FMCG", "Real Estate", "Infrastructure", "Power & Energy", "Chemicals",
  "Textiles", "Steel & Metals", "Aviation", "Shipping & Logistics",
  "Media & Entertainment", "Hospitality",
];

const subSectors: Record<string, string[]> = {
  "Banking & Finance": ["Commercial Banking", "Investment Banking", "Private Banking", "Retail Banking", "NBFC", "Wealth Management"],
  "Insurance": ["Life Insurance", "General Insurance", "Health Insurance", "Reinsurance", "InsurTech"],
  "Pharmaceuticals": ["Generic Drugs", "API Manufacturing", "Clinical Research", "Biotech", "Medical Devices"],
  "IT & Technology": ["Enterprise Software", "Cloud Services", "Cybersecurity", "Data Analytics", "FinTech"],
  "Manufacturing": ["Electronics", "Heavy Engineering", "Consumer Goods", "Precision Engineering", "Packaging"],
  "Oil & Gas": ["Upstream", "Downstream", "Refining", "Gas Distribution", "Petrochemicals"],
  "Telecom": ["Mobile Services", "Broadband", "Tower Infrastructure", "Enterprise Telecom", "IoT Services"],
  "Automotive": ["Passenger Vehicles", "Commercial Vehicles", "EV Manufacturing", "Auto Components", "Two-Wheelers"],
  "Healthcare": ["Hospital Chains", "Diagnostics", "Telemedicine", "Medical Equipment", "Health Tech"],
  "FMCG": ["Food & Beverages", "Personal Care", "Home Care", "Dairy", "Snacks & Confectionery"],
  "Real Estate": ["Residential", "Commercial", "REITs", "PropTech", "Urban Development"],
  "Infrastructure": ["Roads & Highways", "Ports", "Smart Cities", "Water & Sanitation", "Railway Infrastructure"],
  "Power & Energy": ["Thermal Power", "Solar Energy", "Wind Energy", "Nuclear Power", "Transmission & Distribution"],
  "Chemicals": ["Specialty Chemicals", "Agrochemicals", "Industrial Chemicals", "Dyes & Pigments", "Polymers"],
  "Textiles": ["Readymade Garments", "Technical Textiles", "Home Textiles", "Yarn & Fabric", "Fashion Retail"],
  "Steel & Metals": ["Steel Manufacturing", "Aluminum", "Copper", "Mining", "Alloys & Special Metals"],
  "Aviation": ["Airlines", "Airport Operations", "MRO Services", "Cargo & Logistics", "Aviation Technology"],
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
  "Rajesh", "Sanjay", "Vikram", "Anil", "Suresh", "Priya", "Neha", "Deepa", "Amit", "Ravi",
  "Kiran", "Meera", "Anand", "Pooja", "Rahul", "Nisha", "Arjun", "Kavita", "Manoj", "Sunita",
  "Ashok", "Rekha", "Vinod", "Seema", "Gaurav", "Swati", "Pankaj", "Anjali", "Rohit", "Divya",
  "Nitin", "Preeti", "Siddharth", "Aarti", "Vivek", "Shweta", "Harsh", "Jyoti", "Kunal", "Pallavi",
];

const lastNames = [
  "Sharma", "Verma", "Gupta", "Singh", "Kumar", "Jain", "Agarwal", "Mehta", "Patel", "Shah",
  "Reddy", "Rao", "Nair", "Pillai", "Iyer", "Menon", "Das", "Banerjee", "Chatterjee", "Mukherjee",
  "Bhat", "Hegde", "Kamath", "Shetty", "Kulkarni", "Patil", "Deshmukh", "Joshi", "Gokhale", "Bhatt",
  "Saxena", "Tiwari", "Pandey", "Mishra", "Dubey", "Srivastava", "Kapoor", "Malhotra", "Chopra", "Khanna",
];

const certifications = [
  "CCEP (Certified Compliance & Ethics Professional)", "CRCM (Certified Regulatory Compliance Manager)",
  "CFE (Certified Fraud Examiner)", "CAMS (Certified Anti-Money Laundering Specialist)",
  "CIA (Certified Internal Auditor)", "CRISC (Certified in Risk and Information Systems Control)",
  "CISA (Certified Information Systems Auditor)", "ICA Diploma in Governance, Risk & Compliance",
  "CS (Company Secretary)", "CA (Chartered Accountant) + Compliance Specialization",
];

const regulatoryFocus = [
  "RBI / SEBI / IRDAI", "FEMA & Cross-Border Compliance", "AML / KYC / CFT",
  "Data Privacy (DPDP Act)", "ESG & Sustainability Reporting", "Corporate Governance",
  "POSH / Labor Laws", "Environmental Compliance", "GST & Tax Compliance",
  "Cybersecurity & IT Act", "Competition Law (CCI)", "Export Control & DGFT",
];

const reportingTo = ["CEO", "Board of Directors", "Group CEO", "Managing Director", "CFO", "General Counsel"];
const companyTypes = ["Public Listed", "Private Limited", "Government PSU", "MNC Subsidiary", "Joint Venture"];
const listingStatuses = ["BSE & NSE Listed", "NSE Listed", "BSE Listed", "Unlisted", "Proposed IPO"];
const techStacks = [
  "SAP GRC + Thomson Reuters", "MetricStream + Diligent", "NAVEX Global + OneTrust",
  "ServiceNow GRC + Archer", "LogicGate + Workiva", "Resolver + SAI360",
  "Convercent + ComplianceQuest", "Wolters Kluwer + Riskonnect",
];

const cities = [
  "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata",
  "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi", "Goa", "Indore", "Vadodara",
];

const regions = ["West India", "North India", "South India", "East India", "Central India", "Pan-India"];

export const COMPLIANCE_HEAD_COLUMNS: { key: keyof ComplianceHeadRecord; label: string }[] = [
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
  { key: "yearsInRole", label: "Years in Role" },
  { key: "previousCompany", label: "Previous Company" },
  { key: "certifications", label: "Certifications" },
  { key: "regulatoryFocus", label: "Regulatory Focus" },
  { key: "complianceTeamSize", label: "Team Size" },
  { key: "reportingTo", label: "Reporting To" },
  { key: "boardMember", label: "Board Member" },
  { key: "companyType", label: "Company Type" },
  { key: "listingStatus", label: "Listing Status" },
  { key: "complianceBudget", label: "Compliance Budget" },
  { key: "techStack", label: "Tech Stack" },
];

export function generateComplianceHeads(): ComplianceHeadRecord[] {
  const COUNT = 50000;
  const result: ComplianceHeadRecord[] = new Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const ind = industries[i % industries.length];
    const subs = subSectors[ind];
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 7) % lastNames.length];
    const comp = companies[i % companies.length];
    const city = cities[i % cities.length];
    const empCount = 500 + Math.floor((i * 17) % 49500);
    result[i] = {
      id: `ch-${i}`,
      personName: `${fn} ${ln}`,
      designation: designations[i % designations.length],
      companyName: comp,
      industry: ind,
      subSector: subs[i % subs.length],
      employeeCount: empCount.toLocaleString() + "+",
      revenue: `₹${(Math.floor((i * 13) % 50000) + 100)} Cr`,
      headquarters: city,
      region: regions[i % regions.length],
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@${comp.toLowerCase().replace(/[\s&'().]/g, "")}.com`,
      phone: `+91-${9000000000 + (i * 31) % 999999999}`,
      linkedinPerson: `https://linkedin.com/in/${fn.toLowerCase()}-${ln.toLowerCase()}-${i}`,
      linkedinCompany: `https://linkedin.com/company/${comp.toLowerCase().replace(/[\s&'().]/g, "-")}`,
      companyWebsite: `https://www.${comp.toLowerCase().replace(/[\s&'().]/g, "")}.com`,
      yearsInRole: `${1 + (i % 20)} yrs`,
      previousCompany: companies[(i + 13) % companies.length],
      certifications: certifications[i % certifications.length],
      regulatoryFocus: regulatoryFocus[i % regulatoryFocus.length],
      complianceTeamSize: `${3 + (i % 50)} members`,
      reportingTo: reportingTo[i % reportingTo.length],
      boardMember: i % 4 === 0 ? "Yes" : "No",
      companyType: companyTypes[i % companyTypes.length],
      listingStatus: listingStatuses[i % listingStatuses.length],
      complianceBudget: `₹${(1 + (i % 25))} Cr`,
      techStack: techStacks[i % techStacks.length],
    };
  }
  return result;
}
