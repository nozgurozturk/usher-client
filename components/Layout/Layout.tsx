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
                    <Group direction="column">
                        <Text weight={700}>Section - {section.name}</Text>
                        <Paper padding="md" radius="xl">
                            {
                                section.rows.sort((a, b) => a.order - b.order).map(row => (
                                    <Group direction="row">
                                        <Text>{row.name}</Text>
                                        {
                                            row.seats.map(seat => (
                                                <Seat {...seat} />
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