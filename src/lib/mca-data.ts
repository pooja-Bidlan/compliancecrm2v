export interface MCACompany {
  id: string;
  cin: string;
  companyName: string;
  companyType: string;
  companyCategory: string;
  companySubCategory: string;
  rocCode: string;
  registrationDate: string;
  authorizedCapital: string;
  paidUpCapital: string;
  listingStatus: string;
  stockExchange: string;
  foreignDirectorName: string;
  foreignDirectorDIN: string;
  foreignDirectorNationality: string;
  foreignDirectorEmail: string;
  foreignDirectorLinkedin: string;
  indianDirectorName: string;
  indianDirectorDIN: string;
  indianDirectorEmail: string;
  companyEmail: string;
  companyWebsite: string;
  companyLinkedin: string;
  registeredAddress: string;
  state: string;
  industry: string;
  description: string;
}

function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
}
function pick<T>(arr: T[], rand: () => number): T { return arr[Math.floor(rand() * arr.length)]; }
function slugify(n: string) { return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

const companyTypes = ["Public Limited", "Private Limited", "Foreign Company", "LLP with Foreign Partner", "Section 8 Company", "One Person Company (Foreign)"];
const companyCategories = ["Company limited by Shares", "Company limited by Guarantee", "Unlimited Company"];
const subCategories = ["Non-govt company", "Subsidiary of Foreign Company", "Joint Venture", "State Govt company", "Guarantee & Association"];
const rocCodes = ["ROC-Delhi", "ROC-Mumbai", "ROC-Bangalore", "ROC-Chennai", "ROC-Kolkata", "ROC-Hyderabad", "ROC-Ahmedabad", "ROC-Pune", "ROC-Gurgaon", "ROC-Kanpur"];
const listingStatuses = ["Listed", "Listed (SME)", "Unlisted (Public)", "Unlisted"];
const stockExchanges = ["BSE", "NSE", "BSE & NSE", "BSE SME", "NSE Emerge", "Not Listed"];
const nationalities = ["American", "British", "German", "Japanese", "Singaporean", "Chinese", "Dutch", "French", "Australian", "Canadian", "Swiss", "South Korean", "UAE", "Swedish", "Israeli"];
const industries = [
  "Information Technology", "Pharmaceuticals", "Banking & Finance", "Automobile", "FMCG",
  "Chemicals", "Textiles", "Infrastructure", "Telecom", "Energy & Power",
  "Real Estate", "Media & Entertainment", "Healthcare", "E-commerce", "Manufacturing",
  "Metals & Mining", "Aviation", "Logistics", "AgriTech", "Insurance",
];
const states = [
  "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Telangana",
  "Gujarat", "West Bengal", "Rajasthan", "Uttar Pradesh", "Haryana",
  "Kerala", "Madhya Pradesh", "Punjab", "Andhra Pradesh", "Odisha",
];
const cities: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane"],
  Delhi: ["New Delhi", "Dwarka", "Saket"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  Telangana: ["Hyderabad", "Secunderabad", "Warangal"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  "Uttar Pradesh": ["Noida", "Lucknow", "Kanpur"],
  Haryana: ["Gurugram", "Faridabad", "Ambala"],
  Kerala: ["Kochi", "Thiruvananthapuram"],
  "Madhya Pradesh": ["Bhopal", "Indore"],
  Punjab: ["Chandigarh", "Ludhiana"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada"],
  Odisha: ["Bhubaneswar", "Cuttack"],
};

const foreignFirstNames = ["James", "William", "Robert", "Thomas", "Richard", "Charles", "Edward", "George", "Henry", "David", "Sarah", "Emma", "Sophie", "Hans", "Klaus", "Yuki", "Takeshi", "Wei", "Min-Jun", "Pierre", "Lars", "Erik", "Giovanni", "Carlos", "Ahmed"];
const foreignLastNames = ["Smith", "Johnson", "Williams", "Brown", "Wilson", "Taylor", "Anderson", "Mueller", "Schmidt", "Fischer", "Tanaka", "Nakamura", "Chen", "Wang", "Kim", "Park", "Dubois", "Martin", "Johansson", "Rossi", "Santos", "Hassan", "O'Brien", "Kelly", "Van Der Berg"];
const indianFirstNames = ["Rajesh", "Sunil", "Priya", "Anita", "Vikram", "Amit", "Neha", "Sanjay", "Kavita", "Arun", "Deepak", "Meena", "Rahul", "Pooja", "Manish", "Sunita", "Rakesh", "Nisha", "Ashok", "Geeta"];
const indianLastNames = ["Sharma", "Patel", "Kumar", "Singh", "Agarwal", "Gupta", "Mehta", "Jain", "Reddy", "Nair", "Iyer", "Rao", "Banerjee", "Chatterjee", "Mishra", "Tiwari", "Verma", "Saxena", "Kapoor", "Malhotra"];

const companyPrefixes = [
  "Indo-Global", "Asia Pacific", "Trans-National", "Euro-Indian", "Pacific Rim", "Continental", "Meridian", "Zenith", "Pinnacle", "Vertex",
  "Quantum", "Nexus", "Vanguard", "Sterling", "Crown", "Imperial", "Sovereign", "Paramount", "Atlas", "Olympus",
  "Sapphire", "Emerald", "Ruby", "Diamond", "Platinum", "Golden", "Silver", "Crystal", "Pearl", "Coral",
  "Phoenix", "Dragon", "Eagle", "Falcon", "Tiger", "Lion", "Orion", "Neptune", "Apollo", "Mercury",
];
const companySuffixes = [
  "Industries", "Enterprises", "Corporation", "Holdings", "International", "Global", "Solutions", "Technologies",
  "Ventures", "Capital", "Infra", "Pharma", "Chemicals", "Systems", "Services", "Group", "Ltd", "Associates",
];

export function generateMCACompanies(): MCACompany[] {
  const count = 40000;
  const rand = seededRandom(54321);
  const results: MCACompany[] = [];

  for (let i = 0; i < count; i++) {
    const state = states[i % states.length];
    const city = pick(cities[state] || ["Mumbai"], rand);
    const prefix = companyPrefixes[i % companyPrefixes.length];
    const suffix = pick(companySuffixes, rand);
    const companyName = i < companyPrefixes.length ? `${prefix} ${suffix}` : `${prefix} ${indianLastNames[i % indianLastNames.length]} ${suffix}`;
    const domain = slugify(companyName).slice(0, 20) + ".com";
    const fFirst = pick(foreignFirstNames, rand);
    const fLast = pick(foreignLastNames, rand);
    const iFirst = pick(indianFirstNames, rand);
    const iLast = pick(indianLastNames, rand);
    const nationality = pick(nationalities, rand);
    const yr = 1990 + Math.floor(rand() * 35);
    const mo = Math.floor(rand() * 12) + 1;
    const dy = Math.floor(rand() * 28) + 1;
    const authCap = Math.floor(rand() * 500 + 1) * 10;
    const paidCap = Math.floor(authCap * (0.3 + rand() * 0.7));

    results.push({
      id: `mca-${i}`,
      cin: `U${String(Math.floor(rand() * 99999)).padStart(5, "0")}${state.slice(0, 2).toUpperCase()}${yr}PLC${String(i).padStart(6, "0")}`,
      companyName,
      companyType: pick(companyTypes, rand),
      companyCategory: pick(companyCategories, rand),
      companySubCategory: pick(subCategories, rand),
      rocCode: pick(rocCodes, rand),
      registrationDate: `${yr}-${String(mo).padStart(2, "0")}-${String(dy).padStart(2, "0")}`,
      authorizedCapital: `₹${authCap}L`,
      paidUpCapital: `₹${paidCap}L`,
      listingStatus: pick(listingStatuses, rand),
      stockExchange: pick(stockExchanges, rand),
      foreignDirectorName: `${fFirst} ${fLast}`,
      foreignDirectorDIN: `${String(10000000 + i).slice(0, 8)}`,
      foreignDirectorNationality: nationality,
      foreignDirectorEmail: `${fFirst.toLowerCase()}.${fLast.toLowerCase()}@${domain}`,
      foreignDirectorLinkedin: `https://linkedin.com/in/${slugify(fFirst + "-" + fLast)}-${i}`,
      indianDirectorName: `${iFirst} ${iLast}`,
      indianDirectorDIN: `${String(20000000 + i).slice(0, 8)}`,
      indianDirectorEmail: `${iFirst.toLowerCase()}.${iLast.toLowerCase()}@${domain}`,
      companyEmail: `info@${domain}`,
      companyWebsite: `https://${domain}`,
      companyLinkedin: `https://linkedin.com/company/${slugify(companyName).slice(0, 25)}`,
      registeredAddress: `${Math.floor(rand() * 999) + 1}, ${pick(["MG Road", "Park Street", "Connaught Place", "Brigade Road", "Anna Salai", "Banjara Hills", "SG Highway", "FC Road", "Cyber City", "Sector 18"], rand)}, ${city}`,
      state,
      industry: pick(industries, rand),
      description: `${companyName} — ${pick(companyTypes, rand)} registered at ${pick(rocCodes, rand)}. Foreign Director: ${fFirst} ${fLast} (${nationality}).`,
    });
  }
  return results;
}

export const MCA_COLUMNS: { key: keyof MCACompany; label: string }[] = [
  { key: "cin", label: "CIN" },
  { key: "companyName", label: "Company Name" },
  { key: "companyType", label: "Company Type" },
  { key: "companyCategory", label: "Category" },
  { key: "companySubCategory", label: "Sub-Category" },
  { key: "rocCode", label: "ROC Code" },
  { key: "registrationDate", label: "Registration Date" },
  { key: "authorizedCapital", label: "Authorized Capital" },
  { key: "paidUpCapital", label: "Paid-Up Capital" },
  { key: "listingStatus", label: "Listing Status" },
  { key: "stockExchange", label: "Stock Exchange" },
  { key: "foreignDirectorName", label: "Foreign Director" },
  { key: "foreignDirectorDIN", label: "Foreign Dir. DIN" },
  { key: "foreignDirectorNationality", label: "Nationality" },
  { key: "foreignDirectorEmail", label: "Foreign Dir. Email" },
  { key: "foreignDirectorLinkedin", label: "Foreign Dir. LinkedIn" },
  { key: "indianDirectorName", label: "Indian Director" },
  { key: "indianDirectorDIN", label: "Indian Dir. DIN" },
  { key: "indianDirectorEmail", label: "Indian Dir. Email" },
  { key: "companyEmail", label: "Company Email" },
  { key: "companyWebsite", label: "Website" },
  { key: "companyLinkedin", label: "Company LinkedIn" },
  { key: "registeredAddress", label: "Registered Address" },
  { key: "state", label: "State" },
  { key: "industry", label: "Industry" },
  { key: "description", label: "Description" },
];
