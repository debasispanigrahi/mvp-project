import { axiosInstance } from "./config"

export const notificationsApi={
    getAll(){
        return axiosInstance.get("./notifications")
    },
    createOne(form: Form){
        return axiosInstance.post("./notifications",form)
    }
}