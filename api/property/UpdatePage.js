import mysql from "mysql2/promise";
import  verifyAdmin  from "../helper/verifyAdmin.js";
import  withMiddleware  from "../Util/middleware.js";
async function handler(req, res) {
      try {
        verifyAdmin(req);
      } catch (error) {
        return res.status(403).json({ message: error.message });
      }
    
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { slug, hero, intro, caseStudies } = req.body;

  if (!slug) {
    return res.status(400).json({ error: "slug is required" });
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await connection.beginTransaction();


    const [[page]] = await connection.execute(
      "SELECT id FROM Pages WHERE slug = ?",
      [slug]
    );

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    const pageId = page.id;


    if (hero) {
      await connection.execute(
        `
        UPDATE HeroSections
        SET
          title = COALESCE(?, title),
          subtitle = COALESCE(?, subtitle),
          background_image = COALESCE(?, background_image)
        WHERE page_id = ?
        `,
        [
          hero.title ? JSON.stringify(hero.title) : null,
          hero.subtitle ? JSON.stringify(hero.subtitle) : null,
          hero.background_image ?? null,
          pageId,
        ]
      );
    }


    if (intro) {
      await connection.execute(
        `
        UPDATE IntroSections
        SET
          heading = COALESCE(?, heading),
          paragraphs = COALESCE(?, paragraphs),
          images = COALESCE(?, images)
        WHERE page_id = ?
        `,
        [
          intro.heading ? JSON.stringify(intro.heading) : null,
          intro.paragraphs ? JSON.stringify(intro.paragraphs) : null,
          intro.images ? JSON.stringify(intro.images) : null,
          pageId,
        ]
      );
    }

    if (Array.isArray(caseStudies)) {
      for (const cs of caseStudies) {
        if (cs.id) {
          // UPDATE existing
          await connection.execute(
            `
            UPDATE CaseStudies
            SET
              badge = COALESCE(?, badge),
              title = COALESCE(?, title),
              description = COALESCE(?, description),
              images = COALESCE(?, images),
              link_url = COALESCE(?, link_url)
            WHERE id = ? AND page_id = ?
            `,
            [
              cs.badge ? JSON.stringify(cs.badge) : null,
              cs.title ?? null,
              cs.description ? JSON.stringify(cs.description) : null,
              cs.images ? JSON.stringify(cs.images) : null,
              cs.link_url ?? null,
              cs.id,
              pageId,
            ]
          );
        } else {
         

          await connection.execute(
            `
            INSERT INTO CaseStudies
            (page_id, badge, title, description, images, link_url)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
              pageId,
              JSON.stringify(cs.badge || {}),
              cs.title || null,
              JSON.stringify(cs.description || {}),
              JSON.stringify(cs.images || []),
              cs.link_url || null,
            ]
          );
        }
      }
    }

    await connection.commit();
    await connection.end();

    res.status(200).json({
      message: "Page updated successfully",
      slug,
    });
  } catch (err) {
    if (connection) await connection.rollback();
    if (connection) await connection.end();

    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
}
export default withMiddleware(handler);