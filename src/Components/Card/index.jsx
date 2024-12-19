import React, { useState } from "react";
import styled from "styled-components";
import ModalEditCard from "../ModalEditCard";

const CardContainer = styled.div`
  width: 300px;
  height: 200px;
  background-color: #1e1e2e;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: 70%;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  border-radius: 4px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
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

function Card({ title, image, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <CardContainer>
        <Thumbnail image={image} />
        <Actions>
          <Button onClick={openModal}>Editar</Button>
          <Button onClick={onDelete}>Eliminar</Button>
        </Actions>
      </CardContainer>
      <ModalEditCard isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default Card;
