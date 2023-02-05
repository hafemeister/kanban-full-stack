import { Home } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useNavigation } from "./useNavigation"

type AppBarHomeIconProps = {
    isClickable?: boolean
}

export function AppBarHomeIcon({ isClickable }: AppBarHomeIconProps) {
    const { go } = useNavigation("/")

    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => isClickable && go()}
        >
            <Home />
        </IconButton>
    )
}
