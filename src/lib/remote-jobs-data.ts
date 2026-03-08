export interface RemoteJob {
  id: string;
  jobTitle: string;
  company: string;
  industry: string;
  subSector: string;
  jobSource: string;
  sourceUrl: string;
  location: string;
  region: string;
  salaryRange: string;
  experienceLevel: string;
  employmentType: string;
  postedDate: string;
  applicationDeadline: string;
  recruiterName: string;
  recruiterEmail: string;
  recruiterLinkedin: string;
  hiringManagerName: string;
  hiringManagerEmail: string;
  hiringManagerLinkedin: string;
  companyLinkedin: string;
  companyWebsite: string;
  companySize: string;
  techStack: string;
  complianceFocus: string;
  description: string;
}

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

const jobTitles = [
  "Remote FCCO / Senior AML Officer", "BSA/AML Compliance Officer", "Chief Compliance Officer",
  "VP of Compliance (Remote)", "Director, Financial Crimes Compliance", "Senior KYC/AML Analyst",
  "Head of Regulatory Compliance", "Fractional Chief Compliance Officer", "Global AML Director",
  "Compliance Risk Manager", "FinCrime Investigations Lead", "Sanctions Screening Specialist",
  "Regulatory Affairs Director", "GRC Program Manager", "SOX Compliance Manager",
  "Privacy & Data Protection Officer", "Anti-Fraud Operations Lead", "Trade Compliance Director",
  "OFAC Compliance Analyst", "MiCA Regulatory Specialist", "Crypto Compliance Lead",
  "DeFi Compliance Advisor", "Web3 Regulatory Counsel", "Digital Assets Compliance Head",
  "Payments Compliance Manager",
];

const companies = [
  "Goldman Sachs", "JPMorgan Chase", "Morgan Stanley", "Citigroup", "HSBC",
  "Barclays", "Deutsche Bank", "UBS", "BNP Paribas", "Kraken",
  "Revolut", "Circle", "Binance", "Stripe", "Coinbase",
  "Chainalysis", "Ripple", "Gemini", "Plaid", "Wise",
  "Robinhood", "BlockFi", "Bitpanda", "N26", "Klarna",
  "Monzo", "Chime", "SoFi", "Affirm", "PayPal",
  "Square (Block)", "Mastercard", "Visa", "Amex", "Standard Chartered",
  "ING Group", "Wells Fargo", "Bank of America", "State Street", "Northern Trust",
  "Charles Schwab", "Fidelity", "BlackRock", "Vanguard", "Paxos",
  "Anchorage Digital", "Fireblocks", "BitGo", "Checkout.com", "Adyen",
  "Rapyd", "Brex", "Mercury", "Ramp", "Deel",
  "Remote.com", "Velocity Global", "Oyster HR", "Lili", "Meow",
  "Stablecoin Inc", "Aave Labs", "Uniswap Labs", "Polygon Labs", "Arbitrum",
  "Alchemy", "Consensys", "Ledger", "Trezor", "dYdX",
  "MakerDAO", "Compound Labs", "Lido Finance", "EigenLayer", "Celestia",
  "Worldcoin", "LayerZero", "Wormhole", "Axelar", "Chainlink Labs",
  "The Graph", "Filecoin", "Arweave", "Helium", "Render Network",
  "Bitmain", "Marathon Digital", "Riot Platforms", "CleanSpark", "Core Scientific",
  "Galaxy Digital", "Digital Currency Group", "Grayscale", "Bitwise", "21Shares",
  "VanEck Digital", "WisdomTree", "Franklin Templeton", "Invesco", "ProShares",
];

const companyLinkedIns = companies.map(c =>
  c.toLowerCase().replace(/[\s()\.]+/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, "")
);

const industries = [
  "Banking", "FinTech", "Crypto / Web3", "Payments", "Insurance",
  "Asset Management", "Capital Markets", "RegTech", "DeFi", "Digital Assets",
];

const subSectors = [
  "AML/KYC", "Sanctions", "Fraud Detection", "Regulatory Reporting", "Risk Management",
  "Data Privacy", "Trade Surveillance", "Digital Identity", "Payment Compliance", "Crypto Compliance",
  "DeFi Governance", "Stablecoin Regulation", "NFT Compliance", "Cross-border Payments", "Open Banking",
];

