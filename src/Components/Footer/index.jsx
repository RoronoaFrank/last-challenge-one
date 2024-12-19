import styled from "styled-components";

const StyledFooter = styled.footer`
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 1rem 0;
  font-size: 0.9rem;
  position: relative;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>
        Chess Gallery © {new Date().getFullYear()} | Developed by Franck Devv
      </p>
    </StyledFooter>
  );
};

export default Footer;
