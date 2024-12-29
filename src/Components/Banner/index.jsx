import { createContext, useContext, useState, useEffect } from "react";
import { getCards, deleteCard } from '../APIs';
import styled from "styled-components";
import MainBanner from "../MainBanner";
import Section from "../Section";
import { CategoryProvider } from "../CategoryContext";


const BannerContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  padding-top:0.5rem;
  background-color:  #1A1410;
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
      <CategoryProvider categories={categories}>
      <MainBanner cards={cards} />
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
