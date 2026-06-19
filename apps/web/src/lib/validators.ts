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

export const deepMerge = (target: any, source: any) => { for (const k of Object.keys(source)) { if (source[k] instanceof Object) Object.assign(source[k], deepMerge(target[k] || {}, source[k])); } return Object.assign(target || {}, source); };

export const getType = (v: any) => Object.prototype.toString.call(v).slice(8, -1).toLowerCase();

export const omit = (obj: any, keys: string[]) => Object.keys(obj).filter(k => !keys.includes(k)).reduce((res: any, k) => { res[k] = obj[k]; return res; }, {});

export const pick = (obj: any, keys: string[]) => keys.reduce((res: any, k) => { if (k in obj) res[k] = obj[k]; return res; }, {});

export const debounce = (fn: Function, ms = 300) => { let t: any; return function(this: any, ...args: any[]) { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), ms); }; };

export const throttle = (fn: Function, wait = 300) => { let inThrottle: boolean; return function(this: any, ...args: any[]) { if (!inThrottle) { fn.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, wait); } }; };

export const once = (fn: Function) => { let ran = false, res: any; return function(this: any, ...args: any[]) { if (ran) return res; ran = true; res = fn.apply(this, args); return res; }; };

export const memoize = (fn: Function) => { const cache = new Map(); return function(...args: any[]) { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const res = fn(...args); cache.set(key, res); return res; }; };

export const randomString = (l = 8) => Math.random().toString(36).substring(2, 2 + l);

export const randomHex = (l = 6) => [...Array(l)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export const randomColor = () => '#' + randomHex(6);

export const isLeapYear = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

export const daysInMonth = (m: number, y: number) => new Date(y, m, 0).getDate();

export const addMonths = (d: Date, m: number) => { const n = new Date(d); n.setMonth(d.getMonth() + m); return n; };

export const subMonths = (d: Date, m: number) => addMonths(d, -m);

export const addYears = (d: Date, y: number) => { const n = new Date(d); n.setFullYear(d.getFullYear() + y); return n; };

export const subYears = (d: Date, y: number) => addYears(d, -y);

export const diffDays = (d1: Date, d2: Date) => Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 86400000);

export const diffHours = (d1: Date, d2: Date) => Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 3600000);

export const diffMinutes = (d1: Date, d2: Date) => Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 60000);

export const diffSeconds = (d1: Date, d2: Date) => Math.ceil(Math.abs(d1.getTime() - d2.getTime()) / 1000);

export const isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

export const isWeekday = (d: Date) => !isWeekend(d);

export const startOfDay = (d: Date) => { const n = new Date(d); n.setHours(0, 0, 0, 0); return n; };

export const endOfDay = (d: Date) => { const n = new Date(d); n.setHours(23, 59, 59, 999); return n; };

export const isSameDay = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();

export const isSameMonth = (d1: Date, d2: Date) => d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
