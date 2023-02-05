import { ServerResponseCodes, SupportedMethods } from "@/constants/server"
import { includes, toLower } from "lodash-es"
import { NextApiRequest, NextApiResponse } from "next"

export function isGetRequest(request: NextApiRequest): boolean {
    return request?.method === "GET"
}

export function isPostRequest(request: NextApiRequest): boolean {
    return request?.method === "POST"
}

export function isPutRequest(request: NextApiRequest): boolean {
    return request?.method === "PUT"
}

type MethodIndicators = {
    isGet?: true | undefined
    isPut?: true | undefined
    isPost?: true | undefined
    isDelete?: true | undefined
    isAllowedMethod: boolean
}

export function checkForAllowedRequestMethods(
    requests: NextApiRequest,
    options: {
        get?: boolean
        put?: boolean
        post?: boolean
        delete?: boolean
    }
): MethodIndicators {
    const validMethodNames = [] as string[]
    for (const [key, value] of Object.entries(options)) {
        if (value) {
            validMethodNames.push(key)
        }
    }

    const result = {} as MethodIndicators
    const method = requests?.method
    switch (method) {
        case SupportedMethods.Get:
            result.isGet = true
            break
        case SupportedMethods.Delete:
            result.isDelete = true
            break
        case SupportedMethods.Put:
            result.isPut = true
            break
        case SupportedMethods.Post:
            result.isPost = true
            break
    }

    result.isAllowedMethod = includes(validMethodNames, toLower(method))
    return result
}

export function methodNotAllowed(res: NextApiResponse) {
    return res.status(ServerResponseCodes.MethodNotAllowed).json({})
}

export function badRequest(res: NextApiResponse) {
    return res.status(ServerResponseCodes.BadRequest).json({})
}

export function jsonSuccess(res: NextApiResponse, payload: object | boolean) {
    return res.status(ServerResponseCodes.Success).json(payload)
}
