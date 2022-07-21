import { createApiClient } from "../services/createApiClient"
import { createAppApiClient } from "../services/createAppApiClient"

export const useApi = () => {
    return createAppApiClient(createApiClient({ baseURL: "http://localhost:3000" }))
}