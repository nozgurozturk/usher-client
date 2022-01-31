import { FC } from "react"
import { Text, Group, Title, Paper } from '@mantine/core'
import { Seat } from "./Seat"

interface Hall {
    name: string;
    sections: Section[];
}

interface Section {
    name: string;
    rows: Row[];
}

interface Row {
    name: string;
    order: number;
    seats: Seat[];
}

interface Seat {
    position: Position;
    number: number;
    features: number;
    rank: number;
    available: boolean;
}

interface Position {
    row: number;
    col: number;
}


interface LayoutProps {
    hall?: Hall;
}

export const Layout: FC<LayoutProps> = ({ hall }) => {
    if (!hall) {
        return null
    }
    return (
        <Group direction="column">
            <Title>{hall.name}</Title>
            {
                hall.sections.map(section => (
                    <Group key={section.name} spacing="xs" direction="column">
                        <Text weight={700}>Section - {section.name}</Text>
                        <Paper padding="md" radius="xl">
                            {
                                section.rows.sort((a, b) => a.order - b.order).map(row => (
                                    <Group key={`${section.name}-${row.name}`} spacing="xs" direction="row">
                                        <Text>{row.name}</Text>
                                        {
                                            row.seats.map(seat => (
                                                <Seat key={`${section.name}-${row.name}-${seat.number}`} {...seat} />
                                            ))
                                        }
                                    </Group>
                                ))
                            }
                        </Paper>
                    </Group>
                ))
            }
        </Group>

    )
}