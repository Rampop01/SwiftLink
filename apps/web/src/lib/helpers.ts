// Auto-generated helpers\n
export const isString = (val: any): val is string => typeof val === 'string';

export const isNumber = (val: any): val is number => typeof val === 'number';

export const isObject = (val: any) => val !== null && typeof val === 'object';

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
