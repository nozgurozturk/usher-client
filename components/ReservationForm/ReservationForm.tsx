import { Button, MultiSelect, Select, NumberInput, Text, Group, SegmentedControl } from "@mantine/core"
import { useForm } from "@mantine/hooks"
import { NotificationProps, useNotifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { FC, FormEvent, useCallback, useEffect, useState } from "react"
import { useCheckEventSeats } from "../../pages/events/useCheckEventSeats";
import { checkout } from "../../pages/events/useCheckout";
import { useUsers } from "../../pages/users/useUsers";

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

const infoNotification = (message: string, title: string): NotificationProps => ({
    message,
    title,
    color: "blue",
})

const errorNotification = (message: string, title: string): NotificationProps => ({
    message,
    title,
    color: "red",
    
})

const notifyWith = (remaining: number, count: number) => {
    if (remaining < count) {
        return errorNotification(`You can not reserve ${count} seats`, "Seats are not available")
    }
    return infoNotification(`You can reserve ${remaining} seats`, "Seats available")
}


export const ReservationForm: FC = () => {
    const { data: users, error } = useUsers()

    const [selectedUser, setSelectedUser] = useState<string>("")

    const { query } = useRouter()

    const notifications = useNotifications();

    const resForm = useForm<FormValues>({ initialValues: INITIAL_VALUES })

    const { data, } = useCheckEventSeats(query.id as string, resForm.values)


    const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await checkout('/checkout', {
                count: resForm.values.count,
                eventID: query.id as string,
                userID: selectedUser,
                preferences: {
                    features: resForm.values.features,
                    rank: resForm.values.rank ?? 0,
                }
            })
            
            notifications.showNotification(infoNotification("Reservation successful", "Success"))
        } catch (error) {
            notifications.showNotification(errorNotification("Reservation unsuccessfull", "Error"))
        }

    }

    useEffect(() => {
        if (!!data) {
            notifications.showNotification(notifyWith(data.remaining, resForm.values.count))
        }
    }, [data])


    return (
        <form onSubmit={handleCheckout}>
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

                <Button type="submit" variant="gradient" gradient={{ from: 'orange', to: 'red' }} fullWidth style={{ marginTop: 14 }}>
                    <Text>Buy Tickets as</Text>
                </Button>
                {users && !!users.length &&
                    <SegmentedControl
                        fullWidth style={{ marginTop: 14 }}
                        data={users.map(user => ({ label: user.name, value: user.id }))}
                        onChange={(value) => setSelectedUser(value)}
                    />}

            </Group>
        </form>
    )
}