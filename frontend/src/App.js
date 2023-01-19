import "./App.css";
import Home from "./components/Home";
import { RecoilRoot } from "recoil";
import Layout from "./components/Layout";
import Axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    Axios.get("http://localhost:8080/create");
  }, []);

  return (
    <div>
      <RecoilRoot>
        <Layout></Layout>
      </RecoilRoot>
    </div>
  );
}

export default App;
