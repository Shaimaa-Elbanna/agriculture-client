import React, { useEffect, useState } from 'react'
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../../util/getAndSaveDataLocalStrorage'
import { useGetDeviceOneDataQuery } from '../../state/api'
import { Device } from '../../state/types/device'
import CompareLineChart from '../single/CompareLineChart'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";


interface FieldComponentProps {
  fieldName: string,
  localStorageKeys: LocalStorageKeys
}

interface LocalStorageKeys {
  deviceName: string,
  deviceId: string
}
/**
 * FieldComponent is a component responsible for rendering and managing field-related data.
 * It allows users to select a device, start date, end date, start time, and end time.
 * It also displays a line chart based on the selected parameters.
 */
export default function FieldComponent({fieldName,localStorageKeys}:FieldComponentProps) {
  
    // State variables for device selection
const [selectedDevice, setSelectedDevice] = useState(getDataFromLocalStorage(localStorageKeys.deviceName, "1"))

   // start time and date vars 
   const [selectedTime, setSelectedTime] = useState("")
   console.log("🚀 ~ Single ~ selectedTime:", selectedTime)
   const [selectedDate, setSelectedDate] = useState("");
   console.log("🚀 ~ Single ~ selectedDate:", selectedDate)
   const [startTimePickerActive, setStartTimePickerActive] = useState(true)
   const [startDatePickerActive, setStartDatePickerActive] = useState(true)
 
   // end time and date vars 
   const [selectedEndTime, setSelectedEndTime] = useState("")
   const [selectedEndDate, setSelectedEndDate] = useState("");
   const [endTimePickerActive, setEndTimePickerActive] = useState(true)
   const [endDatePickerActive, setEndDatePickerActive] = useState(true)
 
   // Get yesterday's date
   const yesterday = new Date();
   yesterday.setDate(yesterday.getDate() - 1);
   const year = yesterday.getFullYear();
   const month = String(yesterday.getMonth() + 1).padStart(2, '0');
   const day = String(yesterday.getDate()).padStart(2, '0');
   const defaultSatrtAndEndDate = `${year}-${month}-${day}`;
 
 
   // Fetch data based on the selected device
   const { data, isFetching } = useGetDeviceOneDataQuery(selectedDevice)
   const [fieldData, setFieldData] = useState<Device|undefined>()


   useEffect(() => {
       // Update fieldData when new data is fetched
 if (data) {
      const foundField = data?.find((field:Device) =>
        field.fieldId?.fieldName == fieldName
      )||undefined
      setFieldData(foundField)
    }
       // Save device ID and name to local storage
 saveDataToLocalStorage(localStorageKeys.deviceId, fieldData?._id || "")
    saveDataToLocalStorage(localStorageKeys.deviceName, selectedDevice)

  }, [selectedDevice, data])



  
   // Event handler for device name change
   function handleDviceNameChange(event: SelectChangeEvent<string>) {
    setSelectedDevice(event.target.value)

  }


   // Event handlers for date and time changes
   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    console.log("🚀 ~ Single ~ selectedDate:", selectedDate)

  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    console.log("🚀 ~ Single ~ selectedDate:", selectedDate)

  };
  // Toggle date and time picker visibility
  function toggleStartDatePicker() {
    setStartDatePickerActive(!startDatePickerActive)
  }
  function toggleStartTimePicker() {
    setStartTimePickerActive(!startTimePickerActive)
  }
  function toggleEndDatePicker() {
    setEndDatePickerActive(!endDatePickerActive)
  }
  function toggleEndTimePicker() {
    setEndTimePickerActive(!endTimePickerActive)
  }
    // Event handlers for end date and time changes
