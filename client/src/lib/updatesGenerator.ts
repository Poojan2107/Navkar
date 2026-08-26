export type { YardUpdate as DispatchUpdate } from "@shared/yard-feed";
export {
  listYardUpdates as generateYardUpdates,
  getUpdateById,
  latestUpdate,
  getSiteUrl,
} from "@shared/yard-feed";

import { listYardUpdates, getUpdateById as findUpdate } from "@shared/yard-feed";
import type { YardUpdate } from "@shared/yard-feed";

export async function loadYardUpdates(): Promise<YardUpdate[]> {
  try {
    const res = await fetch("/api/updates", { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("updates api unavailable");
    const data = (await res.json()) as { updates?: YardUpdate[] };
    if (Array.isArray(data.updates) && data.updates.length > 0) return data.updates;
  } catch {
    /* local fallback */
  }
  return listYardUpdates();
}

export async function loadYardUpdate(id: string): Promise<YardUpdate | undefined> {
  try {
    const res = await fetch(`/api/updates?id=${encodeURIComponent(id)}`, {
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const data = (await res.json()) as { update?: YardUpdate };
      if (data.update) return data.update;
    }
  } catch {
    /* local fallback */
  }
  return findUpdate(id);
}
