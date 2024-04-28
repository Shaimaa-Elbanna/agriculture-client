import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import './controll.css';


interface props {
  repeat: boolean,
  scenario: string
}

const ControllComponent = ({ repeat, scenario }: props) => {
  const [controllData, setControllData] = useState<Controll | undefined>();


  const minutes = Array.from({ length: 60 }, (_, i) => i + 1 == 1 ? "1 min" : i + 1 + " mins");
  const interval = ["Day", "Week", "Month"];
  const repetition = ["1", "2", "3", "4", "5"]
  const generateWateringInputs = () => {
    return Array.from({ length: controllData?.repetition || 1 }, (_, index) => (
      <div key={index}>
        <Box mt={2}>
          <Autocomplete
            freeSolo
            id={`free-solo-${index}-demo`}
            disableClearable
            options={minutes.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Select duration ${index + 1}`}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
                value={(controllData && controllData.watering && controllData.watering[index] && controllData.watering[index].duration) || ''}
                name={`duration_${index}`}
                onSelect={handleControllData}
                sx={{ width: 300 }}
              />
            )}
          />
        </Box>


        <Box mt={2}>
          <div className='time-picker active '>
            <span>select start time  {index + 1}  :      </span>

            <input
              type="time"
              value={(controllData && controllData.watering && controllData.watering[index] && controllData.watering[index]?.startTime) || ''}
              onChange={handleControllData}
              name={`startTime_${index}`}

            />
          </div>

        </Box>
        {index < (controllData?.repetition || 1) - 1 && <hr style={{ maxWidth: 700, marginBottom: "5px", marginTop: "10px" }} />}
      </div>
    ))
  }

  const wateringInputs = generateWateringInputs()








  async function submitData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const submitData = await axios.post("http://localhost:3000/controll", controllData)
      console.log("🚀 ~ submitData ~ submitData:", submitData)
    } catch (error) {
      console.log(error);

    }

  }


  controllData && (controllData.scenario = scenario);
  controllData && (controllData.status = "On");
  {controllData && controllData.repetition !== 1 && !repeat && (controllData.repetition=1)}

  function handleControllData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const [fieldName, indexStr] = name.split("_");
    const index = parseInt(indexStr);

    if (fieldName === "startTime" || fieldName === "duration") {
      setControllData(prevData => {
        const updatedWatering = [...(prevData?.watering || [])];
        updatedWatering[index] = {
          ...(updatedWatering[index] || {}),
          [fieldName]: value.split(" ")[0]
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
    } else if (fieldName === "scenario" || fieldName === "status") {
      setControllData(prevData => ({
        ...prevData!,
        scenario: scenario,
        status: "On",
      }));
    } else {
      setControllData(prevData => ({
        ...prevData!,
        [fieldName]: value,
      }));
    }
  }

  console.log("🚀 ~ ControllComponent ~ controllData:", controllData)

  return (
    <>
      <form onSubmit={submitData}>
        <Box p={2}>


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
                  value={controllData?.interval}
                  name="interval"
                  onSelect={handleControllData}
                  sx={{ width: 300 }}
                />
              )}
            />
          </Box>




          {repeat ?
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
            :
            ""
          }
          {repeat && <hr style={{ maxWidth: 700, marginBottom: "5px", marginTop: "10px" }} />}

          {wateringInputs}


        </Box>
        <Button sx={{ m: 2, background: "cyan" }} type="submit" >Submit</Button>

      </form>
    </>
  );
}

export default ControllComponent;
