import {
    AvailableFirestoreCollections,
    QueryDocumentSnapshot,
    store,
} from "@/integrations/google-cloud"
import { ID } from "./types"
import { isEmpty, isUndefined } from "lodash-es"
import { CollectionReference } from "@google-cloud/firestore"

export type BaseModelFields = {
    id?: ID
}

export abstract class FirestoreBaseModel<ModelFields extends BaseModelFields, ThisClass> {
    collectionName: string
    protected fields: Partial<ModelFields>

    constructor(collectionName: string, fields: Partial<ModelFields>) {
        this.collectionName = collectionName
        this.fields = fields
    }

    async loadDocumentFromId(id: ID, collectionName: string): Promise<object | undefined> {
        const snapshot = await store.collection(collectionName).doc(id).get()

        if (!snapshot.exists) {
            return undefined
        }

        return {
            id,
            ...snapshot.data(),
        }
    }

    static async listAllDocuments<ModelFields>(collectionName: string): Promise<ModelFields[]> {
        const snapshot = await store.collection(collectionName).get()

        const result = [] as ModelFields[]

        snapshot.forEach((documentSnapshot: QueryDocumentSnapshot) => {
            const data = {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
            }

            result.push(data as ModelFields)
        })

        return result
    }

    private source(collectionName?: AvailableFirestoreCollections): CollectionReference {
        return store.collection(collectionName || this.collectionName)
    }

    async saveNew() {
        // firestore will create an id for us in this case
        const response = await this.source().add(this.fields)

        this.fields = {
            ...this.fields,
            id: response.id,
        }

        return this
    }

    async save(updatedFields?: Partial<ModelFields>) {
        const id = this?.fields?.id
        const isNew = isEmpty(id) || isUndefined(id)

        if (isNew) {
            return this.saveNew()
        }

        await this.source()
            .doc(id)
            .set({ ...this.fields, ...(updatedFields || {}) }, { merge: true })

        this.fields = {
            ...this.fields,
            ...updatedFields,
            id,
        }

        return this
    }

    async delete(): Promise<boolean> {
        const id = this.fields?.id
        if (isUndefined(id)) {
            return false
        }

        try {
            await this.source().doc(id).delete()

            return true
        } catch (error) {
            console.error("Failed to delete item", { id, error })
        }

        return false
    }

    toString(): string {
        return JSON.stringify(this.fields)
    }

    toJson(): Partial<ModelFields> {
        return this.fields
    }
}
