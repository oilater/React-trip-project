import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Landing from "./pages/Landing/index";
import More from "./pages/More";

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
