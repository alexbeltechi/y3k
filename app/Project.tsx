"use client";

import { useEffect, useState } from "react";

const PROJECTS = [
  "dream project",
  "personal website",
  "photography book",
  "portfolio",
  "zine",
  "album",
  "clothing drop",
  "short film",
  "newsletter",
  "art show",
];

export default function Project() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % PROJECTS.length), 1200);
    return () => clearInterval(id);
  }, []);

  return <span aria-live="off">{PROJECTS[i]}</span>;
}
