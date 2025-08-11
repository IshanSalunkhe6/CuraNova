"use client";

import React, { useState } from "react";

export default function CuraScanFrame() {
  const [loaded, setLoaded] = useState(false);

  return React.createElement(
    "main",
    { className: "w-screen", style: { height: "100dvh" } },
    React.createElement(
      "div",
      { className: "relative h-full w-full" },

      !loaded &&
        React.createElement(
          "div",
          { className: "absolute inset-0 grid place-items-center bg-white" },
          React.createElement("div", {
            className:
              "h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600",
          })
        ),

      React.createElement("iframe", {
        title: "CuraScan – Disease Extraction",
        src: "https://disease-extraction-system.vercel.app/",
        className: "block h-full w-full",
        style: { border: "none" },
        loading: "eager",
        // ❌ no sandbox → Chrome PDF viewer works
        referrerPolicy: "no-referrer",
        allow: "fullscreen",
        onLoad: () => setLoaded(true),
      })
    )
  );
}
