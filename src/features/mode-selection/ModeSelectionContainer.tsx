import { Container, Stack } from "@mui/material"
import { ModeSelectionButton } from "./ModeSelectionButton"
import { UserGroup } from "./constants"

export function ModeSelectionContainer() {
    return (
        <Container>
            <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
                <ModeSelectionButton group={UserGroup.BoatOperator}>
                    Boat Operator
                </ModeSelectionButton>
                <ModeSelectionButton group={UserGroup.OfficeCoordinator}>
                    Control Office
                </ModeSelectionButton>
            </Stack>
        </Container>
    )
}
