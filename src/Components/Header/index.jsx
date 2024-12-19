import styled from "styled-components";
import Button from "../Button";

const HeaderContainer = styled.header`
  background-color: #0f1624;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 0 2rem;
`;

const StyledTitle = styled.h1`
  font-family: "Space Grotesk", serif;
  font-weight: 600;
  color: #FFFFFF;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <StyledTitle>Chess Gallery</StyledTitle>
      <ButtonContainer>
        <Button>Home</Button>
        <Button>Nuevo video</Button>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
