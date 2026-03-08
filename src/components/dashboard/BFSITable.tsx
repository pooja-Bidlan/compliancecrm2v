import { useState, useMemo, useCallback, memo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Download, Search, Linkedin, Globe, Mail, Building2, Users, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import type { BFSICompany } from "@/lib/bfsi-data";
import { BFSI_COLUMNS } from "@/lib/bfsi-data";
import { downloadCSV } from "@/lib/csv-utils";

interface BFSITableProps {
  companies: BFSICompany[];
}

const PAGE_SIZE = 50;

const CATEGORY_FILTERS = [
  "All", "Bank", "FinTech", "NBFC", "SFB", "Insurance", "AMC", "Brokerage",
  "Housing Finance", "Microfinance", "Payment Company", "Lending Platform",
  "WealthTech", "InsurTech", "RegTech", "Credit Bureau",
];

function convertBFSIToCSV(data: BFSICompany[], columns: typeof BFSI_COLUMNS): string {
  if (!data.length) return "";
  const headers = columns.map((c) => c.label);
  const rows = data.map((row) =>
    columns.map((c) => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(",")
  );
  return `${headers.join(",")}\n${rows.join("\n")}`;
}

export function BFSITable({ companies }: BFSITableProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    let result = companies;
    if (categoryFilter !== "All") {
      result = result.filter((c) => c.category === categoryFilter);
    }
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (c) =>
          c.companyName.toLowerCase().includes(q) ||
          c.ceoName.toLowerCase().includes(q) ||
          c.ctoName.toLowerCase().includes(q) ||
          c.cfoName.toLowerCase().includes(q) ||
          c.mdName.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.subSector.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [companies, debouncedSearch, categoryFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = useMemo(
    () => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filtered, page]
  );

  const handleExport = useCallback(() => {
    const csv = convertBFSIToCSV(filtered, BFSI_COLUMNS);
    downloadCSV(csv, `BFSI_Companies_Enriched_${filtered.length}.csv`);
  }, [filtered]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">
            {filtered.length.toLocaleString()} companies
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            {BFSI_COLUMNS.length} columns
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            50+ employees
          </Badge>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setPage(0); }}>
            <SelectTrigger className="w-[160px] h-9 rounded-lg bg-muted/50 border-transparent">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_FILTERS.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative w-56">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies, contacts..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="pl-9 h-9 rounded-lg bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all"
            />
          </div>
          <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 rounded-lg">
            <Download className="h-4 w-4" />
            Export ({filtered.length.toLocaleString()})
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-8"></TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Company</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Category</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">HQ</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Employees</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Revenue</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">CEO / MD</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">CFO</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((c) => (
                <>
                  <TableRow
                    key={c.id}
                    className="hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => toggleExpand(c.id)}
                  >
                    <TableCell className="w-8 px-2">
                      {expandedId === c.id ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground">{c.companyName}</p>
                        <p className="text-xs text-muted-foreground">{c.subSector}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm bg-muted/50 rounded-full px-2.5 py-0.5">{c.category}</span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{c.headquarters}</p>
                      <p className="text-xs text-muted-foreground">{c.region}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{c.employeeCount.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-primary">{c.revenueRange}</p>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{c.ceoName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">{c.ceoEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{c.cfoName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">{c.cfoEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={c.listingStatus === "Listed" ? "default" : "secondary"} className="text-xs rounded-full">
                        {c.listingStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>

                  {expandedId === c.id && (
                    <TableRow key={`${c.id}-detail`} className="bg-muted/10">
                      <TableCell colSpan={9} className="p-0">
                        <div className="p-5 animate-fade-in">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Founded" value={String(c.foundedYear)} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Country" value={c.country} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Funding / Market Cap" value={c.fundingTotal} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Stage" value={c.latestRound} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Growth" value={c.growthRate} />
                            <DetailItem icon={<Shield className="h-3.5 w-3.5" />} label="Regulator" value={c.regulator} />
                            <DetailItem icon={<Shield className="h-3.5 w-3.5" />} label="Compliance" value={c.complianceFramework} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Tech Stack" value={c.techStack} />
                            <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Domain" value={c.companyDomain} />
                            <div className="col-span-2">
                              <DetailItem icon={<Building2 className="h-3.5 w-3.5" />} label="Key Investors" value={c.investors} />
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <PersonCard title="CEO / MD" name={c.ceoName} email={c.ceoEmail} linkedin={c.ceoLinkedin} />
                            <PersonCard title="MD / Director" name={c.mdName} email={c.mdEmail} linkedin={c.mdLinkedin} />
                            <PersonCard title="CFO" name={c.cfoName} email={c.cfoEmail} linkedin={c.cfoLinkedin} />
                            <PersonCard title="CTO" name={c.ctoName} email={c.ctoEmail} linkedin={c.ctoLinkedin} />
                          </div>

                          <div className="mt-4 pt-3 border-t border-border/40">
                            <p className="text-xs text-muted-foreground">{c.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <a href={c.companyLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="h-3 w-3" /> Company LinkedIn
                              </a>
                              <a href={c.companyWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                <Globe className="h-3 w-3" /> Website
                              </a>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>

        {filtered.length === 0 && (
          <div className="p-16 text-center">
            <p className="text-muted-foreground font-medium">No companies found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Showing {(page * PAGE_SIZE + 1).toLocaleString()}–{Math.min((page + 1) * PAGE_SIZE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="rounded-lg gap-1">
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-sm font-medium text-muted-foreground px-2">
              {page + 1} / {totalPages}
            </span>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="rounded-lg gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">{icon} {label}</p>
      <p className="font-medium text-foreground text-sm">{value}</p>
    </div>
  );
}

function PersonCard({ title, name, email, linkedin }: { title: string; name: string; email: string; linkedin: string }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <p className="font-medium text-foreground">{name}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <a href={`mailto:${email}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Mail className="h-3 w-3" /> {email}
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          <Linkedin className="h-3 w-3" /> LinkedIn
        </a>
      </div>
    </div>
  );
}
