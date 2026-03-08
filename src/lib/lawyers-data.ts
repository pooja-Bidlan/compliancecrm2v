export interface LawyerProspect {
  id: string;
  lawyerName: string;
  firmName: string;
  designation: string;
  barCouncilId: string;
  practiceArea: string;
  specialization: string;
  experienceYears: number;
  city: string;
  state: string;
  region: string;
  firmSize: string;
  firmType: string;
  email: string;
  phone: string;
  website: string;
  linkedinProfile: string;
  courtPractice: string;
  notableClients: string;
  techAdoption: string;
  legalTechNeed: string;
  caseloadEstimate: string;
  annualRevenue: string;
  languagesSpoken: string;
  yearEstablished: number;
  description: string;
}

export const LAWYER_COLUMNS: { key: keyof LawyerProspect; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "lawyerName", label: "Lawyer / Advocate Name" },
  { key: "firmName", label: "Firm Name" },
  { key: "designation", label: "Designation" },
  { key: "barCouncilId", label: "Bar Council ID" },
  { key: "practiceArea", label: "Practice Area" },
  { key: "specialization", label: "Specialization" },
  { key: "experienceYears", label: "Experience (Yrs)" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "region", label: "Region" },
  { key: "firmSize", label: "Firm Size" },
  { key: "firmType", label: "Firm Type" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "website", label: "Website" },
  { key: "linkedinProfile", label: "LinkedIn" },
  { key: "courtPractice", label: "Court Practice" },
  { key: "notableClients", label: "Notable Clients" },
  { key: "techAdoption", label: "Tech Adoption Level" },
  { key: "legalTechNeed", label: "LegalTech Need" },
  { key: "caseloadEstimate", label: "Caseload Estimate" },
  { key: "annualRevenue", label: "Annual Revenue" },
  { key: "languagesSpoken", label: "Languages" },
  { key: "yearEstablished", label: "Year Established" },
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
  "Rajesh","Priya","Arun","Sneha","Vikram","Anita","Suresh","Kavita","Amit","Deepa",
  "Manoj","Pooja","Sanjay","Ritu","Ashok","Meena","Ramesh","Nisha","Vinod","Swati",
  "Harish","Sunita","Pramod","Rekha","Dinesh","Jyoti","Mukesh","Shalini","Gopal","Aarti",
  "Nitin","Sapna","Rakesh","Geeta","Pankaj","Lata","Sunil","Rina","Ajay","Manju",
  "Rohit","Seema","Naveen","Kiran","Sushil","Vandana","Yogesh","Neha","Tarun","Bharti",
  "Abhishek","Pallavi","Gaurav","Shruti","Manish","Divya","Vivek","Ankita","Sachin","Ritika",
];

const lastNames = [
  "Sharma","Verma","Gupta","Agarwal","Singh","Jain","Mishra","Pandey","Tiwari","Dubey",
  "Yadav","Kumar","Srivastava","Chauhan","Patel","Reddy","Nair","Menon","Iyer","Rao",
  "Pillai","Bhat","Kulkarni","Deshmukh","Patil","Joshi","Saxena","Bansal","Kapoor","Mehta",
  "Sethi","Arora","Khanna","Malhotra","Bhandari","Garg","Goyal","Rastogi","Mathur","Bhatt",
  "Chandra","Thakur","Das","Sen","Mukherjee","Chatterjee","Bose","Dutta","Ghosh","Banerjee",
];

const firmPrefixes = [
  "Associates","& Partners","Legal","Law Chambers","Advocates","Law Firm","Legal Services",
  "& Co.","Law Associates","Legal Advisors","Chambers","& Associates LLP","Legal LLP",
];

const designations = [
  "Senior Advocate","Advocate","Partner","Managing Partner","Associate","Senior Partner",
  "Founding Partner","Counsel","Of Counsel","Junior Advocate","Principal Associate",
  "Legal Consultant","Advocate on Record","Senior Counsel",
];

