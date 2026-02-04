import  withMiddleware  from "../Util/middleware.js";
 async function handler(req, res) {


  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }


  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recaptchaToken, ...formData } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ error: "Missing reCAPTCHA token" });
  }

  try {
    console.log(" Backend received token:", recaptchaToken);

    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      }
    );

    const result = await verifyRes.json();
    console.log("Google Verification Result:", result);

    if (!result.success || result.score < 0.5) {
      return res.status(403).json({
        error: "reCAPTCHA verification failed",
        score: result.score,
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

export default withMiddleware(handler);


// import type { NextApiRequest, NextApiResponse } from "next";
// import withMiddleware from "../Util/middleware.js";

// interface RecaptchaResponse {
//   success: boolean;
//   score?: number;
//   challenge_ts?: string;
//   hostname?: string;
//   "error-codes"?: string[];
// }

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Handle preflight request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { recaptchaToken, ...formData } = req.body as {
//     recaptchaToken?: string;
//     [key: string]: unknown;
//   };

//   if (!recaptchaToken) {
//     return res.status(400).json({ error: "Missing reCAPTCHA token" });
//   }

//   try {
//     console.log("🟡 Backend received token:", recaptchaToken);

//     const verifyRes = await fetch(
//       "https://www.google.com/recaptcha/api/siteverify",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
//       }
//     );

//     const result: RecaptchaResponse = await verifyRes.json();
//     console.log("🟢 Google Verification Result:", result);

//     if (!result.success || (result.score ?? 0) < 0.5) {
//       return res.status(403).json({
//         error: "reCAPTCHA verification failed",
//         score: result.score,
//       });
//     }

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("API error:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// export default withMiddleware(handler);


// import type { VercelRequest, VercelResponse } from '@vercel/node';
// import withMiddleware from "../Util/middleware.js";

// // 1. Define the shape of the Google reCAPTCHA response
// interface RecaptchaResponse {
//   success: boolean;
//   score?: number;
//   'error-codes'?: string[];
// }

// // 2. Define the expected shape of your Request Body
// interface ContactRequestBody {
//   recaptchaToken: string;
//   [key: string]: any;
// }

// async function handler(req: VercelRequest, res: VercelResponse) {
  
//   // const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
//   // res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
//   // res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
//   // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   // Type Casting the Request Body
//   const { recaptchaToken } = req.body as ContactRequestBody;

//   if (!recaptchaToken) {
//     return res.status(400).json({ error: "Missing reCAPTCHA token" });
//   }

//   try {
//     const secretKey = process.env.RECAPTCHA_SECRET_KEY;
//     if (!secretKey) {
//       throw new Error("RECAPTCHA_SECRET_KEY is not defined");
//     }

//     console.log("🟡 Backend received token:", recaptchaToken);

//     const verifyRes = await fetch(
//       "https://www.google.com/recaptcha/api/siteverify",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/x-www-form-urlencoded" },
//         body: `secret=${secretKey}&response=${recaptchaToken}`,
//       }
//     );

//     const result = (await verifyRes.json()) as RecaptchaResponse;
//     console.log("🟢 Google Verification Result:", result);

//     if (!result.success || (result.score !== undefined && result.score < 0.5)) {
//       return res.status(403).json({
//         error: "reCAPTCHA verification failed",
//         score: result.score,
//       });
//     }

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("API error:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// }

// export default withMiddleware(handler);