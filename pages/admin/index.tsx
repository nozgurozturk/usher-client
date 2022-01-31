import { Button, Container, Paper } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import type { NextPage } from 'next'
import { EventListAdmin } from '../../components/EventList/EventListAdmin'

import { LayoutList } from '../../components/LayoutList/LayoutList'

const reset = async (path: string): Promise<unknown> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080")
    url.pathname = `${path}`

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}

const Admin: NextPage = () => {
    const notifications = useNotifications()
    const handleResetDatabase = async () => {
        try {
            await reset("/admin/v1/reset")
            notifications.showNotification({
                message: 'Database reset successful',
                title: 'Success',
                color: 'green',
            })
        } catch (error) {
            notifications.showNotification({
                message: "Database reset failed",
                color: 'red',
                title: 'Error'
            })
        }
    }
    return (
        <Container>
            {/* Reset Database */}
            <Paper padding="lg" mt="xl" ml="xl" radius="lg">
                <LayoutList />
            </Paper>
            <Paper padding="lg" mt="xl" ml="xl" radius="lg">
                <EventListAdmin />
            </Paper>
            <Button onClick={handleResetDatabase} size="xs" mt={200} ml={"auto"} variant="gradient" gradient={{ from: 'red', to: 'grape' }} >
                Reset Database
            </Button>
        </Container>

    )
}

export default Admin
