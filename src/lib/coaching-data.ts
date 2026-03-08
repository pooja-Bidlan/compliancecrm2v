import type { EnrichedCompany } from "./enriched-data";

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

const coachingSubSectors = [
  "IIT/JEE Coaching", "NEET Coaching", "UPSC/Civil Services", "CAT/MBA Prep",
  "GATE Coaching", "Bank Exam Prep", "SSC/Railway Prep", "CA/CS/CMA Coaching",
  "GRE/GMAT Prep", "IELTS/TOEFL Prep", "SAT/ACT Prep", "K-12 Tutoring",
  "Online Learning Platform", "Skill Development", "Professional Certification",
  "Coding Bootcamp", "Data Science Academy", "Language Learning",
  "Executive Coaching", "Life Coaching", "Business Coaching", "Leadership Training",
  "Corporate Training", "Test Prep - General", "Study Abroad Consulting",
  "EdTech Platform", "Vocational Training", "Arts & Design Academy",
  "Sports Coaching Academy", "Music Academy",
];

const coachingCategories = [
  "Test Prep", "K-12", "Higher Ed", "EdTech", "Coding Bootcamp",
  "Professional Training", "Corporate Training", "Study Abroad",
  "Skill Academy", "Executive Coaching", "Vocational", "Online Platform",
  "Language School", "Arts Academy", "Sports Academy",
];

