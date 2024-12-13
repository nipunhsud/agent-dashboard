import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Gift from "./pages/gift";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Forgetpassword from "./pages/forgetpassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="gift" element={<Gift />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgetpassword" element={<Forgetpassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
