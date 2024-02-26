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



interface CompareLineChartProps {
  startTime: string | undefined
  startDate: string | undefined
  endDate: string | undefined
  endTime: string | undefined
  currentDeviceId: string
}


export default function CompareLineChart({ currentDeviceId, startTime, startDate, endDate, endTime }: CompareLineChartProps) {
 

  const [allParams, setAllParams] = useState({
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


  useEffect(() => { }, [currentDeviceId])
  const { data, isFetching } = useGetRequiredDataWithStartTimeOfAnyDeviceQuery([currentDeviceId, startTimeISO, endTimeISO])
  const requiredData = data?.[0]?.data


  const formattedData = requiredData?.map(item => {
    const date = new Date(new Date(item.time).getTime() + 2 * 60 * 60 * 1000);
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
    const day = date.getUTCDate();
    const adjustedTime = date.toISOString().slice(11, 16);
    return { ...item, time: adjustedTime, year, month, day }

  })


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
          <FormGroup style={{ display: "flex", flexDirection: "row" }}>
            <FormControlLabel
              control={
                <Checkbox checked={allParams.PH} onChange={handleDisplayedParams} name="PH" />
              }
              label="PH"
            />
            <FormControlLabel
              control={
                <Checkbox checked={allParams.H} onChange={handleDisplayedParams} name="H" />
              }
              label="Humidity"
            />
            <FormControlLabel
              control={
                <Checkbox checked={allParams.N} onChange={handleDisplayedParams} name="N" />
              }
              label="N"
            />
            <FormControlLabel
              control={
                <Checkbox checked={allParams.POT} onChange={handleDisplayedParams} name="POT" />
              }
              label="POT "
            />
            <FormControlLabel
              control={
                <Checkbox checked={allParams.S} onChange={handleDisplayedParams} name="S" />
              }
              label="Solidity "
            />
            <FormControlLabel
              control={
                <Checkbox checked={allParams.T} onChange={handleDisplayedParams} name="T" />
              }
              label="Temptrutre"
            />
            <FormControlLabel
              control={
                <Checkbox checked={allParams.PHO} onChange={handleDisplayedParams} name="PHO" />
              }
              label="PHO"
            />

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
                {allParams.H && (
                  <Line
                    type="monotone"
                    dataKey={"H"}
                    stroke="#82ca9d"
                  />
                )}
                {allParams.N && (
                  <Line
                    type="monotone"
                    dataKey={"N"}
                    stroke="#8984d8"
                  />
                )}
                {allParams.PH && (
                  <Line
                    type="monotone"
                    dataKey={"PH"}
                    stroke="#010111"
                  />
                )}
                {allParams.PHO && (
                  <Line
                    type="monotone"
                    dataKey={"PHO"}
                    stroke="#FF5733"
                  />
                )}
                {allParams.POT && (
                  <Line
                    type="monotone"
                    dataKey={"POT"}
                    stroke="#6A1B9A"
                  />
                )}
                {allParams.S && (
                  <Line
                    type="monotone"
                    dataKey={"S"}
                    stroke="#F4D03F"
                  />
                )}
                {allParams.T && (
                  <Line
                    type="monotone"
                    dataKey={"T"}
                    stroke="#3498DB"
                  />
                )}


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
