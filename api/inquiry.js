export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body ?? {};
  if (!body?.name?.trim() || !body?.phone?.trim()) {
    res.status(400).json({ error: "Name and phone are required." });
    return;
  }

  const record = {
    ...body,
    name: String(body.name).trim(),
    phone: String(body.phone).trim(),
    receivedAt: new Date().toISOString(),
  };

  console.log(`[inquiry:${body.type ?? "unknown"}]`, record.name, record.phone, record);

  const webhook = process.env.INQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error("Inquiry webhook failed:", err);
    }
  }

  res.status(200).json({ ok: true });
}
