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

export const dotProduct3D = (v1: [number, number, number], v2: [number, number, number]) => v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];

export const crossProduct3D = (v1: [number, number, number], v2: [number, number, number]) => [v1[1]*v2[2] - v1[2]*v2[1], v1[2]*v2[0] - v1[0]*v2[2], v1[0]*v2[1] - v1[1]*v2[0]];

export const magnitude2D = (v: [number, number]) => Math.sqrt(v[0] * v[0] + v[1] * v[1]);

export const magnitude3D = (v: [number, number, number]) => Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);

export const normalize2D = (v: [number, number]) => { const m = magnitude2D(v); return m === 0 ? [0, 0] : [v[0] / m, v[1] / m]; };

export const normalize3D = (v: [number, number, number]) => { const m = magnitude3D(v); return m === 0 ? [0, 0, 0] : [v[0] / m, v[1] / m, v[2] / m]; };

export const isPrime = (num: number) => { for(let i = 2, s = Math.sqrt(num); i <= s; i++) if(num % i === 0) return false; return num > 1; };

export const fibonacci = (n: number): number => n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);

export const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

export const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

export const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

export const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

export const toRadians = (degrees: number) => degrees * (Math.PI / 180);

export const toDegrees = (radians: number) => radians * (180 / Math.PI);

export const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;

export const calculateBMI = (weightKg: number, heightM: number) => weightKg / (heightM * heightM);

export const compoundInterest = (p: number, r: number, t: number, n: number) => p * Math.pow(1 + (r / n), n * t);

export const simpleInterest = (p: number, r: number, t: number) => p * r * t;

export const velocity = (distance: number, time: number) => distance / time;

export const acceleration = (vInitial: number, vFinal: number, time: number) => (vFinal - vInitial) / time;

export const force = (mass: number, acc: number) => mass * acc;

export const kineticEnergy = (mass: number, velocity: number) => 0.5 * mass * velocity * velocity;

export const potentialEnergy = (mass: number, height: number, g = 9.81) => mass * g * height;

export const momentum = (mass: number, velocity: number) => mass * velocity;

export const workDone = (force: number, distance: number, angleDeg: number = 0) => force * distance * Math.cos(toRadians(angleDeg));

export const power = (work: number, time: number) => work / time;

export const ohmsLawVoltage = (current: number, resistance: number) => current * resistance;

export const ohmsLawCurrent = (voltage: number, resistance: number) => voltage / resistance;

export const ohmsLawResistance = (voltage: number, current: number) => voltage / current;

export const electricalPower = (voltage: number, current: number) => voltage * current;

export const snellsLawAngle2 = (n1: number, angle1Deg: number, n2: number) => toDegrees(Math.asin((n1 * Math.sin(toRadians(angle1Deg))) / n2));

export const gravitationalForce = (m1: number, m2: number, r: number) => (6.67430e-11 * m1 * m2) / (r * r);

export const escapeVelocity = (mass: number, radius: number) => Math.sqrt((2 * 6.67430e-11 * mass) / radius);

export const density = (mass: number, volume: number) => mass / volume;