const countries = [
  { name: "India", cities: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Jaipur", "Lucknow", "Kota", "Patna", "Chandigarh", "Ahmedabad", "Noida", "Gurugram", "Bhopal", "Indore", "Surat", "Nagpur", "Vadodara", "Visakhapatnam", "Coimbatore", "Thiruvananthapuram", "Ranchi", "Bhubaneswar", "Guwahati", "Dehradun", "Mysuru", "Mangalore", "Rajkot"], region: "India" },
];

const firstNames = [
  "Rajesh", "Amit", "Sanjay", "Vikram", "Arun", "Sunil", "Prashant", "Deepak", "Anand", "Rakesh",
  "James", "Robert", "William", "David", "Michael", "Richard", "Charles", "Thomas", "John", "Daniel",
  "Aditya", "Nitin", "Gaurav", "Manish", "Ashish", "Rohit", "Vivek", "Ajay", "Ramesh", "Suresh",
  "Sarah", "Priya", "Anjali", "Neha", "Kavita", "Sunita", "Meena", "Pooja", "Swati", "Rekha",
  "Emma", "Laura", "Sophie", "Anna", "Maria", "Elena", "Yuki", "Wei", "Ahmed", "Fatima",
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

const coachingPrefixes = [
  "Brilliant", "Excel", "Apex", "Summit", "Pioneer", "Vision", "Elite", "Master", "Prime", "Zenith",
  "Future", "Smart", "Rise", "Aspire", "Catalyst", "Phoenix", "Ignite", "Spark", "Momentum", "Elevate",
  "Global", "Star", "Alpha", "Bright", "Quest", "Path", "Edge", "Core", "Peak", "Rapid",
  "Next", "Pro", "Lead", "Skill", "Brain", "Mind", "Think", "Learn", "Grow", "Aim",
  "Focus", "Target", "Achieve", "Dream", "Success", "Impact", "Transform", "Empower", "Inspire", "Advance",
];

const coachingSuffixes = [
  " Academy", " Institute", " Learning", " Education", " Coaching", " Classes",
  " Prep", " School", " Hub", " Center", " Labs", " Campus",
  " EdTech", " Learning Solutions", " Training", " Tutorials",
  " Academy Online", " Global", " Education Group", " Skills",
  " Academy Pro", " Learning Hub", " Institute of Excellence", " Scholars",
];

const techStacks = [
  "React, Node.js, AWS", "Python, Django, GCP", "Angular, Java, Azure",
  "React Native, Firebase", "Flutter, Dart, GCP", "Vue.js, Laravel, AWS",
  "Next.js, Vercel, Supabase", "WordPress, PHP, AWS", "Moodle, PHP, MySQL",
  "Custom LMS, React, AWS", "Zoom SDK, React, MongoDB", "Python, Flask, Redis",
  "Canvas LMS, Ruby, AWS", "Blackboard, Java, Oracle", "D2L, .NET, Azure",
  "Custom Platform, Go, GCP", "Teachable, Shopify", "Thinkific, Stripe",
];

const revenueRanges = [
  "$100K-$500K", "$500K-$1M", "$1M-$5M", "$5M-$10M", "$10M-$25M",
  "$25M-$50M", "$50M-$100M", "$100M-$500M", "$500M-$1B", "$1B+",
];

const rounds = ["Bootstrapped", "Seed", "Series A", "Series B", "Series C", "Series D", "Pre-IPO", "IPO", "Listed", "Private"];

const investorNames = [
  "Sequoia Capital India", "Tiger Global", "Accel", "SoftBank Vision Fund", "Owl Ventures",
  "GSV Ventures", "Reach Capital", "Learn Capital", "NewSchools Venture Fund", "Emerald Technology",
  "Omidyar Network", "Chan Zuckerberg Initiative", "Google Ventures", "Rethink Education",
  "Bessemer Venture Partners", "General Atlantic", "Warburg Pincus", "KKR", "Peak XV Partners",
  "Blume Ventures", "Matrix Partners India", "Nexus Venture Partners", "Elevation Capital", "Info Edge",
];

export interface CoachingCompany extends EnrichedCompany {
  category: string;
  founderName: string;
  founderEmail: string;
  founderLinkedin: string;
  cofounderName: string;
  cofounderEmail: string;
  cofounderLinkedin: string;
  studentsServed: string;
  deliveryMode: string;
}

export const COACHING_COLUMNS: { key: keyof CoachingCompany; label: string }[] = [
  { key: "companyName", label: "Company / Institute Name" },
  { key: "category", label: "Category" },
  { key: "subSector", label: "Sub-Sector" },
  { key: "deliveryMode", label: "Delivery Mode" },
  { key: "foundedYear", label: "Founded" },
  { key: "headquarters", label: "Headquarters" },
  { key: "country", label: "Country" },
  { key: "region", label: "Region" },
  { key: "employeeCount", label: "Employees" },
  { key: "studentsServed", label: "Students / Clients Served" },
  { key: "revenueRange", label: "Revenue Range" },
  { key: "fundingTotal", label: "Total Funding" },
  { key: "latestRound", label: "Stage" },
  { key: "ceoName", label: "CEO / Director" },
  { key: "ceoEmail", label: "CEO Email" },
  { key: "ceoLinkedin", label: "CEO LinkedIn" },
  { key: "founderName", label: "Founder" },
  { key: "founderEmail", label: "Founder Email" },
  { key: "founderLinkedin", label: "Founder LinkedIn" },
  { key: "cofounderName", label: "Co-Founder / COO" },
  { key: "cofounderEmail", label: "Co-Founder Email" },
  { key: "cofounderLinkedin", label: "Co-Founder LinkedIn" },
  { key: "ctoName", label: "CTO / Head of Tech" },
  { key: "ctoEmail", label: "CTO Email" },
  { key: "ctoLinkedin", label: "CTO LinkedIn" },
  { key: "companyWebsite", label: "Website" },
];

function generateCompanyName(index: number, rand: () => number): string {
  const prefix = coachingPrefixes[index % coachingPrefixes.length];
  const suffix = coachingSuffixes[Math.floor(rand() * coachingSuffixes.length)];
  if (index >= coachingPrefixes.length) {
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

const deliveryModes = ["Online Only", "Offline Only", "Hybrid", "Online + App", "Classroom + Online"];

export function generateCoachingCompanies(): CoachingCompany[] {
  const count = 30000;
  const rand = seededRandom(54321);
  const results: CoachingCompany[] = [];

  for (let i = 0; i < count; i++) {
    const companyName = generateCompanyName(i, rand);
    const domain = slugify(companyName) + ".com";
    const countryData = pick(countries, rand);
    const city = pick(countryData.cities, rand);
    const ceo = generatePerson(i, rand);
    const founder = generatePerson(i + count, rand);
    const cofounder = generatePerson(i + count * 2, rand);
    const cto = generatePerson(i + count * 3, rand);
    const subSector = coachingSubSectors[i % coachingSubSectors.length];
    const category = coachingCategories[i % coachingCategories.length];
    const employeeCount = 10 + Math.floor(rand() * 4990);
    const foundedYear = 1980 + Math.floor(rand() * 45);
    const roundIdx = Math.min(Math.floor(rand() * rounds.length), rounds.length - 1);
    const fundingAmt = (rand() * 200 + 0.1).toFixed(1);
    const revIdx = Math.min(Math.floor(employeeCount / 250), revenueRanges.length - 1);
    const growthPct = (rand() * 120 + 5).toFixed(0);
    const fundingMonth = Math.floor(rand() * 12) + 1;
    const fundingYear = 2019 + Math.floor(rand() * 7);
    const studentsK = Math.floor(rand() * 500 + 1);
    const delivery = pick(deliveryModes, rand);
    const inv1 = pick(investorNames, rand);
    let inv2 = pick(investorNames, rand);
    while (inv2 === inv1) inv2 = pick(investorNames, rand);

    results.push({
      id: `coaching-${i}`,
      companyName,
      industry: "Education & Coaching",
      category,
      subSector,
      foundedYear,
      headquarters: `${city}, ${countryData.name}`,
      country: countryData.name,
      region: countryData.region,
      employeeCount,
      revenueRange: revenueRanges[revIdx],
      fundingTotal: `$${fundingAmt}M`,
      latestRound: rounds[roundIdx],
      valuation: `$${(parseFloat(fundingAmt) * (rand() * 5 + 2)).toFixed(0)}M`,
      studentsServed: `${studentsK}K+`,
      deliveryMode: delivery,
      ceoName: ceo.full,
      ceoEmail: `${ceo.first.toLowerCase()}.${ceo.last.toLowerCase()}@${domain}`,
      ceoLinkedin: `https://linkedin.com/in/${slugify(ceo.full)}-${i}`,
      founderName: founder.full,
      founderEmail: `${founder.first.toLowerCase()}.${founder.last.toLowerCase()}@${domain}`,
      founderLinkedin: `https://linkedin.com/in/${slugify(founder.full)}-founder-${i}`,
      cofounderName: cofounder.full,
      cofounderEmail: `${cofounder.first.toLowerCase()}.${cofounder.last.toLowerCase()}@${domain}`,
      cofounderLinkedin: `https://linkedin.com/in/${slugify(cofounder.full)}-cof-${i}`,
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
      description: `${companyName} is a ${city}-based ${category} institute specializing in ${subSector.toLowerCase()}, serving ${studentsK}K+ students via ${delivery.toLowerCase()} mode.`,
    });
  }

  return results;
}
