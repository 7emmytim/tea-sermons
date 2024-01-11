import { Sermons, SermonDetails } from "./pages";

function App() {
  const search = new URLSearchParams(window.location.search);
  const param = search.get("sermon_series");

  return param ? <SermonDetails param={param} /> : <Sermons />;
}

export default App;
