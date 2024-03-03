import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useGetDeviceOneDataQuery } from "../../state/api";
import '../products/products.scss'

import { useEffect, useState } from "react";
import { getDataFromLocalStorage, saveDataToLocalStorage } from "../../util/getAndSaveDataLocalStrorage";
import CompareLineChart from "../../components/single/CompareLineChart";
import { Device } from "../../state/types/device";

type Props = {
  img?: string;

};





const FieldTwo = (props: Props) => {

  const [selectedDevice, setSelectedDevice] = useState(getDataFromLocalStorage("reportCurrentDeviceF2", "1"))

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


  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');


  const defaultSatrtAndEndDate = `${year}-${month}-${day}`;

  const { data, isFetching } = useGetDeviceOneDataQuery(selectedDevice)
  console.log("🚀 ~ Single ~ data:", data)
  const [fieldtwo, setFieldTwo] = useState<Device|undefined>()
  useEffect(() => {
    if (data) {
      const fieldtwo = data?.find((field:Device) =>
        field.fieldId?.fieldName == "F2"
      )||undefined
      setFieldTwo(fieldtwo)
    }

    console.log("🚀 ~ fieldtwo ~ fieldtwo:", fieldtwo)
    saveDataToLocalStorage("selectedDeviceIDF2", fieldtwo?._id || "")
    saveDataToLocalStorage("reportCurrentDeviceF2", selectedDevice)

  }, [selectedDevice, data])




  function handleDviceNameChange(event: SelectChangeEvent<string>) {
    setSelectedDevice(event.target.value)

  }


  useEffect(() => {

  }, [selectedDevice, isFetching])







  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    console.log("🚀 ~ Single ~ selectedDate:", selectedDate)

  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    console.log("🚀 ~ Single ~ selectedDate:", selectedDate)

  };
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
        <hr />

        {/* device info section  */}
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{data && fieldtwo?.deviceName ? "Device" + fieldtwo?.deviceName : "No Data"}</h1>
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
        </div>
        {/* device info section  */}


        {/* linchart section  */}

        <CompareLineChart currentDeviceId={fieldtwo?fieldtwo._id : ""} startTime={startTimePickerActive ? "08:00" : selectedTime} startDate={startDatePickerActive ? defaultSatrtAndEndDate : selectedDate} endTime={endTimePickerActive ? "22:00" : selectedEndTime} endDate={endDatePickerActive ? "" : selectedEndDate} />

        {/* linchart section  */}



      </div>

    </div >
  );
};


export default FieldTwo;











// what is required now is to adjust the toggle buttons 