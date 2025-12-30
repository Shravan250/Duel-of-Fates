import { healthEngine } from "@/engine";
import { useHealthEngineStore } from "@/store/useHealthEngineStore";

export function HPTest() {
  const hp = useHealthEngineStore((state) => state.hp);

  return (
    <div>
      <div>HP: {hp}</div>
      <button onClick={() => healthEngine.damage(10)}>Take Damage</button>
      <button onClick={() => healthEngine.heal(5)}>Heal</button>
    </div>
  );
}
