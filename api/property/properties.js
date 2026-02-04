// // import mysql from "mysql2/promise";

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ message: "Method not allowed" });
// //   }

// //   const {
// //     title,
// //     location,
// //     description,
// //     thumbImage,
// //     price,
// //     otherImages = [],
// //   } = req.body;

// //   if (!title) {
// //     return res.status(400).json({ message: "Title is required" });
// //   }

// //   let connection;

// //   try {
// //     connection = await mysql.createConnection({
// //       uri: process.env.DATABASE_URL,
// //       ssl: {
// //         rejectUnauthorized: false,
// //       },
// //     });

// //     await connection.beginTransaction();

// //     // 1) Insert property
// //     const [propertyResult] = await connection.execute(
// //       `INSERT INTO properties (projectName, location, description, thumbImage, price)
// //        VALUES (?, ?, ?, ?, ?)`,
// //       [title, location, description, thumbImage, price]
// //     );

// //     const propertyId = propertyResult.insertId;

// //     // 2) Insert images
// //     for (const img of otherImages) {
// //       const [imgResult] = await connection.execute(
// //         `INSERT INTO propertyImages (pId, image, Name)
// //          VALUES (?, ?, ?)`,
// //         [propertyId, img.url, img.name]
// //       );

// //       const imageId = imgResult.insertId;

      
// //       const mappingIds = [];

// //       if (Array.isArray(img.mappingPoints) && img.mappingPoints.length > 0) {
// //         for (const mp of img.mappingPoints) {
// //           const [mpResult] = await connection.execute(
// //             `INSERT INTO mappingPoint (imageId, xPoint, yPoint)
// //              VALUES (?, ?, ?)`,
// //             [imageId, mp.xPoint, mp.yPoint]
// //           );

// //           mappingIds.push(mpResult.insertId);
// //         }
// //       }

  
// //       if (Array.isArray(img.connections) && img.connections.length > 0) {
// //         for (const conn of img.connections) {
// //           const fromId = mappingIds[conn.from];
// //           const toId = mappingIds[conn.to];

// //           await connection.execute(
// //             `INSERT INTO connections (fromMappingId, toMappingId)
// //              VALUES (?, ?)`,
// //             [fromId, toId]
// //           );
// //         }
// //       }
// //     }

// //     await connection.commit();

// //     return res.status(201).json({
// //       message: "Property created successfully",
// //       propertyId,
// //     });

// //   } catch (error) {
// //     if (connection) await connection.rollback();
// //     console.error("DB Error:", error);
// //     return res.status(500).json({ message: "Internal server error" });

// //   } finally {
// //     if (connection) await connection?.end();
// //   }
// // }













// // import mysql from "mysql2/promise";

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ message: "Method not allowed" });
// //   }

// //   const {
// //     projectName,
// //     location,
// //     description,
// //     thumbImage,
// //     rooms = [],
// //     connections = [],
// //   } = req.body;

// //   if (!projectName || !location) {
// //     return res.status(400).json({ message: "projectName and location are required" });
// //   }

// //   let connection;

// //   try {
// //     connection = await mysql.createConnection({
// //       uri: process.env.DATABASE_URL,
// //       ssl: { rejectUnauthorized: false },
// //     });

// //     await connection.beginTransaction();

// //     /* 1️⃣ Insert Property */
// //     const [propertyResult] = await connection.execute(
// //       `INSERT INTO Properties (projectName, location, description, thumbImage)
// //        VALUES (?, ?, ?, ?)`,
// //       [projectName, location, description, thumbImage]
// //     );

// //     const propertyId = propertyResult.insertId;

// //     /* 2️⃣ Insert Rooms */
// //     const roomIds = [];

// //     for (const room of rooms) {
// //       const [roomResult] = await connection.execute(
// //         `INSERT INTO Rooms (Pid, RoomName, Description, MapX, MapY)
// //          VALUES (?, ?, ?, ?, ?)`,
// //         [
// //           propertyId,
// //           room.roomName,
// //           room.description || null,
// //           room.mapX,
// //           room.mapY,
// //         ]
// //       );

// //       const roomId = roomResult.insertId;
// //       roomIds.push(roomId);

// //       /* 3️⃣ Insert Room Images */
// //       if (Array.isArray(room.images)) {
// //         for (const imgUrl of room.images) {
// //           await connection.execute(
// //             `INSERT INTO PropertyImages (RoomId, PropertyId, ImageUrl)
// //              VALUES (?, ?, ?)`,
// //             [roomId, propertyId, imgUrl]
// //           );
// //         }
// //       }
// //     }

// //     /* 4️⃣ Insert Room Connections */
// //     for (const conn of connections) {
// //       const fromRoomId = roomIds[conn.from];
// //       const toRoomId = roomIds[conn.to];

