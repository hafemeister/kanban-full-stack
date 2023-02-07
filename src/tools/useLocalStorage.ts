import { useCallback, useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, fallbackValue: T) {
    const [value, setValue] = useState(fallbackValue)

    useEffect(() => {
        const stored = localStorage.getItem(key)

        setValue(stored ? JSON.parse(stored) : fallbackValue)
    }, [fallbackValue, key])

    const setValueInStateAndLocalStorage = useCallback(
        (value: T) => {
            console.log("updating value", { key, value })
            localStorage.setItem(key, JSON.stringify(value))
        },
        [key]
    )

    return [value, setValueInStateAndLocalStorage] as const
}
