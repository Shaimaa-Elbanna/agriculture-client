import { Autocomplete, Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios"
import './controll.css';
import { generateWateringInputs } from "./generateWateringInput";


interface props {
  repeat: boolean,
  scenario: number
}

const ControllComponent = ({ repeat, scenario }: props) => {

  const theme = useTheme();

  const [controllData, setControllData] = useState<Controll | undefined>();
  const [apiData, setApiData] = useState("")


  const interval = Array.from({ length: 30 }, (_, i) => i + 1 == 1 ? 1 + " day" : i + 1 + " days");
  const repetition = ["1", "2", "3", "4", "5"]


  const wateringInputs = generateWateringInputs(controllData, handleControllData)








  async function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const submitData = await axios.post("http://localhost:3000/controll", controllData)
       setApiData(submitData?.data)
      // if (apiData == "Message published successfully") {
      //   setControllData(
      //     {
      //       scenario: 0,
      //       status: 0,
      //       interval: 0,
      //       repetition: 1,
      //       watering: []

      //     });
          
      //   }
        console.log(controllData);

      console.log("🚀 ~ submitData ~ apiData:", apiData)
      console.log("🚀 ~ submitData ~ submitData:", submitData)
    } catch (error) {
      console.log(error);

    }

  }
  console.log("🚀 ~ submitData ~ apiData:", apiData)


  controllData && (controllData.scenario = scenario);
  { controllData && controllData.repetition !== 1 && !repeat && (controllData.repetition = 1) }

  function handleControllData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const [fieldName, indexStr] = name.split("_");
    const index = parseInt(indexStr);

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
      setControllData(prevData => ({
        ...prevData!,
        repetition: parseInt(value) || 1,
      }));
    } else if (fieldName === "interval") {
      setControllData(prevData => ({
        ...prevData!,
        interval: parseInt(value.split(" ")[0]) ,
      }));
    }
    else {
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

        <Button sx={{ m: 2, background: "cyan" }} type="submit" >Submit</Button>

      </form>
    </>
  );
}

export default ControllComponent;
