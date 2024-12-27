import { useState, useEffect } from "react";
import BackgroundOne from "../Background";
import styled from "styled-components";
import Api from "../APIs";
import Section from "../Section";
import { CategoryProvider } from "../CategoryContext";

const BannerContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: BackgroundOne;
  height: auto;
`;

function Banner() {
  const categories = [
    "El Silmarillion",
    "Dragones & Tierra Media",
    "Historias individuales",
    "Razas de la Tierra Media",
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
