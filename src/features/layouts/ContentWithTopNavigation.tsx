import { AppBar, Box, CircularProgress, CssBaseline, IconButton, Toolbar } from "@mui/material"
import Typography from "@mui/material/Typography"
import { DirectionsBoat, Refresh } from "@mui/icons-material"
import { AppBarHomeIcon } from "../navigation/AppBarHomeIcon"

type ContentWithTopNavigationProps = {
    children: JSX.Element | JSX.Element[]
    title?: string
    isHome?: boolean
    isLoading?: boolean
    allowActions?: boolean
    refreshHandler?: VoidFunction
}

export function ContentWithTopNavigation({
    children,
    title,
    isHome,
    isLoading,
    allowActions,
    refreshHandler,
}: ContentWithTopNavigationProps) {
    return (
        <>
            <CssBaseline />

            <AppBar component="nav" position="sticky">
                <Toolbar>
                    {!isHome && <AppBarHomeIcon isClickable={allowActions} />}
                    {isHome && <DirectionsBoat sx={{ mr: 2 }} />}

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>

                    {refreshHandler && allowActions && (
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={() => refreshHandler()}
                        >
                            <Refresh />
                        </IconButton>
                    )}

                    {isLoading && (
                        <Box sx={{ mr: 4 }}>
                            <CircularProgress color="secondary" size={25} />
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Box component={"main"} sx={{ m: 2 }}>
                {children}
            </Box>
        </>
    )
}
