import { HealthEngine } from "./engine/health/HealthEngine";
import { ShieldEngine } from "./engine/shield/ShieldEngine";

export const healthEngine = new HealthEngine(100);
export const shieldEngine = new ShieldEngine(50);
