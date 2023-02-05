import Head from "next/head"
import { ContentWithTopNavigation } from "@/features/layouts/ContentWithTopNavigation"
import { first, isUndefined, orderBy } from "lodash-es"
import { MuiKanbanContainer } from "@/features/kanban/MuiKanbanContainer"
import { useCallback, useEffect, useState } from "react"
import { DropResult } from "react-beautiful-dnd"
import {
    SwimlaneBoatMap,
    fetchBoatsAndGroupBySwimlanes,
} from "@/features/boat-status-tracking/module"

export default function BoatStatus() {
    const [{ isLoading, swimlanes }, setState] = useState({
        isLoading: true,
        swimlanes: {} as SwimlaneBoatMap,
    })

    const moveBoat = useCallback(
        (result: DropResult) => {
            const { droppableId: oldLaneId, index: oldLaneIndex } = result.source
            const { droppableId: newLaneId, index: newLaneIndex } = result.destination || {}
            if (isUndefined(newLaneId) || isUndefined(newLaneIndex)) {
                return
            }

            const item = first(swimlanes[oldLaneId].items.splice(oldLaneIndex, 1))
            if (item) {
                swimlanes[newLaneId].items.splice(newLaneIndex, 0, item)
                setState({ swimlanes, isLoading: false })
            }
        },
        [swimlanes]
    )

    const refreshStatuses = useCallback(async () => {
        setState((s) => ({ ...s, isLoading: true }))

        const result = await fetchBoatsAndGroupBySwimlanes()

        setState((s) => ({ ...s, swimlanes: result, isLoading: false }))
    }, [])

    useEffect(() => {
        refreshStatuses()
    }, [refreshStatuses])

    return (
        <>
            <Head>
                <title>Boat Status Page</title>
                <meta
                    name="description"
                    content="shows a kanban-like list of boats in their respective status columns"
                />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ContentWithTopNavigation
                refreshHandler={!isLoading ? refreshStatuses : undefined}
                isLoading={isLoading}
                allowActions={!isLoading}
                title="Boat Statuses"
            >
                <MuiKanbanContainer
                    swimlanes={orderBy(swimlanes, "position")}
                    dragEndHandler={moveBoat}
                />
            </ContentWithTopNavigation>
        </>
    )
}