const jobSources = [
  "LinkedIn Jobs", "Indeed", "Glassdoor", "AngelList / Wellfound", "Crypto Jobs List",
  "Web3 Career", "Remote OK", "We Work Remotely", "FlexJobs", "Built In",
  "Compliance Week Careers", "ACAMS Career Center", "eFinancialCareers", "The Muse", "Hired",
];

const locations = [
  "USA Remote", "UK Remote", "EU Remote", "Global Remote", "India Remote",
  "Singapore Remote", "Canada Remote", "APAC Remote", "EMEA Remote", "LATAM Remote",
  "USA (NY/SF) Hybrid", "London Hybrid", "Dubai Remote", "Switzerland Remote", "Germany Remote",
];

const regions = [
  "North America", "Europe", "Asia Pacific", "Middle East", "Global",
  "South America", "Africa", "Oceania",
];

const salaryRanges = [
  "$120K–$150K", "$140K–$180K", "$150K–$200K", "$160K–$220K", "$180K–$250K",
  "$200K–$280K", "$220K–$300K", "$250K–$350K", "$300K–$400K", "$350K–$500K",
  "£80K–£120K", "£100K–£150K", "€90K–€130K", "€110K–€160K", "₹30L–₹60L",
];

const experienceLevels = [
  "Mid-Senior (5-8 yrs)", "Senior (8-12 yrs)", "Director (10-15 yrs)",
  "VP / Head (12-20 yrs)", "C-Suite (15+ yrs)", "Principal (10+ yrs)",
];

const employmentTypes = [
  "Full-time Remote", "Contract (6-12 mo)", "Fractional / Part-time",
  "Full-time Hybrid", "Interim / Consulting",
];

const complianceFoci = [
  "AML/BSA Program Management", "KYC/CDD Enhancement", "Sanctions Screening & OFAC",
  "Crypto & Digital Asset Compliance", "MiCA / EU Regulatory Compliance",
  "SOC 2 & SOX Compliance", "GDPR / Data Privacy", "SEC / FINRA Regulatory",
  "Cross-border Payment Compliance", "DeFi Protocol Governance",
  "Stablecoin Regulatory Framework", "NFT & Tokenization Compliance",
  "Trade Surveillance & Market Abuse", "FinCEN Reporting & SAR Filing",
  "Licensing & Registration (MTL/BitLicense)", "Risk Assessment & RCSA",
  "Vendor / Third-party Risk Management", "Board & Audit Committee Reporting",
  "Anti-Fraud & Investigations", "Regulatory Change Management",
];

const techStacks = [
  "Chainalysis, Elliptic, AWS", "Refinitiv, Actimize, Azure", "ComplyAdvantage, Onfido, GCP",
  "Sumsub, Jumio, Kubernetes", "LexisNexis, SAS AML, Oracle", "NICE Actimize, Pegasus, AWS",
  "Hummingbird, Unit21, Vercel", "Sardine, Alloy, Snowflake", "TRM Labs, Merkle Science, Python",
  "Notabene, Sift, React", "Comply, Flagright, Node.js", "Napier, Featurespace, Databricks",
];

const firstNames = [
  "Sarah", "Michael", "Elena", "David", "Priya", "James", "Anna", "Robert", "Lisa", "Kevin",
  "Natalie", "Brian", "Sophia", "Ethan", "Olivia", "Lucas", "Emma", "Alexander", "Rachel", "Tom",
  "Aditya", "Wei", "Carlos", "Fatima", "Lars", "Yuki", "Ahmed", "Maria", "Pierre", "Hans",
  "Jennifer", "William", "Daniel", "Charlotte", "Benjamin", "Amelia", "Logan", "Isabella", "Mason", "Mia",
];

const lastNames = [
  "Chen", "Patel", "Williams", "Kumar", "Johnson", "Smith", "Garcia", "Brown", "Kim", "Anderson",
  "Martinez", "Taylor", "Thomas", "Lee", "Robinson", "Clark", "Lewis", "Walker", "Hall", "Young",
  "Mueller", "Dubois", "Rossi", "Tanaka", "Singh", "Ali", "Santos", "Johansson", "O'Brien", "Hassan",
  "Thompson", "White", "Harris", "Jackson", "Davis", "Wilson", "Moore", "Martin", "Miller", "Jones",
];

