import type { Metadata } from "next";
import Ring from "../Ring";
import Video from "../Video";

export const metadata: Metadata = {
  title: "Y3K.Club",
  robots: { index: false, follow: false },
};

// Hidden page for grabbing social-asset screenshots: same background video and
// ring as the homepage, but no headline, CTA or "Music" label. Clicking
// anywhere still toggles the sound (handled inside Video).
export default function Logo() {
  return (
    <>
      <Video showLabel={false} />
      <Ring text="Y3K • " repeats={2} radiusScale={0.7} />
    </>
  );
}
