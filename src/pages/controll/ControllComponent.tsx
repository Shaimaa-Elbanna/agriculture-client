import { Autocomplete, Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import './controll.css';
import { generateWateringInputs } from "./generateWateringInput";


interface props {
  repeat: boolean,
  scenario: number
}

const ControllComponent = ({ repeat, scenario }: props) => {
  // Theme hook from Material-UI
  const theme = useTheme();

  // State for form data and API response
  const [controllData, setControllData] = useState<Controll | undefined>();
  const [apiData, setApiData] = useState("")


  // Options for interval and repetition
  const interval = Array.from({ length: 30 }, (_, i) => i + 1 == 1 ? 1 + " day" : i + 1 + " days");
  const repetition = ["1", "2", "3", "4", "5"]


  // Generate watering inputs based on controllData
  const wateringInputs = generateWateringInputs(controllData, handleControllData)



  // Submit form data to the API
  async function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const submitData = await axios.post("http://localhost:3000/controll", controllData)
      setApiData(submitData?.data)

    } catch (error) {
      console.log(error);

    }

  }


  controllData && (controllData.scenario = scenario);
  { controllData && controllData.repetition !== 1 && !repeat && (controllData.repetition = 1) }

  // Update form data based on user input
  function handleControllData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const [fieldName, indexStr] = name.split("_");
    const index = parseInt(indexStr);

    // Update watering data
    if (fieldName === "startTime" || fieldName === "duration") {
      setControllData(prevData => {
        const updatedWatering = [...(prevData?.watering || [])];
        const [hoursStr, minutesStr] = value.split(":");
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        const totalMinutes = hours * 60 + minutes
        updatedWatering[index] = {
          ...(updatedWatering[index] || {}),
          [fieldName]: fieldName == "startTime" ? totalMinutes : parseInt(value.split(" ")[0])
        };

        return {
          ...prevData!,
          watering: updatedWatering
        };
      });
    } else if (fieldName === "repetition") {
      // Update repetition
      setControllData(prevData => ({
        ...prevData!,
        repetition: parseInt(value) || 1,
      }));
    } else if (fieldName === "interval") {
      // Update interval
      setControllData(prevData => ({
        ...prevData!,
        interval: parseInt(value.split(" ")[0]),
      }));
    }
    else {
      // Update other form fields
      setControllData(prevData => ({
        ...prevData!,
        [fieldName]: value,
      }));
    }
  }


  return (
    <>
      <form onSubmit={submitData}>
        <Box p={2}>



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

          {/* Input for selecting interval */}
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
                  name="interval"
                  value={controllData?.interval}
                  onSelect={handleControllData}

                  sx={{ width: 300 }}
                />
              )}
            />
          </Box>

          {/* Input for selecting repetition */}
          {repeat && (
            <Box mt={2}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={repetition.map((option) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select repetition"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    value={controllData?.repetition}
                    name="repetition"
                    onSelect={handleControllData}
                    sx={{ width: 300 }}

                  />
                )}
              />
            </Box>
          )
          }
          {/* Additional watering inputs */}
          {repeat && <hr style={{ maxWidth: 700, marginBottom: "5px", marginTop: "10px" }} />}
          {wateringInputs}


        </Box>
        {apiData ?
          <Typography padding={2} sx={{ color: theme.palette.primary.main, width: "50rem", fontWeight: 'bold' }}>
            {apiData}
          </Typography> :
          <Typography padding={2} sx={{ width: "50rem", color: "gray" }} >
            All data is required
          </Typography>
        }

        {/* Submit button */}
        <Button sx={{ m: 2, background: "cyan" }} type="submit" >Submit</Button>

      </form>
    </>
  );
}

export default ControllComponent;
