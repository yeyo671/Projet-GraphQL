import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import HomePage from "./components/pages/HomePage";
import AuthPage from "./components/pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connection" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <HomePage />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
