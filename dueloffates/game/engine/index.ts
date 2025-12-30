import { HealthEngine } from "./health/HealthEngine";
import { ShieldEngine } from "./shield/ShieldEngine";

export const healthEngine = new HealthEngine(100);
export const shieldEngine = new ShieldEngine(50);
