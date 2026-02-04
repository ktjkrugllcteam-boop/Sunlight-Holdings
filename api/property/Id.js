import mysql from "mysql2/promise";
import verifyAdmin from "../helper/verifyAdmin.js";
import  withMiddleware  from "../Util/middleware.js";
 async function handler(req, res) {
  console.log("Property API called with method:", req.method);
  const { Id } = req.query;

 
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (!Id) {
    return res.status(400).json({ message: "Property ID is required" });
  }
  

  let connection;

  try {
    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

   
    if (req.method === "GET") {

      const [rows] = await connection.query(
        `
        SELECT 
          p.Pid,
          p.projectName,
          p.location,
          p.description,
          p.thumbImage,
          p.price,

          r.RoomId,
          r.RoomName,
          r.Description AS roomDescription,
          r.MapX,
          r.MapY,

          pi.ImageID,
          pi.ImageUrl,

          rc.ConnectionID,
          rc.FromRoomId,
          rc.ToRoomId

        FROM Properties p
        LEFT JOIN Rooms r ON r.Pid = p.Pid
        LEFT JOIN PropertyImages pi ON pi.RoomId = r.RoomId
        LEFT JOIN RoomConnections rc 
          ON rc.FromRoomId = r.RoomId OR rc.ToRoomId = r.RoomId
        WHERE p.Pid = ?
        `,
        [Id]
      );

      if (!rows.length) {
        return res.status(404).json({ message: "Property not found" });
      }

    
      const property = {
        Id: rows[0].Pid,
        projectName: rows[0].projectName,
        location: rows[0].location,
        description: rows[0].description,
        thumbImage: rows[0].thumbImage,
        price: rows[0].price,
        rooms: {},
      };

      rows.forEach(row => {
        if (!row.RoomId) return; 

      
        if (!property.rooms[row.RoomId]) {
          property.rooms[row.RoomId] = {
            roomId: row.RoomId,
            roomName: row.RoomName,
            description: row.roomDescription,
            mapX: row.MapX,
            mapY: row.MapY,
            images: [],
            connections: [],
          };
        }

        
        if (row.ImageID && !property.rooms[row.RoomId].images.find(img => img.imageID === row.ImageID)) {
          property.rooms[row.RoomId].images.push({
            imageID: row.ImageID,
            url: row.ImageUrl,
          });
        }

      
        if (row.ConnectionID) {
          const exists = property.rooms[row.RoomId].connections.find(c => c.connectionID === row.ConnectionID);
          if (!exists) {
            property.rooms[row.RoomId].connections.push({
              connectionID: row.ConnectionID,
              from: row.FromRoomId,
              to: row.ToRoomId,
            });
          }
        }
      });

      property.rooms = Object.values(property.rooms);

      return res.status(200).json(property);
    }

    // ================= PUT =================
    // if (req.method === "PUT") {
    //   const {
    //     projectName,
    //     location,
    //     description,
    //     thumbImage,
    //     price,
    //     rooms = []
    //   } = req.body;

    //   await connection.beginTransaction();

    //   try {
    //     /* ---------- Update Property ---------- */
    //     const fields = [];
    //     const values = [];

    //     if (projectName !== undefined) { fields.push("projectName=?"); values.push(projectName); }
    //     if (location !== undefined) { fields.push("location=?"); values.push(location); }
    //     if (description !== undefined) { fields.push("description=?"); values.push(description); }
    //     if (thumbImage !== undefined) { fields.push("thumbImage=?"); values.push(thumbImage); }
    //     if (price !== undefined) { fields.push("price=?"); values.push(price); }

    //     if (fields.length) {
    //       values.push(Id);
    //       await connection.execute(
    //         `UPDATE Properties SET ${fields.join(", ")} WHERE Pid = ?`,
    //         values
    //       );
    //     }

    //     /* ---------- Existing Rooms ---------- */
    //     const [existingRooms] = await connection.execute(
    //       `SELECT RoomId FROM Rooms WHERE Pid = ?`,
    //       [Id]
    //     );
    //     const existingRoomIds = existingRooms.map(r => r.RoomId);
    //     const incomingRoomIds = rooms.filter(r => r.roomId).map(r => r.roomId);

    //     /* ---------- Delete Removed Rooms ---------- */
    //     const roomsToDelete = existingRoomIds.filter(id => !incomingRoomIds.includes(id));
    //     if (roomsToDelete.length) {
    //       await connection.execute(
    //         `DELETE FROM Rooms WHERE RoomId IN (?)`,
    //         [roomsToDelete]
    //       );
    //     }

    //     /* ---------- Upsert Rooms ---------- */
    //     for (const room of rooms) {
    //       let roomId = room.roomId;

    //       if (roomId) {
    //         await connection.execute(
    //           `UPDATE Rooms SET RoomName=?, Description=?, MapX=?, MapY=? WHERE RoomId=? AND Pid=?`,
    //           [room.roomName, room.description, room.mapX, room.mapY, roomId, Id]
    //         );
    //       } else {
    //         const [res] = await connection.execute(
    //           `INSERT INTO Rooms (Pid, RoomName, Description, MapX, MapY)
    //            VALUES (?, ?, ?, ?, ?)`,
    //           [Id, room.roomName, room.description, room.mapX, room.mapY]
    //         );
    //         roomId = res.insertId;
    //       }

    //       /* ---------- Images ---------- */
    //       const [existingImages] = await connection.execute(
    //         `SELECT ImageID FROM PropertyImages WHERE RoomId=?`,
    //         [roomId]
    //       );
    //       const existingImageIds = existingImages.map(i => i.ImageID);
    //       const incomingImageIds = (room.images || []).filter(i => i.imageID).map(i => i.imageID);

    //       // Delete removed images
    //       const imagesToDelete = existingImageIds.filter(id => !incomingImageIds.includes(id));
    //       if (imagesToDelete.length) {
    //         await connection.execute(
    //           `DELETE FROM PropertyImages WHERE ImageID IN (?)`,
    //           [imagesToDelete]
    //         );
    //       }

    //       // Upsert images
    //       for (const img of room.images || []) {
    //         if (img.imageID) {
    //           await connection.execute(
    //             `UPDATE PropertyImages SET ImageUrl=? WHERE ImageID=?`,
    //             [img.url, img.imageID]
    //           );
    //         } else {
    //           await connection.execute(
    //             `INSERT INTO PropertyImages (RoomId, ImageUrl) VALUES (?, ?)`,
    //             [roomId, img.url]
    //           );
    //         }
    //       }

    //       /* ---------- Connections ---------- */
    //       await connection.execute(
    //         `DELETE FROM RoomConnections WHERE FromRoomId=?`,
    //         [roomId]
    //       );

    //       for (const conn of room.connections || []) {
    //         await connection.execute(
    //           `INSERT INTO RoomConnections (FromRoomId, ToRoomId) VALUES (?, ?)`,
    //           [roomId, conn.to]
    //         );
    //       }
    //     }

    //     await connection.commit();
    //     return res.status(200).json({ message: "Property fully updated" });

    //   } catch (err) {
    //     await connection.rollback();
    //     console.error("PUT Error:", err);
    //     return res.status(500).json({ message: "Failed to update property" });
    //   }
    // }



    if (req.method === "PUT") {
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
        price
      } = req.body;

      
      const fields = [];
      const values = [];

      if (projectName !== undefined) {
        fields.push("projectName=?");
        values.push(projectName);
      }
      if (location !== undefined) {
        fields.push("location=?");
        values.push(location);
      }
      if (description !== undefined) {
        fields.push("description=?");
        values.push(description);
      }
      if (thumbImage !== undefined) {
        fields.push("thumbImage=?");
        values.push(thumbImage);
      }
      if (price !== undefined) {
        fields.push("price=?");
        values.push(price);
      }

     
      if (fields.length === 0) {
        return res.status(400).json({ message: "No fields provided for update" });
      }


     
      values.push(Id);

      try {
        // 4. Execute the dynamic query
        const [result] = await connection.execute(
          `UPDATE Properties SET ${fields.join(", ")} WHERE Pid = ?`,
          values
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Property not found" });
        }

        return res.status(200).json({ message: "Property updated successfully" });

      } catch (error) {
        console.error("PUT Error:", error);
        return res.status(500).json({ message: "Failed to update property" });
      }
    }
     if (req.method === "DELETE") {
        if (!Id) {
          return res.status(400).json({ message: "Property ID is required" });
        }

        await connection.beginTransaction();

        try {
          /* 1️⃣ Find all Rooms belonging to this Property */
          const [rooms] = await connection.execute(
            `SELECT RoomId FROM Rooms WHERE Pid = ?`,
            [Id]
          );
          const roomIds = rooms.map((r) => r.RoomId);

          /* 2️⃣ Delete Dependencies (If rooms exist) */
          if (roomIds.length > 0) {
            const placeholders = roomIds.map(() => "?").join(",");

            // Delete Connections (Where this room is either start or end)
            await connection.execute(
              `DELETE FROM RoomConnections 
             WHERE FromRoomId IN (${placeholders}) 
             OR ToRoomId IN (${placeholders})`,
              [...roomIds, ...roomIds] // Pass array twice because we used placeholders twice
            );

            // Delete Images linked to these rooms
            await connection.execute(
              `DELETE FROM PropertyImages WHERE RoomId IN (${placeholders})`,
              roomIds
            );

            // Delete the Rooms
            await connection.execute(
              `DELETE FROM Rooms WHERE Pid = ?`,
              [Id]
            );
          }

          /* 3️⃣ Delete the Property Main Record */
          const [result] = await connection.execute(
            `DELETE FROM Properties WHERE Pid = ?`,
            [Id]
          );

          if (result.affectedRows === 0) {
            await connection.rollback();
            return res.status(404).json({ message: "Property not found" });
          }

          await connection.commit();
          return res.status(200).json({ message: "Property and all associated data deleted successfully" });

        } catch (error) {
          await connection.rollback();
          console.error("DELETE Error:", error);
          return res.status(500).json({ message: "Failed to delete property" });
        }
      }



    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Property API Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    if (connection) await connection.end();
  }
}
export default withMiddleware(handler);