// //       if (fromRoomId && toRoomId) {
// //         await connection.execute(
// //           `INSERT INTO RoomConnections (FromRoomId, ToRoomId)
// //            VALUES (?, ?)`,
// //           [fromRoomId, toRoomId]
// //         );
// //       }
// //     }

// //     await connection.commit();

// //     return res.status(201).json({
// //       message: "Property created successfully",
// //       propertyId,
// //     });

// //   } catch (error) {
// //     if (connection) await connection.rollback();
// //     console.error("DB Error:", error);
// //     return res.status(500).json({ message: "Internal server error" });

// //   } finally {
// //     if (connection) await connection.end();
// //   }
// // }
// import mysql from "mysql2/promise";

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const {
//     projectName,
//     location,
//     description,
//     thumbImage,
//     price,
//     rooms = [],
//     connections = [],
//   } = req.body;

//   // Validation: Check existence (objects are truthy, so this still works)
//   if (!projectName || !location) {
//     return res.status(400).json({ message: "projectName and location are required" });
//   }

//   let connection;

//   try {
//     connection = await mysql.createConnection({
//       uri: process.env.DATABASE_URL,
//       ssl: { rejectUnauthorized: false },
//     });

//     await connection.beginTransaction();

//     /* 1️⃣ Insert Property 
//        NOTE: We use JSON.stringify() because the input is now an object 
//        Example: { en: "Platinum Edge", fr: "..." } -> '{"en":"Platinum Edge"...}'
//     */
//     const [propertyResult] = await connection.execute(
//       `INSERT INTO Properties (projectName, location, description, thumbImage, price)
//        VALUES (?, ?, ?, ?,?)`,
//       [
//         JSON.stringify(projectName), 
//         JSON.stringify(location), 
//         JSON.stringify(description), 
//         thumbImage,
//         price
//       ]
//     );

//     const propertyId = propertyResult.insertId;

//     /* 2️⃣ Insert Rooms */
//     const roomIds = [];

//     for (const room of rooms) {
//       // Determine description: if exists, stringify it; otherwise null
//       const descriptionValue = room.description 
//         ? JSON.stringify(room.description) 
//         : null;

//       const [roomResult] = await connection.execute(
//         `INSERT INTO Rooms (Pid, RoomName, Description, MapX, MapY)
//          VALUES (?, ?, ?, ?, ?)`,
//         [
//           propertyId,
//           JSON.stringify(room.roomName), // Stringify the room name object
//           descriptionValue,
//           room.mapX,
//           room.mapY,
          
//         ]
//       );

//       const roomId = roomResult.insertId;
//       roomIds.push(roomId);

//       /* 3️⃣ Insert Room Images */
//       if (Array.isArray(room.images)) {
//         for (const imgUrl of room.images) {
//           await connection.execute(
//             `INSERT INTO PropertyImages (RoomId, PropertyId, ImageUrl)
//              VALUES (?, ?, ?)`,
//             [roomId, propertyId, imgUrl]
//           );
//         }
//       }
//     }

//     /* 4️⃣ Insert Room Connections */
//     // 
//     for (const conn of connections) {
//       // connections uses indexes (0, 1, 2...), we map them to the real DB IDs
//       const fromRoomId = roomIds[conn.from];
//       const toRoomId = roomIds[conn.to];

//       if (fromRoomId && toRoomId) {
//         await connection.execute(
//           `INSERT INTO RoomConnections (FromRoomId, ToRoomId)
//            VALUES (?, ?)`,
//           [fromRoomId, toRoomId]
//         );
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
//     if (connection) await connection.end();
//   }
// }

import mysql from "mysql2/promise";
import verifyAdmin from "../helper/verifyAdmin.js";
import  withMiddleware  from "../Util/middleware.js";
async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    verifyAdmin(req);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }

  const {
    projectName,
    location,
    description,
    thumbImage,
    price,
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

   
    const [propertyResult] = await connection.execute(
      `INSERT INTO Properties (projectName, location, description, thumbImage, price)
       VALUES (?, ?, ?, ?, ?)`,
      [
        JSON.stringify(projectName), 
        JSON.stringify(location), 
        JSON.stringify(description), 
        thumbImage,
        JSON.stringify(price) 
      ]
    );

    const propertyId = propertyResult.insertId;

    const roomIds = [];

    for (const room of rooms) {
    
      const descriptionValue = room.description 
        ? JSON.stringify(room.description) 
        : null;

      const [roomResult] = await connection.execute(
        `INSERT INTO Rooms (Pid, RoomName, Description, MapX, MapY)
         VALUES (?, ?, ?, ?, ?)`,
        [
          propertyId,
          JSON.stringify(room.roomName), 
          descriptionValue,
          room.mapX,
          room.mapY,
        ]
      );

      const roomId = roomResult.insertId;
      roomIds.push(roomId);

     
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
export default withMiddleware(handler);