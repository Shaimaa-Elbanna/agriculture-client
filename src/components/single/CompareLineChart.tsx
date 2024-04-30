import React, { useEffect, useState } from 'react'
import { useGetRequiredDataWithStartTimeOfAnyDeviceQuery } from '../../state/api'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import TableOfAllData from './TableOfAllData';
import { getDataFromLocalStorage } from '../../util/getAndSaveDataLocalStrorage';


interface AllParams {
  T: boolean;
  S: boolean;
  PH: boolean;
  N: boolean;
  H: boolean;
  PHO: boolean;
  POT: boolean;
  [key: string]: boolean; // Add index signature to allow access with string keys
}
interface CompareLineChartProps {
  startTime: string | undefined
  startDate: string | undefined
  endDate: string | undefined
  endTime: string | undefined
  currentDeviceId: string
}

/**
 * CompareLineChart component displays a line chart comparing different parameters for a specific device.
 * It allows users to select parameters to display and renders a line chart accordingly.
 */
export default function CompareLineChart({ currentDeviceId, startTime, startDate, endDate, endTime }: CompareLineChartProps) {


  const [allParams, setAllParams] = useState<AllParams>({
    T: false,
    S: false,
    PH: false,
    N: false,
    H: false,
    PHO: false,
    POT: false
  })



  // if required  to get data from localstorage
  const [deviceId, setDeviceId] = useState(() => getDataFromLocalStorage("selectedDeviceID", ""))
  useEffect(() => {
    // const storedDeviceId = getDataFromLocalStorage("selectedDeviceID", "");
    if (currentDeviceId !== deviceId) {
      setDeviceId(currentDeviceId);
    }
  }, [currentDeviceId]);

  // const deviceId = getDataFromLocalStorage("selectedDeviceID", "")
  // console.log("🚀 ~ CompareLineChart ~ deviceId:", deviceId)


  const startTimeISO = `${startDate}T${startTime}:00.000Z`
  const endTimeISO = endDate ? `${endDate}T${endTime}:00.000Z` : ""
  console.log("🚀 ~ CompareLineChart ~ startTimeISO:", startTimeISO)


  // Fetch required data based on device ID and time range
  useEffect(() => { }, [currentDeviceId])
  const { data, isFetching } = useGetRequiredDataWithStartTimeOfAnyDeviceQuery([currentDeviceId, startTimeISO, endTimeISO])
  const requiredData = data?.[0]?.data


  // Format fetched data to adjust time zone
  const formattedData = requiredData?.map(item => {
    const date = new Date(new Date(item.time).getTime() + 2 * 60 * 60 * 1000);
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
    const day = date.getUTCDate();
    const adjustedTime = date.toISOString().slice(11, 16);
    return { ...item, time: adjustedTime, year, month, day }

  })


  // Event handler for selecting parameters to display
  function handleDisplayedParams(event: React.ChangeEvent<HTMLInputElement>) {
    setAllParams((prevState) => ({ ...prevState, [event.target.name]: event.target.checked }))
  }
  console.log("🚀 ~ formattedData ~ formattedData:", formattedData)
  return (
    <div>
      <hr />

      {/* checkList display section  */}
      <Box sx={{ display: 'flex' }}>
        <FormControl sx={{ m: 3 }} >
          <FormLabel component="legend" style={{ marginBottom: "10px" }}>Seclect parameters to display</FormLabel>


          <FormGroup>
            {Object.keys(allParams).map((param, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox checked={allParams[param]} onChange={handleDisplayedParams} name={param} />}
                label={param}

              />
            ))}
          </FormGroup>
        </FormControl>

      </Box>

      {/* line chart display section  */}


      {isFetching ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : !formattedData || formattedData == undefined ? (
        <div className="">
          <h2>No available data</h2>
        </div>
      ) : (
        currentDeviceId && data && formattedData && (
          <div className="chart">


            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={formattedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(allParams).map((param, index) => (
                  allParams[param] && (
                    <Line
                      key={index}
                      type="monotone"
                      dataKey={param}
                      stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Generate random color
                    />
                  )
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      )}


      <hr />
      <TableOfAllData data={formattedData ? formattedData : []} />





    </div>
  )
}
