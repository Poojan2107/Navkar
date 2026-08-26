import type { IncomingMessage, ServerResponse } from "http";
import { getUpdateById, listYardUpdates } from "../shared/yard-feed";

function send(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  res.end(JSON.stringify(data));
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method && req.method !== "GET") {
    send(res, 405, { error: "Method not allowed" });
    return;
  }

  const url = new URL(req.url ?? "/", "http://localhost");
  const id = url.searchParams.get("id");

  if (id) {
    const update = getUpdateById(id);
    if (!update) {
      send(res, 404, { error: "Update not found" });
      return;
    }
    send(res, 200, { update });
    return;
  }

  send(res, 200, { updates: listYardUpdates() });
}
