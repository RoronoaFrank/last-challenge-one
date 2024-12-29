import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CategoryProvider } from "./Components/CategoryContext";
import GlobalStyles from "./Components/GlobalStyles";
import BackgroundOne from "./Components/Background";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import NewVideo from "./Components/NewVideo";

function App() {
  return (
    <CategoryProvider>
      <Router>
        <GlobalStyles />
        <BackgroundOne>
          <Header />
          <Routes>
            <Route path="/" element={<Banner />} />
            <Route path="/new-video" element={<NewVideo />} />
          </Routes>
          <Footer />
        </BackgroundOne>
      </Router>
    </CategoryProvider>
  );
}

export default App;
