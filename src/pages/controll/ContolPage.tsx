import ControllComponent from './ControllComponent'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import ManualControll from './ManualControll';
export default function ContolPage() {
    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography  variant="h5" >Watering once a day</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ControllComponent repeat={false} scenario="S1" />

                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography variant="h5">Watering multiple times a day</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ControllComponent repeat={true} scenario="S2" />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography variant="h5">Manual Watering </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ManualControll />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
