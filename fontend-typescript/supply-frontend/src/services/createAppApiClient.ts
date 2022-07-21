import { AxiosInstance } from "axios"
import { Product } from "./types/Product"
import { ActiveRequest } from "./types/requests/ActiveRequest"
import { CreateProductRequest } from "./types/requests/CreateProductRequest"
import { GetProductByIdRequest } from "./types/requests/getProductByIdRequest"
import { GetUserByIdRequest } from "./types/requests/GetUserByIdRequest"
import { LoginRequest } from "./types/requests/LoginRequest"
import { SignUpRequest } from "./types/requests/SignUpRequest"
import { UpdateProductRequest } from "./types/requests/UpdateProductRequest"
import { GetAllProductsResponse } from "./types/responses/GetAllProductsResponse"
import { GetAllUserResponse } from "./types/responses/GetAllUserResponse"
import { GetProductByIdResponse } from "./types/responses/GetProductByIdResponse"
import { GetUserResponse } from "./types/responses/GetUserResponse"
import { LoginResponse } from "./types/responses/LoginResponse"
import { UpdateProductResponse } from "./types/responses/UpdateProductResponse"
import { User } from "./types/User"

export const createAppApiClient = (api: AxiosInstance) => {
    return {
        login: login(api),
        signUp: signUp(api),
        getAllProduct: getAllProduct(api),
        createProuct: createProuct(api),
        getAllUser: getAllUser(api),
        getUserById: getUserById(api),
        getProductById: getProductById(api),
        updateProduct: updateProduct(api),
        active: active(api),
        deActive: deActive(api)
    }
}


const login =
    (api: AxiosInstance) =>
        async (data: LoginRequest): Promise<LoginResponse | undefined> => {
            try {
                const res = await api.post<LoginResponse>("/login", data)
                return res.data
            } catch (err) {
            }
        }

const signUp =
    (api: AxiosInstance) =>
        async (data: SignUpRequest): Promise<LoginResponse | undefined> => {
            try {
                const res = await api.post<LoginResponse>("/createUser", data)
                return res.data
            } catch (err) {
            }
        }

const getAllProduct =
    (api: AxiosInstance) =>
        async (): Promise<Product[] | undefined> => {
            try {
                const res = await api.get<GetAllProductsResponse>("/getProducts")
                return res.data.sucess
            } catch (err) {
            }
        }

const createProuct =
    (api: AxiosInstance) =>
        async (data: CreateProductRequest): Promise<CreateProductRequest | undefined> => {
            try {
                const res = await api.post<CreateProductRequest>("/createProduct", data)
                return res.data
            } catch (err) {
            }
        }

const getAllUser =
    (api: AxiosInstance) =>
        async (): Promise<User[] | undefined> => {
            try {
                const res = await api.get<GetAllUserResponse>("/getUsers")
                return res.data.sucess
            } catch (err) {
            }
        }
const getUserById =
    (api: AxiosInstance) =>
        async (data: GetUserByIdRequest): Promise<User | undefined> => {
            try {
                const res = await api.get<GetUserResponse>("/getUser", { params: data })
                return res.data.sucess
            } catch (err) {
            }
        }
const getProductById =
    (api: AxiosInstance) =>
        async (data: GetProductByIdRequest): Promise<Product | undefined> => {
            try {
                const res = await api.get<GetProductByIdResponse>("/getProduct", { params: data })
                return res.data.sucess
            } catch (err) {
            }
        }

const updateProduct =
    (api: AxiosInstance) =>
        async (data: UpdateProductRequest): Promise<UpdateProductResponse | undefined> => {
            try {
                const res = await api.post<UpdateProductResponse>("/updateProduct", data)
                return res.data
            } catch (err) {
            }
        }

const active =
    (api: AxiosInstance) =>
        async (data: ActiveRequest): Promise<{ sucess: boolean } | undefined> => {
            try {
                const res = await api.post<{ sucess: boolean }>("/active", data)
                return res.data
            } catch (err) {
            }
        }

const deActive =
    (api: AxiosInstance) =>
        async (data: ActiveRequest): Promise<{ sucess: boolean } | undefined> => {
            try {
                const res = await api.post<{ sucess: boolean }>("/deActive", data)
                return res.data
            } catch (err) {
            }
        }