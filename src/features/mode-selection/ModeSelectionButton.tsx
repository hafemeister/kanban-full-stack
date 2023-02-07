import { Button } from "@mui/material"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { UserGroup } from "./constants"
import { useUserGroupContext } from "./UserGroupContextProvider"

type ModeSelectionButtonProps = {
    children: JSX.Element | string
    group: UserGroup
}

export function ModeSelectionButton({ children, group }: ModeSelectionButtonProps) {
    const router = useRouter()
    const { setGroup } = useUserGroupContext()
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
