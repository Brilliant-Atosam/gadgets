import { DataGrid } from "@mui/x-data-grid";
export default function DataTable({ rows, columns }) {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
