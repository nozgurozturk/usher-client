import useSWR, { Fetcher } from "swr"

interface User {
    id: string
    name: string
}

export const getUsers = async (path: string): Promise<User[]> => {
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

const fetcher: Fetcher<User[], string> = (url: string) => getUsers(url)

export const useUsers = () => {
    return useSWR<User[]>('/api/v1/users', fetcher)
}
