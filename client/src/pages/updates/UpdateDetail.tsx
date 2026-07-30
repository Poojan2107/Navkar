import { useMemo } from "react";
import { useRoute } from "wouter";
import NotFound from "@/pages/NotFound";
import UpdateDetailView from "@/components/UpdateDetail";
import { generateYardUpdates, getUpdateById } from "@/lib/updatesGenerator";

export default function UpdateDetailPage() {
  const [, params] = useRoute("/updates/:id");
  const id = params?.id;

  const updates = useMemo(() => generateYardUpdates(), []);
  const update = id ? getUpdateById(id) : undefined;

  if (!update) {
    return <NotFound />;
  }

  const idx = updates.findIndex((u) => u.id === update.id);
  const prevHref = idx > 0 ? `/updates/${updates[idx - 1].id}` : undefined;
  const nextHref = idx < updates.length - 1 ? `/updates/${updates[idx + 1].id}` : undefined;

  return <UpdateDetailView update={update} prevHref={prevHref} nextHref={nextHref} />;
}
