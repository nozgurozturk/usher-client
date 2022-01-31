import { FC, useState } from 'react';
import { Group, Collapse, Text, Button, Table, ThemeIcon, ActionIcon } from '@mantine/core';
import { IconChevronUp, IconChevronDown, IconCalendarEvent } from '@tabler/icons';
import Link from 'next/link';
import { useEvents } from '../../pages/admin/events/useEvents';



interface EventListItemProps {
    id: string
    name: string
}


const EventListItem: FC<EventListItemProps> = ({ id, name }) => {
    
    return (
        <tr key={id}>
            <td> <Text weight={500}>{name}</Text></td>
            <td>
                <Link href={{
                    pathname: '/admin/events/[id]',
                    query: {
                        id
                    }
                }}>
                    <Button component="a" variant="subtle">
                        Details
                    </Button>
                </Link>
            </td>
        </tr>

    );
}

export const EventListAdmin = () => {
    const { data, error } = useEvents()
    const [opened, setOpen] = useState(false);

    if (!!error) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!data) {
        return <div>Loading...</div>
    }

    if (data.length === 0) {
        return <div>No events found</div>
    }
    return (
        <Group direction="column" grow>
            <Group position="apart">
                <Group noWrap>
                    <ThemeIcon>
                        <IconCalendarEvent />
                    </ThemeIcon>
                    <Text weight={700}>Events</Text>
                </Group>

                <ActionIcon ml="auto" onClick={() => setOpen((prev) => !prev)}>
                    {opened ? <IconChevronUp /> : <IconChevronDown />}
                </ActionIcon>
            </Group>
            <Collapse in={opened}>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{data.map(e => <EventListItem key={e.id} {...e} />)}</tbody>
                </Table>
            </Collapse>
        </Group>
    );
}
