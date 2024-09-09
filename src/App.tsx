import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { SignIn, useAuth } from "@clerk/clerk-react";

function App() {
  const [count, setCount] = useState(0);
  const { isSignedIn } = useAuth();
  const [word, setWord] = useState("new Word");

  const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setWord(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <div>
        {!isSignedIn && <SignIn />}
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {" "}
        This'll throw Click on the Vite and React logos to learn more
      </p>
      <input
        type="text"
        value={word}
        onChange={handleWordChange}
        className="p-2 m-2"
      />
    </>
  );
}

export default App;
