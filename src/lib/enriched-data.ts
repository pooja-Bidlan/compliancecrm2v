export interface EnrichedCompany {
  id: string;
  companyName: string;
  industry: string;
  subSector: string;
  foundedYear: number;
  headquarters: string;
  country: string;
  region: string;
  employeeCount: number;
  revenueRange: string;
  fundingTotal: string;
  latestRound: string;
  valuation: string;
  ceoName: string;
  ceoEmail: string;
  ceoLinkedin: string;
  ctoName: string;
  ctoEmail: string;
  ctoLinkedin: string;
  companyLinkedin: string;
  companyWebsite: string;
  companyDomain: string;
  techStack: string;
  growthRate: string;
  lastFundingDate: string;
  investors: string;
  description: string;
}

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

const saasSubSectors = [
  "CRM", "ERP", "HR Tech", "FinTech SaaS", "MarTech", "DevOps", "Cybersecurity",
  "Data Analytics", "Project Management", "Communication", "E-commerce SaaS",
  "Legal Tech", "EdTech", "HealthTech SaaS", "Supply Chain", "Sales Enablement",
  "Customer Success", "Billing & Payments", "Compliance", "Identity & Access"
];

const aiSubSectors = [
  "NLP / LLM", "Computer Vision", "MLOps", "Autonomous Systems", "AI Infrastructure",
  "Generative AI", "Conversational AI", "AI for Healthcare", "AI for Finance",
  "Robotics AI", "AI Security", "AI Analytics", "Edge AI", "AI Agents", "AI Search"
];

