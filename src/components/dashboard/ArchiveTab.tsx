import { Linkedin } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ExportRow } from "@/lib/csv-utils";

interface ArchiveTabProps {
  rows: ExportRow[];
  onUpdateResponse: (id: string, status: string) => void;
}

export function ArchiveTab({ rows, onUpdateResponse }: ArchiveTabProps) {
  return (
    <div className="rounded-xl border border-border/60 overflow-hidden bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Entity</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Category</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
            <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Response</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} className="hover:bg-muted/20 transition-colors">
              <TableCell>
                <div>
                  <p className="font-semibold text-foreground">{row.entity}</p>
                  <p className="text-xs text-muted-foreground">{row.contact}</p>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm bg-muted/50 rounded-full px-2.5 py-0.5">{row.category}</span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {(row as any).linkedinContact && (
                    <a href={(row as any).linkedinContact} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {(row as any).linkedinCompany && (
                    <a href={(row as any).linkedinCompany} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="h-4 w-4 opacity-60" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={row.status === "New" ? "outline" : "default"}
                  className={`text-xs rounded-full ${row.status === "New" ? "border-primary/30 text-primary" : ""}`}
                >
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>
                {row.status !== "New" ? (
                  <Select value={row.responseStatus} onValueChange={(v) => onUpdateResponse((row as any).id, v)}>
                    <SelectTrigger className="h-8 w-32 text-xs rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No Reply">No Reply</SelectItem>
                      <SelectItem value="Replied">Replied</SelectItem>
                      <SelectItem value="Meeting Set">Meeting Set</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {rows.length === 0 && (
        <div className="p-16 text-center">
          <p className="text-muted-foreground font-medium">No data yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">Start reaching out from the Live Pipeline.</p>
        </div>
      )}
    </div>
  );
}
