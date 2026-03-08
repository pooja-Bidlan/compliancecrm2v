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

const countries = [
  { name: "India", cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Kochi", "Noida", "Gurugram"], region: "Asia Pacific" },
  { name: "United States", cities: ["New York", "San Francisco", "Chicago", "Charlotte", "Boston", "Houston", "Dallas", "Miami", "Atlanta", "Seattle"], region: "North America" },
  { name: "United Kingdom", cities: ["London", "Edinburgh", "Manchester", "Birmingham", "Leeds"], region: "Europe" },
  { name: "Singapore", cities: ["Singapore"], region: "Asia Pacific" },
  { name: "UAE", cities: ["Dubai", "Abu Dhabi", "DIFC"], region: "Middle East" },
  { name: "Hong Kong", cities: ["Hong Kong", "Central"], region: "Asia Pacific" },
  { name: "Japan", cities: ["Tokyo", "Osaka", "Yokohama"], region: "Asia Pacific" },
  { name: "Germany", cities: ["Frankfurt", "Berlin", "Munich", "Hamburg"], region: "Europe" },
  { name: "Switzerland", cities: ["Zurich", "Geneva", "Basel"], region: "Europe" },
  { name: "Canada", cities: ["Toronto", "Montreal", "Vancouver", "Calgary"], region: "North America" },
  { name: "Australia", cities: ["Sydney", "Melbourne", "Brisbane"], region: "Asia Pacific" },
  { name: "China", cities: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou"], region: "Asia Pacific" },
  { name: "South Korea", cities: ["Seoul", "Busan"], region: "Asia Pacific" },
  { name: "Brazil", cities: ["São Paulo", "Rio de Janeiro", "Brasília"], region: "South America" },
  { name: "South Africa", cities: ["Johannesburg", "Cape Town"], region: "Africa" },
  { name: "Nigeria", cities: ["Lagos", "Abuja"], region: "Africa" },
  { name: "Kenya", cities: ["Nairobi"], region: "Africa" },
  { name: "Indonesia", cities: ["Jakarta", "Surabaya"], region: "Asia Pacific" },
  { name: "Malaysia", cities: ["Kuala Lumpur"], region: "Asia Pacific" },
  { name: "Thailand", cities: ["Bangkok"], region: "Asia Pacific" },
];

const firstNames = [
  "Rajesh", "Amit", "Sanjay", "Vikram", "Arun", "Sunil", "Prashant", "Deepak", "Anand", "Rakesh",
  "James", "Robert", "William", "David", "Michael", "Richard", "Charles", "Thomas", "John", "Daniel",
  "Aditya", "Nitin", "Gaurav", "Manish", "Ashish", "Rohit", "Vivek", "Ajay", "Ramesh", "Suresh",
  "Sarah", "Priya", "Anjali", "Neha", "Kavita", "Sunita", "Meena", "Pooja", "Swati", "Rekha",
  "Emma", "Laura", "Sophie", "Anna", "Maria", "Elena", "Yuki", "Wei", "Min-Jun", "Ahmed",
  "Karan", "Pankaj", "Harish", "Dinesh", "Satish", "Girish", "Mukesh", "Yogesh", "Naresh", "Mahesh",
];

const lastNames = [
  "Sharma", "Patel", "Gupta", "Singh", "Kumar", "Agarwal", "Jain", "Mehta", "Shah", "Bansal",
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson", "Anderson", "Taylor",
  "Reddy", "Rao", "Nair", "Pillai", "Iyer", "Menon", "Das", "Bose", "Roy", "Sen",
  "Khanna", "Malhotra", "Kapoor", "Arora", "Bhatia", "Chopra", "Oberoi", "Sinha", "Verma", "Saxena",
  "Mueller", "Schmidt", "Fischer", "Kim", "Park", "Lee", "Chen", "Wang", "Ali", "Hassan",
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
  "RBI", "SEBI", "IRDAI", "SEC", "FCA", "MAS", "HKMA", "APRA",
  "BaFin", "FINMA", "OSFI", "CBUAE", "FSA", "OCC", "FDIC", "PRA",
];

const complianceFrameworks = [
  "Basel III", "Solvency II", "PCI-DSS", "SOX", "AML/KYC", "GDPR",
  "DPDP Act", "IFRS 9", "Ind AS", "MiFID II", "Dodd-Frank", "FATCA",
  "ISO 27001", "NIST", "SOC 2", "RBI Master Directions",
];

const revenueRanges = [
  "$1M-$10M", "$10M-$50M", "$50M-$100M", "$100M-$500M", "$500M-$1B",
  "$1B-$5B", "$5B-$10B", "$10B-$50B", "$50B-$100B", "$100B+",
];

const rounds = ["Seed", "Series A", "Series B", "Series C", "Series D", "Series E", "Pre-IPO", "IPO", "Listed", "Private"];

function generateCompanyName(index: number, rand: () => number): string {
  const prefix = bfsiPrefixes[index % bfsiPrefixes.length];
  const suffix = bfsiSuffixes[Math.floor(rand() * bfsiSuffixes.length)];
  if (index >= bfsiPrefixes.length) {
    const extra = firstNames[index % firstNames.length].slice(0, 3);
    return `${prefix}${extra}${suffix}`;
  }
  return `${prefix}${suffix}`;
}

function generatePerson(index: number, rand: () => number) {
  const first = firstNames[(index * 3 + Math.floor(rand() * 10)) % firstNames.length];
  const last = lastNames[(index * 7 + Math.floor(rand() * 10)) % lastNames.length];
  return { first, last, full: `${first} ${last}` };
}

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
  const count = 50000;
  const rand = seededRandom(31337);
  const results: BFSICompany[] = [];

  for (let i = 0; i < count; i++) {
    const companyName = generateCompanyName(i, rand);
    const domain = slugify(companyName) + ".com";
    const countryData = pick(countries, rand);
    const city = pick(countryData.cities, rand);
    const ceo = generatePerson(i, rand);
    const md = generatePerson(i + count, rand);
    const cfo = generatePerson(i + count * 2, rand);
    const cto = generatePerson(i + count * 3, rand);
    const subSector = bfsiSubSectors[i % bfsiSubSectors.length];
    const category = bfsiCategories[i % bfsiCategories.length];
    const employeeCount = 50 + Math.floor(rand() * 49950);
    const foundedYear = 1950 + Math.floor(rand() * 75);
    const roundIdx = Math.min(Math.floor(rand() * rounds.length), rounds.length - 1);
    const isListed = rand() > 0.4;
    const fundingAmt = isListed
      ? `$${(rand() * 50 + 0.5).toFixed(1)}B`
      : `$${(rand() * 500 + 1).toFixed(1)}M`;
    const revIdx = Math.min(Math.floor(employeeCount / 2000), revenueRanges.length - 1);
    const growthPct = (rand() * 80 + 5).toFixed(0);
    const fundingMonth = Math.floor(rand() * 12) + 1;
    const fundingYear = 2020 + Math.floor(rand() * 6);
    const regulator = pick(regulators, rand);
    const framework = pick(complianceFrameworks, rand);
    const inv1 = pick(["Goldman Sachs", "Morgan Stanley", "JP Morgan", "Warburg Pincus", "KKR", "Blackstone", "Carlyle", "Temasek", "GIC", "SoftBank", "Sequoia Capital India", "Accel", "Tiger Global", "QED Investors", "Ribbit Capital", "General Atlantic", "ChrysCapital", "ICICI Venture", "SBI Capital", "HDFC"], rand);
    let inv2 = pick(["Advent International", "Bain Capital", "TPG", "Apollo Global", "Brookfield", "Fairfax", "CDPQ", "Ontario Teachers", "Abu Dhabi Investment", "Mubadala", "Norges Bank", "Canada Pension", "IFC", "ADB", "DEG", "FMO", "Proparco", "CDC Group", "Norfund", "Swedfund"], rand);

    results.push({
      id: `bfsi-${i}`,
      companyName,
      industry: "BFSI",
      category,
      subSector,
      foundedYear,
      headquarters: `${city}, ${countryData.name}`,
      country: countryData.name,
      region: countryData.region,
      employeeCount,
      revenueRange: revenueRanges[revIdx],
      fundingTotal: fundingAmt,
      latestRound: rounds[roundIdx],
      valuation: fundingAmt,
      listingStatus: isListed ? "Listed" : "Unlisted",
      ceoName: ceo.full,
      ceoEmail: `${ceo.first.toLowerCase()}.${ceo.last.toLowerCase()}@${domain}`,
      ceoLinkedin: `https://linkedin.com/in/${slugify(ceo.full)}-${i}`,
      mdName: md.full,
      mdEmail: `${md.first.toLowerCase()}.${md.last.toLowerCase()}@${domain}`,
      mdLinkedin: `https://linkedin.com/in/${slugify(md.full)}-md-${i}`,
      cfoName: cfo.full,
      cfoEmail: `${cfo.first.toLowerCase()}.${cfo.last.toLowerCase()}@${domain}`,
      cfoLinkedin: `https://linkedin.com/in/${slugify(cfo.full)}-cfo-${i}`,
      ctoName: cto.full,
      ctoEmail: `${cto.first.toLowerCase()}.${cto.last.toLowerCase()}@${domain}`,
      ctoLinkedin: `https://linkedin.com/in/${slugify(cto.full)}-${i}`,
      companyLinkedin: `https://linkedin.com/company/${slugify(companyName)}`,
      companyWebsite: `https://${domain}`,
      companyDomain: domain,
      techStack: pick(techStacks, rand),
      growthRate: `${growthPct}% YoY`,
      lastFundingDate: `${fundingYear}-${String(fundingMonth).padStart(2, "0")}`,
      investors: `${inv1}, ${inv2}`,
      regulator,
      complianceFramework: framework,
      description: `${companyName} is a ${city}-based ${category} specializing in ${subSector.toLowerCase()} with ${employeeCount.toLocaleString()}+ employees. ${isListed ? "Publicly listed." : "Private company."} Regulated by ${regulator}.`,
    });
  }

  return results;
}
