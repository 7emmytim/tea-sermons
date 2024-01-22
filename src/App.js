import { useEffect, useState } from "react";
import { Sermons, SermonDetails } from "./pages";

function App() {
  const [param, setParam] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setParam(search.get("sermon_series")?.split("/")?.join("") ?? "");
  }, []);

  return param ? <SermonDetails param={param} /> : <Sermons />;
}

export default App;
