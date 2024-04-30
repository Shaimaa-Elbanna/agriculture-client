import { Autocomplete, Box, TextField } from "@mui/material";
import { ReactEventHandler } from "react";
const minutes = Array.from({ length: 60 }, (_, i) => i + 1 == 1 ? 1 + " min" : i + 1 + " mins");

const convertToHHMM = (totalMinutes: string) => {
  const hours = Math.floor(parseInt(totalMinutes) / 60);
  const minutes = parseInt(totalMinutes) % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};


export const generateWateringInputs = (controllData:any,handleControllData: ReactEventHandler<HTMLDivElement> | undefined) => {
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
              value={convertToHHMM((controllData?.watering?.[index]?.startTime ?? '').toString() || '0')}
              onChange={handleControllData}
              name={`startTime_${index}`}

            />
          </div>

        </Box>
        {index < (controllData?.repetition || 1) - 1 && <hr style={{ maxWidth: 700, marginBottom: "5px", marginTop: "10px" }} />}
      </div>
    ))
  }