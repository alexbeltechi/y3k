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
          Start on Oct 14
        </button>
      </p>
      <dialog ref={ref} className="rules" aria-label="Rules" onClick={(e) => e.target === ref.current && close()}>
        <button type="button" className="rules-close" onClick={close} aria-label="Close">
          X
        </button>
        <div className="rules-body">
          <p>Launch or relaunch something cool.</p>
          <p>Focus on what you can realistically ship or improve in 6 weeks, no extensions</p>
          <p>Learn and build with other cohort members from the group chat</p>
          <p>
            Get feedback and tips from the{" "}
            <a href="https://beltechi.com" target="_blank" rel="noopener noreferrer">
              founder
            </a>
          </p>
          <p>Learn to build stuff with AI</p>
          <p>Join a weekly call to share progress or get feedback</p>
          <p>Participation is free (donations welcome)</p>
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
