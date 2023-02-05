import "@/styles/globals.css"
import { lightTheme } from "@/themes/light"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={lightTheme}>
            <Component {...pageProps} cheese={"cheese"} />
        </ThemeProvider>
    )
}
