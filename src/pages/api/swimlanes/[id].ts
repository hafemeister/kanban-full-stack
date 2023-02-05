import type { NextApiRequest, NextApiResponse } from "next"
import {
    badRequest,
    checkForAllowedRequestMethods,
    jsonSuccess,
    methodNotAllowed,
} from "@/backend/tools/request"
import { SwimlaneModel, SwimlaneFields } from "@/backend/models/swimlanes"
import { isEmpty, isObject, isString, isUndefined, rest } from "lodash-es"
import { ServerResponseCodes } from "@/constants/server"

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

    const swimlane = await new SwimlaneModel({ id }).load()
    if (isUndefined(swimlane)) {
        return res.status(ServerResponseCodes.ResourceNotFound).json({})
    }

    if (isDelete) {
        const result = await swimlane.delete()

        return jsonSuccess(res, true)
    }

    if (isGet) {
        return jsonSuccess(res, swimlane.toJson())
    }

    // put
    const fields = req.body
    if (isUndefined(fields) || !isObject(fields) || isEmpty(fields)) {
        return badRequest(res)
    }

    await swimlane.save(fields)
    return jsonSuccess(res, swimlane.toJson())
}
