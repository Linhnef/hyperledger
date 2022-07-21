import axios, { AxiosInstance } from "axios"

export type CreateApiClientArgs = {
    baseURL?: string
}

export const createApiClient = (args: CreateApiClientArgs): AxiosInstance => {
    const { baseURL } = args
    const api = axios.create({
        baseURL,
    })

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token")
        config.headers = Object.assign(
            {
                Authorization: `Bearer ${token}`,
            },
            config.headers
        )
        return config
    })
    api.interceptors.response.use((response) => {
        return response;
    }, function (error) {
        if (error.response.status === 400) {
            throw error
        } else if (error.response.status === 403 || error.response.status === 403) {
            localStorage.clear();
            window.location.href = "/login";
        }

    })

    return api
}