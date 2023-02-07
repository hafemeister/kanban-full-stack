import { suspendIntervalFlag } from "@/tools/useInterval"
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { BaseSyntheticEvent } from "react"

type RefreshIntervalControlProps = {
    // the initial value that is set in the group - will default to -1 which indicates no refresh
    value: number
    intervalChangeHandler: (e: BaseSyntheticEvent) => void
}

export function RefreshIntervalControl({
    value = suspendIntervalFlag,
    intervalChangeHandler,
}: RefreshIntervalControlProps) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            Auto refresh data interval:
            <ToggleButtonGroup
                value={value}
                exclusive
                onChange={intervalChangeHandler}
                aria-label="auto refresh interval"
                sx={{ ml: 2 }}
            >
                <ToggleButton value={suspendIntervalFlag} aria-label="Never">
                    Never
                </ToggleButton>
                <ToggleButton value={10000} aria-label="centered">
                    10s
                </ToggleButton>
                <ToggleButton value={60000} aria-label="right aligned">
                    60s
                </ToggleButton>
                <ToggleButton value={600000} aria-label="justified">
                    10m
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}
