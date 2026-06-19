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

export const stripNumbers = (s: string) => s.replace(/[0-9]/g, '');

export const stripPunctuation = (s: string) => s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

export const isLowercase = (s: string) => s === s.toLowerCase();

export const isUppercase = (s: string) => s === s.toUpperCase();

export const countWords = (s: string) => s.trim().split(/\s+/).length;

export const countLines = (s: string) => s.split(/\r\n|\r|\n/).length;

export const camelCase = (s: string) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, '');

export const pascalCase = (s: string) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g, '');

export const snakeCase = (s: string) => s.replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/).map(w => w.toLowerCase()).join('_');

export const kebabCase = (s: string) => s.replace(/\W+/g, ' ').split(/ |\B(?=[A-Z])/).map(w => w.toLowerCase()).join('-');

export const encodeHTMLEntities = (s: string) => s.replace(/[\u00A0-\u9999<>&]/g, i => '&#' + i.charCodeAt(0) + ';');

export const decodeHTMLEntities = (s: string) => s.replace(/&#([0-9]{1,3});/gi, (m, c) => String.fromCharCode(parseInt(c, 10)));

export const isCreditCard = (s: string) => /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(s);

export const luhnCheck = (s: string) => s.split('').reverse().reduce((acc, c, i) => acc + (i % 2 !== 0 ? parseInt(c, 10) * 2 > 9 ? parseInt(c, 10) * 2 - 9 : parseInt(c, 10) * 2 : parseInt(c, 10)), 0) % 10 === 0;

export const bytesToSize = (b: number) => b === 0 ? '0 B' : ['B', 'KB', 'MB', 'GB', 'TB'][Math.floor(Math.log(b) / Math.log(1024))] ? (b / Math.pow(1024, Math.floor(Math.log(b) / Math.log(1024)))).toFixed(2) + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][Math.floor(Math.log(b) / Math.log(1024))] : '0 B';

export const hexToRgb = (h: string) => { const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16); return [r, g, b]; };

export const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

export const clampArray = (arr: number[], min: number, max: number) => arr.map(x => Math.min(Math.max(x, min), max));

export const chunkArray = <T>(arr: T[], s: number) => Array.from({ length: Math.ceil(arr.length / s) }, (v, i) => arr.slice(i * s, i * s + s));

export const shuffleArray = <T>(arr: T[]) => arr.sort(() => Math.random() - 0.5);

export const sampleArray = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export const intersection = <T>(a: T[], b: T[]) => a.filter(x => b.includes(x));

export const difference = <T>(a: T[], b: T[]) => a.filter(x => !b.includes(x));

export const union = <T>(a: T[], b: T[]) => Array.from(new Set([...a, ...b]));
