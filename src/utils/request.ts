import axios, { type AxiosRequestHeaders } from "axios"
import { useTokenStore } from '@/stores/loginToken'

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const request_user = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

request_user.interceptors.request.use((config) => {
    if(!config.headers){
        config.headers = {} as AxiosRequestHeaders
    }
    const store = useTokenStore()
    config.headers.Authorization = `Bearer ${store.token.access_token}`
    return config
})

const request_chat = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

export { request,request_user,request_chat };