const companySizes = [
  "1-50", "51-200", "201-500", "501-1,000", "1,001-5,000",
  "5,001-10,000", "10,001-50,000", "50,001+",
];

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateRemoteJobs(): RemoteJob[] {
  const count = 5000;
  const rand = seededRandom(31337);
  const results: RemoteJob[] = [];

  for (let i = 0; i < count; i++) {
    const company = companies[i % companies.length];
    const companySlug = companyLinkedIns[i % companies.length];
    const domain = companySlug.replace(/-/g, "") + ".com";
    const recruiter = `${pick(firstNames, rand)} ${pick(lastNames, rand)}`;
    const hiringMgr = `${pick(firstNames, rand)} ${pick(lastNames, rand)}`;
    const jobTitle = jobTitles[i % jobTitles.length];
    const source = pick(jobSources, rand);
    const loc = pick(locations, rand);
    const region = pick(regions, rand);
    const postedMonth = Math.floor(rand() * 6) + 1;
    const postedDay = Math.floor(rand() * 28) + 1;
    const deadlineMonth = postedMonth + Math.floor(rand() * 3) + 1;

    results.push({
      id: `rjob-${i}`,
      jobTitle,
      company,
      industry: pick(industries, rand),
      subSector: pick(subSectors, rand),
      jobSource: source,
      sourceUrl: source === "LinkedIn Jobs"
        ? `https://linkedin.com/jobs/view/${1000000 + i}`
        : source === "Indeed"
        ? `https://indeed.com/viewjob?jk=${(i * 7919).toString(16)}`
        : `https://${slugify(source)}.com/jobs/${slugify(company)}-${i}`,
      location: loc,
      region,
      salaryRange: pick(salaryRanges, rand),
      experienceLevel: pick(experienceLevels, rand),
      employmentType: pick(employmentTypes, rand),
      postedDate: `2026-${String(postedMonth).padStart(2, "0")}-${String(postedDay).padStart(2, "0")}`,
      applicationDeadline: `2026-${String(Math.min(deadlineMonth, 12)).padStart(2, "0")}-${String(postedDay).padStart(2, "0")}`,
      recruiterName: recruiter,
      recruiterEmail: `${slugify(recruiter)}@${domain}`,
      recruiterLinkedin: `https://linkedin.com/in/${slugify(recruiter)}-${i}`,
      hiringManagerName: hiringMgr,
      hiringManagerEmail: `${slugify(hiringMgr)}@${domain}`,
      hiringManagerLinkedin: `https://linkedin.com/in/${slugify(hiringMgr)}-${i}`,
      companyLinkedin: `https://linkedin.com/company/${companySlug}`,
      companyWebsite: `https://${domain}`,
      companySize: pick(companySizes, rand),
      techStack: pick(techStacks, rand),
      complianceFocus: pick(complianceFoci, rand),
      description: `${jobTitle} at ${company} — ${loc}. ${pick(complianceFoci, rand)}. Source: ${source}.`,
    });
  }

  return results;
}

export const REMOTE_JOB_COLUMNS: { key: keyof RemoteJob; label: string }[] = [
  { key: "jobTitle", label: "Job Title" },
  { key: "company", label: "Company" },
  { key: "industry", label: "Industry" },
  { key: "subSector", label: "Compliance Area" },
  { key: "jobSource", label: "Job Source" },
  { key: "sourceUrl", label: "Source URL" },
  { key: "location", label: "Location" },
  { key: "region", label: "Region" },
  { key: "salaryRange", label: "Salary Range" },
  { key: "experienceLevel", label: "Experience Level" },
  { key: "employmentType", label: "Employment Type" },
  { key: "postedDate", label: "Posted Date" },
  { key: "applicationDeadline", label: "Application Deadline" },
  { key: "recruiterName", label: "Recruiter Name" },
  { key: "recruiterEmail", label: "Recruiter Email" },
  { key: "recruiterLinkedin", label: "Recruiter LinkedIn" },
  { key: "hiringManagerName", label: "Hiring Manager" },
  { key: "hiringManagerEmail", label: "Hiring Mgr Email" },
  { key: "hiringManagerLinkedin", label: "Hiring Mgr LinkedIn" },
  { key: "companyLinkedin", label: "Company LinkedIn" },
  { key: "companyWebsite", label: "Company Website" },
  { key: "companySize", label: "Company Size" },
  { key: "techStack", label: "Tech Stack" },
  { key: "complianceFocus", label: "Compliance Focus" },
  { key: "description", label: "Description" },
];
