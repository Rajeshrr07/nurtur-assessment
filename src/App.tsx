import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import type { Property } from "./types/property";

const getInitialAuth = () => {
  const auth = sessionStorage.getItem("auth");
  if (!auth) return false;

  try {
    const user = JSON.parse(auth);
    return Boolean(user?.isLoggedIn);
  } catch {
    return false;
  }
};

const App = () => {
  const [isAuth, setIsAuth] = useState(() => getInitialAuth());
  const [selected, setSelected] = useState<Property | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/search" />
            ) : (
              <LoginPage onLogin={() => setIsAuth(true)} />
            )
          }
        />

        <Route
          path="/search"
          element={
            isAuth ? (
              <SearchPage onSelect={setSelected} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/detail"
          element={
            isAuth && selected ? (
              <DetailPage property={selected} />
            ) : (
              <Navigate to="/search" />
            )
          }
        />

        <Route
          path="/"
          element={<Navigate to={isAuth ? "/search" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
