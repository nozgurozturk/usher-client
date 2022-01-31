import useSWR, { Fetcher } from "swr"
import { Hall } from "./layout"

export const getLayouts = async (path: string): Promise<Hall[]> => {
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

const fetcher: Fetcher<Hall[], string> = (url: string) => getLayouts(url)

export const useLayouts = () => {
    return useSWR<Hall[]>('/admin/v1/layouts', fetcher)
}
