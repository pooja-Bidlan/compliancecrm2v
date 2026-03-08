import type { EnrichedCompany } from "./enriched-data";

// Seeded pseudo-random for deterministic generation
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

const bfsiSubSectors = [
  "Commercial Banking", "Retail Banking", "Investment Banking", "Private Banking",
  "Digital Banking", "Neobank", "Payment Gateway", "Lending Platform",
  "NBFC", "Small Finance Bank", "Microfinance", "Insurance - Life",
  "Insurance - General", "Insurance - Health", "Wealth Management",
  "Asset Management", "Mutual Fund", "Stock Broking", "FinTech - Payments",
  "FinTech - Lending", "FinTech - InsurTech", "FinTech - WealthTech",
  "FinTech - RegTech", "Credit Rating", "Housing Finance", "Vehicle Finance",
  "Gold Loan", "Consumer Finance", "Trade Finance", "Treasury Management",
];

const bfsiCategories = [
  "Bank", "FinTech", "NBFC", "SFB", "Insurance", "AMC", "Brokerage",
  "Housing Finance", "Microfinance", "Payment Company", "Lending Platform",
  "WealthTech", "InsurTech", "RegTech", "Credit Bureau",
];

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata",
  "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi", "Noida", "Gurugram",
  "Indore", "Bhopal", "Vadodara", "Surat", "Nagpur", "Visakhapatnam",
  "Coimbatore", "Thiruvananthapuram", "Patna", "Ranchi", "Bhubaneswar",
  "Guwahati", "Dehradun", "Mysuru", "Mangalore", "Rajkot",
];

const firstNames = [
  "Rajesh", "Amit", "Sanjay", "Vikram", "Arun", "Sunil", "Prashant", "Deepak", "Anand", "Rakesh",
  "Aditya", "Nitin", "Gaurav", "Manish", "Ashish", "Rohit", "Vivek", "Ajay", "Ramesh", "Suresh",
  "Sarah", "Priya", "Anjali", "Neha", "Kavita", "Sunita", "Meena", "Pooja", "Swati", "Rekha",
  "Karan", "Pankaj", "Harish", "Dinesh", "Satish", "Girish", "Mukesh", "Yogesh", "Naresh", "Mahesh",
];

const lastNames = [
  "Sharma", "Patel", "Gupta", "Singh", "Kumar", "Agarwal", "Jain", "Mehta", "Shah", "Bansal",
  "Reddy", "Rao", "Nair", "Pillai", "Iyer", "Menon", "Das", "Bose", "Roy", "Sen",
  "Khanna", "Malhotra", "Kapoor", "Arora", "Bhatia", "Chopra", "Oberoi", "Sinha", "Verma", "Saxena",
  "Mittal", "Goel", "Tiwari", "Pandey", "Mishra", "Dubey", "Chauhan", "Yadav", "Thakur", "Joshi",
];

const bfsiPrefixes = [
  "Capital", "First", "Prime", "Trust", "Union", "Federal", "National", "Metro", "City", "Global",
  "Pioneer", "Axis", "Summit", "Apex", "Crown", "Heritage", "Liberty", "Pacific", "Atlantic", "Eagle",
  "Pinnacle", "Zenith", "Horizon", "Meridian", "Vanguard", "Sterling", "Prestige", "Sovereign", "Frontier", "Emerald",
  "Diamond", "Sapphire", "Golden", "Silver", "Platinum", "Fusion", "Nexus", "Vertex", "Quantum", "Nova",
  "Fidelity", "Integrity", "Unity", "Accord", "Alliance", "Progress", "Fortune", "Wealth", "Secure", "Shield",
];

const bfsiSuffixes = [
  " Finance", " Bank", " Financial Services", " Capital", " Credit", " Lending",
  " Pay", " Money", " Finserv", " Holdings", " Group", " Corp",
  " Financial", " Bancorp", " Securities", " Advisors", " Partners", " Trust",
  " Insurance", " Fund", " Ventures", " Investments", " Solutions", " Technologies",
];

const techStacks = [
  "Java, Spring, Oracle", "Python, Django, PostgreSQL", "C#, .NET, SQL Server",
  "Java, Microservices, AWS", "React, Node.js, MongoDB", "Angular, Java, Oracle",
  "Kotlin, Spring Boot, AWS", "Go, Kubernetes, GCP", "Python, Flask, MySQL",
  "React, Python, AWS", "Vue.js, Java, Azure", "TypeScript, NestJS, PostgreSQL",
  "Scala, Spark, Hadoop", "Java, Kafka, Cassandra", "Python, FastAPI, Redis",
  "SAP, ABAP, HANA", "Temenos T24, Java", "Finacle, Oracle, Java",
];

