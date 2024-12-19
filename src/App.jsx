import GlobalStyles from "./Components/GlobalStyles";
import BackgroundOne from "./Components/Background";
import Header from "./Components/Header";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <GlobalStyles />
      <BackgroundOne>
        <Header />
        <Banner />
        <Footer/>
      </BackgroundOne>
    </>
  );
}

export default App;
