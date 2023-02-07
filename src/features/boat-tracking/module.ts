import { BoatFields } from "@/backend/models/boats"
import { ID } from "@/backend/models/types"
import { ServerResponseCodes } from "@/constants/server"
import { groupBy, isEmpty, isUndefined, map, orderBy } from "lodash-es"

type BoatCardValues = {
    id: ID
    name: string
    updatedAt: Date
}

type SwimlaneId = ID

type SwimlaneWithBoats = {
    id: SwimlaneId
    title: string
    items: BoatCardValues[]
}

export type SwimlaneBoatMap = Record<SwimlaneId, SwimlaneWithBoats>

async function fetchAndCatch(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
): Promise<Response | { json: VoidFunction; status: number }> {
    try {
        return await fetch(input, init)
    } catch (error) {
        console.warn("Encountered a fatal fetch error. Please review the logs", { error })
    }

    return Promise.resolve({
        status: ServerResponseCodes.Error,
        json: () => ({}),
    })
}

async function fetchSwimlanes() {
    const response = await fetchAndCatch("/api/swimlanes")
    if (response.status !== ServerResponseCodes.Success) {
        throw new Error("Unable to get the list of swimlanes")
    }

    const result = (await response).json()

    return result
}

async function fetchBoats() {
    const response = await fetchAndCatch("/api/boats")
    if (response.status !== ServerResponseCodes.Success) {
        throw new Error("Unable to get the list of swimlanes")
    }

    const result = (await response).json()

    return result
}

export async function fetchBoatsAndGroupBySwimlanes(): Promise<SwimlaneBoatMap> {
    const swimlanes = await fetchSwimlanes()

    const boats = await fetchBoats()
    const groupedBoats = groupBy(
        map(boats, (boat) => ({ ...boat, updatedAt: new Date(boat.updatedAt) })),
        "swimlaneId"
    )

    const result = {} as SwimlaneBoatMap
    for (const lane of swimlanes) {
        const { id } = lane
        result[id] = lane
        result[id].items = orderBy(groupedBoats[id], "updatedAt", "desc") || []
    }

    return result
}

export async function addNewBoat(name: string, swimlaneId: ID): Promise<BoatFields | undefined> {
    const response = await fetchAndCatch("/api/boats", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            swimlaneId,
        }),
    })

    const result = await response.json()

    if (isEmpty(result)) {
        return undefined
    }

    return result as BoatFields
}

export async function updateBoatStatus(
    id: ID,
    swimlaneId: ID,
    updatedAt: Date
): Promise<BoatFields | undefined> {
    const response = await fetchAndCatch(`/api/boats/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            swimlaneId,
            updatedAt: updatedAt.toISOString(),
        }),
    })

    const result = await response.json()

    if (isEmpty(result)) {
        return undefined
    }

    return result as BoatFields
}

export async function updateBoatName(id: ID, name: string): Promise<BoatFields | undefined> {
    const response = await fetchAndCatch(`/api/boats/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            name,
        }),
    })

    const result = await response.json()

    if (isEmpty(result)) {
        return undefined
    }

    return result as BoatFields
}

export async function deleteBoat(id: ID): Promise<boolean> {
    const response = await fetchAndCatch(`/api/boats/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    return await response.json()
}

export async function resetSwimlanesAndBoats(): Promise<boolean> {
    const response = await fetchAndCatch(`/api/reset`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            boats: true,
            swimlanes: true,
            addDefaultSwimlanes: true,
        }),
    })

    const result = await response.json()

    return result
}

/**
 * takes the values of a drop event and turns them into an updated map of swimlane items
 *
 * @param swimlanes
 * @param changeContext
 */
export function calculateNewSwimlanePositions(
    swimlanes: SwimlaneBoatMap,
    changeContext: {
        source: { droppableId: ID; index: number }
        destination?: { droppableId: ID; index: number } | null
    }
): { swimlanes: SwimlaneBoatMap; updatedItem: BoatCardValues; newLaneId: string } | false {
    const { droppableId: oldLaneId, index: oldLaneIndex } = changeContext.source
    const { droppableId: newLaneId, index: newLaneIndex } = changeContext.destination || {}
    if (isUndefined(newLaneId) || isUndefined(newLaneIndex)) {
        return false
    }

    // do not split early, as that will cause "blinking" effect
    const item = swimlanes[oldLaneId].items[oldLaneIndex]
    if (!item) {
        console.error("Unknown error when looking at drop result", { changeContext })
        return false
    }

    // shim in absence of true syncinc.
    item.updatedAt = new Date()

    swimlanes[oldLaneId].items.splice(oldLaneIndex, 1)
    swimlanes[newLaneId].items.splice(newLaneIndex, 0, item)

    return { swimlanes, updatedItem: item, newLaneId }
}
