export interface MarketIntelProspect {
  id: string;
  companyName: string;
  companyCountry: string;
  headquarters: string;
  region: string;
  industry: string;
  subSector: string;
  employeeCount: number;
  revenueRange: string;
  companyLinkedin: string;
  companyWebsite: string;
  companyDomain: string;
  // News / appointment details
  newsType: string;
  newsHeadline: string;
  newsDate: string;
  newsSource: string;
  // Person involved in the change
  personName: string;
  personTitle: string;
  previousRole: string;
  personEmail: string;
  personLinkedin: string;
  // Compliance opportunity
  complianceOpportunity: string;
  prospectScore: string;
  regulatoryImplication: string;
  description: string;
}

export const MARKET_INTEL_COLUMNS: { key: keyof MarketIntelProspect; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "companyName", label: "Company Name" },
  { key: "companyCountry", label: "Country" },
  { key: "headquarters", label: "Headquarters" },
  { key: "region", label: "Region" },
  { key: "industry", label: "Industry" },
  { key: "subSector", label: "Sub-Sector" },
  { key: "employeeCount", label: "Employees" },
  { key: "revenueRange", label: "Revenue Range" },
  { key: "companyLinkedin", label: "Company LinkedIn" },
  { key: "companyWebsite", label: "Company Website" },
  { key: "companyDomain", label: "Domain" },
  { key: "newsType", label: "News Type" },
  { key: "newsHeadline", label: "News Headline" },
  { key: "newsDate", label: "News Date" },
  { key: "newsSource", label: "News Source" },
  { key: "personName", label: "Person Name" },
  { key: "personTitle", label: "New Title / Role" },
  { key: "previousRole", label: "Previous Role" },
  { key: "personEmail", label: "Person Email" },
  { key: "personLinkedin", label: "Person LinkedIn" },
  { key: "complianceOpportunity", label: "Compliance Opportunity" },
  { key: "prospectScore", label: "Prospect Score" },
  { key: "regulatoryImplication", label: "Regulatory Implication" },
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
  "James","Sarah","Ravi","Elena","Wei","Olga","Carlos","Priya","Yuki","Ahmed",
  "Sophia","Liam","Ananya","Noah","Fatima","Lucas","Mei","Arjun","Isabella","Omar",
  "Emma","Raj","Aisha","Daniel","Hana","Vikram","Clara","Dmitri","Nadia","Kenji",
  "Mia","Hassan","Ingrid","Pablo","Suki","Tobias","Leila","Akash","Chloe","Yusuf",
];
const lastNames = [
  "Smith","Patel","Wang","Kim","Mueller","Fernandez","Nakamura","Singh","Brown","Chen",
  "Garcia","Ivanov","Ali","Johnson","Sharma","Lee","Martinez","Tanaka","Williams","Das",
  "Anderson","Gupta","Petrov","Lopez","Sato","Kumar","Taylor","Zhao","Nair","Okafor",
  "Eriksson","Hashimoto","Chowdhury","Rossi","Park","Bhat","Schmidt","Santos","Dubois","Rao",
];

const countries = [
  { name: "United States", region: "North America", cities: ["San Francisco, CA","New York, NY","Austin, TX","Seattle, WA","Boston, MA","Miami, FL","Denver, CO","Chicago, IL","Los Angeles, CA","Atlanta, GA"] },
  { name: "United Kingdom", region: "Europe", cities: ["London","Manchester","Edinburgh","Cambridge","Bristol"] },
  { name: "India", region: "Asia Pacific", cities: ["Bangalore","Mumbai","Delhi NCR","Hyderabad","Pune","Chennai"] },
  { name: "Germany", region: "Europe", cities: ["Berlin","Munich","Hamburg","Frankfurt"] },
  { name: "Israel", region: "Middle East", cities: ["Tel Aviv","Jerusalem","Haifa"] },
  { name: "Singapore", region: "Asia Pacific", cities: ["Singapore"] },
  { name: "Canada", region: "North America", cities: ["Toronto","Vancouver","Montreal"] },
  { name: "France", region: "Europe", cities: ["Paris","Lyon","Toulouse"] },
  { name: "Australia", region: "Asia Pacific", cities: ["Sydney","Melbourne","Brisbane"] },
  { name: "Japan", region: "Asia Pacific", cities: ["Tokyo","Osaka"] },
  { name: "UAE", region: "Middle East", cities: ["Dubai","Abu Dhabi"] },
  { name: "Netherlands", region: "Europe", cities: ["Amsterdam","Rotterdam"] },
  { name: "Brazil", region: "Latin America", cities: ["São Paulo","Rio de Janeiro"] },
  { name: "South Korea", region: "Asia Pacific", cities: ["Seoul","Busan"] },
  { name: "Switzerland", region: "Europe", cities: ["Zurich","Geneva"] },
  { name: "Ireland", region: "Europe", cities: ["Dublin"] },
  { name: "Nigeria", region: "Africa", cities: ["Lagos","Abuja"] },
  { name: "Kenya", region: "Africa", cities: ["Nairobi"] },
  { name: "Sweden", region: "Europe", cities: ["Stockholm"] },
  { name: "Estonia", region: "Europe", cities: ["Tallinn"] },
];

