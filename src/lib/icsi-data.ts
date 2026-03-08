export interface ICSIPractitioner {
  id: string;
  membershipNo: string;
  csName: string;
  firmName: string;
  copNo: string;
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
  chapter: string;
  clientele: string;
  annualTurnover: string;
  techAdoption: string;
  complianceToolUsed: string;
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

const firstNames = ["Aarav", "Vivek", "Sneha", "Priya", "Rahul", "Anita", "Sanjay", "Kavita", "Deepak", "Meena", "Amit", "Neha", "Suresh", "Pooja", "Rajesh", "Sunita", "Manish", "Rekha", "Ashok", "Nisha", "Vikas", "Swati", "Rohit", "Anjali", "Hemant", "Divya", "Gaurav", "Ritu", "Nitin", "Shruti"];
const lastNames = ["Agarwal", "Gupta", "Sharma", "Jain", "Bansal", "Singhal", "Mittal", "Goel", "Khandelwal", "Maheshwari", "Rastogi", "Srivastava", "Kapoor", "Malhotra", "Bhatia", "Chopra", "Arora", "Sethi", "Khanna", "Mehra", "Tandon", "Bajaj", "Dhawan", "Luthra", "Trehan"];

const practiceAreas = [
  "Corporate Governance", "Secretarial Audit", "Company Incorporation", "Board Meetings & Compliance",
  "FEMA Compliance", "Annual Filing & ROC", "SEBI Compliance", "Mergers & Acquisitions",
  "Insolvency & Bankruptcy", "Due Diligence", "Corporate Restructuring", "IPO & Listing Compliance",
];
const specializations = [
  "Listed Company Compliance", "SME & Startup Advisory", "Cross-border Transactions", "NBFC Compliance",
  "Trust & Foundation", "LLP Advisory", "Foreign Company Registration", "RBI Compliance",
  "Trademark & IP Filing", "NCLT Practice", "Whistle-blower Mechanism", "ESG & CSR Compliance",
];
const chapters = [
  "NIRC (Delhi)", "WIRC (Mumbai)", "SIRC (Chennai)", "EIRC (Kolkata)", "NIRC (Chandigarh)",
  "WIRC (Pune)", "SIRC (Hyderabad)", "SIRC (Bangalore)", "NIRC (Jaipur)", "WIRC (Ahmedabad)",
  "EIRC (Bhubaneswar)", "NIRC (Lucknow)", "SIRC (Kochi)", "WIRC (Indore)", "NIRC (Noida)",
];
const clienteles = [
  "Listed Companies", "Unlisted Public Companies", "Private Limited Companies", "LLPs", "Startups",
  "NBFCs", "Government Undertakings", "Foreign Companies", "Section 8 Companies", "Multinationals",
];
const turnoverRanges = ["₹5L-₹15L", "₹15L-₹30L", "₹30L-₹60L", "₹60L-₹1Cr", "₹1Cr-₹3Cr", "₹3Cr-₹5Cr", "₹5Cr+"];
const techAdoptions = ["Basic (Email/Excel)", "Moderate (Cloud Tools)", "Advanced (SaaS Suite)", "Digital-First", "Legacy Systems"];
const complianceTools = ["Winman CS", "MCA21 Portal", "Tally + Manual", "LegalDesk", "DigiCSR", "BoardMaps", "ComplianceDesk Pro", "Manual / Paper-based", "Custom ERP", "Zoho Compliance"];
const legalTechNeeds = ["Board Meeting Automation", "E-Voting Platform", "Compliance Calendar SaaS", "Digital Signature Integration", "Annual Return Automation", "ROC Filing Automation", "Secretarial Audit Dashboard", "XBRL Filing Tool", "Shareholder Communication Platform", "Due Diligence Automation"];
const services = [
  "Secretarial Audit, ROC Filing, Board Advisory",
  "Company Incorporation, Compliance Calendar, AGM Support",
  "SEBI Compliance, Listing Advisory, Insider Trading Code",
  "M&A Support, Due Diligence, Scheme of Arrangement",
  "FEMA Advisory, FDI Compliance, ECB Filing",
  "Insolvency Resolution, NCLT Filing, Liquidation",
  "Corporate Restructuring, Demerger, Amalgamation",
  "Startup Advisory, ESOP Compliance, Seed Funding Support",
];

const stateCities: { state: string; cities: string[] }[] = [
  { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"] },
  { state: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini", "Saket"] },
  { state: "Karnataka", cities: ["Bangalore", "Mysore", "Hubli"] },
  { state: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai"] },
  { state: "Telangana", cities: ["Hyderabad", "Secunderabad"] },
  { state: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
  { state: "West Bengal", cities: ["Kolkata", "Howrah", "Siliguri"] },
  { state: "Rajasthan", cities: ["Jaipur", "Udaipur", "Jodhpur", "Kota"] },
  { state: "Uttar Pradesh", cities: ["Noida", "Lucknow", "Kanpur", "Agra"] },
  { state: "Punjab", cities: ["Chandigarh", "Ludhiana", "Amritsar"] },
  { state: "Kerala", cities: ["Kochi", "Thiruvananthapuram", "Kozhikode"] },
  { state: "Madhya Pradesh", cities: ["Bhopal", "Indore", "Gwalior"] },
  { state: "Haryana", cities: ["Gurugram", "Faridabad", "Karnal"] },
  { state: "Andhra Pradesh", cities: ["Visakhapatnam", "Vijayawada", "Tirupati"] },
  { state: "Odisha", cities: ["Bhubaneswar", "Cuttack"] },
];

export function generateICSIPractitioners(): ICSIPractitioner[] {
  const count = 20000;
  const rand = seededRandom(77777);
  const results: ICSIPractitioner[] = [];

  for (let i = 0; i < count; i++) {
    const first = pick(firstNames, rand);
    const last = pick(lastNames, rand);
    const fullName = `CS ${first} ${last}`;
    const firmSuffix = pick(["& Associates", "& Co.", "CS Firm", "Compliance LLP", "Corporate Services"], rand);
    const firmName = `${last} ${firmSuffix}`;
    const sc = stateCities[i % stateCities.length];
    const city = pick(sc.cities, rand);
    const domain = slugify(firmName).slice(0, 18) + ".in";
    const yrs = Math.floor(rand() * 30) + 1;

    results.push({
      id: `icsi-${i}`,
      membershipNo: `ACS${String(10000 + i).padStart(5, "0")}`,
      csName: fullName,
      firmName,
      copNo: `${String(5000 + i)}`,
      practiceArea: pick(practiceAreas, rand),
      specialization: pick(specializations, rand),
      yearsInPractice: yrs,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`,
      altEmail: `${slugify(firmName).slice(0, 12)}@gmail.com`,
      phone: `+91 ${Math.floor(rand() * 9000000000 + 1000000000)}`,
      firmWebsite: `https://${domain}`,
      linkedin: `https://linkedin.com/in/${slugify(first + "-" + last)}-cs-${i}`,
      firmLinkedin: `https://linkedin.com/company/${slugify(firmName).slice(0, 20)}`,
      address: `${Math.floor(rand() * 500) + 1}, ${pick(["Nehru Place", "Connaught Place", "Nariman Point", "MG Road", "Anna Salai", "Park Street", "SG Highway", "FC Road", "Banjara Hills", "Sector 44"], rand)}, ${city}`,
      city,
      state: sc.state,
      pincode: `${Math.floor(rand() * 600000 + 100000)}`,
      chapter: pick(chapters, rand),
      clientele: pick(clienteles, rand),
      annualTurnover: pick(turnoverRanges, rand),
      techAdoption: pick(techAdoptions, rand),
      complianceToolUsed: pick(complianceTools, rand),
      legalTechNeed: pick(legalTechNeeds, rand),
      servicesOffered: pick(services, rand),
      description: `${fullName}, practicing from ${city}. Specializes in ${pick(specializations, rand)}. ${yrs} years of experience.`,
    });
  }
  return results;
}

export const ICSI_COLUMNS: { key: keyof ICSIPractitioner; label: string }[] = [
  { key: "membershipNo", label: "Membership No." },
  { key: "csName", label: "CS Name" },
  { key: "firmName", label: "Firm Name" },
  { key: "copNo", label: "COP No." },
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
  { key: "chapter", label: "ICSI Chapter" },
  { key: "clientele", label: "Clientele" },
  { key: "annualTurnover", label: "Annual Turnover" },
  { key: "techAdoption", label: "Tech Adoption" },
  { key: "complianceToolUsed", label: "Compliance Tool" },
  { key: "legalTechNeed", label: "LegalTech Need" },
  { key: "servicesOffered", label: "Services Offered" },
  { key: "description", label: "Description" },
];
