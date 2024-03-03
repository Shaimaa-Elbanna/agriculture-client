

import './LineChart.scss'

import { useEffect, useState } from 'react';

// import BigChartBox from '../../components/bigChartBox/BigChartBox';
// import { chartBoxUser } from '../../data';
import LineCard from '../../components/LineChart/LineCard';
import { io } from 'socket.io-client';
import { AdjustData, ChartData, DataPayload, SocketData } from '../../components/LineChart/types';
import { Button } from '@mui/material';
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

  useEffect(() => {
    console.log(lineChartData);
    console.log(Object.keys(lineChartData));


  }, [lineChartData])
  const handleDevicesData = (deviceName: string) => {
    if (deviceName == "1" || deviceName == "2" || deviceName == "3") {
      setSelectDevice(deviceName)
    }
  }
  return (
    <>
      <div className="">
        <div className="box ">

          {Object.keys(lineChartData).map(deviceName => (
            <Button key={deviceName} className='btn m-5' onClick={() => { handleDevicesData(deviceName) }}
            >
              device {deviceName}
            </Button>
          ))}
        </div>

        <div className="box box7">
          <LineCard deviceData={lineChartData[selectDevice]} />
        </div>
      </div>
    </>
  );
}
