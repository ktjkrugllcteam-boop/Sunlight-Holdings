import mysql from "mysql2/promise";

export default async function handler(req, res) {
  console.log("Received request for properties list");
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  let connection;

  try {
    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    const [properties] = await connection.execute(
      `SELECT 
        Pid AS id,
        projectName AS title,
        location,
        description,
        thumbImage,
        price
       FROM properties
       ORDER BY Pid DESC`
    );

    return res.status(200).json(properties);

  } catch (error) {
    console.error("GET Properties Error:", error);
    return res.status(500).json({ message: "Internal server error" });

  } finally {
    if (connection) await connection.end();
  }
}
