import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type InquiryBody = {
  type?: string;
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  city?: string;
  message?: string;
  category?: string;
  submittedAt?: string;
  [key: string]: unknown;
};

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "32kb" }));

  app.post("/api/inquiry", (req, res) => {
    const body = req.body as InquiryBody;

    if (!body.name?.trim() || !body.phone?.trim()) {
      res.status(400).json({ error: "Name and phone are required." });
      return;
    }

    const logDir = path.resolve(__dirname, "..", "data");
    const logFile = path.join(logDir, "inquiries.jsonl");

    try {
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      fs.appendFileSync(logFile, `${JSON.stringify(body)}\n`, "utf8");
    } catch (err) {
      console.error("Failed to persist inquiry:", err);
    }

    console.log(`[inquiry:${body.type ?? "unknown"}]`, body.name, body.phone);
    res.status(200).json({ ok: true });
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
