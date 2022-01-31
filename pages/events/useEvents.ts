import useSWR, { Fetcher } from "swr"


interface Event {
    id: string
    name: string
    description: string
    startDate: string
    endDate: string
    locationID: string
}

export const getEvents = async (path: string): Promise<Event[]> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1")
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
    return useSWR<Event[]>('/api/v1/events', fetcher)
}
