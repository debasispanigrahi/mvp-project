import { getDB } from "./config";
import { ObjectId } from "mongodb";

const NotificationModel = async () => {
  const db = await getDB();
  return db.collection("notifications");
};

export const createNotification = async (
  notification: Omit<NoticeModel, "_id">
) => {
  const user = await (await NotificationModel()).insertOne(notification);
  return user;
};

export const listNotifications = async () => {
  const users = await (await NotificationModel()).find({},{sort:{time:-1}});
  return users;
};

export const deleteNotification = async (_id: string) => {
  await (await NotificationModel()).deleteOne({ _id: new ObjectId(_id) });
};
