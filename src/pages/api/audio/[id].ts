import type { APIRoute } from "astro";
import fs from "fs";
import path from 'path'

export const GET: APIRoute = async ({ params }) => {
  const fileName = `./audiolist/${params.id}`;
  try {
    const fileBuffer = fs.readFileSync(path.join(process.cwd(),fileName));
    return new Response(Buffer.from(fileBuffer), {
      status: 200,
      headers: { "Content-Type": "audio/mp3" },
    });
  } catch(e) {
    return new Response("No Audio FIle Found", {
      status: 404,
    });
  }
};
