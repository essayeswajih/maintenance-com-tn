const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8005'

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include', // Important for HttpOnly cookies
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'An unexpected error occurred')
    }

    // Handle empty responses (like 204 No Content)
    if (response.status === 204) {
        return {} as T
    }

    return response.json()
}
