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

const runningFromDist = __filename.replace(/\\/g, "/").includes("/dist/");

function getStaticPath() {
  return runningFromDist
    ? path.resolve(__dirname, "public")
    : path.resolve(__dirname, "..", "dist", "public");
}

function getInquiryLogPath() {
  return path.join(path.resolve(__dirname, "..", "data"), "inquiries.jsonl");
}

function appendInquiry(body: InquiryBody) {
  const logFile = getInquiryLogPath();
  const logDir = path.dirname(logFile);

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(logFile, `${JSON.stringify(body)}\n`, "utf8");
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "32kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "navkar-tubes" });
  });

  app.post("/api/inquiry", (req, res) => {
    const body = req.body as InquiryBody;

    if (!body.name?.trim() || !body.phone?.trim()) {
      res.status(400).json({ error: "Name and phone are required." });
      return;
    }

    const record = {
      ...body,
      name: body.name.trim(),
      phone: body.phone.trim(),
      receivedAt: new Date().toISOString(),
    };

    try {
      appendInquiry(record);
    } catch (err) {
      console.error("Failed to persist inquiry:", err);
      res.status(500).json({ error: "Could not save inquiry. Please call +91 9601702883." });
      return;
    }

    console.log(`[inquiry:${body.type ?? "unknown"}]`, record.name, record.phone);
    res.status(200).json({ ok: true });
  });

  const staticPath = getStaticPath();
  app.use(express.static(staticPath));

  // SPA fallback — never swallow /api routes
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.sendFile(path.join(staticPath, "index.html"), (err) => {
      if (err) next(err);
    });
  });

  const port = Number(process.env.PORT) || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Serving static files from ${staticPath}`);
  });
}

startServer().catch(console.error);
