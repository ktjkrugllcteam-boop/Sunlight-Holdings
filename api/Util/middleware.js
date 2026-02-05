// const rateLimit = new Map();

// const checkRateLimit = (ip, method) => {
//   const WINDOW_MS = 60 * 1000;
//   const LIMIT = method === "GET" ? 60 : 5;

//   try {
//     if (!ip || !method) {
//       console.error("[RateLimit] Missing IP or method", { ip, method });
//       return false;
//     }

//     if (!rateLimit.has(ip)) {
//       console.log("[RateLimit] New IP detected, initializing:", ip);
//       rateLimit.set(ip, {
//         count: 0,
//         lastReset: Date.now(),
//       });
//     }

//     const data = rateLimit.get(ip);
//     const now = Date.now();

//     // Reset window if expired
//     if (now - data.lastReset > WINDOW_MS) {
//       console.log("[RateLimit] Window reset for IP:", ip);
//       data.count = 0;
//       data.lastReset = now;
//     }

//     // Check limit
//     if (data.count >= LIMIT) {
//       console.warn("[RateLimit] Limit exceeded", {
//         ip,
//         method,
//         limit: LIMIT,
//         count: data.count,
//       });
//       return false;
//     }

//     data.count++;

//     console.log("[RateLimit] Request allowed", {
//       ip,
//       method,
//       count: data.count,
//       limit: LIMIT,
//     });

//     return true;
//   } catch (error) {
//     console.error("[RateLimit] Unexpected error", {
//       ip,
//       method,
//       error: error.message,
//       stack: error.stack,
//     });

//     // Fail-safe: block request if rate limiter breaks
//     return false;
//   }
// };


// const withMiddleware = (handler) => async (req, res) => {
//   const allowedOrigin =
//     process.env.ALLOWED_ORIGIN || "http://localhost:5173";


//   res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );


//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";

//   if (!checkRateLimit(ip, req.method)) {
//     return res.status(429).json({ error: "Too many requests" });
//   }

//   return handler(req, res);
// };


import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";


const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});
const withMiddleware = (handler) => async (req, res) => {

  const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();


  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress || "127.0.0.1";

  try {
 
    const { success, limit, remaining, reset } = await ratelimit.limit(`${req.method}:${ip}`);


    res.setHeader("X-RateLimit-Limit", limit.toString());
    res.setHeader("X-RateLimit-Remaining", remaining.toString());
    res.setHeader("X-RateLimit-Reset", reset.toString());

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000);
      return res.status(429).json({ 
        error: "Too many requests",
        message: `Please try again in ${retryAfter} seconds.`
      });
    }

 
    return handler(req, res);
  } catch (error) {
    console.error("[RateLimit] Error:", error);
 
    return handler(req, res);
  }
};

export default withMiddleware;