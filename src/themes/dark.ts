import { ThemeOptions, createTheme } from "@mui/material/styles"

export const darkTheme: ThemeOptions = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
})
