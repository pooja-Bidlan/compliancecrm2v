import { useState, useMemo, useCallback } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Download, Search, Linkedin, Globe, Mail, BookOpen, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import type { ICSIPractitioner } from "@/lib/icsi-data";
import { ICSI_COLUMNS } from "@/lib/icsi-data";

interface ICSITableProps { practitioners: ICSIPractitioner[]; }
const PAGE_SIZE = 50;

export function ICSITable({ practitioners }: ICSITableProps) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return practitioners;
    const q = debouncedSearch.toLowerCase();
    return practitioners.filter(p =>
      p.csName.toLowerCase().includes(q) || p.firmName.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) || p.state.toLowerCase().includes(q) ||
      p.practiceArea.toLowerCase().includes(q) || p.specialization.toLowerCase().includes(q)
    );
  }, [practitioners, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = useMemo(() => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE), [filtered, page]);

  const handleExport = useCallback(() => {
    const headers = ICSI_COLUMNS.map(c => c.label);
    const rows = filtered.map(row => ICSI_COLUMNS.map(c => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([`${headers.join(",")}\n${rows.join("\n")}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `ICSI_Practitioners_${filtered.length}.csv`; a.click(); URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">{filtered.length.toLocaleString()} practitioners</Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">{ICSI_COLUMNS.length} columns</Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">CS in Practice</Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search CS, firms, cities..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-9 h-9 rounded-lg bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all" />
          </div>
          <Button onClick={handleExport} variant="outline" size="sm" className="gap-2 rounded-lg"><Download className="h-4 w-4" />Export ({filtered.length.toLocaleString()})</Button>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-8"></TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">CS Name</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Firm</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Practice Area</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">City</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Experience</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Tech Adoption</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Email</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map(p => (
                <>
                  <TableRow key={p.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setExpandedId(prev => prev === p.id ? null : p.id)}>
                    <TableCell className="w-8 px-2">{expandedId === p.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}</TableCell>
                    <TableCell><p className="font-semibold text-foreground text-sm">{p.csName}</p><p className="text-xs text-muted-foreground">{p.membershipNo} | COP: {p.copNo}</p></TableCell>
                    <TableCell><p className="text-sm font-medium">{p.firmName}</p></TableCell>
                    <TableCell><span className="text-xs bg-muted/50 rounded-full px-2.5 py-0.5">{p.practiceArea}</span></TableCell>
                    <TableCell><p className="text-sm">{p.city}</p><p className="text-xs text-muted-foreground">{p.state}</p></TableCell>
                    <TableCell><span className="text-sm font-medium">{p.yearsInPractice} yrs</span></TableCell>
                    <TableCell><span className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-medium">{p.techAdoption}</span></TableCell>
                    <TableCell><p className="text-xs text-muted-foreground truncate max-w-[140px]">{p.email}</p></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a href={p.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
                        <a href={p.firmWebsite} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors"><Globe className="h-4 w-4" /></a>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedId === p.id && (
                    <TableRow key={`${p.id}-d`} className="bg-muted/10">
                      <TableCell colSpan={9} className="p-0">
                        <div className="p-5 animate-fade-in">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                            <DI label="Specialization" value={p.specialization} /><DI label="Chapter" value={p.chapter} />
                            <DI label="Clientele" value={p.clientele} /><DI label="Turnover" value={p.annualTurnover} />
                            <DI label="Compliance Tool" value={p.complianceToolUsed} /><DI label="LegalTech Need" value={p.legalTechNeed} />
                            <DI label="Pincode" value={p.pincode} />
                            <div className="col-span-2"><DI label="Services" value={p.servicesOffered} /></div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-border/40 flex flex-wrap gap-4">
                            <a href={`mailto:${p.email}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><Mail className="h-3 w-3" /> {p.email}</a>
                            <a href={`mailto:${p.altEmail}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><Mail className="h-3 w-3" /> {p.altEmail}</a>
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3 w-3" /> {p.phone}</span>
                            <a href={p.firmLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"><Linkedin className="h-3 w-3" /> Firm LinkedIn</a>
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
        {filtered.length === 0 && <div className="p-16 text-center"><p className="text-muted-foreground font-medium">No practitioners found</p></div>}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">Showing {(page * PAGE_SIZE + 1).toLocaleString()}–{Math.min((page + 1) * PAGE_SIZE, filtered.length).toLocaleString()} of {filtered.length.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="rounded-lg gap-1"><ChevronLeft className="h-4 w-4" /> Prev</Button>
            <span className="text-sm font-medium text-muted-foreground px-2">{page + 1} / {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="rounded-lg gap-1">Next <ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

function DI({ label, value }: { label: string; value: string | number }) {
  return <div className="space-y-1"><p className="text-xs text-muted-foreground flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5" /> {label}</p><p className="font-medium text-foreground text-sm">{value}</p></div>;
}
