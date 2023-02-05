import { Stack } from "@mui/material"
import { KanbanSwimlane } from "@/features/kanban/KanbanSwimlane"
import { SwimlaneCard } from "@/features/kanban/KanbanSwimlaneCard"
import { DragDropContext, Draggable, OnDragEndResponder } from "react-beautiful-dnd"
import { StrictModeDroppable } from "@/integrations/react-beautiful-dnd/StrictModeDroppable"
import { map } from "lodash-es"
import { ID } from "@/backend/models/types"

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
export function MuiKanbanContainer({ swimlanes, dragEndHandler }: KanbanContainerProps) {
    return (
        <DragDropContext onDragEnd={dragEndHandler}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
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
