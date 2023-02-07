// jest has some great defaults, but in case we need to turn those off, this will be useful:
const originalLocalStorage = localStorage

// don't have time right now for typing global object. =(
// eslint-disable-next-line
// @ts-ignore
export const disableMockedLocalStorage = () => (global._localStorage = undefined)
// eslint-disable-next-line
// @ts-ignore
export const enableMockedLocalStorage = () => (global._localStorage = originalLocalStorage)

// while in development, we use warn a lot to help track down issues rather than throw and break the app
// these next couple methods help keep the test runs tidy. if needed, use expect(console.warn).toBeCalled
// to measure desired behavior
const originalConsoleWarn = global.console.warn
export const disableConsoleWarn = () => (global.console.warn = jest.fn())
export const enableConsoleWarn = () => (global.console.warn = originalConsoleWarn)

const originalConsoleError = global.console.error
export const disableConsoleError = () => (global.console.error = jest.fn())
export const enableConsoleError = () => (global.console.error = originalConsoleError)
