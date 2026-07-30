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

type VercelRequest = {
  method?: string;
  body?: InquiryBody;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body;
  if (!body?.name?.trim() || !body?.phone?.trim()) {
    res.status(400).json({ error: "Name and phone are required." });
    return;
  }

  const record = {
    ...body,
    name: body.name.trim(),
    phone: body.phone.trim(),
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
      res.status(500).json({ error: "Could not save inquiry. Please call +91 9601702883." });
      return;
    }
  }

  res.status(200).json({ ok: true });
}
