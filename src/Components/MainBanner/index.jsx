import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const BannerWrapper = styled.div`
  width: 100%;
  height: 450px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(201, 169, 89, 0.2);
  border-block: 2px solid #8b4513;
  cursor: pointer;

  &:hover {
    box-shadow: 0 12px 28px rgba(201, 169, 89, 0.3);
  }
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
  left: 0;
  opacity: ${({ $active }) => ($active ? "1" : "0")};
  transform: ${({ $active, $direction }) => 
    $active 
      ? "translateX(0) scale(1)" 
      : `translateX(${$direction === 'next' ? '100%' : '-100%'}) scale(0.85)`
  };
  transition: all 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  filter: ${({ $active }) => ($active ? "brightness(1)" : "brightness(0.5)")};
  background: ${({ $background }) =>
    $background ? `url(${$background})` : "#1A1410"};
  background-position: center;
  background-size: cover;
  color: #e8dcc4;
  padding: 2rem;
  text-align: center;
  z-index: ${({ $active }) => ($active ? "1" : "0")};

  @media (min-width: 768px) {
    background-position: center 30%;
  }

  @media (min-width: 1024px) {
    background-position: center 25%;
  }

  @media (min-width: 1440px) {
    background-position: center 20%;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      transparent 30%,
      rgba(26, 20, 16, 0.6) 100%
    );
    z-index: -1;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $active }) => 
      $active 
        ? 'radial-gradient(circle at center, rgba(201, 169, 89, 0.1), rgba(26, 20, 16, 0.6))'
        : 'none'
    };
    z-index: 1;
    transition: opacity 1.2s ease;
    opacity: ${({ $active }) => ($active ? "1" : "0")};
  }
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  font-family: "Cinzel", sans-serif;
  color: #c9a959;
  margin: 0.5rem 0;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(201, 169, 89, 0.5),
    0 0 20px rgba(201, 169, 89, 0.3);
  letter-spacing: 2px;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(3px);
  padding: 0.5rem 2rem;
  border-radius: 4px;
  background: rgba(26, 20, 16, 0.6);
  border: 1px solid rgba(201, 169, 89, 0.3);

`;

const Description = styled.p`
  font-size: 1.2rem;
  font-family: "Roboto", sans-serif;
  color: #e8dcc4;
  margin: 1rem 0;
  max-width: 80%;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(3px);
  padding: 1rem 2rem;
  background: rgba(26, 20, 16, 0.7);
  border-radius: 4px;
  border: 1px solid rgba(201, 169, 89, 0.2);
  z-index: 2;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 2;
`;

const Button = styled.button`
  background-color: rgba(42, 32, 24, 0.8);
  color: #e8dcc4;
  border: 1px solid #c9a959;
  padding: 0.7rem 1.5rem;
  font-family: "Alegreya Sans", sans-serif;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: #c9a959;
    color: #1a1410;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(201, 169, 89, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

function MainBanner({ cards, validCategories }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [direction, setDirection] = useState('next');

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

      const slidesArray = Object.entries(groupedSlides).map(
        ([category, items]) => {
          const randomItem = items[Math.floor(Math.random() * items.length)];
          return {
            category,
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            background: randomItem.urlImage || randomItem.urlVideo,
          };
        }
      );

      setSlides(slidesArray);
    }
  }, [cards, validCategories]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSlideClick = () => {
    const currentSlide = slides[currentIndex];
    const sectionId = currentSlide.category.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <BannerWrapper onClick={handleSlideClick}>
      {slides.map((slide, index) => (
        <Slide
          key={slide.category}
          $active={index === currentIndex}
          $background={slide.background}
          $direction={direction}
        >
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
