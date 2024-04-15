import { AdjustData, DataPayload } from "../components/LineChart/types";

export const transformAndAdjustData = (data: DataPayload): AdjustData => {
    const date = new Date(data.time);
    date.setHours(date.getHours() + 2);
    const adjustedTime = date.toISOString().slice(11, 19);
  
    const defaultAdjustData: AdjustData = {
      T: [],
      S: [],
      PH: [],
      N: [],
      H: [],
      PHO: [],
      POT: [],
    };
  
    for (const [param, value] of Object.entries(data)) {
      if (param in defaultAdjustData) {
        defaultAdjustData[param as keyof AdjustData].push({
          time: adjustedTime,
          value: parseInt(value),
        });
      }
    }
  
    return defaultAdjustData;
  };