//GET FOR LISTING ALL TODO
//POST FOR POSTING ONE TODO

import type { APIRoute } from "astro";
import { createNotification,listNotifications } from "../../models/notification";

//POST FOR LISTING ALL NOTIFICATION
export const GET: APIRoute = async ({ params, request }) => {
  const notifications=await listNotifications();
  console.log(await notifications.toArray())
  return new Response(JSON.stringify({
      message: "This was a GET!"
    })
  )
}


//POST FOR CREATING ONE NOTIFICATION
export const POST: APIRoute = async ({ request }) => {
  const body:Notification=await request.json()
  const createdNotification=await createNotification(body)
  if(createdNotification.acknowledged){
    return new Response(JSON.stringify({
      message: "Notification Inserted"
    })
  )
  }
  return new Response(JSON.stringify({
      message: "Error During insert"
    })
  )
}