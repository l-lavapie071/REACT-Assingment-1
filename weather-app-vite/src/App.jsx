/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import "./App.css";
import DisplayWeatherAndTemp from "./components/DiplayWeatherAndTemp";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <DisplayWeatherAndTemp location={"manila"} />
    </>
  );
}

export default App;
