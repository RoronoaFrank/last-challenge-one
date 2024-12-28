import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #1A1410;
  color: #A69276;
  text-align: center;
  padding: 1.2rem 0;
  width: 100%;
  border-top: 1px solid #8B4513;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.3);
`;

const FooterText = styled.p`
  font-family: "Alegreya", serif;
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.5px;

  span {
    color: #C9A959;
    font-family: "Cinzel", serif;
  }

  a {
    color: #4A6741;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #C9A959;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>
        <span>Tolkien Gallery</span> © {new Date().getFullYear()} | Developed by {""}
        <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer">
          Franck Devv
        </a>
      </FooterText>
    </StyledFooter>
  );
};

export default Footer;
