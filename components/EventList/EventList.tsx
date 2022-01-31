import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import { useEvents } from '../../pages/events/useEvents';


interface EventListItemProps {
    id: string
    name: string
    description: string
}


const EventListItem: FC<EventListItemProps> = ({ id, name, description }) => {
    const theme = useMantineTheme();
   

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{ width: 240, margin: 'auto' }}>
            <Card shadow="sm" padding="lg">
                <Card.Section>
                    <Image src={`https://picsum.photos/480?random=${Math.floor(Math.random() * 10)}`} height={160} alt={name} />
                </Card.Section>

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Text weight={500}>{name}</Text>
                </Group>

                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }} lineClamp={3}>
                    {description}
                </Text>

                <Link href={{
                    pathname: '/events/[id]',
                    query: {
                        id
                    }
                }}>
                    <Button component="a" variant="gradient" gradient={{ from: 'orange', to: 'red' }} fullWidth style={{ marginTop: 14 }}>
                        Book now
                    </Button>
                </Link>
            </Card>
        </div>
    );
}

export const EventList = () => {
    const {data, error} = useEvents()

    if (!!error) {
        return <div>Error: {JSON.stringify(error)}</div>
    }

    if (!data) {
        return <div>Loading...{process.env.NEXT_PUBLIC_API_URL}</div>
    }

    if (data.length === 0) {
        return <div>No events found</div>
    }


    return (
        <Group grow>
            {data.map(e => <EventListItem key={e.id} {...e} />)}
        </Group>
    )

}