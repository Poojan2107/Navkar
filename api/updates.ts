import { getUpdateById, listYardUpdates } from "./_lib/yard-feed";

type VercelRequest = {
  method?: string;
  query?: { id?: string | string[] };
  url?: string;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
  setHeader: (key: string, value: string) => void;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");

  if (req.method && req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const rawId = req.query?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (id) {
    const update = getUpdateById(id);
    if (!update) {
      res.status(404).json({ error: "Update not found" });
      return;
    }
    res.status(200).json({ update });
    return;
  }

  res.status(200).json({ updates: listYardUpdates() });
}
