// Auto-generated helpers\n
export const isString = (val: any): val is string => typeof val === 'string';

export const isNumber = (val: any): val is number => typeof val === 'number';

export const isObject = (val: any) => val !== null && typeof val === 'object';

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const lowercase = (s: string) => s.toLowerCase();

export const uppercase = (s: string) => s.toUpperCase();

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export const isEven = (n: number) => n % 2 === 0;

export const isOdd = (n: number) => n % 2 !== 0;

export const noop = () => {};

export const identity = <T>(v: T) => v;

export const toBase64 = (str: string) => Buffer.from(str).toString('base64');

export const fromBase64 = (b64: string) => Buffer.from(b64, 'base64').toString('ascii');

export const generateId = () => Math.random().toString(36).substring(2, 9);

export const toHex = (n: number) => n.toString(16);

export const fromHex = (hex: string) => parseInt(hex, 16);

export const getTimestamp = () => Date.now();

export const isValidEmail = (e: string) => /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(e);

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const unslugify = (s: string) => s.replace(/-/g, ' ');

export const removeWhitespace = (s: string) => s.replace(/\\s/g, '');

export const isNull = (v: any) => v === null;

export const isUndefined = (v: any) => v === undefined;

export const isNil = (v: any) => v == null;

export const isArray = (v: any) => Array.isArray(v);

export const first = <T>(arr: T[]) => arr[0];

export const last = <T>(arr: T[]) => arr[arr.length - 1];

export const isEmpty = (arr: any[]) => arr.length === 0;

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

export const min = (arr: number[]) => Math.min(...arr);

export const max = (arr: number[]) => Math.max(...arr);

export const average = (arr: number[]) => sum(arr) / arr.length;

export const flatten = <T>(arr: T[][]) => arr.reduce((a, b) => a.concat(b), []);

export const unique = <T>(arr: T[]) => Array.from(new Set(arr));

export const compact = (arr: any[]) => arr.filter(Boolean);

export const toBoolean = (v: any) => !!v;

export const toggleBoolean = (v: boolean) => !v;

export const parseJSON = (s: string) => { try { return JSON.parse(s); } catch { return null; } };

export const stringifyJSON = (v: any) => JSON.stringify(v);

export const copy = (v: any) => parseJSON(stringifyJSON(v));

export const getKeys = (obj: object) => Object.keys(obj);

export const getValues = (obj: object) => Object.values(obj);

export const hasKey = (obj: object, key: string) => Object.prototype.hasOwnProperty.call(obj, key);

export const merge = (a: object, b: object) => ({...a, ...b});

export const isFunction = (v: any) => typeof v === 'function';

export const isBoolean = (v: any) => typeof v === 'boolean';

export const delay = (fn: Function, ms: number) => setTimeout(fn, ms);

export const setIntervalSafe = (fn: Function, ms: number) => setInterval(fn, ms);

export const parseFloatSafe = (s: string) => parseFloat(s) || 0;

export const parseIntSafe = (s: string) => parseInt(s, 10) || 0;

export const round = (n: number) => Math.round(n);

export const ceil = (n: number) => Math.ceil(n);

export const floor = (n: number) => Math.floor(n);

export const abs = (n: number) => Math.abs(n);

export const isPositive = (n: number) => n > 0;

export const isNegative = (n: number) => n < 0;

export const isZero = (n: number) => n === 0;

export const toPercentage = (n: number) => `${(n * 100).toFixed(2)}%`;

export const toCurrency = (n: number) => `$${n.toFixed(2)}`;

export const addDays = (d: Date, days: number) => new Date(d.getTime() + days * 86400000);

export const subDays = (d: Date, days: number) => new Date(d.getTime() - days * 86400000);

export const isFuture = (d: Date) => d.getTime() > Date.now();

export const isPast = (d: Date) => d.getTime() < Date.now();

export const getYear = (d: Date) => d.getFullYear();
