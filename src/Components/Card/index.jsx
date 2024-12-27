import { useState } from "react";
import { useCardContext } from "../Banner";
import styled from "styled-components";
import ModalEditCard from "../ModalEditCard";
import PropTypes from "prop-types";

const CardContainer = styled.div`
  width: 430px;
  height: 320px;
  background-color: #2a2018;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(74, 103, 65, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.5%;
  padding: 0.5rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  min-height: 70%;
  background-image: ${({ $image }) => `url(${$image})`};
  background-size: cover;
  background-position: center;
  border-radius: 4px;
`;

const Title = styled.h3`
  height: 10%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
const Description = styled.p`
  font-family: "Courier New", Courier, monospace;
  font-size: 0.7rem;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 10%;
  margin: 0;
  margin: 0;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  bottom: 0%;
`;

const Button = styled.button`
  background-color: #2a2a42;
  color: #e2c792;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e2c792;
    color: #2a2a42;
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <CardContainer>
        <Thumbnail $image={image} alt={`Imagen descriptiva de: ${title}`} />
        <Title title={title}>{title}</Title>
        <Description title={description}>{description}</Description>
        <ButtonsContainer>
          <Button onClick={openModal}>Editar</Button>
          <Button onClick={handleDelete}>Eliminar</Button>
        </ButtonsContainer>
      </CardContainer>
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