const regulators = [
  "RBI", "SEBI", "IRDAI", "NABARD", "NHB", "PFRDA", "IBBI", "SIDBI",
];

const complianceFrameworks = [
  "Basel III", "PCI-DSS", "AML/KYC", "DPDP Act", "Ind AS", "IFRS 9",
  "ISO 27001", "SOC 2", "RBI Master Directions", "SEBI Guidelines",
];

const revenueRanges = [
  "$1M-$10M", "$10M-$50M", "$50M-$100M", "$100M-$500M", "$500M-$1B",
  "$1B-$5B", "$5B-$10B", "$10B-$50B", "$50B-$100B", "$100B+",
];

const rounds = ["Seed", "Series A", "Series B", "Series C", "Series D", "Series E", "Pre-IPO", "IPO", "Listed", "Private"];

const investors1 = ["Goldman Sachs", "Morgan Stanley", "JP Morgan", "Warburg Pincus", "KKR", "Blackstone", "Carlyle", "Temasek", "GIC", "SoftBank", "Sequoia Capital India", "Accel", "Tiger Global", "QED Investors", "Ribbit Capital", "General Atlantic", "ChrysCapital", "ICICI Venture", "SBI Capital", "HDFC"];
const investors2 = ["Advent International", "Bain Capital", "TPG", "Apollo Global", "Brookfield", "Fairfax", "CDPQ", "Ontario Teachers", "Abu Dhabi Investment", "Mubadala", "Norges Bank", "Canada Pension", "IFC", "ADB", "DEG", "FMO", "Proparco", "CDC Group", "Norfund", "Swedfund"];

// Pre-compute lowercase names to avoid repeated toLowerCase calls
const firstNamesLower = firstNames.map(n => n.toLowerCase());
const lastNamesLower = lastNames.map(n => n.toLowerCase());

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export interface BFSICompany extends EnrichedCompany {
  category: string;
  mdName: string;
  mdEmail: string;
  mdLinkedin: string;
  cfoName: string;
  cfoEmail: string;
  cfoLinkedin: string;
  regulator: string;
  complianceFramework: string;
  listingStatus: string;
}

export const BFSI_COLUMNS: { key: keyof BFSICompany; label: string }[] = [
  { key: "companyName", label: "Company Name" },
  { key: "category", label: "Category" },
  { key: "subSector", label: "Sub-Sector" },
  { key: "listingStatus", label: "Listed / Unlisted" },
  { key: "foundedYear", label: "Founded" },
  { key: "headquarters", label: "Headquarters" },
  { key: "country", label: "Country" },
  { key: "region", label: "Region" },
  { key: "employeeCount", label: "Employees" },
  { key: "revenueRange", label: "Revenue Range" },
  { key: "fundingTotal", label: "Total Funding / Market Cap" },
  { key: "latestRound", label: "Stage" },
  { key: "ceoName", label: "CEO / MD" },
  { key: "ceoEmail", label: "CEO Email" },
  { key: "ceoLinkedin", label: "CEO LinkedIn" },
  { key: "mdName", label: "MD / Director" },
  { key: "mdEmail", label: "MD Email" },
  { key: "mdLinkedin", label: "MD LinkedIn" },
  { key: "cfoName", label: "CFO" },
  { key: "cfoEmail", label: "CFO Email" },
  { key: "cfoLinkedin", label: "CFO LinkedIn" },
  { key: "ctoName", label: "CTO" },
  { key: "ctoEmail", label: "CTO Email" },
  { key: "ctoLinkedin", label: "CTO LinkedIn" },
  { key: "regulator", label: "Primary Regulator" },
  { key: "complianceFramework", label: "Compliance Framework" },
];

