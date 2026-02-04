import mysql from "mysql2/promise";
import  withMiddleware  from "../Util/middleware.js";

const safeParse = value => {
  if (!value) return {};
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return {};
    }
  }
  return value; 
};

async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");


  let connection;
  try {

    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });


    const [pages] = await connection.execute("SELECT * FROM Pages ORDER BY id ASC");
    const [heroes] = await connection.execute("SELECT * FROM HeroSections");
    const [intros] = await connection.execute("SELECT * FROM IntroSections");
    const [cases] = await connection.execute("SELECT * FROM CaseStudies");


    const data = pages.map(page => {
      const hero = heroes.find(h => h.page_id === page.id) || null;
      const intro = intros.find(i => i.page_id === page.id) || null;
      const caseStudies = cases.filter(c => c.page_id === page.id);

      return {
        id: page.id,
        slug: page.slug,
        created_at: page.created_at,
        hero: hero
          ? {
              id: hero.id,
              title: safeParse(hero.title),
              subtitle: safeParse(hero.subtitle),
              background_image: hero.background_image,
            }
          : null,
        intro: intro
          ? {
              id: intro.id,
              heading: safeParse(intro.heading),
              paragraphs: safeParse(intro.paragraphs),
              images: Array.isArray(safeParse(intro.images)) ? safeParse(intro.images) : [],
            }
          : null,
        caseStudies: caseStudies.map(c => ({
          id: c.id,
          badge: safeParse(c.badge),
          title: c.title,
          description: safeParse(c.description),
          images: Array.isArray(safeParse(c.images)) ? safeParse(c.images) : [],
          link_url: c.link_url,
        })),
      };
    });

    await connection.end();
    res.status(200).json(data);
  } catch (err) {
    if (connection) await connection.end();
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
export default withMiddleware(handler);

// import { createConnection, RowDataPacket } from "mysql2/promise";
// import type { VercelRequest, VercelResponse } from '@vercel/node';
// import withMiddleware from "../Util/middleware.js";

// // --- 1. Localization Interfaces ---
// interface LocalizedText {
//   en: string;
//   fr: string;
// }

// interface LocalizedList {
//   en: string[];
//   fr: string[];
// }

// // --- 2. Database Row Interfaces (What comes FROM MySQL) ---
// // Note: JSON fields come from MySQL as strings before we parse them
// interface PageRow extends RowDataPacket {
//   id: number;
//   slug: string;
//   created_at: Date;
// }

// interface HeroRow extends RowDataPacket {
//   id: number;
//   page_id: number;
//   title: string;          // JSON string
//   subtitle: string;       // JSON string
//   background_image: string;
// }

// interface IntroRow extends RowDataPacket {
//   id: number;
//   page_id: number;
//   heading: string;        // JSON string
//   paragraphs: string;     // JSON string
//   images: string;         // JSON string (array of URLs)
// }

// interface CaseStudyRow extends RowDataPacket {
//   id: number;
//   page_id: number;
//   badge: string;          // JSON string
//   title: string;          // Plain string (not localized in your DB schema?)
//   description: string;    // JSON string
//   images: string;         // JSON string
//   link_url: string;
// }

// // --- 3. Helper Function ---
// const safeParse = <T>(value: string | null | undefined): T | null => {
//   if (!value) return null;
//   if (typeof value === "string") {
//     try {
//       return JSON.parse(value) as T;
//     } catch {
//       return null;
//     }
//   }
//   return value as unknown as T;
// };

// // --- 4. Main Handler ---
// async function handler(req: VercelRequest, res: VercelResponse) {
//   // CORS Setup
//   const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
//   res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") return res.status(200).end();
//   if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

//   let connection;

//   try {
//     if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing");

//     connection = await createConnection({
//       uri: process.env.DATABASE_URL,
//       ssl: { rejectUnauthorized: false },
//     });

//     // Execute Queries
//     const [pages] = await connection.execute<PageRow[]>("SELECT * FROM Pages ORDER BY id ASC");
//     const [heroes] = await connection.execute<HeroRow[]>("SELECT * FROM HeroSections");
//     const [intros] = await connection.execute<IntroRow[]>("SELECT * FROM IntroSections");
//     const [cases] = await connection.execute<CaseStudyRow[]>("SELECT * FROM CaseStudies");

//     // Map Data
//     const data = pages.map((page) => {
//       const hero = heroes.find((h) => h.page_id === page.id);
//       const intro = intros.find((i) => i.page_id === page.id);
//       const caseStudies = cases.filter((c) => c.page_id === page.id);

//       return {
//         id: page.id,
//         slug: page.slug,
//         created_at: page.created_at, // Will act as ISO string in JSON response
        
//         // Construct Hero Object
//         hero: hero
//           ? {
//               id: hero.id,
//               // We cast the parsed JSON to our Localization interfaces
//               title: safeParse<LocalizedText>(hero.title),
//               subtitle: safeParse<LocalizedText>(hero.subtitle),
//               background_image: hero.background_image,
//             }
//           : null,

//         // Construct Intro Object
//         intro: intro
//           ? {
//               id: intro.id,
//               heading: safeParse<LocalizedText>(intro.heading),
//               paragraphs: safeParse<LocalizedList>(intro.paragraphs),
//               images: safeParse<string[]>(intro.images) || [],
//             }
//           : null,

//         // Construct Case Studies Array
//         caseStudies: caseStudies.map((c) => ({
//           id: c.id,
//           badge: safeParse<LocalizedText>(c.badge),
//           title: c.title, // In your JSON, title was a string "Project Alpha"
//           description: safeParse<LocalizedList>(c.description),
//           images: safeParse<string[]>(c.images) || [],
//           link_url: c.link_url,
//         })),
//       };
//     });

//     await connection.end();
//     res.status(200).json(data);
    
//   } catch (err: any) {
//     if (connection) await connection.end();
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error", details: err.message });
//   }
// }

// export default withMiddleware(handler);