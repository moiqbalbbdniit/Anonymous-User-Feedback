import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.error("⚠️ Missing RESEND_API_KEY! Check your .env.local file.");
}
if (process.env.RESEND_API_KEY) {
  console.log("api key is found");
}

const resend = new Resend(process.env.RESEND_API_KEY || "fallback_key"); // Temporary fallback

export default resend;
