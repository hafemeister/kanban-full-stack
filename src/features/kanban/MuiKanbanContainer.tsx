import {
    Alert,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Snackbar,
    Stack,
    duration,
    useMediaQuery,
} from "@mui/material"
import { KanbanSwimlane } from "@/features/kanban/KanbanSwimlane"
import { SwimlaneCard } from "@/features/kanban/KanbanSwimlaneCard"
import {
    DragDropContext,
    DragStart,
    Draggable,
    DropResult,
    OnDragEndResponder,
    ResponderProvided,
} from "react-beautiful-dnd"
import { StrictModeDroppable } from "@/integrations/react-beautiful-dnd/StrictModeDroppable"
import { isUndefined, map } from "lodash-es"
import { ID } from "@/backend/models/types"
import { useCallback, useState } from "react"
import { useTheme } from "@mui/material/styles"
import { Close } from "@mui/icons-material"

type KanbanContainerProps = {
    swimlanes: {
        id: ID
        title: string
        items: {
            id: ID
            name: string
        }[]
    }[]
    dragEndHandler: OnDragEndResponder
}

/**
 * provides the generic, but somewhat ugly integration of react-beautiful-dnd constructs interlaced with the right material-ui
 * elements to ensure we have a decently formatted swimlane setup to provide a foundation for a mobile friendly kanban board container
 */
export function MuiKanbanContainer({
    swimlanes,
    dragEndHandler: dragEndHandlerExtension,
}: KanbanContainerProps) {
    const [isDraggingId, setIsDraggingId] = useState<string | undefined>()
    const [showAlert, setShowAlert] = useState(true)

    const handleDragStart = useCallback((dragItem: DragStart) => {
        setIsDraggingId(dragItem.draggableId)
    }, [])
    const theme = useTheme()
    const isWideEnoughScreen = useMediaQuery(theme.breakpoints.up("md"))
    const dragEndHandler = useCallback(
        (dropResult: DropResult, provider: ResponderProvided) => {
            setIsDraggingId(undefined)
            dragEndHandlerExtension(dropResult, provider)
        },
        [dragEndHandlerExtension]
    )

    const isDragging = !isUndefined(isDraggingId)
    return (
        <DragDropContext onDragEnd={dragEndHandler} onDragStart={handleDragStart}>
            <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
                justifyContent={"space-around"}
            >
                {!isWideEnoughScreen && (
                    <Snackbar open={showAlert}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setShowAlert(false)
                                    }}
                                >
                                    <Close fontSize="inherit" />
                                </IconButton>
                            }
                            severity="warning"
                        >
                            Your screen is too narrow for the Kanban swimlanes. For the best user
                            experience, please switch your device to landscape mode!
                        </Alert>
                    </Snackbar>
                )}
                {swimlanes.map(({ id, title, items }, index) => (
                    <KanbanSwimlane title={title} key={index}>
                        {/* react-18 introduced some strict-mode flaws, which this custom component solves: */}
                        <StrictModeDroppable droppableId={id}>
                            {(dropTools) => (
                                <Stack
                                    direction={"column"}
                                    spacing={2}
                                    ref={dropTools.innerRef}
                                    {...dropTools.droppableProps}
                                >
                                    {map(items, (item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(dragTools) => (
                                                <SwimlaneCard
                                                    barOnly={
                                                        !isWideEnoughScreen &&
                                                        isDragging &&
                                                        isDraggingId !== item.id
                                                    }
                                                    title={item.name}
                                                    dragTools={dragTools}
                                                ></SwimlaneCard>
                                            )}
                                        </Draggable>
                                    ))}
                                    {dropTools.placeholder}
                                </Stack>
                            )}
                        </StrictModeDroppable>
                    </KanbanSwimlane>
                ))}
            </Stack>
        </DragDropContext>
    )
}
