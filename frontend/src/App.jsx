import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePaste from "./components/CreatePaste.jsx";
import ViewPaste from "./components/ViewPaste.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePaste />} />
        <Route path="/paste/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
