import jwt from "jsonwebtoken";

 function verifyAdmin(req) {
  const authHeader = req.headers.authorization;
  console.log("Verifying admin with token:", authHeader);
  if (!authHeader) {
    throw new Error("Missing Authorization header");
  }

  const token = authHeader.trim().split(/\s+/)[1];
  if (!token) {
    throw new Error("Missing token");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Error("Token expired");
    } else if (err.name === "JsonWebTokenError") {
      throw new Error("Invalid token");
    } else if (err.name === "NotBeforeError") {
      throw new Error("Token not active yet");
    } else {
      throw new Error("Token verification failed");
    }
  }

  if (decoded.role !== "admin") {
    throw new Error("Forbidden");
  }

  return decoded;
}
export default verifyAdmin;
