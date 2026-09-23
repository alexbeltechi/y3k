"use client";

import { useEffect, useState } from "react";

const PROJECTS = [
  "(Re)launch something cool in 6 weeks",
  "(Re)launch a new personal website in 6 weeks",
  "(Re)launch a new social media in 6 weeks",
  "(Re)launch a newsletter in 6 weeks",
  "(Re)launch a new YouTube video in 6 weeks",
  "(Re)launch an online course in 6 weeks",
  "(Re)launch your portfolio in 6 weeks",
];

export default function Project() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % PROJECTS.length), 1200);
    return () => clearInterval(id);
  }, []);

  return <span aria-live="off">{PROJECTS[i % PROJECTS.length]}</span>;
}
