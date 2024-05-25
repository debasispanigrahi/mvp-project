import { getDB } from "./config";

const NotificationModel = async () => {
    const db = await getDB();
    return db.collection("messages");
};

export const createNotification = async (notification:Notification) => {
    const user = await (await NotificationModel()).insertOne(notification);
    return user;
};

export const listNotifications=async()=>{
    const users=await (await NotificationModel()).find({});
    return users
}