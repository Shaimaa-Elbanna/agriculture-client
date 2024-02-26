
// const [selectedDevice, setSelectedDevice] = useState(getDataFromLocalStorage("reportCurrentDevice", "1"))

// // start time and date vars 
// const [selectedTime, setSelectedTime] = useState("")
// console.log("🚀 ~ Single ~ selectedTime:", selectedTime)
// const [selectedDate, setSelectedDate] = useState("");
// console.log("🚀 ~ Single ~ selectedDate:", selectedDate)
// const [startTimePickerActive, setStartTimePickerActive] = useState(true)
// const [startDatePickerActive, setStartDatePickerActive] = useState(true)

// // end time and date vars 
// const [selectedEndTime, setSelectedEndTime] = useState("")
// console.log("🚀 ~ Single ~ selectedEndTime:", selectedEndTime)
// const [selectedEndDate, setSelectedEndDate] = useState("");
// console.log("🚀 ~ Single ~ selectedEndDate:", selectedEndDate)
// const [endTimePickerActive, setEndTimePickerActive] = useState(true)
// const [endDatePickerActive, setEndDatePickerActive] = useState(true)


// const yesterday = new Date();
// yesterday.setDate(yesterday.getDate() - 1); // Set the date to yesterday

// const year = yesterday.getFullYear();
// const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // Months are zero-based
// const day = String(yesterday.getDate()).padStart(2, '0');


// const defaultSatrtAndEndDate = `${year}-${month}-${day}`;

// const { data, isFetching } = useGetDeviceOneDataQuery(selectedDevice)
// useEffect(() => {
//   saveDataToLocalStorage("selectedDeviceID", data?.[0]?._id || "")
//   saveDataToLocalStorage("reportCurrentDevice", selectedDevice)

// }, [selectedDevice, data])


// const deviceData = data?.[0]?.topics?.[0]?.data?.slice(-50);

// console.log("🚀 ~ Single ~ deviceData:", deviceData)

// function handleDviceNameChange(event: SelectChangeEvent<string>) {
//   setSelectedDevice(event.target.value)

// }









// const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setSelectedDate(e.target.value);
//   console.log("🚀 ~ Single ~ selectedDate:", selectedDate)

// };
// const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setSelectedTime(e.target.value);
//   console.log("🚀 ~ Single ~ selectedDate:", selectedDate)

// };
// function toggleStartDatePicker() {
//   setStartDatePickerActive(!startDatePickerActive)
// }
// function toggleStartTimePicker() {
//   setStartTimePickerActive(!startTimePickerActive)
// }
// function toggleEndDatePicker() {
//   if (!startDatePickerActive) {
//     setEndDatePickerActive(!endDatePickerActive)

//   }
// }
// function toggleEndTimePicker() {
//   if (!startTimePickerActive) {
//     setEndTimePickerActive(!endTimePickerActive)

//   }
// }
// function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
//   setSelectedEndDate(e.target.value)
// }
// function handleEndTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
//   setSelectedEndTime(e.target.value)
// }



// return (
//   <div className="single" key={data?.[0]?._id}>
//     <div className="view">
//       <FormControl sx={{ m: 1, minWidth: 120 }} >
//         <InputLabel id="demo-simple-select-label">Devices</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select-disabled"
//           value={selectedDevice}
//           label="selectedDevice"
//           onChange={handleDviceNameChange}
//         >
//           <MenuItem value={0}>
//             <em>None</em>
//           </MenuItem>
//           <MenuItem value={1}>Device One</MenuItem>
//           <MenuItem value={2}>Device Two</MenuItem>
//           <MenuItem value={3}>Device Three</MenuItem>
//         </Select>
//         <FormHelperText>selectedDevice</FormHelperText>

//       </FormControl>
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         {/* select start Date and Time  */}
//         <div style={{ marginRight: "20px" }}>
//           <div className={`date-picker  ${startDatePickerActive ? "active" : "inactive"}`}>
//             <input
//               type="date"
//               value={selectedDate}
//               onInput={handleDateChange}
//               disabled={startDatePickerActive}
//             />
//             <button onClick={toggleStartDatePicker} className="datebutton "
//               style={{ backgroundColor: startDatePickerActive ? "green" : "white", color: startDatePickerActive ? "white" : "black" }}>Select Start Date</button>

//           </div>

//           <div className={`time-picker ${startTimePickerActive ? "active" : "inactive"}`}>
//             <input
//               type="time"
//               value={selectedTime}
//               onChange={handleTimeChange}
//               disabled={startTimePickerActive}
//             />
//             <button onClick={toggleStartTimePicker} className="timebutton "
//               style={{ backgroundColor: startTimePickerActive ? "green" : "white", color: startTimePickerActive ? "white" : "black" }}
//             >Select Start Time</button>

//           </div>

//         </div>

//         {/* select end Date and Time  */}

//         <div>
//           <div className={`date-picker  ${endDatePickerActive ? "active" : "inactive"}`}>
//             <input
//               type="date"
//               value={selectedEndDate}
//               onInput={handleEndDateChange}
//               disabled={startDatePickerActive}
//             />
//             <button onClick={toggleEndDatePicker} className="datebutton "
//               style={{ backgroundColor: endDatePickerActive ? "green" : "white", color: endDatePickerActive ? "white" : "black" }}>Select End Date</button>

//           </div>

//           <div className={`time-picker ${endTimePickerActive ? "active" : "inactive"}`}>
//             <input
//               type="time"
//               value={selectedEndTime}
//               onChange={handleEndTimeChange}
//               disabled={startDatePickerActive}
//             />
//             <button onClick={toggleEndTimePicker} className="timebutton "
//               style={{ backgroundColor: endTimePickerActive ? "green" : "white", color: endTimePickerActive ? "white" : "black" }}
//             >Select End Time</button>

//           </div>