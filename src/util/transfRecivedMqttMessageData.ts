import { ChartData, DataPayload } from '../components/LineChart/types';

export const transformDataPayload = (dataPayload: DataPayload): Record<string, ChartData[]> => {
  const result: Record<string, ChartData[]> = {};
  const { time, ...parameters } = dataPayload;
  const date = new Date(parseInt(time));
  date.setHours(date.getHours() + 2);
  const adjustedTime = date.toISOString().slice(11, 19);
  Object.entries(parameters).forEach(([key, value]) => {
    const chartData: ChartData = {
      time: adjustedTime,
      value,
    };
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(chartData);
  });
  console.log('🚀 ~ transformDataPayload ~ result:', result);
  return result;
};
