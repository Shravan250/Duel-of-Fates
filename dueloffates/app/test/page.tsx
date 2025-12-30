"use client";

import { bindHealthEngine } from "@/engine/binders/bindHealthEngine";
import { bindShieldEngine } from "@/engine/binders/bindShieldEngine";
import { HPTest } from "@/components/test/HpTest";
import { useEffect } from "react";
import { ShieldTest } from "@/components/test/ShieldTest";

export default function Test() {
  useEffect(() => {
    // const unsubscribe = bindHealthEngine();
    const unsubscribe = bindShieldEngine();
    return unsubscribe;
  },[]);
  return (
    <div>
      {/* <HPTest/> */}
      <ShieldTest />
    </div>
  );
}
