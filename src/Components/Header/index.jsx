import styled from "styled-components";
import { Link } from "react-router-dom";
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

const ButtonContainer = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <StyledTitle>Chess Gallery</StyledTitle>
      <ButtonContainer>
        <Link to="/">
        <Button>Home</Button>
        </Link>
        <Link to="/new-video">
          <Button>Nuevo Video</Button>
        </Link>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
