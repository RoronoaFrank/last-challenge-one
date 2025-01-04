import PropTypes from "prop-types";
import styled from "styled-components";

const NotificationContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  
  /* Base styles (mobile-first) */
  display: grid;
  place-items: center;
  gap: 1rem;
  
  /* Usando clamp para responsive sizing sin media queries */
  width: clamp(280px, 90%, 400px);
  padding: clamp(1rem, 5vw, 2rem);
  
  /* Estilos visuales acordes a nuestra temática */
  background-color: #2A2018;
  border: 2px solid #C9A959;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  
  /* Animación de entrada */
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const Message = styled.p`
  margin: 0;
  font-family: "Alegreya", serif;
  /* Usando clamp para texto responsive */
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.5;
  color: #E8DCC4;
  text-align: center;
  /* Asegura que el texto largo se maneje bien */
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

const CloseButton = styled.button`
  /* Grid y Flexbox aseguran centrado perfecto */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Usando clamp para sizing responsive */
  padding: clamp(0.5rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem);
  
  background-color: #4A6741;
  color: #E8DCC4;
  border: none;
  border-radius: 4px;
  font-family: "Alegreya Sans", sans-serif;
  font-size: clamp(0.9rem, 2vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #5B7D52;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Notification = ({ message, buttonText = "Aceptar", onClose }) => {
  return (
    <NotificationContainer>
      <Message>{message}</Message>
      <CloseButton onClick={onClose}>{buttonText}</CloseButton>
    </NotificationContainer>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
