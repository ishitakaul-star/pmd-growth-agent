/* ═══ MARKDOWN RENDERER — extracted from index.html ═══ */
"use client";

import React from "react";

function fmt(t: string): React.ReactNode[] {
  const p: React.ReactNode[] = [];
  let r = t;
  let k = 0;
  while (r.length > 0) {
    const b = r.match(/\*\*(.+?)\*\*/);
    const c = r.match(/`(.+?)`/);
    const it = r.match(/\*(.+?)\*/);
    let m: string | null = null;
    let idx = r.length;
    if (b && b.index !== undefined && b.index < idx) {
      m = "b";
      idx = b.index;
    }
    if (c && c.index !== undefined && c.index < idx) {
      m = "c";
      idx = c.index;
    }
    if (it && it.index !== undefined && it.index < idx && m !== "b") {
      m = "i";
      idx = it.index;
    }
    if (!m) {
      p.push(r);
      break;
    }
    if (idx > 0) p.push(r.slice(0, idx));
    if (m === "b") {
      p.push(
        React.createElement(
          "strong",
          { key: k++, className: "font-semibold text-white" },
          b![1]
        )
      );
      r = r.slice(idx + b![0].length);
    } else if (m === "c") {
      p.push(
        React.createElement(
          "code",
          {
            key: k++,
            className: "bg-slate-800 text-brand-300 px-1 rounded text-xs",
          },
          c![1]
        )
      );
      r = r.slice(idx + c![0].length);
    } else {
      p.push(
        React.createElement(
          "em",
          { key: k++, className: "italic text-slate-400" },
          it![1]
        )
      );
      r = r.slice(idx + it![0].length);
    }
  }
  return p;
}

export function RenderMD({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split("\n");
  const els: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const L = lines[i];
    if (L.startsWith("### "))
      els.push(
        React.createElement(
          "h3",
          {
            key: i,
            className: "text-sm font-semibold text-slate-200 mt-3 mb-1",
          },
          L.slice(4)
        )
      );
    else if (L.startsWith("## "))
      els.push(
        React.createElement(
          "h2",
          {
            key: i,
            className: "text-base font-semibold text-white mt-3 mb-1",
          },
          L.slice(3)
        )
      );
    else if (L.startsWith("---"))
      els.push(
        React.createElement("hr", {
          key: i,
          className: "my-3 border-slate-700",
        })
      );
    else if (L.startsWith("- ") || L.startsWith("* ")) {
      const items: React.ReactNode[] = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("- ") || lines[i].startsWith("* "))
      ) {
        items.push(
          React.createElement(
            "li",
            {
              key: i,
              className: "ml-4 text-sm text-slate-300 leading-relaxed",
            },
            ...fmt(lines[i].slice(2))
          )
        );
        i++;
      }
      els.push(
        React.createElement(
          "ul",
          { key: `u${i}`, className: "list-disc my-1 space-y-0.5" },
          ...items
        )
      );
      continue;
    } else if (L.match(/^\d+\.\s/)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(
          React.createElement(
            "li",
            {
              key: i,
              className: "ml-4 text-sm text-slate-300 leading-relaxed",
            },
            ...fmt(lines[i].replace(/^\d+\.\s/, ""))
          )
        );
        i++;
      }
      els.push(
        React.createElement(
          "ol",
          { key: `o${i}`, className: "list-decimal my-1 space-y-0.5" },
          ...items
        )
      );
      continue;
    } else if (L.startsWith("> "))
      els.push(
        React.createElement(
          "blockquote",
          {
            key: i,
            className:
              "border-l-2 border-brand-400 pl-3 my-2 text-sm text-slate-400 italic",
          },
          ...fmt(L.slice(2))
        )
      );
    else if (L.trim())
      els.push(
        React.createElement(
          "p",
          {
            key: i,
            className: "text-sm text-slate-300 leading-relaxed my-1",
          },
          ...fmt(L)
        )
      );
    i++;
  }
  return React.createElement("div", null, ...els);
}
