export interface CSJobRecord {
  id: string;
  personName: string;
  designation: string;
  membershipNo: string;
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
  boardMeetingsPerYear: string;
  reportingTo: string;
  companyType: string;
  listingStatus: string;
  annualFilings: string;
  techStack: string;
}

const designations = [
  "Company Secretary", "Senior Company Secretary", "Chief Secretarial Officer",
  "VP - Secretarial & Legal", "AGM - Secretarial", "Head of Secretarial Compliance",
  "Company Secretary & Compliance Officer", "Group Company Secretary",
];

const industries = [
  "Banking & Finance", "Insurance", "Pharmaceuticals", "IT & Technology",
  "Manufacturing", "Oil & Gas", "Telecom", "Automotive", "Healthcare",
  "FMCG", "Real Estate", "Infrastructure", "Power & Energy", "Chemicals",
  "Textiles", "Steel & Metals", "Aviation", "Shipping & Logistics",
  "Media & Entertainment", "Hospitality",
];

const subSectors: Record<string, string[]> = {
  "Banking & Finance": ["Commercial Banking", "Investment Banking", "NBFC", "Microfinance", "Payment Banks"],
  "Insurance": ["Life Insurance", "General Insurance", "Health Insurance", "Reinsurance", "InsurTech"],
  "Pharmaceuticals": ["Generic Drugs", "API Manufacturing", "Clinical Research", "Biotech", "Medical Devices"],
  "IT & Technology": ["Enterprise Software", "Cloud Services", "Cybersecurity", "SaaS", "FinTech"],
  "Manufacturing": ["Electronics", "Heavy Engineering", "Consumer Durables", "Precision Engineering", "Packaging"],
  "Oil & Gas": ["Upstream", "Downstream", "Refining", "Gas Distribution", "Petrochemicals"],
  "Telecom": ["Mobile Services", "Broadband", "Tower Infrastructure", "Enterprise Telecom", "5G"],
  "Automotive": ["Passenger Vehicles", "Commercial Vehicles", "EV Manufacturing", "Auto Components", "Two-Wheelers"],
  "Healthcare": ["Hospital Chains", "Diagnostics", "Telemedicine", "Medical Equipment", "Pharma Retail"],
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
  "Anita", "Sunil", "Deepak", "Rashmi", "Manish", "Shilpa", "Rajiv", "Geeta", "Arun", "Kamini",
  "Sandeep", "Namita", "Bharat", "Lata", "Hemant", "Usha", "Sachin", "Padma", "Naresh", "Rani",
  "Pramod", "Veena", "Dilip", "Sarla", "Girish", "Hema", "Satish", "Alka", "Mohan", "Reena",
  "Dinesh", "Sarita", "Ramesh", "Manju", "Mukesh", "Suman", "Yogesh", "Asha", "Tarun", "Chhaya",
];

const lastNames = [
  "Agrawal", "Bajaj", "Chadha", "Deshpande", "Fernandes", "Ghosh", "Hegde", "Iyer", "Joshi", "Khandelwal",
  "Lal", "Mahajan", "Narayan", "Oberoi", "Prasad", "Qureshi", "Rajan", "Sinha", "Thakur", "Upadhyay",
  "Venkatesh", "Wadhwa", "Xavier", "Yadav", "Zaveri", "Ahuja", "Bhandari", "Chauhan", "Dutta", "Grover",
  "Hingorani", "Iyengar", "Johar", "Krishnan", "Luthra", "Mathur", "Nambiar", "Parekh", "Raghavan", "Seshadri",
];

const qualifications = [
  "ACS + LLB", "FCS + CA", "ACS + MBA (Finance)", "FCS + CAIIB", "ACS + LLM",
  "FCS + CS Executive", "ACS + B.Com (Hons)", "FCS + Diploma in Corporate Governance",
  "ACS + CMA", "FCS + PhD (Corporate Law)",
];

