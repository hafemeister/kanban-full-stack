import { ID } from "@/backend/models/types"
import { Button, Card, Dialog, DialogActions, DialogContent, TextField } from "@mui/material"
import { isEmpty, isUndefined } from "lodash-es"
import { useCallback, useState } from "react"
import { addNewBoat } from "./module"
import { isValidId } from "@/tools/isValidId"

type BoatCreatorControlProps = {
    newBoatHandler: VoidFunction
    statusId?: ID
}

export function BoatCreatorControl({ newBoatHandler, statusId }: BoatCreatorControlProps) {
    const [{ name, showForm }, setState] = useState<{
        name?: string
        showForm: boolean
    }>({ showForm: false })

    const addBoat = useCallback(
        async (name: string | undefined) => {
            if (!(isEmpty(name) || isUndefined(name)) && isValidId(statusId)) {
                await addNewBoat(name, statusId)
                newBoatHandler()
            }

            setState({ showForm: false, name: undefined })
        },
        [newBoatHandler, statusId]
    )

    return (
        <Card sx={{ my: 2 }}>
            <Button
                variant="contained"
                fullWidth={true}
                onClick={() => setState((s) => ({ ...s, showForm: true }))}
            >
                Click here to add a boat
            </Button>

            <Dialog open={showForm}>
                <DialogContent>
                    <TextField
                        onChange={(event) =>
                            setState((s) => ({ ...s, name: event?.target?.value }))
                        }
                        sx={{ width: 300 }}
                        id="outlined-basic"
                        label="Enter the name for the boat"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setState((s) => ({ ...s, showForm: false }))}>
                        Cancel
                    </Button>
                    <Button disabled={isEmpty(name)} onClick={() => addBoat(name)}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    )
}
