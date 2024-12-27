import { createContext, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Api from "../APIs";
import Section from "../Section";
import { CategoryProvider } from "../CategoryContext";

const BannerContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #1a1410;
  height: auto;
`;

const CardContext = createContext();

export function useCardContext() {
  return useContext(CardContext);
}

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

  const deleteCard = async (id) => {
    try {
      await Api.delete(`/${id}`);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      console.log(`Card with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const updateCard = (updateCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === updateCard.id ? { ...card, ...updateCard } : card
      )
    );
  };

  return (
    <CardContext.Provider value={{ deleteCard }}>
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
    </CardContext.Provider>
  );
}

export default Banner;
