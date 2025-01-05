import PropTypes from "prop-types";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(3px);
  z-index: 999;
  pointer-events: none;
`;

const NotificationContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: grid;
  place-items: center;
  gap: 1rem;
  width: clamp(280px, 90%, 400px);
  padding: clamp(1rem, 5vw, 2rem);
  background-color: #2a2018;
  border: 2px solid #c9a959;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(74, 103, 65, 0.8);

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
  color: #e8dcc4;
  text-align: center;
  /* Asegura que el texto largo se maneje bien */
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: clamp(1rem, 5vw, 4rem);
`;

const Buttons = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.3rem, 2vw, 0.7rem) clamp(0.3rem, 4vw, 0.7rem);
  background-color: ${(props) =>
    props.onClick.name === "onCancel" ? "#8B4513" : "#4A6741"};
  color: #e8dcc4;
  border: none;
  border-radius: 4px;
  font-family: "Alegreya Sans", sans-serif;
  font-size: clamp(0.9rem, 2vw, 1rem);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.onClick.name === "onCancel" ? "#A65D3F" : "#5B7D52"};
    color: #e8dcc4;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Notification = ({
  message,
  buttonText = "Aceptar",
  onClose,
  onCancel,
}) => {
  return (
    <>
      <Overlay />
      <NotificationContainer>
        <Message>{message}</Message>
        <ButtonsContainer>
          <Buttons onClick={onClose}>{buttonText}</Buttons>
          {onCancel && (
            <Buttons className="CancelButton" onClick={onCancel}>
              Cancelar
            </Buttons>
          )}
        </ButtonsContainer>
      </NotificationContainer>
    </>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default Notification;
