import { ID } from "@/backend/models/types"
import { Button, Dialog, DialogActions, DialogContent, IconButton, TextField } from "@mui/material"
import { isEmpty, isUndefined } from "lodash-es"
import { useCallback, useContext, useState } from "react"
import { deleteBoat, updateBoatName } from "./module"
import { isValidId } from "@/tools/isValidId"
import { Edit } from "@mui/icons-material"
import { UserGroupContext } from "../mode-selection/UserGroupContextProvider"

type BoatEditorControlProps = {
    dataChangeListener: VoidFunction
    id: ID
    name: string
}

export function BoatEditorControl({
    dataChangeListener,
    id,
    name: defaultName,
}: BoatEditorControlProps) {
    const { showCoordinatorControls } = useContext(UserGroupContext)
    const [{ name, showForm }, setState] = useState<{
        name?: string
        showForm: boolean
    }>({ showForm: false, name: defaultName })
    const updateNameHandler = useCallback(async () => {
        if (!(isEmpty(name) || isUndefined(name)) && isValidId(id)) {
            await updateBoatName(id, name)
            dataChangeListener()
        }

        setState({ showForm: false, name: undefined })
    }, [dataChangeListener, id, name])

    const deleteHandler = useCallback(async () => {
        await deleteBoat(id)

        setState({ showForm: false, name: undefined })
        dataChangeListener()
    }, [dataChangeListener, id])

    if (!showCoordinatorControls) {
        return null
    }

    return (
        <>
            <IconButton
                aria-label="edit boat"
                onClick={() => setState((s) => ({ ...s, showForm: true }))}
            >
                <Edit />
            </IconButton>

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
                        defaultValue={defaultName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteHandler}>Delete</Button>

                    <Button onClick={() => setState((s) => ({ ...s, showForm: false }))}>
                        Cancel
                    </Button>

                    <Button disabled={isEmpty(name)} onClick={updateNameHandler}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