const practiceAreas = [
  "Corporate & Commercial","Litigation & Dispute Resolution","Criminal Law",
  "Intellectual Property","Tax & Revenue","Real Estate & Property",
  "Family & Matrimonial","Labor & Employment","Banking & Finance",
  "Arbitration & Mediation","Constitutional Law","Environmental Law",
  "Cyber Law & IT","Mergers & Acquisitions","Insolvency & Bankruptcy",
];

const specializations: Record<string, string[]> = {
  "Corporate & Commercial": ["Company Formation","Contract Drafting","Joint Ventures","Foreign Investment","Corporate Governance","Compliance Advisory"],
  "Litigation & Dispute Resolution": ["Civil Litigation","Commercial Disputes","Consumer Disputes","Writ Petitions","Appellate Practice","Injunctions"],
  "Criminal Law": ["White Collar Crime","Economic Offenses","Bail Matters","Trial Advocacy","Criminal Appeals","Cyber Crime"],
  "Intellectual Property": ["Patent Filing","Trademark Registration","Copyright","Trade Secrets","IP Litigation","Design Patents"],
  "Tax & Revenue": ["Direct Tax","GST","Transfer Pricing","Tax Litigation","International Taxation","Tax Planning"],
  "Real Estate & Property": ["Title Verification","Property Registration","RERA Compliance","Lease Agreements","Land Acquisition","Builder Disputes"],
  "Family & Matrimonial": ["Divorce","Custody Matters","Domestic Violence","Maintenance","Hindu Law","Muslim Law"],
  "Labor & Employment": ["Industrial Disputes","Employment Contracts","PF/ESI Compliance","Termination","Sexual Harassment","Trade Unions"],
  "Banking & Finance": ["Loan Documentation","NPA Recovery","SARFAESI","RBI Compliance","NBFC Advisory","Debt Restructuring"],
  "Arbitration & Mediation": ["Domestic Arbitration","International Arbitration","Ad-hoc Arbitration","Institutional Arbitration","Conciliation","Mediation"],
  "Constitutional Law": ["Fundamental Rights","PIL","Writ Jurisdiction","Administrative Law","Election Law","RTI"],
  "Environmental Law": ["Green Tribunal","Pollution Control","Environmental Clearance","Forest Conservation","Waste Management","Climate Law"],
  "Cyber Law & IT": ["Data Protection","Cyber Fraud","E-commerce Law","IT Act Compliance","Digital Privacy","Online Defamation"],
  "Mergers & Acquisitions": ["Due Diligence","Deal Structuring","Regulatory Approvals","CCI Compliance","Cross-border M&A","Post-merger Integration"],
  "Insolvency & Bankruptcy": ["IBC Proceedings","CIRP","Liquidation","NCLT Practice","Creditor Rights","Resolution Plans"],
};

const courtPractices = [
  "Supreme Court of India","High Court","District Court","NCLT","NCLAT",
  "Consumer Forum","Labor Court","Tax Tribunal (ITAT)","Green Tribunal (NGT)",
  "Debt Recovery Tribunal","RERA Tribunal","Arbitration Tribunal","Sessions Court",
  "Family Court","CCI","SAT (Securities Appellate Tribunal)",
];

