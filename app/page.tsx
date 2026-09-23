import Project from "./Project";

// TODO: replace with your number, international format, digits only (e.g. 40712345678)
const WHATSAPP = "40700000000";
const MESSAGE = "hey, I want in on the Nov 15 Y3K cycle. my project is: ";

export default function Home() {
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <main>
      <p>
        6 weeks to (re)launch your <Project />.
        <br />
        <a href={href} target="_blank" rel="noopener noreferrer">
          Free to join, start on Nov 15 &gt;
        </a>
      </p>
    </main>
  );
}
