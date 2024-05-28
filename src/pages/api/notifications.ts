import type { APIRoute } from "astro";
import {
  createNotification,
  listNotifications,
  deleteNotification,
} from "../../models/notification";
import fs from "fs";

//GET FOR LISTING ALL NOTIFICATION
export const GET: APIRoute = async ({}) => {
  const notifications = await listNotifications();
  return new Response(
    JSON.stringify({ notifications: await notifications.toArray() })
  );
};

//POST FOR CREATING ONE NOTIFICATION
export const POST: APIRoute = async ({ request }) => {
  const body = await request.formData();
  const content = body.get("content")?.toString() || "";
  const title = body.get("title")?.toString() || "";
  const time = new Date(body.get("time")?.toString() || new Date());
  const audioFile = body.get("audio") as File | "null";
  const fileName = `./public/audio/test-${new Date().getTime()}.mp3`;
  if (audioFile != "null") {
    fs.writeFile(
      fileName,
      new DataView(await audioFile.arrayBuffer()),
      (err) => {
        console.error(err);
      }
    );
  }
  const createdNotification = await createNotification({
    content,
    time,
    title,
    audioSrc:
      audioFile != "null"
        ? `${import.meta.env.PUBLIC_URL}${fileName.slice(1)}`
        : null,
  });
  if (createdNotification.acknowledged) {
    return new Response(
      JSON.stringify({
        message: "Notification Inserted",
      })
    );
  }
  return new Response(
    JSON.stringify({
      message: "Error During insert",
    })
  );
};

//DELETE FOR LISTING ALL NOTIFICATION
export const DELETE: APIRoute = async ({ request: { url } }) => {
  const id: string = new URLSearchParams(url.split("?")[1] + "").get("id")!;
  await deleteNotification(id);
  return new Response(
    JSON.stringify({ message: "Notification deleted successfully" })
  );
};
