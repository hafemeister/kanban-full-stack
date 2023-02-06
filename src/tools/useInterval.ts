import { isFunction } from "lodash-es"
import { useEffect, useRef } from "react"

export const suspendIntervalFlag = -1

// adopted to typescript from the original of the man himself!
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: VoidFunction, delay: number) {
    const savedCallback = useRef<VoidFunction | undefined>()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            if (isFunction(savedCallback.current)) {
                savedCallback.current()
            }
        }

        if (delay !== suspendIntervalFlag) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}
