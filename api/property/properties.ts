// import mysql from "mysql2/promise";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const {
//     title,
//     location,
//     description,
//     thumbImage,
//     price,
//     otherImages = [],
//   } = req.body;

//   if (!title) {
//     return res.status(400).json({ message: "Title is required" });
//   }

//   let connection;

//   try {
//     connection = await mysql.createConnection({
//       uri: process.env.DATABASE_URL,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     });

//     await connection.beginTransaction();

//     // 1) Insert property
//     const [propertyResult] = await connection.execute(
//       `INSERT INTO properties (projectName, location, description, thumbImage, price)
//        VALUES (?, ?, ?, ?, ?)`,
//       [title, location, description, thumbImage, price]
//     );

//     const propertyId = propertyResult.insertId;

//     // 2) Insert images
//     for (const img of otherImages) {
//       const [imgResult] = await connection.execute(
//         `INSERT INTO propertyImages (pId, image, Name)
//          VALUES (?, ?, ?)`,
//         [propertyId, img.url, img.name]
//       );

//       const imageId = imgResult.insertId;

      
//       const mappingIds = [];

//       if (Array.isArray(img.mappingPoints) && img.mappingPoints.length > 0) {
//         for (const mp of img.mappingPoints) {
//           const [mpResult] = await connection.execute(
//             `INSERT INTO mappingPoint (imageId, xPoint, yPoint)
//              VALUES (?, ?, ?)`,
//             [imageId, mp.xPoint, mp.yPoint]
//           );

//           mappingIds.push(mpResult.insertId);
//         }
//       }

  
//       if (Array.isArray(img.connections) && img.connections.length > 0) {
//         for (const conn of img.connections) {
//           const fromId = mappingIds[conn.from];
//           const toId = mappingIds[conn.to];

//           await connection.execute(
//             `INSERT INTO connections (fromMappingId, toMappingId)
//              VALUES (?, ?)`,
//             [fromId, toId]
//           );
//         }
//       }
//     }

//     await connection.commit();

//     return res.status(201).json({
//       message: "Property created successfully",
//       propertyId,
//     });

//   } catch (error) {
//     if (connection) await connection.rollback();
//     console.error("DB Error:", error);
//     return res.status(500).json({ message: "Internal server error" });

//   } finally {
//     if (connection) await connection?.end();
//   }
// }













import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    projectName,
    location,
    description,
    thumbImage,
    rooms = [],
    connections = [],
  } = req.body;

  if (!projectName || !location) {
    return res.status(400).json({ message: "projectName and location are required" });
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await connection.beginTransaction();

    /* 1️⃣ Insert Property */
    const [propertyResult] = await connection.execute(
      `INSERT INTO Properties (projectName, location, description, thumbImage)
       VALUES (?, ?, ?, ?)`,
      [projectName, location, description, thumbImage]
    );

    const propertyId = propertyResult.insertId;

    /* 2️⃣ Insert Rooms */
    const roomIds = [];

    for (const room of rooms) {
      const [roomResult] = await connection.execute(
        `INSERT INTO Rooms (Pid, RoomName, Description, MapX, MapY)
         VALUES (?, ?, ?, ?, ?)`,
        [
          propertyId,
          room.roomName,
          room.description || null,
          room.mapX,
          room.mapY,
        ]
      );

      const roomId = roomResult.insertId;
      roomIds.push(roomId);

      /* 3️⃣ Insert Room Images */
      if (Array.isArray(room.images)) {
        for (const imgUrl of room.images) {
          await connection.execute(
            `INSERT INTO PropertyImages (RoomId, PropertyId, ImageUrl)
             VALUES (?, ?, ?)`,
            [roomId, propertyId, imgUrl]
          );
        }
      }
    }

    /* 4️⃣ Insert Room Connections */
    for (const conn of connections) {
      const fromRoomId = roomIds[conn.from];
      const toRoomId = roomIds[conn.to];

      if (fromRoomId && toRoomId) {
        await connection.execute(
          `INSERT INTO RoomConnections (FromRoomId, ToRoomId)
           VALUES (?, ?)`,
          [fromRoomId, toRoomId]
        );
      }
    }

    await connection.commit();

    return res.status(201).json({
      message: "Property created successfully",
      propertyId,
    });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error("DB Error:", error);
    return res.status(500).json({ message: "Internal server error" });

  } finally {
    if (connection) await connection.end();
  }
}
