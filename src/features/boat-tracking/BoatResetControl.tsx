import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material"
import { isEmpty } from "lodash-es"
import { useCallback, useState } from "react"
import { resetSwimlanesAndBoats } from "./module"

type BoatResetControlProps = {
    resetCompletedListener: VoidFunction
}

export function BoatResetControl({ resetCompletedListener }: BoatResetControlProps) {
    const [showForm, setShowForm] = useState(false)

    const resetBoatsList = useCallback(async () => {
        await resetSwimlanesAndBoats()
        setShowForm(false)
        resetCompletedListener()
    }, [resetCompletedListener])

    return (
        <Card sx={{ my: 2 }}>
            <Button
                variant="contained"
                color="error"
                fullWidth={true}
                onClick={() => setShowForm(true)}
            >
                Click here to reset the system
            </Button>

            <Dialog open={showForm}>
                <DialogTitle>
                    Please confirm you want to delete all boats and reset the status columns to
                    their default values
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button onClick={resetBoatsList}>Reset</Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}
