"use client";

import { Side } from "@/types";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useMemo } from "react";

export function ZoneIcon({
  icon,
  color,
  side,
  glow,
  pulse = false,
  isDebuff = false,
}: {
  icon: string;
  color: string;
  side: Side;
  glow: string;
  pulse?: boolean;
  isDebuff?: boolean;
}) {
  const isPlayer = side === "PLAYER";

  // random positions
  const particles = useMemo(
    () =>
      [20, 40, 60, 80].map((x) => ({
        x,
        y: Math.random() * 80 + 20,
        drift: Math.random() * 120 + 120,
        rotate: Math.random() * 40 - 20,
      })),
    [],
  );

  return (
    <>
      <motion.div
        className="absolute left-0 w-screen h-[40vh] overflow-hidden pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${glow}, transparent)`,
          filter: "blur(50px)",
        }}
        initial={{
          y: isPlayer ? (isDebuff ? "0%" : "150%") : isDebuff ? "-150%" : "0%",
          opacity: 0,
          scaleY: 0.8,
        }}
        animate={{
          y: isPlayer ? (isDebuff ? "150%" : "0%") : isDebuff ? "0%" : "-150%",
          opacity: [0, 1, 0],
          scaleY: [0.8, 1.3, 1],
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      ></motion.div>

      {/* ICON PARTICLES */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: isPlayer ? (isDebuff ? -150 : "0%") : isDebuff ? "0%" : 150,
            scale: 0.8,
          }}
          animate={{
            y: isDebuff
              ? p.drift - (isPlayer ? 150 : 0)
              : -p.drift + (isPlayer ? 0 : 150),
            opacity: [0, 1, 0],
            scale: pulse ? [0.8, 1.3, 1] : [0.8, 1.1, 1],
            rotate: [0, p.rotate],
          }}
          transition={{
            duration: 1.2,
            delay: i * 0.1,
            ease: "easeOut",
          }}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            transform: "translateX(-50%)",

            // ONLY side controls position
            bottom: isPlayer ? `${p.y}px` : undefined,
            top: !isPlayer ? `${p.y}px` : undefined,
          }}
        >
          {/* Glow */}
          <div
            className="absolute w-12 h-12 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${glow}88, transparent 70%)`,
            }}
          />

          {/* Icon */}
          <Icon
            icon={icon}
            className={`w-24 h-24  ${color} relative z-10`}
            style={{
              filter: `drop-shadow(0 0 10px ${glow})`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
