"use client";

import { useEffect, useRef, useState } from "react";

const TEXT = "Ars Longa Vita Brevis · ";
// Extra space between glyphs, in em. Negative pulls letters together.
const TRACKING = -0.04;
// Target letter height as a fraction of viewport height. Wider screens get a
// bigger ring, so the phrase repeats more to keep letters near this size.
const FONT_VH = 0.468;
const MIN_REPEATS = 1;

type Layout = { glyphs: { ch: string; angle: number }[]; radius: number; fontSize: number };

type Props = {
  text?: string;
  repeats?: number; // fixed repeat count; omit to auto-fill based on FONT_VH
  radiusScale?: number; // multiplier on the computed radius, e.g. 0.7 for a smaller ring
};

// Lays the text around a cylinder, spacing each glyph by its real width so the
// proportional font reads naturally.
export default function Ring({ text = TEXT, repeats: fixedRepeats, radiusScale = 1 }: Props = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { fontFamily, fontWeight } = getComputedStyle(el);
    const font = `${fontWeight} 100px ${fontFamily}`;
    const ctx = document.createElement("canvas").getContext("2d")!;
    let phraseWidth = 0;
    const advance = (ch: string) => ctx.measureText(ch).width / 100 + TRACKING;

    const update = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Shrink the ring progressively on landscape screens: full size up to 3:4,
      // down to 70% from 16:10 and wider.
      const t = Math.min(Math.max((w / h - 0.75) / (1.6 - 0.75), 0), 1);
      const radius = Math.max(0.62 * w * (1 - 0.3 * t), 0.48 * h) * radiusScale;
      const circumference = 2 * Math.PI * radius;
      const repeats = fixedRepeats ?? Math.max(MIN_REPEATS, Math.round(circumference / (phraseWidth * FONT_VH * h)));

      const chars = [...text.repeat(repeats)];
      const widths = chars.map(advance);
      const total = widths.reduce((a, b) => a + b, 0);

      let x = 0;
      const glyphs = chars.map((ch, i) => {
        const angle = ((x + widths[i] / 2) / total) * 360;
        x += widths[i];
        return { ch, angle };
      });

      setLayout({ glyphs, radius, fontSize: circumference / total });
    };

    let cancelled = false;
    // Measure only once the web font is in, or spacing would use the fallback's widths
    document.fonts.load(font, text).then(() => {
      if (cancelled) return;
      ctx.font = font;
      phraseWidth = [...text].reduce((sum, ch) => sum + advance(ch), 0);
      update();
      window.addEventListener("resize", update);
    });
    return () => {
      cancelled = true;
      window.removeEventListener("resize", update);
    };
  }, [text, fixedRepeats, radiusScale]);

  return (
    <div className="ring" aria-hidden="true">
      <div className="ring-tilt">
        <div
          ref={ref}
          className="ring-spin"
          style={layout ? ({ "--r": `${layout.radius}px`, fontSize: layout.fontSize } as React.CSSProperties) : undefined}
        >
          {layout?.glyphs.map((g, i) => (
            <span key={i} style={{ transform: `rotateY(${g.angle}deg) translateZ(var(--r)) translate(-50%, -50%)` }}>
              {g.ch}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
