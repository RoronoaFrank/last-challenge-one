import styled from "styled-components";
import { Link } from "react-router-dom";
import ButtonsHeader from "../Buttons";

const HeaderContainer = styled.header`
  background-color: #1A1410;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 0 2rem;
`;

const StyledTitle = styled.h1`
  font-family: "Cinzel Decorative", serif;
  font-weight: 600;
  color: #C9A959;
`;

const ButtonContainer = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

function Header() {
  return (
    <HeaderContainer>
      <StyledTitle>Tolkien Gallery</StyledTitle>
      <ButtonContainer>
        <Link to="/">
        <ButtonsHeader>Home</ButtonsHeader>
        </Link>
        <Link to="/new-video">
          <ButtonsHeader>Nuevo Video</ButtonsHeader>
        </Link>
      </ButtonContainer>
    </HeaderContainer>
  );
}

export default Header;
