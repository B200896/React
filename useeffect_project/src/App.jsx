import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Header";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(0);

  // useEffect(() => {
  //   console.log("every render");
  // });

  // useEffect(() => {
  //   console.warn("First render");
  // }, []);

  // useEffect(() => {
  //   console.log("This is count useeffect");
  // }, [count]);

  useEffect(() => {
    console.log(
      "Ki me to hr baaar chlu ga jit ni baar click kro ge utni baar chlu ga"
    );
  });

  useEffect(()=>{

     console.warn("ki me to srif page reload hone pr chlu ga")
  },[])

  useEffect(() => {
    console.log("me count pr click krne pr chlu ga");
  }, [count]);

  useEffect(() => {
    console.log("me data pr click krne pr chlu ga");
  }, [data]);

  return (
    <>
      <Header name = {"mohit" + count} />
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>

      <button onClick={() => setData((data) => data + 1)}>
        Data is {data}
      </button>
    </>
  );
}

export default App;
