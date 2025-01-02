import styled from "styled-components";
import PropTypes from "prop-types";

const StylizedButton = styled.button`
background-color: #2A2018;
  transition: all 0.3s ease;
  width: 150px;
  height: 40px;
  border-color: white;
  border-radius: 5%;
  padding: 0.5rem 1rem;

  font-family: 'Alegreya Sans', serif;
  font-size: 1rem;
  color: #E8DCC4;

  &:hover {
    background-color: #4A6741;
    transform: translateY(-2px);
  }
`;

function ButtonsHeader({ children }) {
  return <StylizedButton>{children}</StylizedButton>;
}

ButtonsHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonsHeader;
