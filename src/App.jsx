import GlobalStyles from "./Components/GlobalStyles";
import styled from "styled-components";

const BackgroundOne = styled.div`
  background-color: green;
  width: 100%;
  height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <BackgroundOne>
        <h1>Hello perros!</h1>
      </BackgroundOne>
    </>
  );
}

export default App;
