import { Alert, AlertTitle, Backdrop, Theme } from "@mui/material"
import { useEffect, useState } from "react"

type OfflineWarningProviderProps = {
    children: JSX.Element
}

type SpreadableTuple = [string, VoidFunction]

export function OfflineWarningProvider({ children }: OfflineWarningProviderProps) {
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        const offlineListenerArguments = ["offline", () => setIsOnline(false)] as SpreadableTuple
        const onlineListenerArguments = ["online", () => setIsOnline(true)] as SpreadableTuple

        window.addEventListener(...onlineListenerArguments)
        window.addEventListener(...offlineListenerArguments)

        return () => {
            window.removeEventListener(...onlineListenerArguments)
            window.removeEventListener(...offlineListenerArguments)
        }
    }, [])

    return (
        <>
            {children}
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
                open={!isOnline}
            >
                <Alert severity="error">
                    <AlertTitle>Offline Mode</AlertTitle>
                    We are sorry, but the Internet appears to be unavailable right now.
                    <br />
                    <br />
                    To prevent data corruptions, we have suspended the interaction with this
                    application until the internet returns.
                    <br />
                    <br />
                    <strong>Please check back in a a few minutes</strong>
                </Alert>
            </Backdrop>
        </>
    )
}
