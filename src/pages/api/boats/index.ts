import type { NextApiRequest, NextApiResponse } from "next"
import {
    badRequest,
    checkForAllowedRequestMethods,
    jsonSuccess,
    methodNotAllowed,
} from "@/backend/tools/request"
import { BoatFields, BoatModel } from "@/backend/models/boats"
import { isObject, pick } from "lodash-es"

type ResponseData = BoatFields[] | Partial<BoatFields>

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { isGet, isAllowedMethod } = checkForAllowedRequestMethods(req, { get: true, post: true })

    if (!isAllowedMethod) {
        return methodNotAllowed(res)
    }

    if (isGet) {
        const result = await new BoatModel().listAll()

        return jsonSuccess(res, result)
    }

    const fields = req.body
    if (!isObject(fields)) {
        return badRequest(res)
    }
    const model = new BoatModel(pick(fields, BoatModel.writeAttributes))
    await model.save()

    return jsonSuccess(res, model.toJson())
}
