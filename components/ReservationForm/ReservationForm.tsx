import { Paper, Button, MultiSelect, Select, NumberInput, Text, Group } from "@mantine/core"
import { useForm } from "@mantine/hooks"
import { NotificationProps, useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FC, useEffect } from "react"
import { useCheckEventSeats } from "../../pages/events/useCheckEventSeats";

interface FormValues {
    rank: number | null;
    count: number;
    features: number | null;
}

const INITIAL_VALUES: FormValues = {
    rank: null,
    count: 0,
    features: null,
}

const MAX_RANK = 7;
const RANKS = new Array(MAX_RANK).fill(0).map((_, i) => ({
    value: `${i + 1}`,
    label: `Rank ${i + 1}`,
}))

const infoNotification = (count: number) : NotificationProps => ({
    message: `You can reserve ${count} seats`,
    title: "Seats available",
    color:"blue",
})

const errorNotification = (remaining: number) : NotificationProps=> ({
    message: `You can not reserve ${remaining} seats`,
    title: "Seats are not available",
    color:"red",
})

const notifyWith = (remaining: number, count: number) => {
    if (remaining < count) {
        return errorNotification(remaining)
    }
    return infoNotification(count)
}


export const ReservationForm: FC = () => {
    const {query} = useRouter()
    const notifications = useNotifications();

    const resForm = useForm<FormValues>({ initialValues: INITIAL_VALUES })

    const {data} = useCheckEventSeats(query.id as string, resForm.values)



    useEffect(() => {
        if (!!data) {
            notifications.showNotification(notifyWith(data.remaining, resForm.values.count))
        }
    }, [data])
    

    return (
        <form>
            <Group direction="column" spacing="md" grow >
            <MultiSelect
                data={[
                    { value: "2", label: "High" },
                    { value: "4", label: "Front" },
                ]}
                label="Features"
                placeholder="Select features"
                onChange={(values) => {
                    resForm.setFieldValue("features", values.reduce((acc, value) => acc | parseInt(value), 0))
                }}
            />
            <Select
                label="Rank"
                placeholder="Select rank"
                data={RANKS}
                onChange={(value) => resForm.setFieldValue('rank', Number(value))}
            />
            <NumberInput
                label="Seats"
                placeholder="Number of seats"
                onChange={(value) => resForm.setFieldValue('count', Number(value))}
            />
            <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} fullWidth style={{ marginTop: 14 }}>
                <Text>Buy Tickets</Text>
            </Button>
            </Group>
        </form>
    )
}