// Pan-India cities (excluding Delhi NCR)
const panIndiaCities = [
  { city: "Mumbai", state: "Maharashtra", region: "West" },
  { city: "Pune", state: "Maharashtra", region: "West" },
  { city: "Nagpur", state: "Maharashtra", region: "West" },
  { city: "Bangalore", state: "Karnataka", region: "South" },
  { city: "Chennai", state: "Tamil Nadu", region: "South" },
  { city: "Hyderabad", state: "Telangana", region: "South" },
  { city: "Kolkata", state: "West Bengal", region: "East" },
  { city: "Ahmedabad", state: "Gujarat", region: "West" },
  { city: "Jaipur", state: "Rajasthan", region: "North" },
  { city: "Lucknow", state: "Uttar Pradesh", region: "North" },
  { city: "Chandigarh", state: "Punjab/Haryana", region: "North" },
  { city: "Bhopal", state: "Madhya Pradesh", region: "Central" },
  { city: "Indore", state: "Madhya Pradesh", region: "Central" },
  { city: "Kochi", state: "Kerala", region: "South" },
  { city: "Thiruvananthapuram", state: "Kerala", region: "South" },
  { city: "Coimbatore", state: "Tamil Nadu", region: "South" },
  { city: "Vadodara", state: "Gujarat", region: "West" },
  { city: "Surat", state: "Gujarat", region: "West" },
  { city: "Patna", state: "Bihar", region: "East" },
  { city: "Ranchi", state: "Jharkhand", region: "East" },
  { city: "Bhubaneswar", state: "Odisha", region: "East" },
  { city: "Guwahati", state: "Assam", region: "Northeast" },
  { city: "Dehradun", state: "Uttarakhand", region: "North" },
  { city: "Visakhapatnam", state: "Andhra Pradesh", region: "South" },
  { city: "Mysuru", state: "Karnataka", region: "South" },
  { city: "Mangaluru", state: "Karnataka", region: "South" },
  { city: "Jodhpur", state: "Rajasthan", region: "North" },
  { city: "Varanasi", state: "Uttar Pradesh", region: "North" },
  { city: "Allahabad (Prayagraj)", state: "Uttar Pradesh", region: "North" },
  { city: "Raipur", state: "Chhattisgarh", region: "Central" },
  { city: "Madurai", state: "Tamil Nadu", region: "South" },
  { city: "Amritsar", state: "Punjab", region: "North" },
  { city: "Aurangabad", state: "Maharashtra", region: "West" },
  { city: "Shimla", state: "Himachal Pradesh", region: "North" },
  { city: "Panaji", state: "Goa", region: "West" },
  { city: "Imphal", state: "Manipur", region: "Northeast" },
  { city: "Shillong", state: "Meghalaya", region: "Northeast" },
  { city: "Agartala", state: "Tripura", region: "Northeast" },
  { city: "Gangtok", state: "Sikkim", region: "Northeast" },
  { city: "Jammu", state: "J&K", region: "North" },
];

