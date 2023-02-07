import Head from "next/head"
import { ModeSelectionContainer } from "@/features/mode-selection/ModeSelectionContainer"
import { ContentWithTopNavigation } from "@/features/layouts/ContentWithTopNavigation"

/**
 * to simplify the interface for users, we let them select their application mode on first load of the app
 * this page is the gateway for managing the display of those parts
 */
export default function SelectMode() {
    return (
        <>
            <Head>
                <title>Please pick an application mode</title>
                <meta
                    name="description"
                    content="Selection page to pick which mode the application will operate in."
                />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ContentWithTopNavigation title={"Select your reason to use this application:"}>
                <ModeSelectionContainer />
            </ContentWithTopNavigation>
        </>
    )
}
