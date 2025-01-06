import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Gift from "./pages/gift";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Forgetpassword from "./pages/forgetpassword";
import { AuthProvider } from "./utils/AuthContext";
import AgentUI from "./pages/AgentUI";
import StockAnalysisAssistant from "./pages/StockAnalysisAssistant";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/gift" element={<Gift />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/agent" element={<AgentUI />} />
          <Route path="/stock-assistant" element={<StockAnalysisAssistant />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
