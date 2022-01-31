import useSWR, { Fetcher } from "swr"

interface CheckoutRequest {
    count: number
    eventID: string
    userID: string
    preferences: {
        features: number | null
        rank: number
    }
}

interface CheckoutResponse {
    count: number
    eventID: string
    userID: string
    preferences: {
        features: number | null
        rank: number
    }
}


export const checkout = async (path: string, req: CheckoutRequest): Promise<CheckoutResponse> => {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080")
    url.pathname = `/api/v1${path}`

    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    return response.json()
}

// const fetcher: Fetcher<CheckoutResponse, [string, CheckoutRequest]> = (url: string, req:CheckoutRequest) => checkout(url, req)

// export const useCheckout = (req: CheckoutRequest) => {
//     return useSWR<CheckoutResponse>(() => req?.count && req?.eventID && req?.userID ? ['/api/v1/checkout', req] : null, fetcher)
// }
