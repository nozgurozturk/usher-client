import useSWR, { Fetcher } from "swr"



interface CheckSeatsRequest {
    count: number
    rank: number | null
    features: number | null
}

interface CheckSeatsResponse {
    remaining: number
}


export const checkSeats = async (path: string, id: string, req: CheckSeatsRequest): Promise<CheckSeatsResponse> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1")
    url.pathname = `${path}/${id}/check`

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    return response.json()
}

const fetcher: Fetcher<CheckSeatsResponse, [string, string, CheckSeatsRequest]> = (url: string, id: string, req:CheckSeatsRequest) => checkSeats(url, id, req)

export const useCheckEventSeats = (id: string, req: CheckSeatsRequest) => {
    return useSWR<CheckSeatsResponse>(() => id && req?.count ? ['/api/v1/events', id, req] : null, fetcher)
}
