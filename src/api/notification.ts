import { axiosInstance } from "./config"

export const notificationsApi={
    getAll(){
        return axiosInstance.get("./notifications")
    },
    createOne(form:FormData){
        return axiosInstance.post("./notifications",form)
    }
}