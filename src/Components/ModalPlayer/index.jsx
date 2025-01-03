import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import styled from "styled-components";

const BackdropOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(26, 20, 16, 0.85);
  backdrop-filter: blur(1px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: clamp(20px, 5vh, 45px);
  bottom: clamp(20px, 5vh, 45px);
  left: min(5%, 20%);
  right: min(5%, 20%);
  background-color: rgba(26, 20, 16, 0.95);
  display: grid;
  place-items: center;
  //align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #2a2018;
  padding: clamp(0.5rem, 2vw, 1rem);
  border-radius: 8px;
  border: 1px solid #c9a959;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0 4px 20px rgba(201, 169, 89, 0.2);
`;

const PlayerWrapper = styled.div`
  width: 100%;
  height: 80%;
  justify-self: center;
  overflow: hidden; 
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-height: 0;
`;

const Description = styled.p`
  font-family: "Alegreya", serif;
  color: #e8dcc4;
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.6;
  height: 15%;
  padding: clamp(0.5rem, 2vw, 1rem);
  background-color: rgba(139, 69, 19, 0.1);
  border-radius: 4px;
  border-left: 3px solid #c9a959;
  max-height: min(30vh, 150px);
  overflow-y: auto;

  /* Estilizando scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(42, 32, 24, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c9a959;
    border-radius: 4px;

    &:hover {
      background-color: #e2c792;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(139, 69, 19, 0.2);
    border-radius: 4px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: min(-15px, -2vw);
  right: min(-15px, -2vw);
  width: clamp(24px, 4vw, 30px);
  height: clamp(24px, 4vw, 30px);
  background-color: #8b4513;
  display: grid;
  place-items: center;
  color: #e8dcc4;
  font-size: clamp(0.875rem, 2vw, 1rem);
  font-family: "Alegreya Sans", sans-serif;
  border-radius: 50%;
  border: 1px solid #c9a959;
  transition: all 0.3s ease;

  &:hover {
    background-color: #a65d3f;
    transform: rotate(90deg);
  }
`;

function ModalPlayer({ isOpen, onClose, video, description }) {
    
  if (!isOpen) return null;
  return (
    <BackdropOverlay onClick={onClose}>
      <ModalOverlay>
        <ModalContent onClick={(e) => e.stopPropagation()}>
        <PlayerWrapper>
          <ReactPlayer 
          url={video} 
          controls 
          playing={isOpen}
          width="100%" 
          height="100%" 
        />
          </PlayerWrapper>
          <Description>{description}</Description>
          <CloseButton onClick={onClose}>x</CloseButton>
        </ModalContent>
      </ModalOverlay>
    </BackdropOverlay>
  );
}

ModalPlayer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  video: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ModalPlayer;
