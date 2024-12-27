import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gift from "./pages/gift";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Forgetpassword from "./pages/forgetpassword";
import { AuthProvider } from "./utils/AuthContext";
import AgentUI from "./pages/AgentUI";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/gift" element={<Gift />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/agent" element={<AgentUI />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