function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedEndDate(e.target.value)
  }
  function handleEndTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedEndTime(e.target.value)
  }



  return (
    <div className="single" key={data?.[0]?._id}>
      <div className="view">


        {/* drop down list  */}
        <FormControl sx={{ m: 1, minWidth: 120 }} >
          <InputLabel id="demo-simple-select-label">Devices</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-disabled"
            value={selectedDevice}
            label="selectedDevice"
            onChange={handleDviceNameChange}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Device One</MenuItem>
            <MenuItem value={2}>Device Two</MenuItem>
            <MenuItem value={3}>Device Three</MenuItem>
          </Select>
          <FormHelperText>selectedDevice</FormHelperText>

        </FormControl>
        {/* drop down list  */}

              {/* Date and time pickers */}
  <div style={{ display: "flex", flexDirection: "row" }}>
          {/* select start Date and Time  */}
          <div style={{ marginRight: "20px" }}>
            <div className={`date-picker  ${startDatePickerActive ? "active" : "inactive"}`}>
              <input
                type="date"
                value={selectedDate}
                onInput={handleDateChange}
                disabled={startDatePickerActive}
              />
              <button onClick={toggleStartDatePicker} className="datebutton "
                style={{ backgroundColor: startDatePickerActive ? "green" : "white", color: startDatePickerActive ? "white" : "black" }}>Select Start Date</button>

            </div>

            <div className={`time-picker ${startTimePickerActive ? "active" : "inactive"}`}>
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                disabled={startTimePickerActive}
              />
              <button onClick={toggleStartTimePicker} className="timebutton "
                style={{ backgroundColor: startTimePickerActive ? "green" : "white", color: startTimePickerActive ? "white" : "black" }}
              >Select Start Time</button>

            </div>

          </div>

          {/* select end Date and Time  */}

          <div>
            <div className={`date-picker  ${endDatePickerActive ? "active" : "inactive"}`}>
              <input
                type="date"
                value={selectedEndDate}
                onInput={handleEndDateChange}
                disabled={startDatePickerActive && endDatePickerActive}
              />
              <button onClick={toggleEndDatePicker} className="datebutton "
                style={{ backgroundColor: endDatePickerActive ? "green" : "white", color: endDatePickerActive ? "white" : "black" }}>Select End Date</button>

            </div>

            <div className={`time-picker ${endTimePickerActive ? "active" : "inactive"}`}>
              <input
                type="time"
                value={selectedEndTime}
                onChange={handleEndTimeChange}
                disabled={startTimePickerActive && endTimePickerActive}
              />
              <button onClick={toggleEndTimePicker} className="timebutton "
                style={{ backgroundColor: endTimePickerActive ? "green" : "white", color: endTimePickerActive ? "white" : "black" }}
              >Select End Time</button>

            </div>

          </div>
        </div>

        {/* device info section  */}
        {/* <div className="info">
          <div className="topInfo">
            {/* {props.img && <img src={props.img} alt="" />} */}
            {/* <h1>{data && fieldData?.deviceName ? "Device" + fieldData?.deviceName : "No Data"}</h1>
          </div>
          <div className="details">
            <div className="item" >
              <span className="itemTitle"> Start Date:</span>
              <span className="itemValue">{selectedDate ? selectedDate : defaultSatrtAndEndDate}</span>
            </div>
            <div className="item" >
              <span className="itemTitle"> Start Time:</span>
              <span className="itemValue">{selectedTime ? selectedTime : "08:00 AM"}</span>
            </div>
            <div className="item" >
              <span className="itemTitle"> End Time:</span>
              <span className="itemValue">{selectedEndTime ? selectedEndTime : "22:00 AM"}</span>
            </div>
            <div className="item" >
              <span className="itemTitle"> End Date:</span>
              <span className="itemValue">{selectedDate ? selectedDate : defaultSatrtAndEndDate}</span>
            </div>

          </div>
        </div> */}
        {/* device info section  */}


        {/* linchart section  */}
        <div className="item " style={{marginTop:"20px",marginBottom:"10px"}} >
              <span className="itemTitle"> Start Date:</span>
              <span className="itemValue">{selectedDate ? selectedDate : defaultSatrtAndEndDate}</span>
            </div>
        <CompareLineChart currentDeviceId={fieldData?fieldData._id : ""} startTime={startTimePickerActive ? "08:00" : selectedTime} startDate={startDatePickerActive ? defaultSatrtAndEndDate : selectedDate} endTime={endTimePickerActive ? "22:00" : selectedEndTime} endDate={endDatePickerActive ? "" : selectedEndDate} />

        {/* linchart section  */}



      </div>

    </div >
  );
}
