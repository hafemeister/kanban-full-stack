import { Button } from "@mui/material"
import { useRouter } from "next/router"
import { useCallback, useContext } from "react"
import { UserGroup } from "./constants"
import { UserGroupContext } from "./UserGroupContextProvider"

type ModeSelectionButtonProps = {
    children: JSX.Element | string
    group: UserGroup
}

export function ModeSelectionButton({ children, group }: ModeSelectionButtonProps) {
    const router = useRouter()
    const { setGroup } = useContext(UserGroupContext)
    const goToBoatStatusPage = useCallback(() => {
        setGroup(group)

        router.replace("/boat-statuses")
    }, [router, group, setGroup])

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
