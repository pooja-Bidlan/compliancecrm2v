export interface USAComplianceRecord {
  id: string;
  companyName: string;
  ticker: string;
  exchange: string;
  industry: string;
  sector: string;
  employeeCount: string;
  revenue: string;
  headquarters: string;
  state: string;
  ccoName: string;
  ccoDesignation: string;
  ccoEmail: string;
  ccoPhone: string;
  ccoLinkedin: string;
  ccoSalary: string;
  ccoCertifications: string;
  ccoYearsInRole: string;
  ceoName: string;
  ceoEmail: string;
  ceoLinkedin: string;
  companyWebsite: string;
  companyLinkedin: string;
  regulatoryFocus: string;
  complianceTeamSize: string;
  fiscalYearEnd: string;
}

const industries = [
  "Financial Services", "Healthcare", "Technology", "Energy", "Consumer Goods",
  "Industrials", "Materials", "Utilities", "Telecommunications", "Real Estate",
  "Pharmaceuticals", "Biotechnology", "Insurance", "Aerospace & Defense", "Automotive",
  "Media & Entertainment", "Retail", "Food & Beverage", "Transportation", "Chemicals",
];

const sectors: Record<string, string[]> = {
  "Financial Services": ["Banking", "Asset Management", "Capital Markets", "FinTech", "Payments"],
  "Healthcare": ["Hospital Systems", "Health Insurance", "Medical Devices", "Health IT", "Managed Care"],
  "Technology": ["Enterprise Software", "Cloud Computing", "Cybersecurity", "Semiconductors", "SaaS"],
  "Energy": ["Oil & Gas E&P", "Refining", "Renewable Energy", "Midstream", "Oilfield Services"],
  "Consumer Goods": ["Household Products", "Apparel", "Personal Care", "Luxury Goods", "Home Improvement"],
  "Industrials": ["Heavy Equipment", "Building Products", "Electrical Components", "Waste Management", "Engineering Services"],
  "Materials": ["Specialty Chemicals", "Steel", "Packaging", "Mining", "Construction Materials"],
  "Utilities": ["Electric Utilities", "Gas Utilities", "Water Utilities", "Renewable Utilities", "Multi-Utilities"],
  "Telecommunications": ["Wireless", "Broadband", "Cable", "Tower Companies", "Satellite"],
  "Real Estate": ["REITs", "Commercial RE", "Residential RE", "Data Centers", "Industrial RE"],
  "Pharmaceuticals": ["Big Pharma", "Generic Drugs", "Specialty Pharma", "Drug Distribution", "CRO"],
  "Biotechnology": ["Oncology", "Immunology", "Gene Therapy", "Diagnostics", "Agricultural Biotech"],
  "Insurance": ["Life Insurance", "P&C Insurance", "Reinsurance", "Insurance Brokerage", "InsurTech"],
  "Aerospace & Defense": ["Defense Contractors", "Commercial Aviation", "Space Systems", "Missiles & Weapons", "UAV/Drones"],
  "Automotive": ["OEM Manufacturers", "EV Makers", "Auto Parts", "Dealership Groups", "Fleet Management"],
  "Media & Entertainment": ["Streaming", "Broadcasting", "Gaming", "Publishing", "Advertising"],
  "Retail": ["E-Commerce", "Department Stores", "Specialty Retail", "Grocery Chains", "Discount Retail"],
  "Food & Beverage": ["Packaged Foods", "Beverages", "Restaurants", "Food Distribution", "Snacks & Confectionery"],
  "Transportation": ["Airlines", "Railroads", "Trucking", "Shipping", "Logistics"],
  "Chemicals": ["Diversified Chemicals", "Agricultural Chemicals", "Industrial Gases", "Coatings", "Polymers"],
};