const specializations = [
  "Board Governance & Meetings", "SEBI LODR Compliance", "FEMA & RBI Regulations",
  "Mergers & Acquisitions", "IPO & Listing Compliance", "Corporate Restructuring",
  "Insider Trading Regulations", "Related Party Transactions", "CSR Compliance",
  "Annual Return & Filings", "Secretarial Audit", "NCLT/CLB Matters",
];

const cities = [
  "Mumbai", "Delhi NCR", "Bengaluru", "Hyderabad", "Chennai", "Pune", "Kolkata",
  "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi", "Nagpur", "Indore", "Vadodara",
];

const regions = ["West India", "North India", "South India", "East India", "Central India", "Pan-India"];
const companyTypes = ["Public Listed", "Private Limited", "Government PSU", "MNC Subsidiary", "Joint Venture"];
const listingStatuses = ["BSE & NSE Listed", "NSE Listed", "BSE Listed", "Unlisted", "Proposed IPO"];
const techStacks = [
  "Diligent Boards + MCA Portal", "BoardEffect + XBRL Tools", "Azeus Convene + LegalDesk",
  "Nasdaq Boardvantage + SAP", "OnBoard + CompaniesAct.in", "Directorpoint + eGov",
];

export const CS_JOB_COLUMNS: { key: keyof CSJobRecord; label: string }[] = [
  { key: "id", label: "#" },
  { key: "personName", label: "Name" },
  { key: "designation", label: "Designation" },
  { key: "membershipNo", label: "ICSI Membership" },
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
  { key: "boardMeetingsPerYear", label: "Board Meetings/Yr" },
  { key: "reportingTo", label: "Reporting To" },
  { key: "companyType", label: "Company Type" },
  { key: "listingStatus", label: "Listing Status" },
  { key: "annualFilings", label: "Annual Filings" },
  { key: "techStack", label: "Tech Stack" },
];

export function generateCSJobRecords(): CSJobRecord[] {
  const COUNT = 50000;
  const result: CSJobRecord[] = new Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const ind = industries[i % industries.length];
    const subs = subSectors[ind];
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 7) % lastNames.length];
    const comp = companies[i % companies.length];
    const city = cities[i % cities.length];
    const empCount = 500 + Math.floor((i * 19) % 49500);
    result[i] = {
      id: `csj-${i}`,
      personName: `${fn} ${ln}`,
      designation: designations[i % designations.length],
      membershipNo: `A${(10000 + i).toString()}`,
      companyName: comp,
      industry: ind,
      subSector: subs[i % subs.length],
      employeeCount: empCount.toLocaleString() + "+",
      revenue: `₹${(Math.floor((i * 11) % 50000) + 50)} Cr`,
      headquarters: city,
      region: regions[i % regions.length],
      email: `cs.${fn.toLowerCase()}.${ln.toLowerCase()}${i}@${comp.toLowerCase().replace(/[\s&'().]/g, "")}.com`,
      phone: `+91-${9100000000 + (i * 29) % 999999999}`,
      linkedinPerson: `https://linkedin.com/in/${fn.toLowerCase()}-${ln.toLowerCase()}-cs-${i}`,
      linkedinCompany: `https://linkedin.com/company/${comp.toLowerCase().replace(/[\s&'().]/g, "-")}`,
      companyWebsite: `https://www.${comp.toLowerCase().replace(/[\s&'().]/g, "")}.com`,
      yearsExperience: `${2 + (i % 25)} yrs`,
      previousCompany: companies[(i + 17) % companies.length],
      qualifications: qualifications[i % qualifications.length],
      specialization: specializations[i % specializations.length],
      boardMeetingsPerYear: `${4 + (i % 8)} meetings`,
      reportingTo: ["Managing Director", "CEO", "Chairman", "Board of Directors", "CFO", "Legal Head"][i % 6],
      companyType: companyTypes[i % companyTypes.length],
      listingStatus: listingStatuses[i % listingStatuses.length],
      annualFilings: `${10 + (i % 40)} filings/yr`,
      techStack: techStacks[i % techStacks.length],
    };
  }
  return result;
}
