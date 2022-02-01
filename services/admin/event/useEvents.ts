import useSWR, { Fetcher } from "swr"
import { Event } from "./event"


export const getEvents = async (path: string): Promise<Event[]> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080")
    url.pathname = path

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}

const fetcher: Fetcher<Event[], string> = (url: string) => getEvents(url)

export const useEvents = () => {
    return useSWR<Event[]>('/admin/v1/events', fetcher)
}
