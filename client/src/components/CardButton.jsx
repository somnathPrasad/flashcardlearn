import React from "react";
import { openNav } from "../script";

export default function CrossButton() {
  return (
    <div className="pl-10">
      <button className="cross">
        <i class="far fa-times-circle text-6xl shadow-2xl"></i>
      </button>
    </div>
  );
}
export function TickButton() {
  return (
    <div className="pr-10">
      <button className="tick">
        <i class="far fa-check-circle text-6xl shadow-2xl"></i>
      </button>
    </div>
  );
}
export function PlusButton() {
  return (
    <div className="">
      <button onClick={openNav} className="plus">
        <i class="far fa-plus-square text-6xl shadow-2xl"></i>
      </button>
    </div>
  );
}
