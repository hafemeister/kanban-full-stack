import { Box, Card, CardContent, Grid, Stack } from "@mui/material"
import { FirstLoadNotification } from "./FirstLoadNotification"

type RefreshTrackingCardProps = {
    isFirstLoad?: boolean
    refreshedAt?: Date
    children?: JSX.Element
}

export function RefreshTrackingCard({
    isFirstLoad,
    refreshedAt,
    children,
}: RefreshTrackingCardProps) {
    return (
        <Card sx={{ my: 2 }}>
            <CardContent>
                <Stack spacing={2}>
                    {isFirstLoad && <FirstLoadNotification />}

                    {!isFirstLoad && (
                        <Grid
                            container
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignContent={"center"}
                            alignItems={{ sm: "center" }}
                        >
                            {children}
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {refreshedAt && (
                                    <>last refresh at {refreshedAt.toLocaleTimeString()}</>
                                )}
                            </Box>
                        </Grid>
                    )}
                </Stack>
            </CardContent>
        </Card>
    )
}
