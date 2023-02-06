import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { BoatEditorControl } from "./BoatEditorControl"

describe("BoatCreatorControl component", () => {
    it("renders without failure", () => {
        const { getByLabelText } = render(
            <BoatEditorControl name="boatName" id="123" dataChangeListener={jest.fn()} />
        )

        const button = getByLabelText(/edit boat/i)
        expect(button).toBeInTheDocument()
    })
    it("shows form on click of add button", () => {
        const { getByLabelText, queryByText, getAllByText } = render(
            <BoatEditorControl name="boatName" id="123" dataChangeListener={jest.fn()} />
        )

        const button = getByLabelText(/edit boat/i)
        const inputNotVisible = queryByText(/enter the name/i)

        expect(button).toBeInTheDocument()
        expect(inputNotVisible).not.toBeInTheDocument()

        fireEvent.click(button)
        const inputVisible = getAllByText(/enter the name/i)
        expect(inputVisible.length).not.toBe(0)
    })
})
