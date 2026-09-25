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
          <p className="section">How it works</p>
          <p>
            1. <strong>Choose a project</strong>
          </p>
          <p className="desc">Pick something you want to make. Digital, physical, creative.</p>
          <p>
            2. <strong>Build it in 6 weeks</strong>
          </p>
          <p className="desc">Start together. Work at your own pace. Finish by the deadline.</p>
          <p>
            3. <strong>Join the cohort</strong>
          </p>
          <p className="desc">
            Private group chat, 1 weekly group check-in, feedback and show &amp; tell. Optional, but you’re never
            building alone.
          </p>
          <p className="section">What&apos;s included:</p>
          <p>
            <strong>Creative guidance</strong>
          </p>
          <p className="desc">
            <a href="https://beltechi.com" target="_blank" rel="noopener noreferrer">
              Alex
            </a>{" "}
            is around if you want advice on your project, to learn AI tools, or get help with design, branding and
            marketing
          </p>
          <p>
            <strong>Learn AI tools</strong>
          </p>
          <p className="desc">Figure out what to use and how</p>
          <p>
            <strong>Get visibility for your project</strong>
          </p>
          <p className="desc">Share progress, questions, discoveries and useful stuff with the group</p>
          <p className="section">Next cohort starts Oct 14 — Nov 25</p>
          <p className="desc">Participation is free (you can donate after if you feel like it)</p>
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
