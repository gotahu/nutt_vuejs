import axios, { AxiosInstance } from "axios";

const apiClient : AxiosInstance = axios.create({
    // API のURL
    baseURL: "https://hinyari.net/other/nutt/api",
    // リクエストヘッダ
    headers: {
        "Content-type": "application/json"
    }
})

export default apiClient;