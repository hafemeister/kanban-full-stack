import { Firestore, Query } from "@google-cloud/firestore"
import { AvailableFirestoreCollections, store } from "./firestore.config"

// modified for our use from original found here: https://cloud.google.com/firestore/docs/manage-data/delete-data#collections
export async function deleteCollection(
    collectionPath: AvailableFirestoreCollections,
    batchSize = 10
) {
    const collectionRef = store.collection(collectionPath)
    const query = collectionRef.orderBy("__name__").limit(batchSize)

    return new Promise((resolve, reject) => {
        deleteQueryBatch(store, query, resolve).catch(reject)
    })
}

async function deleteQueryBatch(
    store: Firestore,
    query: Query,
    resolve: (value?: unknown) => void
) {
    const snapshot = await query.get()

    const batchSize = snapshot.size
    if (batchSize === 0) {
        // When there are no documents left, we are done
        resolve()
        return
    }

    // Delete documents in a batch
    const batch = store.batch()
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
    })
    await batch.commit()

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(store, query, resolve)
    })
}
