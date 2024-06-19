import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./components/pages/HomePage";
import RegisterPage from "./components/pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <HomePage />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
