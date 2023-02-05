import { ThemeOptions, createTheme } from "@mui/material/styles"

export const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
})
