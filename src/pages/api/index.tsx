import { MAIN_URL } from "@/config"

class ApiService {
    private mainUrl

    constructor(url: string) {
        this.mainUrl = url
    }

    async postData<T>(endpoint: string, data: T) {
        const mainUrl = `${this.mainUrl}/${endpoint}`

        try {
            const response: any = await fetch(mainUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const res = await response.json()

            return await res
        } catch (error: any) {
            console.error(error)
        }
    }
    async getData(endpoint: string) {
        const mainUrl = `${this.mainUrl}/${endpoint}`

        try {
            const response: any = await fetch(mainUrl)

            const res = await response.json()

            return await res
        } catch (error: any) {
            console.error(error)
        }
    }
    async postWithToken<T extends BodyInit >(endpoint: string, data: T) {
        const mainUrl = `${this.mainUrl}/${endpoint}`

        try {
            const response: any = await fetch(mainUrl, {
                method: "POST",
                headers: { 
                    "Authorization": `${typeof window !== "undefined" && window.localStorage.getItem("accessToken")}`
                },
                body: data,
            })

            const res = await response.json()

            return await res
        } catch (error: any) {
            console.error(error);
        }
    }
    async putData<T extends BodyInit >(endpoint: string, data: T) {
        const mainUrl = `${this.mainUrl}/${endpoint}`

        try {
            const response: any = await fetch(mainUrl, {
                method: "PUT",
                headers: { 
                    "Authorization": `${typeof window !== "undefined" && window.localStorage.getItem("accessToken")}`
                },
                body: data,
            })

            const res = await response.json()

            return await res
        } catch (error: any) {
            console.error(error);
        }
    }
    async get(endpoint: string){
        const mainUrl = `${this.mainUrl}/${endpoint}`
        
        const response: any = await fetch(mainUrl)
            const res = await response.json()
            return await res
    }
}
export const api = new ApiService(MAIN_URL)