import { useState } from "react";
import { Stage, Layer, Line, Circle, Image } from "react-konva";
import useImage from "use-image";
import { Button } from "@/components/ui/button";

function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}
const getShuffledArr = (arr: string[]) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const notes = ["Sol", "La", "Si", "Do", "Re", "Mi", "Fa"];
function App() {
  const [image] = useImage("/GClef.svg");
  const [index, setIndex] = useState<number>(getRandomIntInclusive(-9, 13));
  const [answer, setAnswer] = useState<string | null>(null);
  const indexValue = notes.at(
    ((index % notes.length) + notes.length) % notes.length
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {answer && (answer === indexValue ? "Correct" : "Incorrect")}
      <Stage width={600} height={600}>
        <Layer>
          <Note solBaseIndex={index} />
          <Image image={image} scale={{ x: 2, y: 2.2 }} y={60} x={70} />
          {index > 6 && <SmallLinesTop count={Math.floor((index - 6) / 2)} />}
          <Line y={0} points={[70, 70, 500, 70]} stroke={"black"} />
          <Line y={15} points={[70, 70, 500, 70]} stroke={"black"} />
          <Line y={30} points={[70, 70, 500, 70]} stroke={"black"} />
          <Line y={45} points={[70, 70, 500, 70]} stroke={"black"} />
          <Line y={60} points={[70, 70, 500, 70]} stroke={"black"} />
          {index < -2 && (
            <SmallLinesBottom count={Math.floor((-2 + Math.abs(index)) / 2)} />
          )}
        </Layer>
      </Stage>
      {/* {} */}
      <div style={{ display: "flex", gap: "10px" }}>
        {getShuffledArr(notes).map((note) => (
          <Button key={note} onClick={() => setAnswer(note)}>
            {note}
          </Button>
        ))}
      </div>
      {answer === indexValue && (
        <Button
          onClick={() => {
            setIndex(getRandomIntInclusive(-9, 13));
            setAnswer(null);
          }}
          style={{marginTop: "15px", backgroundColor:"blueviolet"}}
        >
          Next
        </Button>
      )}
    </div>
  );
}

function Note({ solBaseIndex }: { solBaseIndex: number }) {
  return (
    <Circle x={285} y={115 + solBaseIndex * -7.5} radius={7.5} fill={"black"} />
  );
}
function SmallLinesTop({ count }: { count: number }) {
  return (
    <>
      {Array.from(Array(count), (_, i) => (
        <Line
          key={i}
          y={(i + 1) * -15}
          x={272.5}
          points={[0, 70, 25, 70]}
          stroke={"black"}
        />
      ))}
    </>
  );
}
function SmallLinesBottom({ count }: { count: number }) {
  return (
    <>
      {Array.from(Array(count), (_, i) => (
        <Line
          key={i}
          y={(i + 1) * 15 + 60}
          x={272.5}
          points={[0, 70, 25, 70]}
          stroke={"black"}
        />
      ))}
    </>
  );
}

export default App;
