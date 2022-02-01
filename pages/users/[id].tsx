import { Container, Group, Paper, Text, Title } from "@mantine/core"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useUserTickets } from "../../services/public/user/useUserTickets"

const FEATURES = {
    Aisle: 1,
    High: 2,
    Front: 4,
}

// hasFeature returns true if the seat has the given feature
const hasFeature = (features: number, feature: number) => (features & feature) === feature

const UserDetail: NextPage = () => {
    const { query } = useRouter()

    const { data, error } = useUserTickets(query.id as string)

    if (!!error) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!data) {
        return <div>Loading...</div>
    }

    if (data.length === 0) {
        return <div>No tickets</div>
    }

    return (
        <Container>
            <Title>{data[0].user.name}</Title>
            <Text weight={700}>Tickets</Text>
            <Group mt="lg" direction="column" align="flex-start" grow >
                {
                    data.map((ticket) => (
                        <Group
                             spacing={4} align="flex-start" key={ticket.id}>
                            <Paper
                                sx={(theme) => ({
                                    height: 120,
                                    width: 320,
                                    background: `linear-gradient(45deg, ${theme.colors.orange[4]} 0%, ${theme.colors.red[4]} 100%)`,

                                })}
                                padding="xl" radius="lg">
                                <Text size="xl" weight={700} color="white">{ticket.event.name}</Text>
                                <Text size="lg" weight={700} color="white">{ticket.event.location.name}</Text>
                                {ticket.event.startDate && ticket.event.endDate && (
                                    <Text size="sm" color="white">
                                        {new Date(ticket.event.startDate).toLocaleDateString()} - {new Date(ticket.event.endDate ).toLocaleDateString()}
                                    </Text>
                                )}
                            </Paper>
                            <Paper
                                sx={(theme) => ({
                                    height: 120,
                                    background: `linear-gradient(45deg, ${theme.colors.orange[4]} 0%, ${theme.colors.red[4]} 100%)`,

                                })}
                                padding="xl" radius="lg">
                                <Text size="lg" weight={700} color="white">Rank: {ticket.seat.rank}</Text>
                                <Text size="md" weight={700} color="white">Seat: {ticket.seat.number}</Text>
                                <Text size="md"weight={700} color="white">Row: {ticket.seat.position.row + 1}</Text>
                                {Object.entries(FEATURES).map(([key, value]) => (
                                    hasFeature(ticket.seat.features, value) && <Text weight={600} size="sm" key={key}>The seat has {key} feature</Text>
                                ))}
                            </Paper>
                        </Group>
                    ))
                }
            </Group >
        </Container>
    )
}

export default UserDetail