import { Table } from "@tanstack/react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { z } from "zod";
import { crmScemaWithId } from "../../types";

interface UseExportProps {
  filename: string;
  table: Table<z.infer<typeof crmScemaWithId>>;
}
type CsvRow = Record<string, unknown>;

export function useExport({
  filename,
  table,
}: UseExportProps) {
  const exportCsv = () => {
    const csvConfig = mkConfig({
      filename,
      useKeysAsHeaders: true,
    });

    const exportData = table.getFilteredRowModel().rows.map((row) => ({
        ...row.original,
        nextFollowUpAt: row.original.nextFollowUpAt && new Date(row.original.nextFollowUpAt).toDateString(),
        }));

    const csv = generateCsv(csvConfig)(exportData);

    download(csvConfig)(csv);
  };

  return {
    exportCsv,
  };
}