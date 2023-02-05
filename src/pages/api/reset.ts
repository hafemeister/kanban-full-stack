import type { NextApiRequest, NextApiResponse } from "next"
import { badRequest, isPostRequest, jsonSuccess, methodNotAllowed } from "@/backend/tools/request"
import { SwimlaneModel } from "@/backend/models/swimlanes"
import { isEmpty, isObject } from "lodash-es"
import { deleteCollection } from "@/integrations/google-cloud/firestore/module"
import { BoatModel } from "@/backend/models/boats"
import { defaultBoatStatuses } from "@/constants/application"

type ResetIndicators = { boats?: boolean; swimlanes?: boolean; addDefaultSwimlanes?: boolean }
type ResponseData = ResetIndicators
type RequestData = ResetIndicators

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (!isPostRequest(req)) {
        return methodNotAllowed(res)
    }

    // post
    const items = (req?.body || {}) as RequestData

    if (!isObject(items) || isEmpty(items)) {
        return badRequest(res)
    }

    const result = {} as ResponseData
    const { boats, swimlanes } = items
    // when swimlanes are reset, we must also reset boat
    if (boats || swimlanes) {
        await deleteCollection(BoatModel.collectionName)
        result.boats = true
    }

    if (swimlanes) {
        await deleteCollection(SwimlaneModel.collectionName)
        result.swimlanes = true
    }

    if (items?.addDefaultSwimlanes) {
        await SwimlaneModel.createBatch(defaultBoatStatuses)
        result.addDefaultSwimlanes = true
    }

    return jsonSuccess(res, result)
}
