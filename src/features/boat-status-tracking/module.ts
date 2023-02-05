import { ID } from "@/backend/models/types"
import { ServerResponseCodes } from "@/constants/server"
import { groupBy } from "lodash-es"

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
