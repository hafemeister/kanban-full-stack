import { Firestore } from "@google-cloud/firestore"
// import { isEmpty } from "lodash-es"

const config = {
    projectId: "kanban-full-stack",
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
}

// @todo -- any way to ping and see if this is the right config value?
// if (isEmpty(config.keyFilename)) {
//     throw new Error("Detected invalid configuration. Missing GOOGLE_APPLICATION_CREDENTIALS")
// }

export enum AvailableFirestoreCollections {
    Boats = "boats",
    Swimlanes = "swimlanes",
}

export const store = new Firestore(config)
