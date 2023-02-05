import { Avatar, Box, Card, CardContent, CardHeader, Stack } from "@mui/material"
import { red } from "@mui/material/colors"
import { upperCase } from "lodash-es"

type KanbanSwimlaneProps = {
    children?: JSX.Element | JSX.Element[]
    title: string
}

export function KanbanSwimlane({ children, title }: KanbanSwimlaneProps) {
    return (
        <Box sx={{ width: "100%" }}>
            <Card sx={{ bgcolor: "info.light" }} variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label={title}>
                            {upperCase(title[0])}
                        </Avatar>
                    }
                    title={title}
                />
                <CardContent>{children}</CardContent>
            </Card>
        </Box>
    )
}