const companies = [
  "JPMorgan Chase", "Bank of America", "Wells Fargo", "Citigroup", "Goldman Sachs",
  "Morgan Stanley", "US Bancorp", "Truist Financial", "PNC Financial", "Capital One",
  "Apple", "Microsoft", "Alphabet", "Amazon", "Meta Platforms",
  "Tesla", "NVIDIA", "Broadcom", "Adobe", "Salesforce",
  "UnitedHealth Group", "Johnson & Johnson", "Pfizer", "AbbVie", "Merck",
  "Eli Lilly", "Bristol-Myers Squibb", "Amgen", "Gilead Sciences", "Regeneron",
  "ExxonMobil", "Chevron", "ConocoPhillips", "EOG Resources", "Pioneer Natural",
  "Schlumberger", "Halliburton", "Baker Hughes", "Valero Energy", "Phillips 66",
  "Procter & Gamble", "Coca-Cola", "PepsiCo", "Costco", "Walmart",
  "Home Depot", "Nike", "McDonald's", "Starbucks", "Target",
  "Berkshire Hathaway", "Visa", "Mastercard", "PayPal", "American Express",
  "Charles Schwab", "BlackRock", "State Street", "T. Rowe Price", "Invesco",
  "Lockheed Martin", "Raytheon Technologies", "Boeing", "Northrop Grumman", "General Dynamics",
  "L3Harris Technologies", "Textron", "Huntington Ingalls", "Leidos Holdings", "BWX Technologies",
  "AT&T", "Verizon", "T-Mobile", "Comcast", "Charter Communications",
  "Walt Disney", "Netflix", "Warner Bros Discovery", "Paramount Global", "Fox Corporation",
  "General Motors", "Ford Motor", "Rivian Automotive", "Lucid Group", "Stellantis NA",
  "Caterpillar", "Deere & Company", "3M Company", "Honeywell", "General Electric",
  "Dow Inc", "DuPont", "Air Products", "Linde plc", "Sherwin-Williams",
  "NextEra Energy", "Duke Energy", "Southern Company", "Dominion Energy", "Exelon",
  "Prologis", "American Tower", "Crown Castle", "Equinix", "Digital Realty",
  "Anthem (Elevance)", "Cigna", "Humana", "Centene", "Molina Healthcare",
  "CVS Health", "Walgreens Boots", "McKesson", "AmerisourceBergen", "Cardinal Health",
  "FedEx", "United Parcel Service", "Union Pacific", "CSX Corporation", "Norfolk Southern",
  "Delta Air Lines", "Southwest Airlines", "American Airlines", "United Airlines", "JetBlue Airways",
];

const firstNames = [
  "James", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Christopher", "Daniel",
  "Jennifer", "Linda", "Patricia", "Barbara", "Elizabeth", "Susan", "Jessica", "Sarah", "Karen", "Lisa",
  "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua", "Kenneth", "Kevin",
  "Nancy", "Betty", "Margaret", "Sandra", "Ashley", "Dorothy", "Kimberly", "Emily", "Donna", "Michelle",
  "Brian", "George", "Timothy", "Ronald", "Edward", "Jason", "Jeffrey", "Ryan", "Jacob", "Gary",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
];

const ccoDesignations = [
  "Chief Compliance Officer", "SVP & Chief Compliance Officer", "EVP Compliance & Ethics",
  "Global Chief Compliance Officer", "Chief Ethics & Compliance Officer",
  "VP Regulatory & Compliance", "Managing Director, Compliance", "Head of Global Compliance",
];

const certifications = [
  "CCEP, CAMS", "CCEP, CFE", "JD, CCEP", "CRCM, CAMS", "CFE, CIA",
  "JD, CAMS", "CCEP, CRISC", "CISA, CCEP", "JD, CFE, CCEP", "MBA, CAMS",
];

const regulatoryFocusAreas = [
  "SEC / FINRA / OCC", "FDA / HHS / CMS", "EPA / OSHA / DOE", "FCC / FTC",
  "CFPB / AML / BSA", "SOX / Dodd-Frank", "HIPAA / HITECH", "GDPR / CCPA / Privacy",
  "FCPA / Anti-Bribery", "Cybersecurity / NIST", "ESG / Climate Disclosure", "Export Controls / ITAR",
];

const states = [
  "New York, NY", "San Francisco, CA", "Chicago, IL", "Houston, TX", "Charlotte, NC",
  "Boston, MA", "Atlanta, GA", "Dallas, TX", "Seattle, WA", "Los Angeles, CA",
  "Philadelphia, PA", "Denver, CO", "Minneapolis, MN", "Miami, FL", "Phoenix, AZ",
  "Detroit, MI", "San Jose, CA", "Austin, TX", "Washington, DC", "Portland, OR",
  "Nashville, TN", "Raleigh, NC", "Salt Lake City, UT", "Pittsburgh, PA", "St. Louis, MO",
];

const exchanges = ["NYSE", "NASDAQ", "NYSE", "NASDAQ", "NYSE American"];
const fiscalEnds = ["December", "March", "June", "September", "January"];

const salaryBands = [
  "$185,000", "$210,000", "$235,000", "$260,000", "$285,000", "$310,000",
  "$340,000", "$375,000", "$410,000", "$450,000", "$500,000", "$550,000",
  "$625,000", "$700,000", "$800,000", "$950,000", "$1,100,000", "$1,250,000",
];

