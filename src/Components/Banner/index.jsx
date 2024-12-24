import { useState, useEffect } from "react";
import styled from "styled-components";
import Api from "../APIs";
import Section from "../Section";
import { CategoryProvider } from "../CategoryContext";

const BannerContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f4f4f4;
  height: auto;
`;

function Banner() {
  const categories = [
    "Aperturas de Ajedrez",
    "Tácticas de Ajedrez",
    "Grandes Maestros y Partidas Históricas",
    "Ajedrez y Entretenimiento/Curiosidades",
  ];

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await Api.get("/");
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const updateCard = (updateCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === updateCard.id ? { ...card, ...updateCard } : card
      )
    );
  };

  return (
    <CategoryProvider categories={categories}>
      <BannerContainer>
        {categories.map((category) => (
          <Section 
          key={category} 
          category={category} 
          cards={cards.filter((card) => card.category === category)}
          onUpdateCard={updateCard}
          />
        ))}
      </BannerContainer>
    </CategoryProvider>
  );
}

export default Banner;
