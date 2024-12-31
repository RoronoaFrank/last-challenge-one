import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BannerWrapper = styled.div`
  width: 100%;
  height: 450px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: ${({ $active }) => ($active ? "0" : "100%")};
  transition: all 0.5s ease-in-out;
  background: ${({ $background }) =>
    $background ? `url(${$background}) no-repeat center/cover` : "#333"};
  color: white;
  padding: 1.5rem;
  text-align: center;
`;


const CategoryTitle = styled.h2`
  font-size: 2rem;
  font-family: "Cinzel", sans-serif;
  color: #c9a959;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  font-size: 1rem;
  font-family: "Roboto", sans-serif;
  color: #f5f5f5;
  margin: 0;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

function MainBanner({ cards, validCategories }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    if (cards.length > 0) {
      const groupedSlides = cards.reduce((acc, card) => {
        const { category } = card;
        if (validCategories.includes(category)) {
          if (!acc[category]) acc[category] = [];
          acc[category].push(card);
        }
        return acc;
      }, {});

      const slidesArray = Object.entries(groupedSlides).map(([category, items]) => {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        return {
          category,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          background: randomItem.urlImage || randomItem.urlVideo,
        };
      });

      setSlides(slidesArray);
    }
  }, [cards, validCategories]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <BannerWrapper>
      {slides.map((slide, index) => (
        <Slide 
        key={slide.category} 
        $active={index === currentIndex} 
        $background={slide.background}>
          <CategoryTitle>{slide.category}</CategoryTitle>
          <Description>{slide.description}</Description>
        </Slide>
      ))}
      <Controls>
        <Button onClick={prevSlide}>{"<"}</Button>
        <Button onClick={nextSlide}>{">"}</Button>
      </Controls>
    </BannerWrapper>
  );
}

MainBanner.propTypes = {
  cards: PropTypes.array.isRequired,
  validCategories: PropTypes.array.isRequired,
};

export default MainBanner;