export const USA_COMPLIANCE_COLUMNS: { key: keyof USAComplianceRecord; label: string }[] = [
  { key: "id", label: "#" },
  { key: "companyName", label: "Company" },
  { key: "ticker", label: "Ticker" },
  { key: "exchange", label: "Exchange" },
  { key: "industry", label: "Industry" },
  { key: "sector", label: "Sector" },
  { key: "employeeCount", label: "Employees" },
  { key: "revenue", label: "Revenue" },
  { key: "headquarters", label: "HQ City" },
  { key: "state", label: "State" },
  { key: "ccoName", label: "CCO Name" },
  { key: "ccoDesignation", label: "CCO Designation" },
  { key: "ccoEmail", label: "CCO Email" },
  { key: "ccoPhone", label: "CCO Phone" },
  { key: "ccoLinkedin", label: "CCO LinkedIn" },
  { key: "ccoSalary", label: "CCO Annual Salary" },
  { key: "ccoCertifications", label: "CCO Certifications" },
  { key: "ccoYearsInRole", label: "CCO Years in Role" },
  { key: "ceoName", label: "CEO Name" },
  { key: "ceoEmail", label: "CEO Email" },
  { key: "ceoLinkedin", label: "CEO LinkedIn" },
  { key: "companyWebsite", label: "Website" },
  { key: "companyLinkedin", label: "Company LinkedIn" },
  { key: "regulatoryFocus", label: "Regulatory Focus" },
  { key: "complianceTeamSize", label: "Team Size" },
  { key: "fiscalYearEnd", label: "Fiscal Year End" },
];

export function generateUSAComplianceRecords(): USAComplianceRecord[] {
  const COUNT = 100000;
  const result: USAComplianceRecord[] = new Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const ind = industries[i % industries.length];
    const subs = sectors[ind];
    const comp = companies[i % companies.length];
    const compSlug = comp.toLowerCase().replace(/[\s&'().]/g, "");
    const city = states[i % states.length];
    const stateCode = city.split(", ")[1] || "NY";

    const ccoFn = firstNames[i % firstNames.length];
    const ccoLn = lastNames[(i * 7) % lastNames.length];
    const ceoFn = firstNames[(i + 13) % firstNames.length];
    const ceoLn = lastNames[(i * 11 + 3) % lastNames.length];

    const empCount = 500 + Math.floor((i * 23) % 99500);
    const revB = ((i * 17) % 500) + 1;

    const ticker = compSlug.substring(0, 4).toUpperCase() + (i % 10);

    result[i] = {
      id: `usa-${i}`,
      companyName: comp,
      ticker,
      exchange: exchanges[i % exchanges.length],
      industry: ind,
      sector: subs[i % subs.length],
      employeeCount: empCount.toLocaleString() + "+",
      revenue: `$${revB >= 100 ? (revB / 10).toFixed(1) + "B" : revB + "M"}`,
      headquarters: city.split(", ")[0],
      state: stateCode,
      ccoName: `${ccoFn} ${ccoLn}`,
      ccoDesignation: ccoDesignations[i % ccoDesignations.length],
      ccoEmail: `${ccoFn.toLowerCase()}.${ccoLn.toLowerCase()}@${compSlug}.com`,
      ccoPhone: `+1-${200 + (i % 800)}-${1000000 + (i * 31) % 8999999}`.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      ccoLinkedin: `https://linkedin.com/in/${ccoFn.toLowerCase()}-${ccoLn.toLowerCase()}-${i}`,
      ccoSalary: salaryBands[i % salaryBands.length],
      ccoCertifications: certifications[i % certifications.length],
      ccoYearsInRole: `${1 + (i % 18)} yrs`,
      ceoName: `${ceoFn} ${ceoLn}`,
      ceoEmail: `${ceoFn.toLowerCase()}.${ceoLn.toLowerCase()}@${compSlug}.com`,
      ceoLinkedin: `https://linkedin.com/in/${ceoFn.toLowerCase()}-${ceoLn.toLowerCase()}-ceo-${i}`,
      companyWebsite: `https://www.${compSlug}.com`,
      companyLinkedin: `https://linkedin.com/company/${compSlug}`,
      regulatoryFocus: regulatoryFocusAreas[i % regulatoryFocusAreas.length],
      complianceTeamSize: `${5 + (i % 80)} members`,
      fiscalYearEnd: fiscalEnds[i % fiscalEnds.length],
    };
  }
  return result;
}
