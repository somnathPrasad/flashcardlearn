import React from "react";

export default function Flashcard() {
  return (
    <div className="flex flex-col">
      <div className="card mx-5 my-5 p-3 rounded shadow-2xl bg-purple-400">
        <div className="card-ques text-3xl font-bold">
          <h1>What is Algorithm ?</h1>
        </div>
        <div className="card-ans pt-10">
          <p className="text-lg min-h-full"></p>
        </div>
      </div>
    </div>
  );
}
