import { isUndefined } from "lodash-es"
import { ID, IsoDateTime } from "./types"
import { FirestoreBaseModel } from "./FirestoreBaseModel.class"
import { AvailableFirestoreCollections } from "@/integrations/google-cloud"

export type SwimlaneFields = {
    id: ID
    title: string
    position: number
    createdAt: IsoDateTime
    updatedAt: IsoDateTime
}

export class SwimlaneModel extends FirestoreBaseModel<SwimlaneFields> {
    static collectionName = AvailableFirestoreCollections.Swimlanes

    constructor(fields?: Partial<SwimlaneFields>) {
        super(SwimlaneModel.collectionName, fields || {})
    }

    async load(): Promise<SwimlaneModel | undefined> {
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

    async listAll(): Promise<SwimlaneFields[]> {
        return await this.listAllDocuments<SwimlaneFields>(this.collectionName)
    }

    /**
     * generates and saves one model per title, using the index as positional value
     *
     * @param titles: string[]
     */
    static async createBatch(titles: string[]) {
        let position = 0

        for (const title of titles) {
            await new SwimlaneModel({ title, position }).save()
            position++
        }
    }
}
