import { ID } from "@/backend/models/types"
import { Box, Card, CardContent } from "@mui/material"
import { DraggableProvided } from "react-beautiful-dnd"

type SwimlaneCardProps = {
    title: string
    id?: ID
    dragTools?: DraggableProvided
    barOnly?: boolean
}

export function SwimlaneCard({ title, barOnly, dragTools }: SwimlaneCardProps) {
    return (
        <Card
            ref={dragTools?.innerRef}
            {...dragTools?.dragHandleProps}
            {...dragTools?.draggableProps}
        >
            <CardContent>
                {!barOnly && (
                    <Box display="flex" justifyContent="center" alignItems="center" my={2}>
                        {title}
                    </Box>
                )}
                {barOnly && <Box sx={{ height: "1px" }} />}
            </CardContent>
        </Card>
    )
}
