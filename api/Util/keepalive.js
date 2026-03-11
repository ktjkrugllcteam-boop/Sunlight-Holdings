import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";


const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});


export default async function handler(req, res) {
  await redis.ping();
  res.status(200).json({ ok: true });
}