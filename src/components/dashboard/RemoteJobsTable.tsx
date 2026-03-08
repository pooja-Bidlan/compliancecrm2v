import { useState, useMemo, useCallback } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Download, Search, Linkedin, Globe, Mail, Briefcase, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { RemoteJob } from "@/lib/remote-jobs-data";
import { REMOTE_JOB_COLUMNS } from "@/lib/remote-jobs-data";

interface RemoteJobsTableProps {
  jobs: RemoteJob[];
}

const PAGE_SIZE = 50;

export function RemoteJobsTable({ jobs }: RemoteJobsTableProps) {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebouncedValue(search, 200);

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return jobs;
    const q = debouncedSearch.toLowerCase();
    return jobs.filter(
      (j) =>
        j.jobTitle.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        j.subSector.toLowerCase().includes(q) ||
        j.jobSource.toLowerCase().includes(q) ||
        j.recruiterName.toLowerCase().includes(q)
    );
  }, [jobs, debouncedSearch]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = useMemo(
    () => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filtered, page]
  );

  const handleExport = useCallback(() => {
    if (!filtered.length) return;
    const headers = REMOTE_JOB_COLUMNS.map((c) => c.label);
    const rows = filtered.map((row) =>
      REMOTE_JOB_COLUMNS.map((c) => `"${String(row[c.key] ?? "").replace(/"/g, '""')}"`).join(",")
    );
    const csv = `${headers.join(",")}\n${rows.join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Remote_Jobs_Enriched_${filtered.length}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="rounded-full text-xs px-3 py-1 font-semibold">
            {filtered.length.toLocaleString()} jobs
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            {REMOTE_JOB_COLUMNS.length} columns
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs px-3 py-1">
            Job Sites & LinkedIn
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, sources..."
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
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Job Title</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Company</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Source</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Location</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Salary</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Experience</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Recruiter</TableHead>
                <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((j) => (
                <>
                  <TableRow
                    key={j.id}
                    className="hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => setExpandedId((prev) => (prev === j.id ? null : j.id))}
                  >
                    <TableCell className="w-8 px-2">
                      {expandedId === j.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{j.jobTitle}</p>
                        <p className="text-xs text-muted-foreground">{j.subSector}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{j.company}</p>
                        <p className="text-xs text-muted-foreground">{j.industry}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={j.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs bg-muted/50 rounded-full px-2.5 py-0.5 hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" /> {j.jobSource}
                      </a>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{j.location}</p>
                      <p className="text-xs text-muted-foreground">{j.region}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-primary">{j.salaryRange}</p>
                      <p className="text-xs text-muted-foreground">{j.employmentType}</p>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs bg-muted/50 rounded-full px-2.5 py-0.5">{j.experienceLevel}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">{j.recruiterName}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[140px]">{j.recruiterEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <a href={j.companyLinkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <a href={j.companyWebsite} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
                          <Globe className="h-4 w-4" />
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>

                  {expandedId === j.id && (
                    <TableRow key={`${j.id}-detail`} className="bg-muted/10">
                      <TableCell colSpan={9} className="p-0">
                        <div className="p-5 animate-fade-in">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
                            <DetailItem label="Posted Date" value={j.postedDate} />
                            <DetailItem label="Deadline" value={j.applicationDeadline} />
                            <DetailItem label="Company Size" value={j.companySize} />
                            <DetailItem label="Tech Stack" value={j.techStack} />
                            <DetailItem label="Compliance Focus" value={j.complianceFocus} />
                            <DetailItem label="Employment Type" value={j.employmentType} />
                            <div className="col-span-2 md:col-span-3 lg:col-span-4">
                              <DetailItem label="Description" value={j.description} />
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recruiter</p>
                              <p className="font-medium text-foreground">{j.recruiterName}</p>
                              <div className="flex items-center gap-2">
                                <a href={`mailto:${j.recruiterEmail}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                  <Mail className="h-3 w-3" /> {j.recruiterEmail}
                                </a>
                                <a href={j.recruiterLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                  <Linkedin className="h-3 w-3" /> LinkedIn
                                </a>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Hiring Manager</p>
                              <p className="font-medium text-foreground">{j.hiringManagerName}</p>
                              <div className="flex items-center gap-2">
                                <a href={`mailto:${j.hiringManagerEmail}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                  <Mail className="h-3 w-3" /> {j.hiringManagerEmail}
                                </a>
                                <a href={j.hiringManagerLinkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                  <Linkedin className="h-3 w-3" /> LinkedIn
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-border/40 flex items-center gap-3">
                            <a href={j.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                              <ExternalLink className="h-3.5 w-3.5" /> View on {j.jobSource}
                            </a>
                            <a href={`mailto:${j.recruiterEmail}?subject=Application: ${j.jobTitle} at ${j.company}`} className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg px-3 py-1.5 hover:bg-primary/90 transition-colors">
                              <Mail className="h-3.5 w-3.5" /> Apply via Email
                            </a>
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
            <p className="text-muted-foreground font-medium">No jobs found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Try adjusting your search query.</p>
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
            <span className="text-sm font-medium text-muted-foreground px-2">{page + 1} / {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="rounded-lg gap-1">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {label}</p>
      <p className="font-medium text-foreground text-sm">{value}</p>
    </div>
  );
}
