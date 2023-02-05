import { Button } from "@mui/material"
import { useRouter } from "next/router"
import { useCallback } from "react"

type ModeSelectionButtonProps = {
    children: JSX.Element | string
}

export function ModeSelectionButton({ children }: ModeSelectionButtonProps) {
    const router = useRouter()

    const goToBoatStatusPage = useCallback(() => {
        router.replace("/boat-status")
    }, [router])

    return (
        <Button
            variant="contained"
            sx={{ height: 100 }}
            fullWidth={true}
            onClick={goToBoatStatusPage}
        >
            {children}
        </Button>
    )
}
