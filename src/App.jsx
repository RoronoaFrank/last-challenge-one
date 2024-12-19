import GlobalStyles from "./Components/GlobalStyles";
import BackgroundOne from "./Components/Background";
import Header from "./Components/Header";
import Banner from "./Components/Banner";

function App() {
  return (
    <>
      <GlobalStyles />
      <BackgroundOne>
        <Header />
        <Banner />
      </BackgroundOne>
    </>
  );
}

export default App;
