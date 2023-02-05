import Head from "next/head"
import { ContentWithTopNavigation } from "@/features/layouts/ContentWithTopNavigation"
import { Button, Stack } from "@mui/material"
import { useCallback } from "react"
import { useRouter } from "next/router"
import { useNavigation } from "@/features/navigation/useNavigation"

export default function Home() {
    const { go } = useNavigation("/boat-status")
    const canShowBoats = true
    const hasSelectedMode = true

    return (
        <>
            <Head>
                <title>Welcome to the Kanboats Application</title>
                <meta name="description" content="welcome page for Kanboats app" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ContentWithTopNavigation title={"Welcome to Kanboats"} isHome={true}>
                <Stack spacing={2}>
                    {canShowBoats && (
                        <Button
                            variant="contained"
                            sx={{ height: 100 }}
                            color="success"
                            fullWidth={true}
                            onClick={() => go()}
                        >
                            Go to Boat Status page
                        </Button>
                    )}

                    <Button
                        variant="outlined"
                        sx={{ height: 100 }}
                        color="warning"
                        fullWidth={true}
                        onClick={() => go("/select-mode")}
                    >
                        Select Application Mode
                    </Button>
                </Stack>
            </ContentWithTopNavigation>
        </>
    )
}
