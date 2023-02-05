import { isUndefined } from "lodash-es"
import { makeTypedModelFieldNames } from "./module"
import { ID, IsoDateTime } from "./types"
import { FirestoreBaseModel } from "./firestoreBase"
import { AvailableFirestoreCollections } from "@/integrations/google-cloud"

export type SwimlaneFields = {
    id: ID
    title: string
    position: number
    createdAt: IsoDateTime
    updatedAt: IsoDateTime
}

type SwimlaneModelWriteFields = Pick<SwimlaneFields, "position" | "title">
const writeAttributes = makeTypedModelFieldNames<SwimlaneModelWriteFields>("position", "title")

export class SwimlaneModel extends FirestoreBaseModel<SwimlaneFields, SwimlaneModel> {
    static collectionName = AvailableFirestoreCollections.Swimlanes

    constructor(fields: Partial<SwimlaneFields>) {
        // @todo -- add writeAttributes for more robust consistency
        super(SwimlaneModel.collectionName, fields)
    }

    async load(): Promise<SwimlaneModel | undefined> {
        const { id } = this.fields
        if (isUndefined(id)) {
            console.warn("Unable to load a model without a valid id", { fields: this.fields })
            return undefined
        }

        const result = await this.loadDocumentFromId(id, this.collectionName)
        if (!isUndefined(result)) {
            this.fields = result

            return this
        }
    }

    static async listAll(): Promise<SwimlaneFields[]> {
        return await this.listAllDocuments<SwimlaneFields>(this.collectionName)
    }
}
