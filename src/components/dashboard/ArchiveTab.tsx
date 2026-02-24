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
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-bold">Entity</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Response</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>
                <div>
                  <p className="font-semibold text-foreground">{row.entity}</p>
                  <p className="text-xs text-muted-foreground">{row.contact}</p>
                </div>
              </TableCell>
              <TableCell className="text-sm">{row.category}</TableCell>
              <TableCell>
                <Badge variant={row.status === "New" ? "outline" : "default"} className="text-xs">
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>
                {row.status !== "New" ? (
                  <Select value={row.responseStatus} onValueChange={(v) => onUpdateResponse((row as any).id, v)}>
                    <SelectTrigger className="h-8 w-32 text-xs">
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
        <div className="p-12 text-center text-muted-foreground">No data yet. Start reaching out from the Live Pipeline.</div>
      )}
    </div>
  );
}
