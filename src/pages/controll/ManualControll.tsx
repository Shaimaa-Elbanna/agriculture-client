import { Autocomplete, Box, Button, FormControl, FormHelperText, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useStopwatch } from 'react-timer-hook';

export default function ManualControll() {
    const [value, setValue] = useState({
        scenario: "S3",
        status: ""
    });
     const repetition = ["1", "2", "3", "4", "5"]

    const { seconds, minutes, hours, start, reset, pause } = useStopwatch({ autoStart: false });

    async function submitData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const submitData = await axios.post("http://localhost:3000/controll", value)
            console.log("🚀 ~ submitData ~ submitData:", submitData)
            if (submitData.data === 'Message published successfully') {
                if (value.status === "On") {
                    // Your logic when status is "On"
                    start(); // Start the stopwatch when status is "On"
                } else if (value.status === "Off") {
                    // Your logic when status is "Off"
                    reset(); // Pause the stopwatch when status is "Off"
                    pause()
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log("🚀 ~ ManualControll ~ value:", value);

    return (
        <div>
            <Grid container spacing={3}>
                {/* Left side with form */}
                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: '20px' }}>
                        <form onSubmit={submitData}>
                        <Box mt={2}>
            <Autocomplete
              freeSolo
              id="free-solo-1-demo"
              disableClearable
              options={repetition.map((option) => option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select rate"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                  name="rate"
                  sx={{ width: 300 }}
                />
              )}
            />
          </Box>

                            <Box mt={2}>
                                <FormControl sx={{ minWidth: 50 }}>
                                    <FormHelperText>Select Status</FormHelperText>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-disabled"
                                        value={value.status}
                                        label="Select Status"
                                        onChange={(e) => setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                                        name="status"
                                        sx={{ width: 300 }}
                                    >
                                        <MenuItem value={'On'}>On</MenuItem>
                                        <MenuItem value={'Off'}>Off</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
      
                            <Button sx={{ m: 2, background: "cyan" }} type="submit">Submit</Button>
                        </form>
                    </Paper>
                </Grid>

                {/* Right side with stopwatch */}
                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: '20px' }}>
                        <Typography variant="body1">
                            Current status is {value.status ? value.status : "Off"}
                        </Typography>
                        <div>
                            <div>
                                <span >{hours}</span>:
                                <span>{minutes}</span>:
                                <span>{seconds}</span>
                            </div>
                            <div>

                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
