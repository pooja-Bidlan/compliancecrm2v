export interface Lead {
  id: string;
  type: "Job" | "CEO";
  entity: string;
  contact: string;
  category: string;
  email: string;
  salary?: string;
  funding?: string;
  location: string;
  model?: string;
  trigger?: string;
}

export function generateLeads(): { jobs: Lead[]; ceos: Lead[] } {
  const companies = ["Goldman Sachs", "Kraken", "Revolut", "Circle", "Binance", "Stripe", "Coinbase", "Chainalysis", "Ripple", "Gemini", "Plaid", "Wise", "Robinhood", "BlockFi", "FTX Recovery"];
  const contacts = ["Sarah HR", "Mike Recruiter", "Elena Talent", "John People", "Anna Hiring"];
  const ceoCompanies = ["Anthropic", "Scale AI", "Vanta", "Drata", "Mercury", "Brex", "Ramp", "Gusto", "Deel", "Lattice", "Notion", "Figma", "Linear", "Vercel", "Supabase"];
  const ceoNames = ["Dario Amodei", "Alexandr Wang", "Christina C.", "Adam G.", "Immad A.", "Henrique D.", "Eric G.", "Josh R.", "Alex B.", "Jack A."];
  const rounds = ["Series B", "Series A", "Seed", "Series C"];

  const jobs: Lead[] = companies.map((c, i) => ({
    id: `job-${i}`,
    type: "Job",
    entity: c,
    contact: contacts[i % contacts.length],
    category: "Remote FCCO / Senior AML Officer",
    email: `hr-${i}@${c.toLowerCase().replace(/\s/g, "")}.com`,
    salary: `$${Math.floor(Math.random() * 50) + 160}k+`,
    location: i % 2 === 0 ? "USA Remote" : "India Remote",
  }));

  const ceos: Lead[] = ceoCompanies.map((c, i) => ({
    id: `ceo-${i}`,
    type: "CEO",
    entity: c,
    contact: ceoNames[i % ceoNames.length],
    category: rounds[i % rounds.length],
    email: `ceo-${i}@${c.toLowerCase().replace(/\s/g, "")}.com`,
    funding: `$${(Math.random() * 80 + 10).toFixed(1)}M`,
    location: "USA (NY/SF)",
    model: i % 2 === 0 ? "Fractional CCO" : "Fractional FCO",
    trigger: "Regulatory Update Required",
  }));

  return { jobs, ceos };
}
