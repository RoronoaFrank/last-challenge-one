import styled from "styled-components";
import { Link } from "react-router-dom";
import ButtonsHeader from "../Buttons";

const HeaderContainer = styled.header`
  background-color: #1a1410;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 1rem 2rem;
  gap: 2rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-items: center;
    padding: 0.5rem;
    gap: 1rem;
  }
`;

const StyledTitle = styled.h1`
  font-family: "Cinzel Decorative", serif;
  font-weight: 600;
  color: #c9a959;
  font-size: 1.5rem;
  margin: 0;

  @media (max-width: 767px) {
    font-size: 1.2rem;
    padding: 1rem;
    text-align: center;
  }
`;

const ButtonContainer = styled.nav`
  align-items: center;
  display: flex;
  gap: 1rem;

  @media (max-width: 767px) {
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }
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
