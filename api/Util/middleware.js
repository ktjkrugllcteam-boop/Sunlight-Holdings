const rateLimit = new Map();

const checkRateLimit = (ip, method) => {
  const WINDOW_MS = 60 * 1000;
  const LIMIT = method === "GET" ? 60 : 5;

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 0, lastReset: Date.now() });
  }

  const data = rateLimit.get(ip);

  if (Date.now() - data.lastReset > WINDOW_MS) {
    data.count = 0;
    data.lastReset = Date.now();
  }

  if (data.count >= LIMIT) return false;

  data.count++;
  return true;
};

const withMiddleware = (handler) => async (req, res) => {
  const allowedOrigin =
    process.env.ALLOWED_ORIGIN || "http://localhost:5173";


  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );


  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";

  if (!checkRateLimit(ip, req.method)) {
    return res.status(429).json({ error: "Too many requests" });
  }

  return handler(req, res);
};

export default withMiddleware;