const countries = [
  { name: "United States", cities: ["San Francisco", "New York", "Austin", "Seattle", "Boston", "Denver", "Chicago", "Los Angeles", "Miami", "Atlanta"], region: "North America" },
  { name: "United Kingdom", cities: ["London", "Manchester", "Cambridge", "Edinburgh", "Bristol"], region: "Europe" },
  { name: "Germany", cities: ["Berlin", "Munich", "Hamburg", "Frankfurt"], region: "Europe" },
  { name: "France", cities: ["Paris", "Lyon", "Toulouse"], region: "Europe" },
  { name: "India", cities: ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"], region: "Asia Pacific" },
  { name: "Canada", cities: ["Toronto", "Vancouver", "Montreal"], region: "North America" },
  { name: "Israel", cities: ["Tel Aviv", "Jerusalem", "Haifa"], region: "Middle East" },
  { name: "Singapore", cities: ["Singapore"], region: "Asia Pacific" },
  { name: "Australia", cities: ["Sydney", "Melbourne"], region: "Asia Pacific" },
  { name: "Netherlands", cities: ["Amsterdam", "Rotterdam"], region: "Europe" },
  { name: "Japan", cities: ["Tokyo", "Osaka"], region: "Asia Pacific" },
  { name: "Brazil", cities: ["São Paulo", "Rio de Janeiro"], region: "South America" },
  { name: "Sweden", cities: ["Stockholm", "Gothenburg"], region: "Europe" },
  { name: "South Korea", cities: ["Seoul", "Busan"], region: "Asia Pacific" },
  { name: "UAE", cities: ["Dubai", "Abu Dhabi"], region: "Middle East" },
];

const firstNames = [
  "James", "Emma", "Liam", "Sophia", "Noah", "Olivia", "Ethan", "Ava", "Mason", "Isabella",
  "Lucas", "Mia", "Logan", "Charlotte", "Alexander", "Amelia", "Benjamin", "Harper", "Daniel", "Evelyn",
  "Aditya", "Priya", "Raj", "Ananya", "Vikram", "Wei", "Yuki", "Satoshi", "Min-Jun", "Seo-Yeon",
  "Carlos", "Maria", "Ahmed", "Fatima", "Lars", "Elena", "Pierre", "Sophie", "Hans", "Anna",
  "David", "Sarah", "Michael", "Rachel", "Robert", "Jennifer", "William", "Emily", "Richard", "Laura"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Patel", "Kumar", "Singh", "Chen", "Wang", "Kim", "Tanaka", "Nakamura", "Park", "Lee",
  "Mueller", "Schmidt", "Fischer", "Weber", "Meyer", "Dubois", "Martin", "Bernard", "Andersson", "Johansson",
  "Silva", "Santos", "Costa", "Ali", "Hassan", "O'Brien", "Kelly", "Russo", "Rossi", "Hernandez",
  "Thompson", "Anderson", "Taylor", "Thomas", "Jackson", "White", "Harris", "Clark", "Lewis", "Young"
];

const techStacks = [
  "React, Node.js, AWS", "Python, Django, GCP", "Go, Kubernetes, Azure",
  "Java, Spring, AWS", "TypeScript, Next.js, Vercel", "Ruby, Rails, Heroku",
  "Rust, PostgreSQL, AWS", "Python, FastAPI, GCP", "Scala, Spark, Databricks",
  "Elixir, Phoenix, Fly.io", "C#, .NET, Azure", "Kotlin, Spring Boot, AWS",
  "Vue.js, Python, GCP", "React, GraphQL, Hasura", "Swift, Vapor, AWS",
  "Python, PyTorch, NVIDIA", "TensorFlow, Kubernetes, GCP", "JAX, TPU, Google Cloud",
];

const investorNames = [
  "Sequoia Capital", "Andreessen Horowitz", "Accel Partners", "Benchmark", "Index Ventures",
  "Lightspeed Ventures", "Bessemer Venture Partners", "Tiger Global", "SoftBank Vision Fund",
  "Insight Partners", "General Atlantic", "Greylock Partners", "Founders Fund", "Y Combinator",
  "GV (Google Ventures)", "Khosla Ventures", "NEA", "Battery Ventures", "Coatue Management",
  "Ribbit Capital", "IVP", "Spark Capital", "Union Square Ventures", "Felicis Ventures",
];

const rounds = ["Seed", "Series A", "Series B", "Series C", "Series D", "Series E", "Growth", "Pre-IPO"];
const revenueRanges = ["$1M-$5M", "$5M-$10M", "$10M-$25M", "$25M-$50M", "$50M-$100M", "$100M-$250M", "$250M-$500M", "$500M-$1B", "$1B+"];

const saasPrefixes = [
  "Cloud", "Data", "Flow", "Sync", "Hub", "Stack", "Ops", "Logic", "Net", "Link",
  "Zen", "Core", "Flex", "Dash", "Spark", "Beam", "Pulse", "Drift", "Wave", "Shift",
  "Velo", "Astra", "Nova", "Orbit", "Pixel", "Sage", "Apex", "Atlas", "Bolt", "Crest",
  "Edge", "Forge", "Grid", "Helix", "Iron", "Jade", "Kite", "Luma", "Mesa", "Nex",
];

const saasSuffixes = [
  "ly", "io", "ify", "able", "ware", "base", "force", "works", "desk", "point",
  "lab", "mind", "spot", "path", "gate", "line", "dock", "port", "craft", "field",
  "hq", "ai", "up", "go", "pro", "x", "hub", "kit", "box", "app",
];

const aiPrefixes = [
  "Neural", "Deep", "Cortex", "Synth", "Cogni", "Tensor", "Vector", "Quantum", "Sigma", "Lambda",
  "Alpha", "Omni", "Hyper", "Meta", "Auto", "Algo", "Neuro", "Robo", "Cyber", "Smart",
  "Bright", "Mind", "Think", "Learn", "Vision", "Sense", "Logic", "Intel", "Predict", "Gen",
];

const aiSuffixes = [
  " AI", " Labs", " Intelligence", " Systems", " Technologies", " Dynamics", " Sciences",
  " Analytics", " Robotics", " Networks", " Solutions", " Computing", " Research", " Minds",
  ".ai", " ML", " Cognitive", " Engine", " Platform", " Studio",
];

function generateCompanyName(type: "SaaS" | "AI", index: number, rand: () => number): string {
  if (type === "SaaS") {
    const prefix = saasPrefixes[index % saasPrefixes.length];
    const suffix = saasSuffixes[Math.floor(rand() * saasSuffixes.length)];
    // Add variation with index
    if (index > saasPrefixes.length) {
      const extra = firstNames[index % firstNames.length].slice(0, 3);
      return `${prefix}${extra}${suffix}`;
    }
    return `${prefix}${suffix}`;
  } else {
    const prefix = aiPrefixes[index % aiPrefixes.length];
    const suffix = aiSuffixes[Math.floor(rand() * aiSuffixes.length)];
    if (index > aiPrefixes.length) {
      const extra = lastNames[index % lastNames.length].slice(0, 3);
      return `${prefix}${extra}${suffix}`;
    }
    return `${prefix}${suffix}`;
  }
}

function generatePerson(index: number, rand: () => number) {
  const first = firstNames[(index * 3 + Math.floor(rand() * 10)) % firstNames.length];
  const last = lastNames[(index * 7 + Math.floor(rand() * 10)) % lastNames.length];
  return { first, last, full: `${first} ${last}` };
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function generateEnrichedCompanies(type: "SaaS" | "AI"): EnrichedCompany[] {
  const count = type === "SaaS" ? 10000 : 5000;
  const rand = seededRandom(type === "SaaS" ? 42 : 7919);
  const subSectors = type === "SaaS" ? saasSubSectors : aiSubSectors;
  const results: EnrichedCompany[] = [];

  for (let i = 0; i < count; i++) {
    const companyName = generateCompanyName(type, i, rand);
    const domain = slugify(companyName) + ".com";
    const countryData = pick(countries, rand);
    const city = pick(countryData.cities, rand);
    const ceo = generatePerson(i, rand);
    const cto = generatePerson(i + count, rand);
    const subSector = subSectors[i % subSectors.length];
    const employeeCount = 50 + Math.floor(rand() * 9950);
    const foundedYear = 2005 + Math.floor(rand() * 20);
    const roundIdx = Math.min(Math.floor(rand() * rounds.length), rounds.length - 1);
    const fundingAmt = (rand() * 500 + 1).toFixed(1);
    const revIdx = Math.min(Math.floor(employeeCount / 500), revenueRanges.length - 1);
    const valuationMultiple = (rand() * 20 + 5).toFixed(0);
    const growthPct = (rand() * 150 + 10).toFixed(0);
    const fundingMonth = Math.floor(rand() * 12) + 1;
    const fundingYear = 2022 + Math.floor(rand() * 4);
    const inv1 = pick(investorNames, rand);
    let inv2 = pick(investorNames, rand);
    while (inv2 === inv1) inv2 = pick(investorNames, rand);

    results.push({
      id: `${type.toLowerCase()}-${i}`,
      companyName,
      industry: type === "SaaS" ? "SaaS / Software" : "Artificial Intelligence",
      subSector,
      foundedYear,
      headquarters: `${city}, ${countryData.name}`,
      country: countryData.name,
      region: countryData.region,
      employeeCount,
      revenueRange: revenueRanges[revIdx],
      fundingTotal: `$${fundingAmt}M`,
      latestRound: rounds[roundIdx],
      valuation: `$${valuationMultiple}0M`,
      ceoName: ceo.full,
      ceoEmail: `${ceo.first.toLowerCase()}.${ceo.last.toLowerCase()}@${domain}`,
      ceoLinkedin: `https://linkedin.com/in/${slugify(ceo.full)}-${i}`,
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
      description: `${companyName} is a ${city}-based ${type === "SaaS" ? "SaaS" : "AI"} company specializing in ${subSector.toLowerCase()} with ${employeeCount}+ employees.`,
    });
  }

  return results;
}

export const ENRICHED_COLUMNS: { key: keyof EnrichedCompany; label: string }[] = [
  { key: "companyName", label: "Company Name" },
  { key: "industry", label: "Industry" },
  { key: "subSector", label: "Sub-Sector" },
  { key: "foundedYear", label: "Founded" },
  { key: "headquarters", label: "Headquarters" },
  { key: "country", label: "Country" },
  { key: "region", label: "Region" },
  { key: "employeeCount", label: "Employees" },
  { key: "revenueRange", label: "Revenue Range" },
  { key: "fundingTotal", label: "Total Funding" },
  { key: "latestRound", label: "Latest Round" },
  { key: "valuation", label: "Valuation" },
  { key: "ceoName", label: "CEO / Founder" },
  { key: "ceoEmail", label: "CEO Email" },
  { key: "ceoLinkedin", label: "CEO LinkedIn" },
  { key: "ctoName", label: "CTO" },
  { key: "ctoEmail", label: "CTO Email" },
  { key: "ctoLinkedin", label: "CTO LinkedIn" },
  { key: "companyLinkedin", label: "Company LinkedIn" },
  { key: "companyWebsite", label: "Website" },
  { key: "companyDomain", label: "Domain" },
  { key: "techStack", label: "Tech Stack" },
  { key: "growthRate", label: "Growth Rate" },
  { key: "lastFundingDate", label: "Last Funding Date" },
  { key: "investors", label: "Key Investors" },
  { key: "description", label: "Description" },
];