export function generateBFSICompanies(): BFSICompany[] {
  const count = 80000;
  const rand = seededRandom(31337);
  const results = new Array<BFSICompany>(count);
  const fnLen = firstNames.length;
  const lnLen = lastNames.length;
  const pfxLen = bfsiPrefixes.length;
  const sfxLen = bfsiSuffixes.length;
  const cityLen = indianCities.length;
  const subLen = bfsiSubSectors.length;
  const catLen = bfsiCategories.length;
  const tsLen = techStacks.length;
  const regLen = regulators.length;
  const cfLen = complianceFrameworks.length;
  const rrLen = revenueRanges.length;
  const rdLen = rounds.length;
  const i1Len = investors1.length;
  const i2Len = investors2.length;

  for (let i = 0; i < count; i++) {
    // Company name - inline to avoid function call overhead
    const prefix = bfsiPrefixes[i % pfxLen];
    const suffix = bfsiSuffixes[Math.floor(rand() * sfxLen)];
    const companyName = i >= pfxLen
      ? `${prefix}${firstNames[i % fnLen].slice(0, 3)}${suffix}`
      : `${prefix}${suffix}`;
    const domain = slugify(companyName) + ".com";

    const city = indianCities[Math.floor(rand() * cityLen)];

    // Person generation - inline
    const ceoFi = (i * 3 + Math.floor(rand() * 10)) % fnLen;
    const ceoLi = (i * 7 + Math.floor(rand() * 10)) % lnLen;
    const mdOff = i + count;
    const mdFi = (mdOff * 3 + Math.floor(rand() * 10)) % fnLen;
    const mdLi = (mdOff * 7 + Math.floor(rand() * 10)) % lnLen;
    const cfoOff = i + count * 2;
    const cfoFi = (cfoOff * 3 + Math.floor(rand() * 10)) % fnLen;
    const cfoLi = (cfoOff * 7 + Math.floor(rand() * 10)) % lnLen;
    const ctoOff = i + count * 3;
    const ctoFi = (ctoOff * 3 + Math.floor(rand() * 10)) % fnLen;
    const ctoLi = (ctoOff * 7 + Math.floor(rand() * 10)) % lnLen;

    const employeeCount = 50 + Math.floor(rand() * 49950);
    const isListed = rand() > 0.4;
    const fundingAmt = isListed
      ? `$${(rand() * 50 + 0.5).toFixed(1)}B`
      : `$${(rand() * 500 + 1).toFixed(1)}M`;
    const revIdx = Math.min(Math.floor(employeeCount / 2000), rrLen - 1);
    const roundIdx = Math.min(Math.floor(rand() * rdLen), rdLen - 1);
    const fundingYear = 2020 + Math.floor(rand() * 6);
    const fundingMonth = Math.floor(rand() * 12) + 1;

    const ceoFull = `${firstNames[ceoFi]} ${lastNames[ceoLi]}`;
    const mdFull = `${firstNames[mdFi]} ${lastNames[mdLi]}`;
    const cfoFull = `${firstNames[cfoFi]} ${lastNames[cfoLi]}`;
    const ctoFull = `${firstNames[ctoFi]} ${lastNames[ctoLi]}`;

    const subSector = bfsiSubSectors[i % subLen];
    const category = bfsiCategories[i % catLen];

    results[i] = {
      id: `bfsi-${i}`,
      companyName,
      industry: "BFSI",
      category,
      subSector,
      foundedYear: 1950 + Math.floor(rand() * 75),
      headquarters: `${city}, India`,
      country: "India",
      region: "India",
      employeeCount,
      revenueRange: revenueRanges[revIdx],
      fundingTotal: fundingAmt,
      latestRound: rounds[roundIdx],
      valuation: fundingAmt,
      listingStatus: isListed ? "Listed" : "Unlisted",
      ceoName: ceoFull,
      ceoEmail: `${firstNamesLower[ceoFi]}.${lastNamesLower[ceoLi]}@${domain}`,
      ceoLinkedin: `https://linkedin.com/in/${slugify(ceoFull)}-${i}`,
      mdName: mdFull,
      mdEmail: `${firstNamesLower[mdFi]}.${lastNamesLower[mdLi]}@${domain}`,
      mdLinkedin: `https://linkedin.com/in/${slugify(mdFull)}-md-${i}`,
      cfoName: cfoFull,
      cfoEmail: `${firstNamesLower[cfoFi]}.${lastNamesLower[cfoLi]}@${domain}`,
      cfoLinkedin: `https://linkedin.com/in/${slugify(cfoFull)}-cfo-${i}`,
      ctoName: ctoFull,
      ctoEmail: `${firstNamesLower[ctoFi]}.${lastNamesLower[ctoLi]}@${domain}`,
      ctoLinkedin: `https://linkedin.com/in/${slugify(ctoFull)}-${i}`,
      companyLinkedin: `https://linkedin.com/company/${slugify(companyName)}`,
      companyWebsite: `https://${domain}`,
      companyDomain: domain,
      techStack: techStacks[Math.floor(rand() * tsLen)],
      growthRate: `${(rand() * 80 + 5).toFixed(0)}% YoY`,
      lastFundingDate: `${fundingYear}-${String(fundingMonth).padStart(2, "0")}`,
      investors: `${investors1[Math.floor(rand() * i1Len)]}, ${investors2[Math.floor(rand() * i2Len)]}`,
      regulator: regulators[Math.floor(rand() * regLen)],
      complianceFramework: complianceFrameworks[Math.floor(rand() * cfLen)],
      description: `${companyName} is a ${city}-based ${category} specializing in ${subSector.toLowerCase()} with ${employeeCount.toLocaleString()}+ employees. ${isListed ? "Publicly listed." : "Private company."}`,
    };
  }

  return results;
}
