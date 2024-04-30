

import './LineChart.scss'

import { useEffect, useState } from 'react';

import LineCard from '../../components/LineChart/LineCard';
import { AdjustData, ChartData, SocketData } from '../../components/LineChart/types';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { transformDataPayload } from '../../util/transfRecivedMqttMessageData';
import { io } from 'socket.io-client';




export type DeviceData = {
  [parameter: string]: ChartData;
};





export default function LineChart() {
  const [selectDevice, setSelectDevice] = useState("1")


  // 1&2&3 are devices names but now i just have one device 
  const [lineChartData, setLineChartData] = useState<Record<string, AdjustData>>({
    1: {
      T: [],
      S: [],
      PH: [],
      N: [],
      H: [],
      PHO: [],
      POT: [],
    },
    2: {
      T: [],
      S: [],
      PH: [],
      N: [],
      H: [],
      PHO: [],
      POT: [],
    },
    3: {
      T: [],
      S: [],
      PH: [],
      N: [],
      H: [],
      PHO: [],
      POT: [],
    },
  })


useEffect(() => {
  const socket = io("https://agriculturedash.onrender.com/"||'https://agriculture-app.onrender.com/');  
  
  socket.on("mqttMessage", (data: SocketData) => {
    const { deviceName, parameters } = data;
    const transformedData = transformDataPayload(parameters); 

    if (deviceName in lineChartData) {
      setLineChartData(prevState => ({
        ...prevState,
        [deviceName]: Object.entries(transformedData).reduce((acc, [key, newDataArray]) => {
          acc[key] = [...(prevState[deviceName][key] || []), ...newDataArray]; 
          return acc;
        }, {...prevState[deviceName]})
      }));
    }
  });

  return () => {
    socket.disconnect();  
  };
}, []); 



// const handleDataReceived = (deviceName: string, data: DataPayload) => {
//   const newData = transformAndAdjustData(data);
//   setLineChartData(prevState => ({
//     ...prevState,
//     [deviceName]: {
//       ...prevState[deviceName],
//       ...newData
//     }
//   }));
// };
// console.log("🚀 ~ handleDataReceived ~ handleDataReceived:", handleDataReceived)
// useSocket('https://agriculture-app.onrender.com/', handleDataReceived);




function handleDviceNameChange(e: SelectChangeEvent<string>) {
  setSelectDevice(e.target.value);
}


return (
  <>
    <div className="">
      <div className="box ">

        <FormControl sx={{ m: 1, minWidth: 120 }} >
          <InputLabel id="demo-simple-select-label">Devices</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-disabled"
            value={selectDevice}
            label="selectedDevice"
            onChange={handleDviceNameChange}
          >
            <MenuItem value={"1"}>Device One</MenuItem>
            <MenuItem value={"2"}>Device Two</MenuItem>
            <MenuItem value={"3"}>Device Three</MenuItem>
          </Select>
          <FormHelperText>selectedDevice</FormHelperText>

        </FormControl>

      </div>

      <div className="box box7">
        <LineCard deviceData={lineChartData[selectDevice]} />
      </div>
    </div>
  </>
);
}
