import { mkConfig, generateCsv, download } from "export-to-csv";


interface UseExportProps {
  filename: string;
  table: any;
}

export function useExport({
  filename="untiled",
  table,
}: UseExportProps) {
  const exportCsv = () => {
    const csvConfig = mkConfig({
      filename,
      useKeysAsHeaders: true,
    });

    const exportData = table.getFilteredRowModel().rows.map((row:any) => ({
        ...row.original,
        nextFollowUpAt: row.original?.nextFollowUpAt && new Date(row.original.nextFollowUpAt).toDateString(),
        client: row.original?.client?.fullName
        }));

    const csv = generateCsv(csvConfig)(exportData);

    download(csvConfig)(csv);
  };

  return {
    exportCsv,
  };
}