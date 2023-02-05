import type { NextApiRequest, NextApiResponse } from "next"
import {
    checkForAllowedRequestMethods,
    jsonSuccess,
    methodNotAllowed,
} from "@/backend/tools/request"
import { BoatFields, BoatModel } from "@/backend/models/boats"

type ResponseData = BoatFields[] | Partial<BoatFields>

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { isGet, isAllowedMethod } = checkForAllowedRequestMethods(req, { get: true, post: true })

    if (!isAllowedMethod) {
        return methodNotAllowed(res)
    }

    if (isGet) {
        const result = await BoatModel.listAll()

        return jsonSuccess(res, result)
    }

    const fields = req.body
    const model = new BoatModel(fields)
    await model.save()

    return jsonSuccess(res, model.toJson())
}
