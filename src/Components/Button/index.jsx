import styled from "styled-components";
import PropTypes from "prop-types";

const StylizedButton = styled.button`
background-color: #1A2332;
  transition: all 0.3s ease;
  width: 150px;
  height: 40px;
  border-color: white;
  border-radius: 5%;

  font-family: 'DM Sans', serif;
  color: #FFFFFF;

  &:hover {
    background-color: #00FF94;
    transform: translateY(-2px);
    color: #0F1624;
  }
`;

function Button({ children }) {
  return <StylizedButton>{children}</StylizedButton>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
