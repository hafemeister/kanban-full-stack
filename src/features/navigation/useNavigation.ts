import { useRouter } from "next/router"
import { useCallback } from "react"

type RelativePathUrl = string
type NavigationHandler = (target?: RelativePathUrl) => void

export function useNavigation(defaultTarget: RelativePathUrl): {
    push: NavigationHandler
    replace: NavigationHandler
    go: NavigationHandler
} {
    const router = useRouter()

    const push = useCallback(
        (target?: RelativePathUrl) => {
            console.log({ target, defaultTarget })
            router.push(target || defaultTarget)
        },
        [router, defaultTarget]
    )

    const replace = useCallback(
        (target?: RelativePathUrl) => {
            router.replace(target || defaultTarget)
        },
        [router, defaultTarget]
    )

    return {
        replace,
        push,
        // push alias that sounds nicer
        go: push,
    }
}
