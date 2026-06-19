// Auto-generated validators and formatters\n
export const isAlpha = (s: string) => /^[a-zA-Z]+$/.test(s);

export const isNumeric = (s: string) => /^[0-9]+$/.test(s);

export const isAlphanumeric = (s: string) => /^[a-zA-Z0-9]+$/.test(s);

export const isHexColor = (s: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);

export const isUUID = (s: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
