import { FC, useState } from 'react'
import { Popover, Badge, ColorSwatch, Text, Group, useMantineTheme } from '@mantine/core'

interface SeatProps {
    number: number
    features: number
    rank: number
    available: boolean
}

// Bitmask of features
const FEATURES = {
    Aisle: 1,
    High: 2,
    Front: 4,
}

// hasFeature returns true if the seat has the given feature
const hasFeature = (features: SeatProps['features'], feature: number) => (features & feature) === feature


export const Seat: FC<SeatProps> = ({ number, features, rank, available, ...props }) => {
    const theme = useMantineTheme();

    const [opened, setOpened] = useState(false);
    return (
        <Group position="center" spacing="xs">
            <Popover
                opened={available && opened}
                onClose={() => setOpened(false)}
                position="bottom"
                placement="center"
                withArrow
                noFocusTrap
                noEscape
                transition="pop-top-left"

                styles={{ body: { pointerEvents: 'none' } }}
                target={

                    <ColorSwatch
                        component="button"
                        onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}
                        color={available ? Object.values(theme.colors).reverse()[rank][4]: "gray"}
                        style={{ color: '#fff', cursor: 'pointer' }}
                    >
                        {number}
                    </ColorSwatch>

                }
            >
                <Group>
                    <Text weight={600} size="sm">Rank: {rank}</Text>
                    {Object.entries(FEATURES).map(([key, value]) => (
                        hasFeature(features, value) && <Text weight={600} size="sm" key={key}>{key}</Text>
                    ))}
                </Group>
            </Popover>
        </Group>

    )
}