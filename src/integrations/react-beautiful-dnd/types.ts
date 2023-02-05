export type DragItem = {
    droppableId: string
    index: number
}

export type DragEndHandlerContext = {
    destination: DragItem
    source: DragItem
    draggableId: string
}

export type DragEndHandler = (context: DragEndHandlerContext) => void
