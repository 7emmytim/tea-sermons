import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sermons, SermonDetails } from "./pages";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/index.html" element={<Sermons />}></Route>
    //     {/* <Route exact path="/">
    //       <Route path="" element={<Sermons />}></Route>
    //       <Route path=":slug" element={<SermonDetails />}></Route>
    //     </Route> */}
    //     {/* <Route exact path="/contact" element={<Contact />}></Route> */}
    //   </Routes>
    // </Router>
    <Sermons />
  );
}

export default App;
