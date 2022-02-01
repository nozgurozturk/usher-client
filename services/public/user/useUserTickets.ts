import useSWR, { Fetcher } from "swr"

export interface Ticket {
    id: string;
    event: Event;
    user: User;
    seat: Seat;
}

export interface Event {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: {
        id: string;
        name: string;
    }
}

export interface Seat {
    position: Position;
    number: number;
    features: number;
    rank: number;
    available: boolean;
}

export interface Position {
    row: number;
    col: number;
}

export interface User {
    id: string;
    name: string;
}


export const getTickets = async (path: string, id: string): Promise<Ticket[]> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080")
    url.pathname = path + "/" + id + "/tickets"

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}

const fetcher: Fetcher<Ticket[], [string, string]> = (url: string, id: string) => getTickets(url, id)

export const useUserTickets = (id: string) => {
    return useSWR<Ticket[]>(() => id ? ['/api/v1/users', id] : null, fetcher)
}
