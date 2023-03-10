import { isUndefined } from "lodash-es"
import { makeTypedModelFieldNames } from "./module"
import { ID, IsoDateTime } from "./types"
import { FirestoreBaseModel } from "./FirestoreBaseModel.class"
import { AvailableFirestoreCollections } from "@/integrations/google-cloud"

export type BoatFields = {
    id: ID
    name: string
    swimlaneId: ID
    createdAt: IsoDateTime
    updatedAt: IsoDateTime
}

type BoatModelWriteFields = Pick<BoatFields, "name" | "swimlaneId">
const writeAttributes = makeTypedModelFieldNames<BoatModelWriteFields>("name", "swimlaneId")

export class BoatModel extends FirestoreBaseModel<BoatFields> {
    static collectionName = AvailableFirestoreCollections.Boats
    static writeAttributes = writeAttributes

    constructor(fields?: Partial<BoatFields>) {
        // @todo -- add writeAttributes for more robust consistency
        super(BoatModel.collectionName, fields || {})
    }

    async load(): Promise<BoatModel | undefined> {
        const { id } = this.fields

        if (isUndefined(id)) {
            console.warn("Unable to load a model without a valid id", { fields: this.fields })
            return undefined
        }

        const result = await this.loadDocumentFromId(id)
        if (!isUndefined(result)) {
            this.fields = result

            return this
        }
    }

    async listAll(): Promise<BoatFields[]> {
        return await this.listAllDocuments<BoatFields>(this.collectionName)
    }
}
