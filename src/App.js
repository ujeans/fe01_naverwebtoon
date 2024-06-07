import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
// pages
import Search from "./pages/Search";
// context
import { ThemeProvider } from "./context/themeProvider";
// UI
import { GlobalStyle } from "./UI/theme/GlobalStyle";

// Lazy loading components
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
