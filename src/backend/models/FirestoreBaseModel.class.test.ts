import { disableConsoleError, enableConsoleError } from "tests/jest.overrides"
import { BaseModelFields, FirestoreBaseModel } from "./FirestoreBaseModel.class"

const mockFirestoreGet = jest.fn()
const mockFirestoreDelete = jest.fn()
jest.mock("@/integrations/google-cloud/firestore/module", () => ({
    collectionWithEnvironmentPrefix: () => ({
        doc: () => ({
            get: () => mockFirestoreGet(),
            delete: () => mockFirestoreDelete(),
        }),
    }),
}))

class TestableFirestoreBaseModel<
    T extends BaseModelFields = BaseModelFields
> extends FirestoreBaseModel<T> {}

describe("FirestoreBaseModel class", () => {
    let mockClass = new TestableFirestoreBaseModel("", {})
    const mockId = "123"
    const mockFieldsWithId = { id: mockId, field1: true, field2: "sample" }
    const mockFieldsWithoutId = { id: undefined, field1: true, field2: "sample" }
    const mockClassFromFields = (fields: object) => {
        return new TestableFirestoreBaseModel<typeof fields>("", fields)
    }

    beforeEach(() => {
        mockClass = mockClassFromFields({})
    })

    describe("loadDocumentFromId", () => {
        it("returns undefined if document does not exist", async () => {
            mockFirestoreGet.mockReturnValueOnce({
                exists: false,
            })
            const result = await mockClass.loadDocumentFromId(mockId)

            expect(result).toBeUndefined()
        })
        it("returns data and id if document does exist", async () => {
            const mockData = { success: true }
            mockFirestoreGet.mockReturnValueOnce({
                exists: true,
                data: () => mockData,
            })
            const result = await mockClass.loadDocumentFromId(mockId)

            expect(result).toEqual({
                id: mockId,
                ...mockData,
            })
        })
    })
    describe("toString", () => {
        it("returns a string of the associated fields", () => {
            const mockFields = { id: mockId, field1: true, field2: "sample" }
            const mockClass = new TestableFirestoreBaseModel<typeof mockFields>("", mockFields)
            const result = mockClass.toString()

            expect(result).toEqual(JSON.stringify(mockFields))
        })
    })

    describe("toJson", () => {
        it("returns an object of the associated fields", () => {
            const mockClass = mockClassFromFields(mockFieldsWithId)
            const result = mockClass.toJson()

            expect(result).toEqual(mockFieldsWithId)
        })
    })

    describe("delete", () => {
        it("returns false if the id is not set", async () => {
            const mockClass = mockClassFromFields(mockFieldsWithoutId)
            const result = await mockClass.delete()

            expect(result).toBe(false)
        })
        it("returns false if the firestore method throws", async () => {
            mockFirestoreDelete.mockImplementation(() => {
                throw new Error("Mock Error")
            })
            const mockClass = mockClassFromFields(mockFieldsWithId)
            // must disable prior to error being thrown!
            disableConsoleError()
            const result = await mockClass.delete()

            expect(result).toBe(false)
            expect(console.error).toBeCalledTimes(1)
            enableConsoleError()
        })
        it("returns true when a delete succeeded", async () => {
            mockFirestoreDelete.mockReturnValueOnce(true)
            const mockClass = mockClassFromFields(mockFieldsWithId)
            const result = await mockClass.delete()

            expect(result).toBe(true)
        })
    })
})
