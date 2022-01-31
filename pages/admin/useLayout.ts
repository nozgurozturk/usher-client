import useSWR, { Fetcher } from "swr"
import { Hall } from "./layout"

export const getLayout = async (path: string, id: string): Promise<Hall> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080")
    url.pathname = `${path}/${id}`

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    return response.json()
}

const fetcher: Fetcher<Hall, [string, string]> = (url: string, id: string) => getLayout(url, id)

export const useLayout = (id: string) => {
    return useSWR<Hall>(() => id ? ['/admin/v1/layouts', id] : null, fetcher)
}
