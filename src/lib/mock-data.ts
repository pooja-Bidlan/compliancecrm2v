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

const jobCompanies = [
  "Goldman Sachs", "JPMorgan Chase", "Morgan Stanley", "Citigroup", "HSBC",
  "Barclays", "Deutsche Bank", "UBS", "Credit Suisse", "BNP Paribas",
  "Kraken", "Revolut", "Circle", "Binance", "Stripe",
  "Coinbase", "Chainalysis", "Ripple", "Gemini", "Plaid",
  "Wise", "Robinhood", "BlockFi", "Bitpanda", "N26",
  "Klarna", "Monzo", "Chime", "SoFi", "Affirm",
  "PayPal", "Square (Block)", "Mastercard", "Visa", "Amex",
  "Standard Chartered", "ING Group", "Société Générale", "Wells Fargo", "Bank of America",
  "State Street", "Northern Trust", "Charles Schwab", "Fidelity", "BlackRock",
  "Vanguard", "Paxos", "Anchorage Digital", "Fireblocks", "BitGo"
];

const jobContacts = [
  "Sarah HR", "Mike Recruiter", "Elena Talent", "John People", "Anna Hiring",
  "David TA", "Lisa Ops", "Tom HC", "Rachel Staffing", "Kevin HR",
  "Amy Talent", "Chris Recruit", "Natalie People", "Brian TA", "Sophia HR",
  "James HC", "Olivia Talent", "Ethan Recruit", "Mia People", "Lucas TA"
];

const jobCategories = [
  "Remote FCCO / Senior AML Officer",
  "BSA/AML Compliance Officer",
  "Chief Compliance Officer",
  "VP of Compliance (Remote)",
  "Director, Financial Crimes Compliance",
  "Senior KYC/AML Analyst",
  "Head of Regulatory Compliance"
];

const jobLocations = [
  "USA Remote", "India Remote", "UK Remote", "Singapore Remote",
  "UAE Remote", "Canada Remote", "EU Remote", "APAC Remote"
];

const ceoCompanies = [
  "Anthropic", "Scale AI", "Vanta", "Drata", "Mercury",
  "Brex", "Ramp", "Gusto", "Deel", "Lattice",
  "Notion", "Figma", "Linear", "Vercel", "Supabase",
  "Retool", "Airtable", "Webflow", "Loom", "Miro",
  "Canva", "Grammarly", "Datadog", "Snowflake", "Databricks",
  "Stripe Atlas", "Plaid AI", "Checkout.com", "Adyen", "Rapyd",
  "OpenAI", "Cohere", "Mistral AI", "Stability AI", "Hugging Face",
  "Jasper AI", "Runway ML", "Midjourney", "Perplexity AI", "Inflection AI",
  "Chainalysis Labs", "Alchemy", "Consensys", "Polygon Labs", "Arbitrum",
  "Aave Labs", "Uniswap Labs", "Circle Ventures", "Ledger", "Trezor"
];

const ceoNames = [
  "Dario Amodei", "Alexandr Wang", "Christina Cacioppo", "Adam Gavish", "Immad Akhund",
  "Henrique Dubugras", "Eric Glyman", "Josh Reeves", "Alex Bouaziz", "Jack Altman",
  "Ivan Zhao", "Dylan Field", "Karri Saarinen", "Guillermo Rauch", "Paul Copplestone",
  "David Hsu", "Howie Liu", "Vlad Magdalin", "Joe Thomas", "Andrey Khusid",
  "Melanie Perkins", "Rahul Roy-Chowdhury", "Olivier Pomel", "Frank Slootman", "Ali Ghodsi",
  "Patrick Collison", "Zach Perret", "Guillaume Pousaz", "Pieter van der Does", "Arik Shtilman",
  "Sam Altman", "Aidan Gomez", "Arthur Mensch", "Emad Mostaque", "Clément Delangue",
  "Dave Rogenmoser", "Cristóbal Valenzuela", "David Holz", "Aravind Srinivas", "Mustafa Suleyman",
  "Michael Gronager", "Nikil Viswanathan", "Joseph Lubin", "Sandeep Nailwal", "Steven Goldfeder",
  "Stani Kulechov", "Hayden Adams", "Jeremy Allaire", "Pascal Gauthier", "Marek Palatinus"
];

const fundingRounds = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series D", "Growth"];

const complianceModels = [
  "Fractional CCO", "Fractional FCO", "Advisory Board", "Compliance Consultant",
  "Interim Compliance Head", "Part-time GRC Lead"
];

const complianceTriggers = [
  "Regulatory Update Required", "MiCA Compliance Deadline", "SEC Inquiry Response",
  "SOC 2 Audit Prep", "AML Program Enhancement", "New Market Entry Compliance",
  "Board Compliance Review", "Licensing Requirement", "GDPR Data Review",
  "FinCEN Reporting Update"
];

export function generateLeads(): { jobs: Lead[]; ceos: Lead[] } {
  const jobs: Lead[] = jobCompanies.map((c, i) => ({
    id: `job-${i}`,
    type: "Job" as const,
    entity: c,
    contact: jobContacts[i % jobContacts.length],
    category: jobCategories[i % jobCategories.length],
    email: `hr-${i}@${c.toLowerCase().replace(/[\s()]/g, "")}.com`,
    salary: `$${Math.floor(Math.random() * 80) + 140}k+`,
    location: jobLocations[i % jobLocations.length],
  }));

  const ceos: Lead[] = ceoCompanies.map((c, i) => ({
    id: `ceo-${i}`,
    type: "CEO" as const,
    entity: c,
    contact: ceoNames[i],
    category: fundingRounds[i % fundingRounds.length],
    email: `ceo-${i}@${c.toLowerCase().replace(/[\s()]/g, "")}.com`,
    funding: `$${(Math.random() * 200 + 5).toFixed(1)}M`,
    location: i % 3 === 0 ? "USA (NY/SF)" : i % 3 === 1 ? "Europe" : "Global",
    model: complianceModels[i % complianceModels.length],
    trigger: complianceTriggers[i % complianceTriggers.length],
  }));

  return { jobs, ceos };
}
