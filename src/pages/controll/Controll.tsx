import { Autocomplete, Box, Button, FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import './controll.css';

const Controll = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i + 1== 1?   " one hour" : i+1 +" hours");
  const interval = ["Day", "week", "Month"];

  const [controllData, setControllData] = useState({
    status: "",
    interval: "",
    startTime: "",
    duration: ""
  });
  async function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const submitData = await axios.post("http://localhost:3000/controll", controllData)
    } catch (error) {
      console.log(error);

    }

  }

  function handleControllData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setControllData(prevData => ({ ...prevData, [name]: value }));
  }

  const handleSelectStatus = (e: SelectChangeEvent<string>) => {
    setControllData(prevData => ({ ...prevData, status: e.target.value }));
  };

  return (
    <>
      <form onSubmit={submitData}>
        <Box p={2}>
          <FormControl sx={{ minWidth: 50 }}>
            <FormHelperText>Select Status</FormHelperText>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-disabled"
              value={controllData.status}
              label="Select Status"
              onChange={handleSelectStatus}
              name="status"
              sx={{ width: 300 }} 

            >
              <MenuItem value={'On'}>On</MenuItem>
              <MenuItem value={'Off'}>Off</MenuItem>
            </Select>
          </FormControl>

          <Box mt={2}>
            <Autocomplete
              freeSolo
              id="free-solo-1-demo"
              disableClearable
              options={interval.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select interval"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                  value={controllData.interval}
                  name="interval"
                  onSelect={handleControllData}
                  sx={{ width: 300 }} 
                />
              )}
            />
          </Box>

          <Box mt={2}>
            <div className='time-picker active '>
            <span>select start time    :      </span>

              <input
                type="time"
                value={controllData.startTime}
                onChange={handleControllData}
                name="startTime"

              />
            </div>

          </Box>

          <Box mt={2}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={hours.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select duration"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                  value={controllData.duration}
                  name="duration"
                  onSelect={handleControllData}
                  sx={{ width: 300 }} 

                />
              )}
            />
          </Box>
        </Box>
        <Button sx={{ m: 2, background: "cyan" }} type="submit" >Submit</Button>

      </form>
    </>
  );
}

export default Controll;
