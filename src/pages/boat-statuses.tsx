import Head from "next/head"
import { ContentWithTopNavigation } from "@/features/layouts/ContentWithTopNavigation"
import { first, isEmpty, isUndefined, orderBy } from "lodash-es"
import { MuiKanbanContainer } from "@/features/kanban/MuiKanbanContainer"
import { useCallback, useEffect, useState } from "react"
import { DropResult } from "react-beautiful-dnd"
import {
    SwimlaneBoatMap,
    fetchBoatsAndGroupBySwimlanes,
    updateBoatStatus,
} from "@/features/boat-tracking/module"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    Grid,
    Switch,
    Typography,
} from "@mui/material"
import { BoatCreatorControl } from "@/features/boat-tracking/BoatCreatorControl"
import { BoatResetControl } from "@/features/boat-tracking/BoatResetControl"
import { ExpandMore } from "@mui/icons-material"
import { Stack } from "@mui/system"

export default function BoatStatuses() {
    const [{ isLoading, swimlanes, autoRefresh, refreshedAt }, setState] = useState({
        autoRefresh: false,
        isLoading: true,
        swimlanes: {} as SwimlaneBoatMap,
        refreshedAt: undefined as Date | undefined,
        count: 0,
    })

    const moveBoat = useCallback(
        async (dropResult: DropResult) => {
            const { droppableId: oldLaneId, index: oldLaneIndex } = dropResult.source
            const { droppableId: newLaneId, index: newLaneIndex } = dropResult.destination || {}
            if (isUndefined(newLaneId) || isUndefined(newLaneIndex)) {
                return
            }

            // do not split early, as that will cause "blinking" effect
            const item = swimlanes[oldLaneId].items[oldLaneIndex]
            if (!item) {
                console.error("Unknown error when looking at drop result", { dropResult })
                return
            }

            swimlanes[oldLaneId].items.splice(oldLaneIndex, 1)
            swimlanes[newLaneId].items.splice(newLaneIndex, 0, item)
            setState((s) => ({ ...s, swimlanes, isLoading: false }))

            const result = await updateBoatStatus(item.id, newLaneId)
            if (isUndefined(result)) {
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

    // useInterval(refreshStatuses, 10000)

    useEffect(() => {
        refreshStatuses()
    }, [refreshStatuses])

    const isFirstLoad = isEmpty(swimlanes) && isLoading
    const canAddBoat = true
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
                {canAddBoat && (
                    <Accordion sx={{ my: 2, backgroundColor: "warning.light" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Advanced Operator Tools</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BoatResetControl resetCompletedListener={refreshStatuses} />
                        </AccordionDetails>
                    </Accordion>
                )}

                <Card sx={{ my: 2 }}>
                    <CardContent>
                        <Stack spacing={2}>
                            {isFirstLoad && (
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    One moment please while we load your list of boats...
                                </Box>
                            )}

                            {!isFirstLoad && (
                                <Grid
                                    container
                                    direction={"row"}
                                    justifyContent={"space-between"}
                                    alignContent={"center"}
                                >
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Switch
                                            onClick={() =>
                                                setState((s) => ({
                                                    ...s,
                                                    autoRefresh: !s.autoRefresh,
                                                }))
                                            }
                                        />
                                        auto-refresh {autoRefresh ? "is active" : "is disabled"}
                                    </Box>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        {refreshedAt && (
                                            <>last refresh at {refreshedAt.toLocaleTimeString()}</>
                                        )}
                                    </Box>
                                </Grid>
                            )}
                        </Stack>
                    </CardContent>
                </Card>

                {canAddBoat && (
                    <BoatCreatorControl
                        newBoatHandler={refreshStatuses}
                        statusId={first(orderedSwimlanes)?.id}
                    />
                )}

                <MuiKanbanContainer
                    swimlanes={orderedSwimlanes}
                    dragEndHandler={moveBoat}
                    dataChangeHandler={refreshStatuses}
                />
            </ContentWithTopNavigation>
        </>
    )
}
