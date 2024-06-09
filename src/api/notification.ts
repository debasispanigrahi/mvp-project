import { axiosInstance } from "./config";

export const notificationsApi = {
  getAll() {
    return axiosInstance.get<{notifications:NoticeModel[]}>("./notifications");
  },
  createOne(form: FormData) {
    return axiosInstance.post("./notifications", form);
  },
  deleteOne(id: string) {
    return axiosInstance.delete(`./notifications?id=${id}`);
  },
};
