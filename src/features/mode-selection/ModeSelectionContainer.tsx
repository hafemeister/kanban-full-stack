import { Container, Stack } from "@mui/material"
import { ModeSelectionButton } from "./ModeSelectionButton"

export function ModeSelectionContainer() {
    return (
        <Container>
            <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
                <ModeSelectionButton>Boat Operator</ModeSelectionButton>
                <ModeSelectionButton>Control Office</ModeSelectionButton>
            </Stack>
        </Container>
    )
}
