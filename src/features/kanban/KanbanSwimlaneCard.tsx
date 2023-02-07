import { ID } from "@/backend/models/types"
import { DragIndicator } from "@mui/icons-material"
import { Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material"
import { green } from "@mui/material/colors"
import { DraggableProvided } from "react-beautiful-dnd"
import { BoatEditorControl } from "../boat-tracking/BoatEditorControl"

type SwimlaneCardProps = {
    item: {
        name: string
        updatedAt?: Date
    }
    id: ID
    dragTools?: DraggableProvided
    isDragging?: boolean
    dataChangeHandler: VoidFunction
}

export function KanbanSwimlaneCard({
    item,
    id,
    isDragging,
    dragTools,
    dataChangeHandler,
}: SwimlaneCardProps) {
    const title = item.name
    const lastUpdate = item.updatedAt?.toLocaleTimeString()

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
                        <Stack>
                            <Typography variant="button" display="block" gutterBottom>
                                {title}
                            </Typography>

                            {lastUpdate && (
                                <Typography variant="caption" display="block" gutterBottom>
                                    {`Last status update: ${lastUpdate}`}
                                </Typography>
                            )}
                        </Stack>
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
