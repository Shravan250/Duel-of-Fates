import { shieldEngine } from "@/engine";
import { useShieldEngineStore } from "@/store/useShieldEngineStore";

export function ShieldTest() {
  const shield = useShieldEngineStore((state) => state.shield);

  return (
    <div>
      <div>shield: {shield}</div>
      <button onClick={() => shieldEngine.loseShield(10)}>Take Damage</button>
      <button onClick={() => shieldEngine.gainShield(5)}>gain</button>
    </div>
  );
}
