import { useEffect, useState } from "react";
import { Sermons, SermonDetails } from "./pages";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  const [param, setParam] = useState("");

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setParam(search.get("sermon_series")?.split("/")?.join("") ?? "");
  }, []);

  return (
    <MantineProvider theme={theme}>
      {param ? <SermonDetails param={param} /> : <Sermons />}
    </MantineProvider>
  );
}

export default App;
