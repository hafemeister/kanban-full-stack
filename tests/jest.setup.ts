import "@testing-library/jest-dom"
import "./jest.overrides"
import { NextApiRequest, NextApiResponse } from "next"

export const MockNextApiRequest = {} as NextApiRequest
export const MockNextApiResponse = {} as NextApiResponse
