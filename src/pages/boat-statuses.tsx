import Head from "next/head"
import { ContentWithTopNavigation } from "@/features/layouts/ContentWithTopNavigation"
import { first, isEmpty, isNumber, isObject, isUndefined, orderBy, parseInt } from "lodash-es"
import { MuiKanbanContainer } from "@/features/kanban/MuiKanbanContainer"
import { BaseSyntheticEvent, useCallback, useContext, useEffect, useState } from "react"
import { DropResult } from "react-beautiful-dnd"
import {
    SwimlaneBoatMap,
    calculateNewSwimlanePositions,
    fetchBoatsAndGroupBySwimlanes,
    updateBoatStatus,
} from "@/features/boat-tracking/module"
import { BoatCreatorControl } from "@/features/boat-tracking/BoatCreatorControl"
import { suspendIntervalFlag, useInterval } from "@/tools/useInterval"
import { AdvancedTrackingToolsBox } from "@/features/boat-tracking/AdvancedTrackingToolBox"
import { RefreshIntervalControl } from "@/features/boat-tracking/RefreshIntervalControl"
import { RefreshTrackingCard } from "@/features/boat-tracking/RefreshTrackingCard"
import { UserGroupContext } from "@/features/mode-selection/UserGroupContextProvider"

export default function BoatStatuses() {
    const { showCoordinatorControls } = useContext(UserGroupContext)
    const [{ isLoading, swimlanes, autoRefreshInterval, refreshedAt }, setState] = useState({
        autoRefreshInterval: suspendIntervalFlag,
        isLoading: true,
        swimlanes: {} as SwimlaneBoatMap,
        refreshedAt: undefined as Date | undefined,
        count: 0,
    })

    const moveBoat = useCallback(
        async (dropResult: DropResult) => {
            const result = calculateNewSwimlanePositions(swimlanes, dropResult)
            if (!isObject(result)) {
                return
            }

            setState((s) => ({
                ...s,
                swimlanes: result.swimlanes,
                isLoading: false,
            }))

            const updateResult = await updateBoatStatus(result.updatedItemId, result.newLaneId)
            if (isUndefined(updateResult)) {
                console.error("Unable to update the boat status")
                return
            }
        },
        [swimlanes]
    )

    const refreshStatuses = useCallback(async () => {
        setState((s) => ({ ...s, isLoading: true }))

        const result = await fetchBoatsAndGroupBySwimlanes()

        setState((s) => ({ ...s, swimlanes: result, isLoading: false, refreshedAt: new Date() }))
    }, [])

    const autoRefreshHandler = useCallback(async () => {
        await refreshStatuses()
        console.log("Finished auto refresh at", new Date().toLocaleTimeString())
    }, [refreshStatuses])

    useInterval(autoRefreshHandler, autoRefreshInterval)

    const handleIntervalChange = useCallback((e: BaseSyntheticEvent) => {
        const formValue = parseInt(e?.target?.value)
        let newValue = suspendIntervalFlag
        if (isNumber(formValue) && formValue > 0) {
            newValue = formValue
        }

        setState((s) => ({ ...s, autoRefreshInterval: newValue }))
    }, [])

    useEffect(() => {
        refreshStatuses()
    }, [refreshStatuses])

    const isFirstLoad = isEmpty(swimlanes) && isLoading
    const orderedSwimlanes = orderBy(swimlanes, "position")

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
                <>
                    {showCoordinatorControls && (
                        <AdvancedTrackingToolsBox resetCompletedListener={refreshStatuses} />
                    )}

                    {showCoordinatorControls && (
                        <BoatCreatorControl
                            newBoatHandler={refreshStatuses}
                            statusId={first(orderedSwimlanes)?.id}
                        />
                    )}

                    <RefreshTrackingCard isFirstLoad={isFirstLoad} refreshedAt={refreshedAt}>
                        <RefreshIntervalControl
                            value={autoRefreshInterval}
                            intervalChangeHandler={handleIntervalChange}
                        />
                    </RefreshTrackingCard>

                    <MuiKanbanContainer
                        swimlanes={orderedSwimlanes}
                        dragEndHandler={moveBoat}
                        dataChangeHandler={refreshStatuses}
                    />
                </>
            </ContentWithTopNavigation>
        </>
    )
}
