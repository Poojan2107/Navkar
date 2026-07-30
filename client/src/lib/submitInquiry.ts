export type InquiryPayload = {
  type: "contact" | "quote" | "mtc";
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  message?: string;
  category?: string;
  od?: string;
  thickness?: string;
  quantity?: string;
  unit?: string;
  notes?: string;
  batchId?: string;
  heatNumber?: string;
};

export async function submitInquiry(payload: InquiryPayload): Promise<void> {
  const response = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Unable to submit inquiry. Please call +91 9601702883.");
  }
}
