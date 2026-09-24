"use client";

import { useRef } from "react";

const WHATSAPP = "40746842839";
const MESSAGE = "hey, I want in on the Oct 14 Y3K cycle. my project is: ";

// Native <dialog> gives us Esc-to-close and focus handling. The dialog fills the
// screen, so a click that lands on it directly (not on the text) is "outside".
export default function Rules() {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <p>
        <button type="button" className="link" onClick={() => ref.current?.showModal()}>
          Next cohort starts Oct 14
        </button>
      </p>
      <dialog ref={ref} className="rules" aria-label="Rules" onClick={(e) => e.target === ref.current && close()}>
        <button type="button" className="rules-close" onClick={close} aria-label="Close">
          X
        </button>
        <div className="rules-body">
          <p>Y3K is a community of people learning and building things</p>
          <p>Choose a personal project you&apos;d like to launch, relaunch or improve on in a 6 week timeframe</p>
          <p>Work in your spare time, at your own pace</p>
          <p>Learn, build, and ask questions in the group chat, 24/7</p>
          <p>Join a weekly call (if you want) with the cohort to share progress or get feedback from others</p>
          <p>
            <a href="https://beltechi.com" target="_blank" rel="noopener noreferrer">
              Alex
            </a>{" "}
            is around if you need a second opinion or technical advice
          </p>
          <p>Learn to build stuff with AI or whatever tools you got</p>
          <p>Next cohort starts Oct 14 — Nov 25</p>
          <p>Participation is free (you can donate after if you feel like it)</p>
          <p>You don&apos;t need another course, you need to get started</p>
          <p>
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign up on WhatsApp
            </a>
          </p>
        </div>
      </dialog>
    </>
  );
}
