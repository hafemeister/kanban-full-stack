import type { NextApiRequest, NextApiResponse } from "next"
import {
    checkForAllowedRequestMethods,
    jsonSuccess,
    methodNotAllowed,
} from "@/backend/tools/request"
import { SwimlaneFields, SwimlaneModel } from "@/backend/models/swimlanes"

type ResponseData = SwimlaneFields[] | Partial<SwimlaneFields>

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { isGet, isAllowedMethod } = checkForAllowedRequestMethods(req, { get: true, post: true })

    if (!isAllowedMethod) {
        return methodNotAllowed(res)
    }

    if (isGet) {
        const result = await new SwimlaneModel().listAll()

        return jsonSuccess(res, result)
    }

    // post
    const fields = req.body
    const model = new SwimlaneModel(fields)
    await model.save()

    return jsonSuccess(res, model.toJson())
}
