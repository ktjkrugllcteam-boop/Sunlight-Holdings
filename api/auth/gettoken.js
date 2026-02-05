import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import generator from "generate-password";
import withMiddleware from "../Util/middleware.js";
 async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  }


  if (!/[a-zA-Z]/.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one letter",
    });
  }


  if (!/[0-9]/.test(password)) {
    return res.status(400).json({
      message: "Password must contain at least one number",
    });
  }

  if (!/[@#$%^&*()]/.test(password)) {
    return res.status(400).json({
      message:
        "Password must contain at least one special character (@ # $ % ^ & * ( ))",
    });
  }

  console.log("Verifying admin password", password);
  const hash = await bcrypt.hash(password, 10);
  console.log("Using hash:",hash);



  const isValid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!isValid) {
    return res.status(401).json({ message: "Invalid password" });
  }






  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1m" }
  );

  return res.status(200).json({
    token,
    expiresIn: "1m",
  });
}

export default withMiddleware(handler);