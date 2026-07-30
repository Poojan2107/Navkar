const INDIAN_PHONE = /^(\+91[\s-]?)?[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizePhone(value: string): string {
  return value.replace(/[\s-]/g, "");
}

export function isValidIndianPhone(value: string): boolean {
  const normalized = normalizePhone(value.trim());
  return INDIAN_PHONE.test(normalized);
}

export function isValidEmail(value: string): boolean {
  if (!value.trim()) return true;
  return EMAIL.test(value.trim());
}
