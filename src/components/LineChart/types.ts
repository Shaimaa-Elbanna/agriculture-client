export interface SocketData {
  parameter: string;
  deviceName: string;
  message: string;
  fieldName: string;
  parameters: dataPayload;
}


export interface dataPayload {
  T?: number;
  S?: number;
  H?: number;
  PH?: number;
  PHO?: number;
  POT?: number;
  time: Date;
}

export interface ChartData {
  time: string;
  value: number;
}

export interface AdjustData {
  T: ChartData[];
  S: ChartData[];
  H: ChartData[];
  PH: ChartData[];
  PHO: ChartData[];
  POT: ChartData[];
  [kay: string]: ChartData[];
}
