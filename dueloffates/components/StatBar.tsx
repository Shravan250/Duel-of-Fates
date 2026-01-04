import clsx from "clsx";

interface StatBarProps {
  value: number;
  max: number;
  colorClass: string; 
  flip: boolean;
}

export default function StatBar({
  value,
  max,
  colorClass,
  flip,
}: StatBarProps) {
  const percent = Math.max(0, Math.min(1, value / max)) * 100;

  return (
    <div className="border-2 border-gray-400 bg-gray-200 h-8 relative overflow-hidden">
      {/* Fill */}
      <div
        className={clsx(
          "absolute top-0 h-full transition-all duration-300",
          colorClass
        )}
        style={
          flip
            ? { left: 0, width: `${percent}%` }
            : { right: 0, width: `${percent}%` }
        }
      />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center font-semibold text-sm text-black pointer-events-none">
        {value} / {max}
      </div>
    </div>
  );
}
