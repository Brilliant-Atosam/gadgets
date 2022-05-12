import { Edit, Redo, CurrencyExchange, Visibility, Restore } from "@mui/icons-material";

export const drugsColumn = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Drug", width: 130 },
  { field: "stock", headerName: "Stock", width: 130 },
  { field: "price", headerName: "Price", width: 130 },
  {
    field: "action",
    headerName: "Action",
    width: 120,
    renderCell: (params) => (
      <div className="action-btn">
        <Visibility className="action-icon" />
        <CurrencyExchange className="action-icon" />
      </div>
    ),
  },
];

export  const salesColumn = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "drug_name", headerName: "Drug", width: 200 },
  { field: "quantity", headerName: "Qty", width: 40 },
  { field: "cost", headerName: "Cost", width: 130 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 170,
    renderCell: (params) => <>{params.row.createdAt}</>,
  },
  {
    headerName: "Action",
    width: 120,
    renderCell: (params) => (
      <div className="action-btn">
        <Restore className="action-icon" />
      </div>
    ),
  },
];
export const data = [
  {
    name: "Jan",
    sales: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    sales: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    sales: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    sales: 3908,
    amt: 2000,
  },
  {
    name: "May",
    sales: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    sales: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    sales: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    sales: 3908,
    amt: 2000,
  },
  {
    name: "Sep",
    sales: 4800,
    amt: 2181,
  },
  {
    name: "Oct",
    sales: 3800,
    amt: 2500,
  },
  {
    name: "Nov",
    sales: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    sales: 4300,
    amt: 2100,
  },
];
export const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
