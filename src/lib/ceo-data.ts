export interface FundedCEO {
  id: string;
  companyName: string;
  ceoName: string;
  ceoEmail: string;
  ceoLinkedin: string;
  ceoTitle: string;
  companyCountry: string;
  headquarters: string;
  region: string;
  industry: string;
  subSector: string;
  foundedYear: number;
  employeeCount: number;
  revenueRange: string;
  fundingTotal: string;
  latestRound: string;
  valuation: string;
  lastFundingDate: string;
  investors: string;
  companyLinkedin: string;
  companyWebsite: string;
  companyDomain: string;
  complianceModel: string;
  regulatoryTrigger: string;
  techStack: string;
  description: string;
}

export const CEO_COLUMNS: { key: keyof FundedCEO; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "companyName", label: "Company Name" },
  { key: "ceoName", label: "CEO / Founder" },
  { key: "ceoEmail", label: "CEO Email" },
  { key: "ceoLinkedin", label: "CEO LinkedIn" },
  { key: "ceoTitle", label: "CEO Title" },
  { key: "companyCountry", label: "Company Country" },
  { key: "headquarters", label: "Headquarters" },
  { key: "region", label: "Region" },
  { key: "industry", label: "Industry" },
  { key: "subSector", label: "Sub-Sector" },
  { key: "foundedYear", label: "Founded Year" },
  { key: "employeeCount", label: "Employees" },
  { key: "revenueRange", label: "Revenue Range" },
  { key: "fundingTotal", label: "Total Funding" },
  { key: "latestRound", label: "Latest Round" },
  { key: "valuation", label: "Valuation" },
  { key: "lastFundingDate", label: "Last Funding Date" },
  { key: "investors", label: "Key Investors" },
  { key: "companyLinkedin", label: "Company LinkedIn" },
  { key: "companyWebsite", label: "Company Website" },
  { key: "companyDomain", label: "Domain" },
  { key: "complianceModel", label: "Compliance Model" },
  { key: "regulatoryTrigger", label: "Regulatory Trigger" },
  { key: "techStack", label: "Tech Stack" },
  { key: "description", label: "Description" },
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function pick<T>(arr: readonly T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

const firstNames = [
  "James", "Sarah", "Ravi", "Elena", "Wei", "Olga", "Carlos", "Priya", "Yuki", "Ahmed",
  "Sophia", "Liam", "Ananya", "Noah", "Fatima", "Lucas", "Mei", "Arjun", "Isabella", "Omar",
  "Emma", "Raj", "Aisha", "Daniel", "Hana", "Vikram", "Clara", "Dmitri", "Nadia", "Kenji",
  "Mia", "Hassan", "Ingrid", "Pablo", "Suki", "Tobias", "Leila", "Akash", "Chloe", "Yusuf",
];

const lastNames = [
  "Smith", "Patel", "Wang", "Kim", "Mueller", "Fernandez", "Nakamura", "Singh", "Brown", "Chen",
  "Garcia", "Ivanov", "Ali", "Johnson", "Sharma", "Lee", "Martinez", "Tanaka", "Williams", "Das",
  "Anderson", "Gupta", "Petrov", "Lopez", "Sato", "Kumar", "Taylor", "Zhao", "Nair", "Okafor",
  "Eriksson", "Hashimoto", "Chowdhury", "Rossi", "Park", "Bhat", "Schmidt", "Santos", "Dubois", "Rao",
];

const titles = [
  "CEO & Co-Founder", "CEO & Founder", "Chief Executive Officer", "Managing Director & CEO",
  "CEO", "Founder & CEO", "Co-Founder & CEO", "President & CEO",
];

const countries = [
  { name: "United States", region: "North America", cities: ["San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA", "Boston, MA", "Miami, FL", "Denver, CO", "Chicago, IL", "Los Angeles, CA", "Atlanta, GA"] },
  { name: "United Kingdom", region: "Europe", cities: ["London", "Manchester", "Edinburgh", "Cambridge", "Bristol"] },
  { name: "India", region: "Asia Pacific", cities: ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Gurugram"] },
  { name: "Germany", region: "Europe", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"] },
  { name: "Israel", region: "Middle East", cities: ["Tel Aviv", "Jerusalem", "Haifa"] },
  { name: "Singapore", region: "Asia Pacific", cities: ["Singapore"] },
  { name: "Canada", region: "North America", cities: ["Toronto", "Vancouver", "Montreal"] },
  { name: "France", region: "Europe", cities: ["Paris", "Lyon", "Toulouse"] },
  { name: "Australia", region: "Asia Pacific", cities: ["Sydney", "Melbourne", "Brisbane"] },
  { name: "Japan", region: "Asia Pacific", cities: ["Tokyo", "Osaka", "Kyoto"] },
  { name: "UAE", region: "Middle East", cities: ["Dubai", "Abu Dhabi"] },
  { name: "Netherlands", region: "Europe", cities: ["Amsterdam", "Rotterdam", "The Hague"] },
  { name: "Brazil", region: "Latin America", cities: ["São Paulo", "Rio de Janeiro"] },
  { name: "South Korea", region: "Asia Pacific", cities: ["Seoul", "Busan"] },
  { name: "Sweden", region: "Europe", cities: ["Stockholm", "Gothenburg"] },
  { name: "Switzerland", region: "Europe", cities: ["Zurich", "Geneva"] },
  { name: "Ireland", region: "Europe", cities: ["Dublin", "Cork"] },
  { name: "Estonia", region: "Europe", cities: ["Tallinn"] },
  { name: "Nigeria", region: "Africa", cities: ["Lagos", "Abuja"] },
  { name: "Kenya", region: "Africa", cities: ["Nairobi"] },
];

const industries = [
  "FinTech", "RegTech", "InsurTech", "Blockchain / Crypto", "AI / ML",
  "Cybersecurity", "HealthTech", "EdTech", "LegalTech", "PropTech",
  "CleanTech", "AgriTech", "DeepTech", "SaaS", "E-Commerce",
];

const subSectors: Record<string, string[]> = {
  "FinTech": ["Payments", "Lending", "Neo-Banking", "Wealth Management", "Cross-border", "BNPL", "Crypto Exchange"],
  "RegTech": ["AML/KYC", "Compliance Automation", "Risk Management", "Regulatory Reporting", "Identity Verification"],
  "InsurTech": ["Claims Processing", "Underwriting AI", "Digital Distribution", "Parametric Insurance"],
  "Blockchain / Crypto": ["DeFi", "NFT Infrastructure", "Layer 2", "Wallet Solutions", "Stablecoins", "Web3"],
  "AI / ML": ["NLP", "Computer Vision", "MLOps", "Generative AI", "AI Agents", "Autonomous Systems"],
  "Cybersecurity": ["Zero Trust", "Cloud Security", "Endpoint Protection", "Threat Intelligence", "AppSec"],
  "HealthTech": ["Telemedicine", "Drug Discovery", "EHR", "Mental Health", "Diagnostics"],
  "EdTech": ["LMS", "Skill Assessment", "Tutoring", "Corporate Training", "Test Prep"],
  "LegalTech": ["Contract Management", "IP Management", "Legal AI", "eDiscovery"],
  "PropTech": ["Property Management", "Real Estate Marketplace", "Construction Tech"],
  "CleanTech": ["Solar", "EV Infrastructure", "Carbon Credits", "Energy Storage"],
  "AgriTech": ["Precision Farming", "Supply Chain", "AgriFinance", "Biotech"],
  "DeepTech": ["Quantum Computing", "Robotics", "Space Tech", "Materials Science"],
  "SaaS": ["CRM", "ERP", "HR Tech", "DevOps", "MarTech", "Data Analytics"],
  "E-Commerce": ["D2C", "Marketplace", "Logistics Tech", "Social Commerce"],
};

const rounds = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series D", "Series E", "Growth", "Pre-IPO"];
const revenueRanges = ["<$1M", "$1-5M", "$5-10M", "$10-25M", "$25-50M", "$50-100M", "$100-250M", "$250M+"];
const complianceModels = [
  "Fractional CCO", "Fractional FCO", "Advisory Board", "Compliance Consultant",
  "Interim Compliance Head", "Part-time GRC Lead", "vCISO", "Regulatory Advisor",
];
const triggers = [
  "Regulatory Update Required", "MiCA Compliance Deadline", "SEC Inquiry Response",
  "SOC 2 Audit Prep", "AML Program Enhancement", "New Market Entry Compliance",
  "Board Compliance Review", "Licensing Requirement", "GDPR Data Review",
  "FinCEN Reporting Update", "DORA Compliance", "PCI-DSS Recertification",
  "ISO 27001 Renewal", "FCA Authorization", "VASP Registration",
];
const techStacks = [
  "React, Node.js, AWS", "Python, Django, GCP", "Go, K8s, Azure", "Java, Spring, AWS",
  "Ruby on Rails, Heroku", "Rust, Terraform, AWS", "Vue.js, FastAPI, GCP", "Scala, Spark, Databricks",
  "TypeScript, Next.js, Vercel", "Elixir, Phoenix, Fly.io", "Kotlin, Ktor, GCP", ".NET, Azure",
];
const investorPool = [
  "Sequoia Capital", "Andreessen Horowitz", "Tiger Global", "Accel Partners", "Y Combinator",
  "Lightspeed Ventures", "Index Ventures", "Insight Partners", "General Catalyst", "Bessemer",
  "Founders Fund", "NEA", "GV (Google Ventures)", "Ribbit Capital", "QED Investors",
  "Matrix Partners", "Norwest", "Sapphire Ventures", "Battery Ventures", "8VC",
  "Elevation Capital", "Peak XV (Sequoia India)", "Blume Ventures", "Nexus Venture Partners",
  "SoftBank Vision Fund", "Coatue Management", "DST Global", "Khosla Ventures", "Greylock",
  "Benchmark", "Union Square Ventures", "First Round Capital", "Social Capital", "Spark Capital",
];

const CEO_COUNT = 20000;

export function generateFundedCEOs(): FundedCEO[] {
  const rand = seededRandom(54321);
  const result = new Array<FundedCEO>(CEO_COUNT);

  for (let i = 0; i < CEO_COUNT; i++) {
    const country = pick(countries, rand);
    const city = pick(country.cities, rand);
    const industry = pick(industries, rand);
    const subs = subSectors[industry] || ["General"];
    const sub = pick(subs, rand);
    const firstName = pick(firstNames, rand);
    const lastName = pick(lastNames, rand);
    const ceoName = `${firstName} ${lastName}`;
    const roundIdx = Math.min(Math.floor(rand() * rounds.length), rounds.length - 1);
    const round = rounds[roundIdx];
    const fundingBase = [0.5, 2, 8, 25, 60, 120, 200, 350, 500];
    const fundingAmt = (fundingBase[roundIdx] * (0.5 + rand())).toFixed(1);
    const valMult = 3 + rand() * 7;
    const valuation = (parseFloat(fundingAmt) * valMult).toFixed(0);
    const empBase = [5, 20, 50, 150, 400, 800, 1200, 2000, 3000];
    const employees = Math.floor(empBase[roundIdx] * (0.7 + rand() * 0.8));
    const revIdx = Math.min(roundIdx, revenueRanges.length - 1);
    const foundedYear = 2008 + Math.floor(rand() * 17);
    const fundingYear = 2020 + Math.floor(rand() * 6);
    const fundingMonth = 1 + Math.floor(rand() * 12);

    const companySlug = `${sub.toLowerCase().replace(/[\s\/]/g, "")}-${i}`;
    const domain = `${companySlug}.com`;
    const companyName = `${sub.split(" ")[0]}${["ly", "ify", "Hub", "Stack", "Labs", "AI", "io", "X", "Base", "Cloud"][Math.floor(rand() * 10)]} #${CEO_COUNT - i}`;

    const inv1 = pick(investorPool, rand);
    let inv2 = pick(investorPool, rand);
    if (inv2 === inv1) inv2 = pick(investorPool, rand);

    result[i] = {
      id: `ceo-${CEO_COUNT - 1 - i}`,
      companyName,
      ceoName,
      ceoEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      ceoLinkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i}`,
      ceoTitle: pick(titles, rand),
      companyCountry: country.name,
      headquarters: `${city}, ${country.name}`,
      region: country.region,
      industry,
      subSector: sub,
      foundedYear,
      employeeCount: employees,
      revenueRange: revenueRanges[revIdx],
      fundingTotal: `$${fundingAmt}M`,
      latestRound: round,
      valuation: `$${valuation}M`,
      lastFundingDate: `${fundingYear}-${String(fundingMonth).padStart(2, "0")}`,
      investors: `${inv1}, ${inv2}`,
      companyLinkedin: `https://linkedin.com/company/${companySlug}`,
      companyWebsite: `https://${domain}`,
      companyDomain: domain,
      complianceModel: pick(complianceModels, rand),
      regulatoryTrigger: pick(triggers, rand),
      techStack: pick(techStacks, rand),
      description: `${industry} company specializing in ${sub}, headquartered in ${city}, ${country.name}. ${round} funded.`,
    };
  }

  return result;
}
