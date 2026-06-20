// Auto-generated math and physics helpers\n
export const areaOfCircle = (r: number) => Math.PI * r * r;

export const circumferenceOfCircle = (r: number) => 2 * Math.PI * r;

export const areaOfRectangle = (w: number, h: number) => w * h;

export const perimeterOfRectangle = (w: number, h: number) => 2 * (w + h);

export const areaOfTriangle = (b: number, h: number) => 0.5 * b * h;

export const pythagoras = (a: number, b: number) => Math.sqrt(a * a + b * b);

export const volumeOfCube = (s: number) => s * s * s;

export const surfaceAreaOfCube = (s: number) => 6 * s * s;

export const volumeOfCylinder = (r: number, h: number) => Math.PI * r * r * h;

export const surfaceAreaOfCylinder = (r: number, h: number) => 2 * Math.PI * r * (r + h);

export const volumeOfSphere = (r: number) => (4/3) * Math.PI * Math.pow(r, 3);

export const surfaceAreaOfSphere = (r: number) => 4 * Math.PI * r * r;

export const volumeOfCone = (r: number, h: number) => (1/3) * Math.PI * r * r * h;

export const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);

export const combinations = (n: number, k: number) => factorial(n) / (factorial(k) * factorial(n - k));

export const permutations = (n: number, k: number) => factorial(n) / factorial(n - k);

export const distance2D = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const distance3D = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));

export const midpoint2D = (x1: number, y1: number, x2: number, y2: number) => [(x1 + x2) / 2, (y1 + y2) / 2];

export const midpoint3D = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) => [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2];

export const dotProduct2D = (v1: [number, number], v2: [number, number]) => v1[0] * v2[0] + v1[1] * v2[1];
