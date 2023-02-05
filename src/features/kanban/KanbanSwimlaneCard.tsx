import { ID } from "@/backend/models/types"
import { Card, CardActions, CardContent } from "@mui/material"
import { RefObject } from "react"
import { DraggableProvided } from "react-beautiful-dnd"

type SwimlaneCardProps = {
    title: string
    id?: ID
    dragTools?: DraggableProvided
}

export function SwimlaneCard({ title, dragTools }: SwimlaneCardProps) {
    return (
        <Card
            ref={dragTools?.innerRef}
            {...dragTools?.dragHandleProps}
            {...dragTools?.draggableProps}
        >
            <CardContent>{title}</CardContent>
            <CardActions></CardActions>
        </Card>
    )
}
