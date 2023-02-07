import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { BoatResetControl } from "@/features/boat-tracking/BoatResetControl"
import { ExpandMore } from "@mui/icons-material"

type AdvancedTrackingToolsBoxProps = {
    // function to call when the reset control has been clicked
    resetCompletedListener: VoidFunction
}

export function AdvancedTrackingToolsBox({
    resetCompletedListener,
}: AdvancedTrackingToolsBoxProps) {
    return (
        <Accordion sx={{ my: 2, backgroundColor: "warning.light" }}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Advanced Office Coordinator Tools</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <BoatResetControl resetCompletedListener={resetCompletedListener} />
            </AccordionDetails>
        </Accordion>
    )
}
