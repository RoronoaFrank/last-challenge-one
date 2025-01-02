import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: #1a1410;
  color: #a69276;
  text-align: center;
  padding: 1.2rem 0;
  width: 100%;
  border-top: 1px solid #8b4513;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.3);
`;

const FooterText = styled.p`
  font-family: "Alegreya", serif;
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0.5rem;
    justify-content: center;
  }

  span {
    color: #c9a959;
    font-family: "Cinzel", serif;
  }

  a {
    color: #4a6741;
    text-decoration: none;
    transition: color 0.3s ease;
    margin-left: 0.3rem;

    &:hover {
      color: #c9a959;
    }
  }

  .copyright-info {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>
        <div className="copyright-info">
          <span>Tolkien Gallery</span> © {new Date().getFullYear()}
        </div>
        <div className="copyright-info">
          | Developed by {""}
          <a
            href="https://github.com/tu-usuario"
            target="_blank"
            rel="noopener noreferrer"
          >
            Franck Devv
          </a>
        </div>
      </FooterText>
    </StyledFooter>
  );
};
export default Footer;
