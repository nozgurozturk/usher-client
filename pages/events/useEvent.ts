import useSWR, { Fetcher } from "swr"
import { Event } from "./event"


export const getEvent = async (path: string, id:string): Promise<Event> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1")
    url.pathname = `${path}/${id}` 
 
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}

const fetcher: Fetcher<Event, [string, string]> = (url: string, id: string) => getEvent(url, id)

export const useEvent = (id: string) => {
    return useSWR<Event>(() => id ? ['/api/v1/events', id]: null, fetcher)
}