const industries = [
  "FinTech","RegTech","InsurTech","Blockchain / Crypto","AI / ML",
  "Cybersecurity","HealthTech","EdTech","LegalTech","PropTech",
  "CleanTech","SaaS","E-Commerce","DeepTech","AgriTech",
];

const subSectors: Record<string, string[]> = {
  "FinTech": ["Payments","Lending","Neo-Banking","Wealth Management","BNPL","Cross-border"],
  "RegTech": ["AML/KYC","Compliance Automation","Risk Management","Regulatory Reporting"],
  "InsurTech": ["Claims Processing","Underwriting AI","Digital Distribution"],
  "Blockchain / Crypto": ["DeFi","NFT Infrastructure","Layer 2","Wallet Solutions","Web3"],
  "AI / ML": ["NLP","Computer Vision","MLOps","Generative AI","AI Agents"],
  "Cybersecurity": ["Zero Trust","Cloud Security","Endpoint Protection","Threat Intelligence"],
  "HealthTech": ["Telemedicine","Drug Discovery","EHR","Mental Health"],
  "EdTech": ["LMS","Skill Assessment","Corporate Training"],
  "LegalTech": ["Contract Management","IP Management","Legal AI"],
  "PropTech": ["Property Management","Real Estate Marketplace","Construction Tech"],
  "CleanTech": ["Solar","EV Infrastructure","Carbon Credits"],
  "SaaS": ["CRM","ERP","HR Tech","DevOps","MarTech"],
  "E-Commerce": ["D2C","Marketplace","Logistics Tech"],
  "DeepTech": ["Quantum Computing","Robotics","Space Tech"],
  "AgriTech": ["Precision Farming","Supply Chain","AgriFinance"],
};

const newsTypes = [
  "New CEO Appointment",
  "New CFO Appointment",
  "New CTO Appointment",
  "New Chief Compliance Officer",
  "Board of Directors Change",
  "Independent Director Appointed",
  "New VP of Compliance",
  "Senior Advisor Appointment",
  "Head of Risk Appointed",
  "CISO Appointment",
  "General Counsel Hired",
  "Board Chair Transition",
  "New Chief Risk Officer",
  "Managing Director Appointed",
  "Executive VP Promotion",
];

const newTitles: Record<string, string[]> = {
  "New CEO Appointment": ["Chief Executive Officer","CEO & Managing Director","CEO & Board Member"],
  "New CFO Appointment": ["Chief Financial Officer","CFO & EVP Finance","VP Finance → CFO"],
  "New CTO Appointment": ["Chief Technology Officer","CTO & Co-Founder","SVP Engineering → CTO"],
  "New Chief Compliance Officer": ["Chief Compliance Officer","Global Head of Compliance","CCO & SVP Risk"],
  "Board of Directors Change": ["Board Member","Non-Executive Director","Board Director"],
  "Independent Director Appointed": ["Independent Director","Independent Non-Executive Director","Audit Committee Chair"],
  "New VP of Compliance": ["VP Compliance","VP Regulatory Affairs","VP Risk & Compliance"],
  "Senior Advisor Appointment": ["Senior Strategic Advisor","Board Advisor","Executive Advisor"],
  "Head of Risk Appointed": ["Head of Risk","Chief Risk Officer","SVP Risk Management"],
  "CISO Appointment": ["Chief Information Security Officer","VP Security & CISO","Head of Cybersecurity"],
  "General Counsel Hired": ["General Counsel","Chief Legal Officer","VP Legal & General Counsel"],
  "Board Chair Transition": ["Chairman of the Board","Board Chair","Executive Chairman"],
  "New Chief Risk Officer": ["Chief Risk Officer","Global Head of Risk","SVP Enterprise Risk"],
  "Managing Director Appointed": ["Managing Director","Regional Managing Director","MD & Country Head"],
  "Executive VP Promotion": ["Executive Vice President","EVP Operations","EVP Strategy & Growth"],
};

const previousRoles = [
  "VP Operations at rival firm","Director of Compliance at Big4","Partner at law firm",
  "CFO at mid-stage startup","CTO at Series B company","Board advisor to PE fund",
  "Head of Risk at global bank","CISO at Fortune 500","General Counsel at public company",
  "Managing Director at investment bank","SVP Strategy at tech giant","Chief of Staff to CEO",
  "VP Product at unicorn","Head of Engineering at FAANG","Consultant at McKinsey",
  "Regional Head at multinational","Chief Data Officer at fintech","VP Sales at SaaS company",
  "Director at regulatory body","Academic researcher / Professor",
];

