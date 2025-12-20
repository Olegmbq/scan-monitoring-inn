import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";

import { PrivateRoute } from "./routes/PrivateRoute";
import SearchLoading from "./pages/SearchLoading/SearchLoading";
import SearchResults from "./pages/SearchResults/SearchResults";

export default function App() {
  return (
    <>
      <Header />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search/loading" element={<SearchLoading />} />
          <Route path="/search/results" element={<SearchResults />} />

          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
