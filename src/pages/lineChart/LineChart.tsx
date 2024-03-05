

import './LineChart.scss'

import { useEffect, useState } from 'react';

// import BigChartBox from '../../components/bigChartBox/BigChartBox';
// import { chartBoxUser } from '../../data';
import LineCard from '../../components/LineChart/LineCard';
import { io } from 'socket.io-client';
import { AdjustData, ChartData, DataPayload, SocketData } from '../../components/LineChart/types';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { addDeviceData } from '../../state/Slices/realTimeDataSlice';



export type DeviceData = {
  [parameter: string]: ChartData;
};

const transformDataPayload = (dataPayload: DataPayload): DeviceData => {
  const result: DeviceData = {}
  const { time, ...parameters } = dataPayload
  Object.entries(parameters).forEach(([key, value]) => {
    const chartData: ChartData = {
      time: time.toString(),
      value
    }
    result[key] = chartData
  })
  return result
}



export default function LineChart() {
  const [selectDevice, setSelectDevice] = useState("1")

  const [selectField, setSelectField] = useState("F1")

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
    const socket = io('https://agriculture-app.onrender.com/' || "http://localhost:3000/")
    socket.on("mqttMessage", (data: SocketData) => {
      const { deviceName, parameters } = data;
      console.log("🚀 ~ socket.on ~ parameters:", parameters)
      console.log(data);

      const transformData = transformDataPayload(parameters)
      console.log("🚀 ~ socket.on ~ transformData:", transformData)

      // const dispatch = useDispatch()
      // dispatch(addDeviceData({ deviceName, data: transformData }))
      // const selectedDeviceData = useSelector(state => state.deviceData);


      const date = new Date(parameters.time)


      // const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
      // const day = date.getUTCDate();
      date.setHours(date.getHours() + 2);

      const adjustedTime = date.toISOString().slice(11, 19);


      Object.entries(parameters).forEach(([parameter, value]) => {
        const newData: ChartData = {
          time: adjustedTime,
          value: parseInt(value)
        }
        if (deviceName == "1" || deviceName == "2" || deviceName == "3") {
          setLineChartData(prevValue => ({
            ...prevValue,
            [deviceName]: {
              ...prevValue[deviceName],
              [parameter]: [...(prevValue[deviceName]?.[parameter] || []), newData]
            }
          }))
        }
      })




      return () => {
        socket.disconnect();
      };
    })
  }, [])

 
  function handleDviceNameChange(e: SelectChangeEvent<string>) {
    setSelectDevice(e.target.value)
  }
  function handleFieldChang(e: SelectChangeEvent<string>) {
    setSelectDevice(e.target.value)
  }

  
  return (
    <>
      <div className="">
        <div className="box ">
          <FormControl sx={{ m: 1, minWidth: 120 }} >
          <InputLabel id="field-select-label">Field</InputLabel>
  <Select
    labelId="field-select-label"
    id="field-select"
    value={selectField}
    label="selectedField"
    onChange={handleFieldChang}
  >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem value={"F1"}>Field One</MenuItem>
              <MenuItem value={"F2"}>Field Two</MenuItem>
              <MenuItem value={"F3"}>Field Three</MenuItem>
            </Select>
            <FormHelperText>selectedField</FormHelperText>

          </FormControl>
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
          {/* {Object.keys(lineChartData).map(deviceName => (
            <Button key={deviceName} className='btn m-5' onClick={() => { handleDevicesData(deviceName) }}
            >
              device {deviceName}
            </Button>
          ))} */}
        </div>

        <div className="box box7">
          <LineCard deviceData={lineChartData[selectDevice]} />
        </div>
      </div>
    </>
  );
}
