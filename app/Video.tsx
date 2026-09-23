"use client";

import { useEffect, useRef, useState } from "react";

const FADE_MS = 500;

const VIDEO_ID = "UvUeRUaey-4";

const params = new URLSearchParams({
  autoplay: "1",
  mute: "1", // browsers only allow autoplay when muted; sound is turned on by the toggle
  playsinline: "1", // keeps iOS from going fullscreen
  loop: "1",
  playlist: VIDEO_ID, // required for loop to work on a single video
  controls: "0",
  disablekb: "1",
  rel: "0",
  iv_load_policy: "3",
  enablejsapi: "1",
});

// Background YouTube video cropped to a centered square, plus a Music: On/Off
// toggle. The player is driven via postMessage, so no YouTube API script is needed.
export default function Video() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [sound, setSound] = useState(false);
  const soundRef = useRef(false); // current value for the page-wide click listener

  const command = (func: string, args: unknown[] = []) =>
    ref.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");

  const fade = useRef<number>(0);
  const volume = useRef(0);

  // Ramp the volume instead of cutting it, starting from wherever it is now so
  // toggling mid-fade doesn't jump. iOS ignores setVolume (volume is
  // hardware-only there), so on iPhone sound still switches on and off at once.
  const toggle = () => {
    cancelAnimationFrame(fade.current);
    const on = !soundRef.current;
    soundRef.current = on;
    const from = volume.current;
    const to = on ? 100 : 0;
    const start = performance.now();

    if (on) {
      command("setVolume", [from]);
      command("unMute");
      command("playVideo"); // in case autoplay was blocked (e.g. iOS Low Power Mode)
    }

    const step = (now: number) => {
      const t = Math.min((now - start) / FADE_MS, 1);
      volume.current = Math.round(from + (to - from) * t);
      command("setVolume", [volume.current]);
      if (t < 1) fade.current = requestAnimationFrame(step);
      else if (!on) command("mute");
    };
    fade.current = requestAnimationFrame(step);

    setSound(on);
  };

  // Clicking anywhere on the page (except links, buttons and the rules modal)
  // toggles the music, same as the Music: On/Off link.
  const toggleRef = useRef(toggle);
  toggleRef.current = toggle;
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, dialog")) return;
      toggleRef.current();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <div className="video" aria-hidden="true">
        <div className="video-square">
          <iframe
            ref={ref}
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?${params}`}
            title="Background video"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        </div>
      </div>
      <button type="button" className="link music" onClick={toggle}>
        Music: {sound ? "On" : "Off"}
      </button>
    </>
  );
}
