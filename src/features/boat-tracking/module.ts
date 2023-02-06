import { BoatFields } from "@/backend/models/boats"
import { ID } from "@/backend/models/types"
import { ServerResponseCodes } from "@/constants/server"
import { groupBy, isEmpty } from "lodash-es"

type BoatCardValues = {
    id: ID
    name: string
}

type SwimlaneId = ID

type SwimlaneWithBoats = {
    id: SwimlaneId
    title: string
    items: BoatCardValues[]
}

export type SwimlaneBoatMap = Record<SwimlaneId, SwimlaneWithBoats>

async function fetchSwimlanes() {
    const response = await fetch("/api/swimlanes")
    if (response.status !== ServerResponseCodes.Success) {
        throw new Error("Unable to get the list of swimlanes")
    }

    const result = (await response).json()

    return result
}

async function fetchBoats() {
    const response = await fetch("/api/boats")
    if (response.status !== ServerResponseCodes.Success) {
        throw new Error("Unable to get the list of swimlanes")
    }

    const result = (await response).json()

    return result
}

export async function fetchBoatsAndGroupBySwimlanes(): Promise<SwimlaneBoatMap> {
    const swimlanes = await fetchSwimlanes()

    const boats = await fetchBoats()
    const groupedBoats = groupBy(boats, "swimlaneId")

    const result = {} as SwimlaneBoatMap
    for (const lane of swimlanes) {
        const { id } = lane
        result[id] = lane
        result[id].items = groupedBoats[id] || []
    }

    return result
}

export async function addNewBoat(name: string, swimlaneId: ID): Promise<BoatFields | undefined> {
    const response = await fetch("/api/boats", {
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

export async function updateBoatStatus(id: ID, swimlaneId: ID): Promise<BoatFields | undefined> {
    const response = await fetch(`/api/boats/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            swimlaneId,
        }),
    })

    const result = await response.json()

    if (isEmpty(result)) {
        return undefined
    }

    return result as BoatFields
}

export async function updateBoatName(id: ID, name: string): Promise<BoatFields | undefined> {
    const response = await fetch(`/api/boats/${id}`, {
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
    const response = await fetch(`/api/boats/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    return await response.json()
}

export async function resetSwimlanesAndBoats(): Promise<boolean> {
    const response = await fetch(`/api/reset`, {
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
