import mysql from "mysql2/promise";
import  withMiddleware  from "../Util/middleware.js";
async function handler(req, res) {
    try {
      verifyAdmin(req);
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug, hero, intro, caseStudies } = req.body;

  if (!slug || !hero) {
    return res
      .status(400)
      .json({ error: "slug and hero are required fields" });
  }

  let connection;
  try {
   
    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,   
      ssl: { rejectUnauthorized: false },
    });

    await connection.beginTransaction();

    // 1️⃣ Insert into Pages
    const [pageResult] = await connection.execute(
      "INSERT INTO Pages (slug) VALUES (?)",
      [slug]
    );
    const pageId = pageResult.insertId;

    
    const { title, subtitle, background_image } = hero;
    await connection.execute(
      "INSERT INTO HeroSections (page_id, title, subtitle, background_image) VALUES (?, ?, ?, ?)",
      [pageId, JSON.stringify(title), JSON.stringify(subtitle || {}), background_image || null]
    );

    // 3️⃣ Insert into IntroSections (optional)
    if (intro) {
      const { heading, paragraphs, images } = intro;
      await connection.execute(
        "INSERT INTO IntroSections (page_id, heading, paragraphs, images) VALUES (?, ?, ?, ?)",
        [
          pageId,
          JSON.stringify(heading || {}),
          JSON.stringify(paragraphs || {}),
          JSON.stringify(images || [])
        ]
      );
    }

    // 4️⃣ Insert Case Studies if provided
    if (Array.isArray(caseStudies) && caseStudies.length > 0) {
      const caseValues = caseStudies.map(cs => [
        pageId,
        JSON.stringify(cs.badge || {}),
        cs.title,
        JSON.stringify(cs.description || {}),
        JSON.stringify(cs.images || []),
        cs.link_url || null
      ]);

      // TiDB supports bulk insert using query with placeholders
      await connection.query(
        "INSERT INTO CaseStudies (page_id, badge, title, description, images, link_url) VALUES ?",
        [caseValues]
      );
    }

    await connection.commit();
    await connection.end();

    res.status(201).json({ message: "Page created successfully", pageId });
  } catch (err) {
    if (connection) await connection.rollback();
    console.error(err);
    if (connection) await connection.end();
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
export default withMiddleware(handler)  ;