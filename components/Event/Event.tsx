import { Group, Image, Text, Box, useMantineTheme, Title, Badge } from "@mantine/core";
import { FC } from "react";


interface EventProps {
    id: string
    name: string
    description: string
    startDate: string
    endDate: string
}

export const Event: FC<EventProps> = ({ id, name, description, startDate, endDate }) => {
    const theme = useMantineTheme();
   

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];


    return (
        <Box>
            <Image
                src={`https://picsum.photos/1080?random=${Math.floor(Math.random() * 10)}`}
                height={320}
                alt={name}
            />
            <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                <Title >{name}</Title>
                {
                    startDate && endDate && (
                        <Badge variant="light" color="primary" >
                            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
                        </Badge>
                    )
                }
            </Group>
            <Text  style={{ color: secondaryColor, lineHeight: 1.5 }} >
                {description}
            </Text>
        </Box>
    )
}