// Delhi NCR cities
const delhiNCRCities = [
  { city: "New Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "Central Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "South Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "North Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "East Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "West Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "Dwarka, Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "Saket, Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "Connaught Place, Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "Karol Bagh, Delhi", state: "Delhi", region: "Delhi NCR" },
  { city: "Gurugram", state: "Haryana", region: "Delhi NCR" },
  { city: "Noida", state: "Uttar Pradesh", region: "Delhi NCR" },
  { city: "Greater Noida", state: "Uttar Pradesh", region: "Delhi NCR" },
  { city: "Faridabad", state: "Haryana", region: "Delhi NCR" },
  { city: "Ghaziabad", state: "Uttar Pradesh", region: "Delhi NCR" },
  { city: "Sonipat", state: "Haryana", region: "Delhi NCR" },
  { city: "Rohtak", state: "Haryana", region: "Delhi NCR" },
  { city: "Meerut", state: "Uttar Pradesh", region: "Delhi NCR" },
  { city: "Bahadurgarh", state: "Haryana", region: "Delhi NCR" },
  { city: "Manesar", state: "Haryana", region: "Delhi NCR" },
];

const firmSizes = ["Solo Practitioner","2-5 Lawyers","6-15 Lawyers","16-50 Lawyers","51-100 Lawyers","100+ Lawyers"];
const firmTypes = ["Individual Practice","Partnership","LLP","Boutique Firm","Full-Service Firm","Corporate Law Firm","Litigation Firm","Virtual/Hybrid Firm"];

const techAdoptions = ["None","Basic (Email/Phone)","Moderate (Case Mgmt Software)","Advanced (Full Digital)","Early Adopter"];
const legalTechNeeds = [
  "Case Management System","Document Automation","E-Discovery Tools",
  "Contract Lifecycle Management","Legal Research AI","Client Portal",
  "Billing & Time Tracking","Court Filing Automation","Compliance Monitoring",
  "Virtual Hearing Setup","Digital Signature Integration","Practice Analytics",
  "Knowledge Management","Workflow Automation","AI-Powered Drafting",
];

const notableClientTypes = [
  "PSU Banks & Financial Institutions","Real Estate Developers","IT/ITES Companies",
  "Manufacturing Corporates","Startup Ecosystem","Insurance Companies",
  "Government Departments","MNCs (India Operations)","MSMEs & SMEs",
  "Educational Institutions","Healthcare & Pharma","Retail & FMCG",
  "Telecom Operators","Infrastructure Companies","Media & Entertainment",
];

const caseloads = ["<50/yr","50-100/yr","100-250/yr","250-500/yr","500-1000/yr","1000+/yr"];
const revenues = ["<₹10L","₹10-25L","₹25-50L","₹50L-1Cr","₹1-5Cr","₹5-10Cr","₹10-25Cr","₹25Cr+"];
const languages = [
  "Hindi, English","English, Hindi, Marathi","English, Tamil","English, Telugu","English, Bengali",
  "English, Kannada","English, Gujarati","English, Malayalam","English, Punjabi","Hindi, English, Urdu",
  "English, Hindi, Rajasthani","English, Odia","English, Assamese","English, Hindi, Sanskrit",
];

const phonePrefixes = ["98","99","70","78","88","96","97","91","85","86"];

function generateLawyerBatch(
  count: number,
  cities: readonly { city: string; state: string; region: string }[],
  seed: number,
  idPrefix: string
): LawyerProspect[] {
  const rand = seededRandom(seed);
  const result = new Array<LawyerProspect>(count);

  for (let i = 0; i < count; i++) {
    const loc = pick(cities, rand);
    const firstName = pick(firstNames, rand);
    const lastName = pick(lastNames, rand);
    const lawyerName = `${firstName} ${lastName}`;
    const practiceArea = pick(practiceAreas, rand);
    const specs = specializations[practiceArea] || ["General Practice"];
    const spec = pick(specs, rand);
    const designation = pick(designations, rand);
    const firmSuffix = pick(firmPrefixes, rand);
    const firmName = `${lastName} ${firmSuffix}`;
    const firmSizeVal = pick(firmSizes, rand);
    const firmTypeVal = pick(firmTypes, rand);
    const expYears = 2 + Math.floor(rand() * 35);
    const yearEst = 2024 - expYears + Math.floor(rand() * 5);

    const slug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i}`;
    const domain = `${lastName.toLowerCase()}${firmSuffix.replace(/[&\s.]/g, "").toLowerCase()}.co.in`;
    const phone = `+91 ${pick(phonePrefixes, rand)}${String(Math.floor(rand() * 100000000)).padStart(8, "0")}`;
    const barState = loc.state.substring(0, 2).toUpperCase();
    const barId = `${barState}/${Math.floor(1000 + rand() * 9000)}/${2024 - Math.floor(rand() * 30)}`;

    result[i] = {
      id: `${idPrefix}-${count - 1 - i}`,
      lawyerName,
      firmName,
      designation,
      barCouncilId: barId,
      practiceArea,
      specialization: spec,
      experienceYears: expYears,
      city: loc.city,
      state: loc.state,
      region: loc.region,
      firmSize: firmSizeVal,
      firmType: firmTypeVal,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
      phone,
      website: `https://${domain}`,
      linkedinProfile: `https://linkedin.com/in/${slug}`,
      courtPractice: pick(courtPractices, rand),
      notableClients: pick(notableClientTypes, rand),
      techAdoption: pick(techAdoptions, rand),
      legalTechNeed: pick(legalTechNeeds, rand),
      caseloadEstimate: pick(caseloads, rand),
      annualRevenue: pick(revenues, rand),
      languagesSpoken: pick(languages, rand),
      yearEstablished: yearEst,
      description: `${designation} at ${firmName}, ${loc.city} (${loc.state}). ${expYears}+ years specializing in ${spec} under ${practiceArea}. Practices at ${pick(courtPractices, rand)}.`,
    };
  }

  return result;
}

export function generateLawyersPanIndia(): LawyerProspect[] {
  return generateLawyerBatch(100000, panIndiaCities, 11111, "law");
}

export function generateLawyersDelhiNCR(): LawyerProspect[] {
  return generateLawyerBatch(80000, delhiNCRCities, 22222, "dlaw");
}
