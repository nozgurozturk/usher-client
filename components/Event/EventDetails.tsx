import { FC, useState } from 'react';
import { Group, Collapse, Text, Table, ThemeIcon, ActionIcon, Paper } from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconSofa, IconRegistered } from '@tabler/icons';
import { Reservation, Ticket } from '../../pages/admin/events/event';

interface ReservationListItemProps {
    reservation: Reservation
}

// Bitmask of features
const FEATURES = {
    Aisle: 1,
    High: 2,
    Front: 4,
}

// hasFeature returns true if the seat has the given feature
const hasFeature = (features: number, feature: number) => (features & feature) === feature



const ReservationListItem: FC<ReservationListItemProps> = ({ reservation }) => {
    const { event, id, size, preferences: { rank, features }, user } = reservation
    return (
        <tr key={id}>

            <td> <Text lineClamp={1} weight={500}>{id}</Text></td>
            <td> <Text weight={500}>{event.name}</Text></td>
            <td> <Text weight={500}>{rank}</Text></td>
            <td>  {Object.entries(FEATURES).map(([key, value]) => (
                hasFeature(features, value) && <Text weight={500} size="sm" key={key}>{key}</Text>
            ))}
            </td>
            <td> <Text weight={500}>{size}</Text></td>

        </tr>

    );
}

interface TicketListItemProps {
    ticket: Ticket
}

const TicketListItem: FC<TicketListItemProps> = ({ ticket }) => {
    const { event, seat, id, user } = ticket
    return (
        <tr key={id}>
            <td> <Text lineClamp={1} weight={500}>{id}</Text></td>
            <td> <Text weight={500}>{event.name}</Text></td>
            <td> <Text weight={500}>{seat.number}</Text></td>
            <td> <Text lineClamp={1} weight={500}>{user.id}</Text></td>
        </tr>
    );
}


interface EventDetailsProps {
    tickets: Ticket[];
    reservations: Reservation[];
}

export const EventDetails: FC<EventDetailsProps> = ({ tickets, reservations }) => {
    
    const [opened, setOpen] = useState([false, false]);

    if (!tickets || !reservations) {
        return <div>Loading...</div>
    }

    if (tickets.length === 0 && reservations.length === 0) {
        return <div>No details found</div>
    }
    return (
        <Group direction="column" grow>
            <Paper padding="lg" mt="xl" ml="xl" radius="lg">
                <Group direction="column" grow>
                    <Group position="apart" >
                        <Group noWrap>
                            <ThemeIcon>
                                <IconSofa />
                            </ThemeIcon>
                            <Text weight={700}>Tickets</Text>
                        </Group>

                        <ActionIcon onClick={() => setOpen(([ticket, reservation]) => [!ticket, reservation])}>
                            {opened[0] ? <IconChevronUp /> : <IconChevronDown />}
                        </ActionIcon>
                    </Group>
                    <Collapse in={opened[0]}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Event</th>
                                    <th>Seat Number</th>
                                    <th>User ID</th>

                                </tr>
                            </thead>
                            <tbody>{tickets.map(t => <TicketListItem ticket={t} />)}</tbody>
                        </Table>
                    </Collapse>
                </Group>
            </Paper>
            <Paper padding="lg" mt="xl" ml="xl" radius="lg">
                <Group direction="column" grow>
                    <Group position="apart" >
                        <Group noWrap>
                            <ThemeIcon>
                                <IconRegistered />
                            </ThemeIcon>
                            <Text weight={700}>Reservations</Text>
                        </Group>

                        <ActionIcon onClick={() => setOpen(([ticket, reservation]) => [ticket, !reservation])}>
                            {opened[1] ? <IconChevronUp /> : <IconChevronDown />}
                        </ActionIcon>
                    </Group>
                    <Collapse in={opened[1]}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Event</th>
                                    <th>Rank</th>
                                    <th>Features</th>
                                    <th>Size</th>
                                </tr>
                            </thead>
                            <tbody>{reservations.map(r => <ReservationListItem reservation={r} />)}</tbody>
                        </Table>
                    </Collapse>
                </Group>
            </Paper>
        </Group>
    );
}
