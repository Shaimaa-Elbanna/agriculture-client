

import './LineChart.scss'

import {  useState } from 'react';

import LineCard from '../../components/LineChart/LineCard';
import { AdjustData, ChartData, DataPayload } from '../../components/LineChart/types';
import {  FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { transformAndAdjustData } from '../../util/transfRecivedMqttMessageData';
import { useSocket } from '../../util/useSocket';




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

  // useEffect(() => {
  //   const socket = io('https://agriculture-app.onrender.com/' || "http://localhost:3000/")
  //   socket.on("mqttMessage", (data: SocketData) => {
  //     const { deviceName, parameters } = data;
  //     console.log("🚀 ~ socket.on ~ parameters:", parameters)
  //     console.log(data);

  //     const transformData = transformDataPayload(parameters)
  //     console.log("🚀 ~ socket.on ~ transformData:", transformData)

    

  //     const date = new Date(parameters.time)


  //     date.setHours(date.getHours() + 2);

  //     const adjustedTime = date.toISOString().slice(11, 19);


  //     Object.entries(parameters).forEach(([parameter, value]) => {
  //       const newData: ChartData = {
  //         time: adjustedTime,
  //         value: parseInt(value)
  //       }
  //       if (deviceName == "1" || deviceName == "2" || deviceName == "3") {
  //         setLineChartData(prevValue => ({
  //           ...prevValue,
  //           [deviceName]: {
  //             ...prevValue[deviceName],
  //             [parameter]: [...(prevValue[deviceName]?.[parameter] || []), newData]
  //           }
  //         }))
  //       }
  //     })




  //     return () => {
  //       socket.disconnect();
  //     };
  //   })
  // }, [])
  const handleDataReceived = (deviceName: string, data: DataPayload) => {
    const newData = transformAndAdjustData(data);
    setLineChartData(prevState => ({
      ...prevState,
      [deviceName]: {
        ...prevState[deviceName],
        ...newData
      }
    }));
  };
  useSocket('https://agriculture-app.onrender.com/', handleDataReceived);



 
  function handleDviceNameChange(e: SelectChangeEvent<string>) {
    setSelectDevice(e.target.value)
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
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
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
