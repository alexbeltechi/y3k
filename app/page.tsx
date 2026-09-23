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
        <div className="content">
          <p>
            <Project />
          </p>
          <Rules />
        </div>
      </main>
    </>
  );
}
