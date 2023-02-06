import { isValidId } from "./isValidId"

describe("isValidId", () => {
    test.each([
        ["id123", true],
        ["1234", true],
        ["idWithMe", true],
        [undefined, false],
        [12, false],
        ["", false],
        [false, false],
    ])("with id: %p, returns %p", (a1: unknown, r1: boolean) => {
        expect(isValidId(a1)).toBe(r1)
    })
})
