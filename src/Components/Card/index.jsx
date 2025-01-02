import { useState } from "react";
import { useCardContext } from "../Banner";
import styled from "styled-components";
import ModalPlayer from "../ModalPlayer";
import ModalEditCard from "../ModalEditCard";
import PropTypes from "prop-types";

const CardContainer = styled.div`
  flex: 0 0 320px;
  width: 320px;
  height: 260px;
  background-color: #2a2018;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(74, 103, 65, 0.5);
  display: flex;
  flex-direction: column;
  gap: 0.7%;
  padding: clamp(0.5rem, 2vw, 0.8rem);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #8b4513;
  position: relative;

  /* Tablets: 2 cards por fila */
  @media (min-width: 768px) and (max-width: 1023px) {
    flex: 0 0 calc((100% - 2rem) / 2);
    width: calc((100% - 2rem) / 2);
    max-width: 380px;
  }

  /* Desktop: 3 cards por fila */
  @media (min-width: 1024px) {
    flex: 0 0 calc((100% - 4rem) / 3);
    width: calc((100% - 4rem) / 3);
    max-width: 380px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(74, 103, 65, 0.8);
    border-color: #c9a959;
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 75%;

  &:hover > div:last-child {
    opacity: 1;
    visibility: visible;
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  min-height: 100%;
  background-image: ${({ $image }) => `url(${$image})`};
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  transition: border-color 0.3s;
  cursor: pointer;
`;

const Title = styled.h3`
  height: 10%;
  font-family: "Cinzel", serif;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: #e8dcc4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: clamp(0.3rem, 1vw, 0.4rem) 0;
  letter-spacing: 0.5px;
`;

const Description = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(42, 32, 24, 0.95);
  color: #e8dcc4;
  padding: clamp(0.75rem, 2vw, 1rem);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;
  font-family: "Alegreya", serif;
  font-size: clamp(0.75rem, 2vw, 0.8rem);
  line-height: 1.4;
  border-radius: 6px;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(42, 32, 24, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #C9A959;
    border-radius: 4px;
    
    &:hover {
      background-color: #E2C792;
    }
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(139, 69, 19, 0.2);
    border-radius: 4px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: clamp(0.5rem, 2vw, 1rem);
  margin-top: auto;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.onClick.name === "handleDelete" ? "#8B4513" : "#4A6741"};
  color: #e8dcc4;
  border: none;
  border-radius: 4px;
  padding: clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.75rem, 2vw, 1rem);
  font-family: "Alegreya Sans", sans-serif;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: clamp(70px, 20vw, 80px);

  &:hover {
    background-color: ${(props) =>
      props.onClick.name === "handleDelete" ? "#A65D3F" : "#5B7D52"};
    color: #e8dcc4;
  }

  &:active {
    transform: translateY(0);
  }
`;

function Card({
  id,
  image,
  video,
  title,
  category,
  description,
  onEditSuccess,
}) {
  const { deleteCard } = useCardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPlayerModal = () => setIsPlayerModalOpen(true);
  const closePlayerModal = () => setIsPlayerModalOpen(false);

  const handleCardClick = (event) => {
    // Verifica si el clic no fue en un botón
    if (
      !event.target.closest("button") &&
      !event.target.closest("[data-prevent-click]")
    ) {
      openPlayerModal();
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar la tarjeta "${title}"?`
    );
    if (confirmDelete) {
      deleteCard(id);
    }
  };

  return (
    <>
      <CardContainer onClick={handleCardClick}>
        <ThumbnailWrapper>
          <Thumbnail $image={image} alt={`Imagen descriptiva de: ${title}`} />
          <Description >{description}</Description>
        </ThumbnailWrapper>
        <Title title={title}>{title}</Title>
        <ButtonsContainer>
          <Button onClick={openModal}>Editar</Button>
          <Button onClick={handleDelete}>Eliminar</Button>
        </ButtonsContainer>
      </CardContainer>
      <ModalPlayer
        isOpen={isPlayerModalOpen}
        onClose={closePlayerModal}
        video={video}
        description={description}
      />
      <ModalEditCard
        isOpen={isModalOpen}
        onClose={closeModal}
        id={id}
        title={title}
        category={category}
        image={image}
        video={video}
        description={description}
        onEditSuccess={(updateCard) => {
          onEditSuccess(updateCard);
          closeModal();
        }}
      />
    </>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default Card;