const newsSources = [
  "Bloomberg","Reuters","TechCrunch","Financial Times","Wall Street Journal",
  "Business Insider","Forbes","The Information","CNBC","PitchBook",
  "Crunchbase News","VentureBeat","Sifted","The Economic Times","Mint",
  "Company Press Release","LinkedIn Announcement","Board Filing (SEC)",
  "Regulatory Filing","Industry Newsletter",
];

const complianceOpportunities = [
  "New leadership open to compliance restructuring",
  "Board seeking external compliance advisory",
  "Post-appointment regulatory audit likely",
  "Compliance function being built from scratch",
  "Mandate to upgrade AML/KYC framework",
  "New exec prioritizing SOC 2 / ISO 27001",
  "Fractional CCO engagement opportunity",
  "Regulatory gap assessment needed",
  "Board-level GRC review initiated",
  "Cross-border compliance setup required",
  "New CISO seeking compliance alignment",
  "General counsel needs regulatory support",
  "Pre-IPO compliance readiness review",
  "Licensing & authorization support needed",
  "vCISO / fractional security advisory fit",
];

const regulatoryImplications = [
  "MiCA compliance deadline approaching",
  "SEC scrutiny on crypto operations",
  "GDPR data governance restructure",
  "SOC 2 Type II audit requirement",
  "FCA authorization process underway",
  "VASP registration pending",
  "PCI-DSS recertification due",
  "ISO 27001 renewal in progress",
  "AML program must be upgraded per FinCEN",
  "DORA digital resilience requirements",
  "Cross-border licensing complexity",
  "New market entry regulatory clearance",
  "Board fiduciary compliance review",
  "Whistleblower policy update required",
  "Consumer protection regulation change",
];

const prospectScores = ["🔥 Hot","⭐ High","📊 Medium","🔄 Warm","📌 Monitor"];

const revenueRanges = ["<$1M","$1-5M","$5-10M","$10-25M","$25-50M","$50-100M","$100-250M","$250M+"];

const INTEL_COUNT = 5000;

export function generateMarketIntel(): MarketIntelProspect[] {
  const rand = seededRandom(98765);
  const result = new Array<MarketIntelProspect>(INTEL_COUNT);

  for (let i = 0; i < INTEL_COUNT; i++) {
    const country = pick(countries, rand);
    const city = pick(country.cities, rand);
    const industry = pick(industries, rand);
    const subs = subSectors[industry] || ["General"];
    const sub = pick(subs, rand);
    const firstName = pick(firstNames, rand);
    const lastName = pick(lastNames, rand);
    const personName = `${firstName} ${lastName}`;
    const newsType = pick(newsTypes, rand);
    const titleOptions = newTitles[newsType] || ["Senior Executive"];
    const personTitle = pick(titleOptions, rand);

    const empBases = [50, 100, 200, 500, 1000, 2000, 5000, 10000];
    const employees = Math.floor(pick(empBases, rand) * (0.7 + rand() * 0.8));
    const revIdx = Math.min(Math.floor(rand() * revenueRanges.length), revenueRanges.length - 1);

    const newsYear = 2024 + Math.floor(rand() * 2);
    const newsMonth = 1 + Math.floor(rand() * 12);
    const newsDay = 1 + Math.floor(rand() * 28);

    const companySlug = `${sub.toLowerCase().replace(/[\s\/]/g, "")}-mi-${i}`;
    const domain = `${companySlug}.com`;
    const companyName = `${sub.split(" ")[0]}${["Corp","Group","Inc","Global","Systems","Partners","Holdings","Tech","Solutions","Capital"][Math.floor(rand() * 10)]} #${INTEL_COUNT - i}`;

    result[i] = {
      id: `mi-${INTEL_COUNT - 1 - i}`,
      companyName,
      companyCountry: country.name,
      headquarters: `${city}, ${country.name}`,
      region: country.region,
      industry,
      subSector: sub,
      employeeCount: employees,
      revenueRange: revenueRanges[revIdx],
      companyLinkedin: `https://linkedin.com/company/${companySlug}`,
      companyWebsite: `https://${domain}`,
      companyDomain: domain,
      newsType,
      newsHeadline: `${companyName.split(" #")[0]} appoints ${personName} as ${personTitle}`,
      newsDate: `${newsYear}-${String(newsMonth).padStart(2,"0")}-${String(newsDay).padStart(2,"0")}`,
      newsSource: pick(newsSources, rand),
      personName,
      personTitle,
      previousRole: pick(previousRoles, rand),
      personEmail: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      personLinkedin: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i}`,
      complianceOpportunity: pick(complianceOpportunities, rand),
      prospectScore: pick(prospectScores, rand),
      regulatoryImplication: pick(regulatoryImplications, rand),
      description: `${newsType}: ${personName} joins ${companyName.split(" #")[0]} (${industry} / ${sub}) in ${city}, ${country.name} as ${personTitle}. Previously: ${pick(previousRoles, rand)}.`,
    };
  }

  return result;
}
