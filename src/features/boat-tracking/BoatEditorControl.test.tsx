import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { BoatEditorControl } from "./BoatEditorControl"

describe("BoatCreatorControl component", () => {
    it("renders without failure", () => {
        const { getByText } = render(
            <BoatEditorControl name="boatName" id="123" dataChangeListener={jest.fn()} />
        )

        const result = getByText(/add a boat/i)
        expect(result).toBeInTheDocument()
    })

    it("shows form on click of add button", () => {
        const { getByText, queryByText, getAllByText } = render(
            <BoatEditorControl name="boatName" id="123" dataChangeListener={jest.fn()} />
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
