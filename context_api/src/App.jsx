import "./App.css";
import Form from "./components/Form";
import Login from "./components/Login";
import UserContextProvider from "./context/UserContextProvider";

function App() {
  return (
    <>
      <UserContextProvider>
        <Login />
        <Form />
      </UserContextProvider>
    </>
  );
}

export default App;
