import { createContext, useContext, useState, useEffect } from "react";
import useCategoryContext from "../CustomHooks/useCategoryContext";
import { getCards, deleteCard } from "../APIs";
import styled from "styled-components";
import MainBanner from "../MainBanner";
import Section from "../Section";

const BannerContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  padding-top: 0.5rem;
  background-color: #1a1410;
  height: auto;
`;

const CardContext = createContext();

export function useCardContext() {
  return useContext(CardContext);
}

function Banner() {
  const [cards, setCards] = useState([]);
  const { categories } = useCategoryContext();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handleDeleteCard = async (id) => {
    try {
      await deleteCard(id); // Usamos la función centralizada para eliminar
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
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
    <CardContext.Provider value={{ deleteCard: handleDeleteCard }}>
      <MainBanner
        cards={cards}
        validCategories={categories.map((category) => category.name)}
      />
      <BannerContainer>
        {categories.map((category) => (
          <Section
            key={category.name}
            category={category.name}
            cards={cards.filter((card) => card.category === category.name)}
            onUpdateCard={updateCard}
          />
        ))}
      </BannerContainer>
    </CardContext.Provider>
  );
}

export default Banner;
