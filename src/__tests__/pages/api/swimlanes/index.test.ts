import { SwimlaneModel } from "@/backend/models/swimlanes"
import pageHandler from "@/pages/api/swimlanes/index"
import { MockNextApiRequest, MockNextApiResponse } from "tests/jest.setup"

const mockCheckForAllowedRequestMethods = jest.fn()
const mockJsonSuccess = jest.fn()
const mockMethodNotAllowed = jest.fn()
jest.mock("@/backend/tools/request", () => ({
    checkForAllowedRequestMethods: () => mockCheckForAllowedRequestMethods(),
    jsonSuccess: () => mockJsonSuccess(),
    methodNotAllowed: () => mockMethodNotAllowed(),
}))

const mockListAll = jest.fn()
jest.mock("@/backend/models/swimlanes", () => ({
    SwimlaneFields: jest.fn(),
    SwimlaneModel: jest.fn().mockImplementation(() => {
        return {
            listAll: () => mockListAll(),
        }
    }),
}))

describe("swimlanes page handler", () => {
    const MockSwimLaneModel = jest.mocked(SwimlaneModel, { shallow: true })

    beforeEach(() => {
        MockSwimLaneModel.mockClear()
        mockCheckForAllowedRequestMethods.mockReset()
        mockJsonSuccess.mockReset()
        mockMethodNotAllowed.mockReset()
    })

    it("rejects unsupported request methods", async () => {
        mockCheckForAllowedRequestMethods.mockReturnValue({ isAllowedMethod: false })
        await pageHandler(MockNextApiRequest, MockNextApiResponse)

        expect(mockMethodNotAllowed).toBeCalledTimes(1)
    })

    it("returns list of all boats on GET request", async () => {
        mockCheckForAllowedRequestMethods.mockReturnValue({ isGet: true, isAllowedMethod: true })
        await pageHandler(MockNextApiRequest, MockNextApiResponse)

        expect(mockListAll).toBeCalledTimes(1)
        expect(mockJsonSuccess).toBeCalledTimes(1)
    })
})
