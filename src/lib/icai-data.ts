export interface ICAIPractitioner {
  id: string;
  membershipNo: string;
  caName: string;
  firmName: string;
  frnNo: string;
  practiceArea: string;
  specialization: string;
  yearsInPractice: number;
  email: string;
  altEmail: string;
  phone: string;
  firmWebsite: string;
  linkedin: string;
  firmLinkedin: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  region: string;
  clientele: string;
  annualTurnover: string;
  techAdoption: string;
  auditToolUsed: string;
  legalTechNeed: string;
  servicesOffered: string;
  description: string;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}
function pick<T>(arr: T[], rand: () => number): T { return arr[Math.floor(rand() * arr.length)]; }
function slugify(n: string) { return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

const firstNames = ["Rajiv", "Suman", "Vinod", "Kalpana", "Manoj", "Anuradha", "Pankaj", "Seema", "Anil", "Ruchi", "Sudhir", "Shweta", "Prakash", "Vandana", "Harish", "Usha", "Ramesh", "Archana", "Sunil", "Mamta", "Yogesh", "Pallavi", "Mukesh", "Smita", "Dinesh", "Jyoti", "Sushil", "Nidhi", "Lalit", "Preeti"];
const lastNames = ["Agarwal", "Gupta", "Jain", "Bansal", "Singhal", "Mittal", "Goel", "Khandelwal", "Maheshwari", "Rastogi", "Goyal", "Sarawgi", "Kabra", "Soni", "Poddar", "Jhunjhunwala", "Rathi", "Surana", "Daga", "Somani", "Lohia", "Bubna", "Tibrewal", "Kejriwal", "Bagaria"];

const practiceAreas = [
  "Statutory Audit", "Tax Advisory", "Internal Audit", "GST Compliance",
  "Transfer Pricing", "International Taxation", "Forensic Audit", "Management Consulting",
  "IFRS / Ind AS Advisory", "Company Valuation", "Insolvency Professional", "Risk Advisory",
];
const specializations = [
  "Bank Audit & NBFC", "IT & Tech Companies", "Manufacturing Sector", "Real Estate & Construction",
  "Healthcare & Pharma", "Education Sector", "Non-Profit & NGO", "Government Audit",
  "Crypto & Digital Assets Tax", "Startup Ecosystem", "Cross-border Tax", "Wealth Management Advisory",
];
const regions = ["Northern Region", "Western Region", "Southern Region", "Eastern Region", "Central Region"];
const clienteles = [
  "Listed Companies", "SMEs", "Startups", "HNIs & Family Offices", "NBFCs & Banks",
  "Government Bodies", "MNCs (India Ops)", "Trusts & Societies", "Cooperative Societies", "PSUs",
];
const turnoverRanges = ["₹10L-₹25L", "₹25L-₹50L", "₹50L-₹1Cr", "₹1Cr-₹3Cr", "₹3Cr-₹7Cr", "₹7Cr-₹15Cr", "₹15Cr+"];
const techAdoptions = ["Basic (Tally/Excel)", "Moderate (Cloud Tools)", "Advanced (SaaS Suite)", "Digital-First", "Legacy Systems"];
const auditTools = ["Tally Prime", "SAP", "QuickBooks", "Zoho Books", "CaseWare", "AuditBoard", "TeamMate+", "IDEA Analytics", "ACL Analytics", "Manual + Excel", "Busy Accounting", "Marg ERP"];
const legalTechNeeds = ["Audit Workflow Automation", "Tax Filing SaaS", "GST Reconciliation Tool", "Document Management System", "Client Portal & Collaboration", "AI-Powered Tax Advisory", "Automated Bank Reconciliation", "E-Invoicing Integration", "TDS Return Automation", "Financial Reporting Dashboard"];
const services = [
  "Statutory Audit, Tax Filing, GST Returns",
  "Internal Audit, Risk Assessment, SOX Compliance",
  "Transfer Pricing, International Tax, DTAA Advisory",
  "Company Valuation, Due Diligence, M&A Support",
  "Forensic Audit, Fraud Investigation, Litigation Support",
  "Startup Advisory, Fund Raise Support, ESOP Valuation",
  "IFRS Conversion, Ind AS Implementation, GAAP Advisory",
  "Insolvency Resolution, NCLT Support, Liquidation",
];

const stateCities: { state: string; cities: string[] }[] = [
  { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"] },
  { state: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini", "Pitampura"] },
  { state: "Karnataka", cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"] },
  { state: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Salem"] },
  { state: "Telangana", cities: ["Hyderabad", "Secunderabad", "Warangal"] },
  { state: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
  { state: "West Bengal", cities: ["Kolkata", "Howrah", "Siliguri", "Durgapur"] },
  { state: "Rajasthan", cities: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Bikaner"] },
  { state: "Uttar Pradesh", cities: ["Noida", "Lucknow", "Kanpur", "Agra", "Varanasi"] },
  { state: "Punjab", cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"] },
  { state: "Kerala", cities: ["Kochi", "Thiruvananthapuram", "Kozhikode"] },
  { state: "Madhya Pradesh", cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"] },
  { state: "Haryana", cities: ["Gurugram", "Faridabad", "Karnal", "Panipat"] },
  { state: "Bihar", cities: ["Patna", "Gaya", "Muzaffarpur"] },
  { state: "Chhattisgarh", cities: ["Raipur", "Bhilai", "Bilaspur"] },
];

export function generateICAIPractitioners(): ICAIPractitioner[] {
  const count = 20000;
  const rand = seededRandom(88888);
  const results: ICAIPractitioner[] = [];

  for (let i = 0; i < count; i++) {
    const first = pick(firstNames, rand);
    const last = pick(lastNames, rand);
    const fullName = `CA ${first} ${last}`;
    const firmSuffix = pick(["& Associates", "& Co.", "& Company", "Chartered Accountants", "CA Firm"], rand);
    const firmName = `${last} ${firmSuffix}`;
    const sc = stateCities[i % stateCities.length];
    const city = pick(sc.cities, rand);
    const domain = slugify(firmName).slice(0, 18) + ".in";
    const yrs = Math.floor(rand() * 35) + 1;
    const regionIdx = i % regions.length;

    results.push({
      id: `icai-${i}`,
      membershipNo: `${String(100000 + i)}`,
      caName: fullName,
      firmName,
      frnNo: `${String(Math.floor(rand() * 900000 + 100000))}${pick(["N", "W", "S", "E", "C"], rand)}`,
      practiceArea: pick(practiceAreas, rand),
      specialization: pick(specializations, rand),
      yearsInPractice: yrs,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`,
      altEmail: `ca.${slugify(first + last).slice(0, 12)}@gmail.com`,
      phone: `+91 ${Math.floor(rand() * 9000000000 + 1000000000)}`,
      firmWebsite: `https://${domain}`,
      linkedin: `https://linkedin.com/in/${slugify(first + "-" + last)}-ca-${i}`,
      firmLinkedin: `https://linkedin.com/company/${slugify(firmName).slice(0, 20)}`,
      address: `${Math.floor(rand() * 500) + 1}, ${pick(["Nehru Place", "Karol Bagh", "Nariman Point", "MG Road", "T Nagar", "Salt Lake", "CG Road", "JC Road", "Banjara Hills", "Civil Lines"], rand)}, ${city}`,
      city,
      state: sc.state,
      pincode: `${Math.floor(rand() * 600000 + 100000)}`,
      region: regions[regionIdx],
      clientele: pick(clienteles, rand),
      annualTurnover: pick(turnoverRanges, rand),
      techAdoption: pick(techAdoptions, rand),
      auditToolUsed: pick(auditTools, rand),
      legalTechNeed: pick(legalTechNeeds, rand),
      servicesOffered: pick(services, rand),
      description: `${fullName}, ${firmName} — ${city}. ${pick(practiceAreas, rand)} specialist with ${yrs} years experience.`,
    });
  }
  return results;
}

export const ICAI_COLUMNS: { key: keyof ICAIPractitioner; label: string }[] = [
  { key: "membershipNo", label: "Membership No." },
  { key: "caName", label: "CA Name" },
  { key: "firmName", label: "Firm Name" },
  { key: "frnNo", label: "FRN No." },
  { key: "practiceArea", label: "Practice Area" },
  { key: "specialization", label: "Specialization" },
  { key: "yearsInPractice", label: "Years in Practice" },
  { key: "email", label: "Email" },
  { key: "altEmail", label: "Alt. Email" },
  { key: "phone", label: "Phone" },
  { key: "firmWebsite", label: "Website" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "firmLinkedin", label: "Firm LinkedIn" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "pincode", label: "Pincode" },
  { key: "region", label: "ICAI Region" },
  { key: "clientele", label: "Clientele" },
  { key: "annualTurnover", label: "Annual Turnover" },
  { key: "techAdoption", label: "Tech Adoption" },
  { key: "auditToolUsed", label: "Audit Tool" },
  { key: "legalTechNeed", label: "LegalTech Need" },
  { key: "servicesOffered", label: "Services Offered" },
  { key: "description", label: "Description" },
];
