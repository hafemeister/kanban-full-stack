import "@/styles/globals.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { lightTheme } from "@/themes/light"
import { ThemeProvider } from "@mui/material"
import { UserGroupContextProvider } from "@/features/mode-selection/UserGroupContextProvider"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={lightTheme}>
            <UserGroupContextProvider>
                <Component {...pageProps} />
            </UserGroupContextProvider>
        </ThemeProvider>
    )
}
