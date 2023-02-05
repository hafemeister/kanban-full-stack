import type { NextApiRequest, NextApiResponse } from "next"
import {
    badRequest,
    checkForAllowedRequestMethods,
    jsonSuccess,
    methodNotAllowed,
} from "@/backend/tools/request"
import { SwimlaneFields } from "@/backend/models/swimlanes"
import { isEmpty, isObject, isString, isUndefined } from "lodash-es"
import { ServerResponseCodes } from "@/constants/server"
import { BoatModel } from "@/backend/models/boats"

type ResponseData = Partial<SwimlaneFields> | boolean

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { isGet, isDelete, isAllowedMethod } = checkForAllowedRequestMethods(req, {
        get: true,
        delete: true,
        put: true,
    })
    if (!isAllowedMethod) {
        return methodNotAllowed(res)
    }

    const { id } = req.query
    if (!(isString(id) && !isEmpty(id))) {
        return badRequest(res)
    }

    const model = await new BoatModel({ id }).load()
    if (isUndefined(model)) {
        return res.status(ServerResponseCodes.ResourceNotFound).json({})
    }

    if (isDelete) {
        return jsonSuccess(res, await model.delete())
    }

    if (isGet) {
        return jsonSuccess(res, model.toJson())
    }

    // put is left:
    const fields = req.body
    if (isUndefined(fields) || !isObject(fields) || isEmpty(fields)) {
        return badRequest(res)
    }

    await model.save(fields)
    return jsonSuccess(res, model.toJson())
}
