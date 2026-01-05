// export function applyBuffStack() {
//   return {
//     nextAttackMultiplier: partialModifiers.nextAttackMultiplier
//       ? current.nextAttackMultiplier * partialModifiers.nextAttackMultiplier
//       : current.nextAttackMultiplier,

//     nextShieldMultiplier:
//       partialModifiers.nextShieldMultiplier !== undefined
//         ? current.nextShieldMultiplier * partialModifiers.nextShieldMultiplier
//         : current.nextShieldMultiplier,

//     cooldownReduction:
//       current.cooldownReduction + (partialModifiers.cooldownReduction ?? 0),

//     halveShield: current.halveShield || (partialModifiers.halveShield ?? false),

//     incomingAttackMultiplier: current.incomingAttackMultiplier,
//   };
// }
