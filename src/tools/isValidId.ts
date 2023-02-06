import { ID } from "@/backend/models/types"
import { isString } from "lodash-es"

export function isValidId(argument: ID | unknown): argument is string {
    return isString(argument) && argument !== ""
}
