// Auto-generated validators and formatters\n
export const isAlpha = (s: string) => /^[a-zA-Z]+$/.test(s);

export const isNumeric = (s: string) => /^[0-9]+$/.test(s);

export const isAlphanumeric = (s: string) => /^[a-zA-Z0-9]+$/.test(s);

export const isHexColor = (s: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);

export const isUUID = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);

export const isJSON = (s: string) => { try { JSON.parse(s); return true; } catch { return false; } };

export const isURL = (s: string) => /^https?:\/\/[\w\d\.-]+\.[\w\d\.-]+/.test(s);

export const isIPV4 = (s: string) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(s);

export const isMacAddress = (s: string) => /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(s);

export const isBooleanString = (s: string) => s === 'true' || s === 'false';

export const isDateString = (s: string) => !isNaN(Date.parse(s));

export const stripHTML = (s: string) => s.replace(/<[^>]*>?/gm, '');
