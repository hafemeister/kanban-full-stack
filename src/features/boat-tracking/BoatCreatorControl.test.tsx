import { render, fireEvent } from "@testing-library/react"
import { BoatCreatorControl } from "./BoatCreatorControl"

describe("BoatCreatorControl component", () => {
    it("renders without failure", () => {
        const { getByText } = render(<BoatCreatorControl newBoatHandler={jest.fn()} />)

        const result = getByText(/add a boat/i)
        expect(result).toBeInTheDocument()
    })

    it("shows form on click of add button", () => {
        const { getByText, queryByText, getAllByText } = render(
            <BoatCreatorControl newBoatHandler={jest.fn()} />
        )

        const button = getByText(/add a boat/i)
        const inputNotVisible = queryByText(/enter the name/i)

        expect(button).toBeInTheDocument()
        expect(inputNotVisible).not.toBeInTheDocument()

        fireEvent.click(button)
        const inputVisible = getAllByText(/enter the name/i)
        expect(inputVisible.length).not.toBe(0)
    })
})
