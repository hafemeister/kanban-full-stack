import { ID } from "@/backend/models/types"
import { DragIndicator } from "@mui/icons-material"
import { Box, Card, CardContent, IconButton, Stack } from "@mui/material"
import { green } from "@mui/material/colors"
import { DraggableProvided } from "react-beautiful-dnd"
import { BoatEditorControl } from "../boat-tracking/BoatEditorControl"

type SwimlaneCardProps = {
    title: string
    id: ID
    dragTools?: DraggableProvided
    isDragging?: boolean
    dataChangeHandler: VoidFunction
}

export function SwimlaneCard({
    title,
    id,
    isDragging,
    dragTools,
    dataChangeHandler,
}: SwimlaneCardProps) {
    return (
        <Card
            ref={dragTools?.innerRef}
            {...dragTools?.dragHandleProps}
            {...dragTools?.draggableProps}
            sx={{
                ...(isDragging && {
                    border: "1px solid green",
                    backgroundColor: green[400],
                }),
            }}
        >
            <CardContent>
                <Stack direction="row" justifyContent={"space-between"}>
                    <IconButton>
                        <DragIndicator />
                    </IconButton>

                    <Box display="flex" justifyContent="center" alignItems="center" my={2}>
                        {title}
                    </Box>

                    <BoatEditorControl
                        name={title}
                        dataChangeListener={dataChangeHandler}
                        id={id}
                    />
                </Stack>
            </CardContent>
        </Card>
    )
}
