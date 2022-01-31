import useSWR, { Fetcher } from "swr"


export const reserveSeats = async (path: string, id: string): Promise<unknown> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1")
    url.pathname = `${path}/${id}/reserve`

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const resp = await response.json()
    if (response.status !== 200) {
        throw new Error(resp.message)
    }

    return resp
}

const fetcher: Fetcher<unknown, [string, string]> = (url: string, id: string) => reserveSeats(url, id)

export const useCheckEventSeats = (id: string) => {
    return useSWR<unknown>(() => id  ? ['/admin/v1/events', id] : null, fetcher)
}
