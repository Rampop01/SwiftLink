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
