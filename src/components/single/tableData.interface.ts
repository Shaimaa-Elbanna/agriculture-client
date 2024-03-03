import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'id', headerName: 'id', width: 200 },
  { field: 'PH', headerName: 'PH', width: 100 },
  {
    field: 'H',
    headerName: 'H',
    width: 100,
  },
  {
    field: 'N',
    // type: "string",
    headerName: 'N',
    width: 100,
  },
  {
    field: 'POT',
    // type: "string",
    headerName: 'POT',
    width: 100,
  },
  {
    field: 'S',
    // type: "string",
    headerName: 'S',
    width: 100,
  },
  {
    field: 'T',
    headerName: 'T',
    // type: "string",
    width: 100,
  },
  {
    field: 'PHO',
    headerName: 'PHO',
    width: 100,
    // type: "string",
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 100,
  },
  {
    field: 'day',
    headerName: 'Day',
    width: 100,
  },
  {
    field: 'month',
    headerName: 'Month',
    width: 100,
  },
];

export interface DataEntry {
  T?: number | string;
  S?: number;
  PH?: number;
  H?: number;
  N?: number;
  PHO?: number;
  POT?: number;
  day: number;
  month: number;
  time: string;
  year: number;
  _id?: string;
}

// Define the interface for the array of data entries
export interface FormData {
  data: DataEntry[];
}
