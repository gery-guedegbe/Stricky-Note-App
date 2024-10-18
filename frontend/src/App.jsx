import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import NotesProvider from "./context/NoteContext";
import AuthProvider from "./context/AuthContext";

const App = () => {
  return (
    <div
      id="app"
      className="w-full flex items-center justify-center p-4 md:p-0 "
    >
      <NotesProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </Router>
        </AuthProvider>
      </NotesProvider>
    </div>
  );
};

export default App;
