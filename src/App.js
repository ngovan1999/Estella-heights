import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RouterManagement from "./components/router/routerManagement";
// ..
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route end path="/*" element={<RouterManagement />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
