import { Box, Group, Container, Button, SimpleGrid } from '@mantine/core'
import { useNotifications } from '@mantine/notifications'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { Event } from '../../../components/Event/Event'
import { EventDetails } from '../../../components/Event/EventDetails'
import { Layout } from '../../../components/Layout/Layout'
import { useEvent } from '../../../services/admin/event/useEvent'
import { reserveSeats } from '../../../services/admin/event/useReserve'

const EventDetail: NextPage = () => {
    const notifications = useNotifications()
    const { mutate } = useSWRConfig()
    const { query } = useRouter()
    const { data, error } = useEvent(query.id as string)
    if (!!error) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!data) {
        return <div>Loading...</div>
    }

    const handleReserve = async () => {
        try {
            await reserveSeats("/admin/v1/events", query.id as string)

            notifications.showNotification({
                message: 'Reservation successful',
                title: 'Success',
                color: 'green',
            })
            await mutate(["/admin/v1/events", query.id])
        } catch (error) {
            notifications.showNotification({
                message: (error as Error).message,
                color: 'red',
                title: 'Reservation failed'
            })
        }
    }

    return (
        <Container >
            <Group direction="column" grow noWrap>
                <Event {...data.event} />
                <Group align="flex-start" grow noWrap >
                    <Layout hall={data.layout} />
                    <Group mt={40} direction="column">
                        <Button fullWidth onClick={handleReserve} variant="gradient" gradient={{ from: 'orange', to: 'grape' }} >
                            Reserve Seats
                        </Button>
                        <EventDetails tickets={data.tickets ?? []} reservations={data.reservations ?? []} />
                    </Group>
                </Group>
            </Group>
        </Container>


    )
}

export default EventDetail
