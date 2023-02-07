import { disableConsoleWarn, enableConsoleWarn } from "tests/jest.overrides"
import { BoatModel } from "./boats"

describe("boats model", () => {
    it("returns undefined when trying to load without an id", async () => {
        const model = new BoatModel({})

        disableConsoleWarn()
        expect(await model.load()).toBeUndefined()
        expect(console.warn).toBeCalledTimes(1)
        enableConsoleWarn()
    })
})
