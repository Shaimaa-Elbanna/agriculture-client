export interface TopicsData {
  _id: string;
  deviceId: string;
  data: Parameters[];
  __v: string;
}

export interface Parameters {
  T?: number|string;
  S?: number;
  PH?: number;
  time: Date;
  H?: number;
  N?: number;
  PHO?: number;
  POT?: number;
}



