import Project from "./Project";
import Ring from "./Ring";
import Rules from "./Rules";
import Video from "./Video";

export default function Home() {
  return (
    <>
      <Video />
      <Ring />
      <main>
        <div>
          <p>
            (Re)launch your <Project /> in 6 weeks
          </p>
          <Rules />
        </div>
      </main>
    </>
  );
}
