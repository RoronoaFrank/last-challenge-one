import { useState, useEffect } from "react";
import useCategoryContext from "../CustomHooks/useCategoryContext";
import styled from "styled-components";
import IconsBanner from "./IconsBanner";

const BannerWrapper = styled.div`
  width: 100%;
  min-height: min(450px, 80vh);

  @media (min-width: 768px) {
    height: min(450px, 60vh);
  }
  position: relative;
  overflow: hidden;
  border-radius: clamp(8px, 1vw, 12px);
  box-shadow: 0 clamp(4px, 1vw, 8px) clamp(12px, 2vw, 24px)
    rgba(201, 169, 89, 0.2);
  border-block: clamp(1px, 0.2vw, 2px) solid #8b4513;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 clamp(6px, 1.5vw, 12px) clamp(14px, 2.5vw, 28px)
      rgba(201, 169, 89, 0.3);
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
      : `translateX(${$direction === "next" ? "100%" : "-100%"}) scale(0.85)`};
  transition: all 1.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  filter: ${({ $active }) => ($active ? "brightness(1)" : "brightness(0.5)")};
  background: ${({ $background }) =>
    $background ? `url(${$background})` : "#1A1410"};
  background-position: center;
  background-size: cover;
  color: #e8dcc4;
  padding: clamp(1rem, 2vw, 2.5rem);
  text-align: center;
  z-index: ${({ $active }) => ($active ? "1" : "0")};

  @media (min-width: 768px) {
    background-position: center clamp(20%, 30vh, 30%);
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
      transparent clamp(20%, 3vw, 30%),
      rgba(26, 20, 16, 0.6) 100%
    );
    z-index: -1;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $active }) =>
      $active
        ? "radial-gradient(circle at center, rgba(201, 169, 89, 0.1), rgba(26, 20, 16, 0.6))"
        : "none"};
    z-index: 1;
    transition: opacity 1.2s ease;
    opacity: ${({ $active }) => ($active ? "1" : "0")};
  }
`;

const CategoryTitle = styled.h2`
  font-size: clamp(1.5rem, 1.2rem + 2vw, 2.5rem);
  font-family: "Cinzel", sans-serif;
  color: #c9a959;
  margin: clamp(0.3rem, 0.5vw, 0.8rem) 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(201, 169, 89, 0.5),
    0 0 20px rgba(201, 169, 89, 0.3);
  letter-spacing: clamp(1px, 0.15vw, 2.5px);
  position: relative;
  z-index: 2;
  backdrop-filter: blur(3px);
  padding: clamp(0.3rem, 1vw, 0.8rem) clamp(1rem, 2vw, 2.5rem);
  border-radius: 4px;
  background: rgba(26, 20, 16, 0.6);
  border: 1px solid rgba(201, 169, 89, 0.3);
`;

const Description = styled.p`
  font-size: clamp(1rem, 0.95rem + 0.5vw, 1.3rem);
  font-family: "Roboto", sans-serif;
  color: #e8dcc4;
  margin: clamp(0.5rem, 1vw, 1.2rem) 0;
  max-width: min(80%, 800px);
  line-height: clamp(1.4, 1.5 + 0.2vw, 1.7);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(3px);
  padding: clamp(0.8rem, 1vw, 1.2rem) clamp(1rem, 2vw, 2.5rem);
  background: rgba(26, 20, 16, 0.7);
  border-radius: 4px;
  border: 1px solid rgba(201, 169, 89, 0.2);
  z-index: 2;
`;

const Controls = styled.div`
  position: absolute;
  bottom: clamp(10px, 3vw, 25px);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 clamp(1rem, 2vw, 2.5rem);
  z-index: 2;
  gap: clamp(0.5rem, 1vw, 1.5rem);
`;

const Button = styled.button`
  background-color: rgba(42, 32, 24, 0.8);
  color: #e8dcc4;
  border: 1px solid #c9a959;
  padding: clamp(0.5rem, 0.7vw, 0.9rem) clamp(1rem, 1.5vw, 2rem);
  font-family: "Alegreya Sans", sans-serif;
  font-size: clamp(0.9rem, 0.85rem + 0.3vw, 1.1rem);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: clamp(0.5px, 0.1vw, 1.2px);

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

function MainBanner() {
  const { categories } = useCategoryContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isPaused, setIsPaused] = useState(false);
  const { PlayIcon, PauseIcon, NextIcon, PrevIcon } = IconsBanner;

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [categories.length, isPaused]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };
  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  const pauseSlider = (e) => {
    e.stopPropagation();
    setIsPaused(true);
  };

  const resumeSlider = (e) => {
    e.stopPropagation();
    setIsPaused(false);
  };

  const handleSlideClick = () => {
    const currentCategory = categories[currentIndex];
    const sectionId = currentCategory.name.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <BannerWrapper onClick={handleSlideClick}>
      {categories.map((category, index) => (
        <Slide
          key={category.name}
          $active={index === currentIndex}
          $background={category.image}
          $direction={direction}
        >
          <CategoryTitle>{category.name}</CategoryTitle>
          <Description>{category.description}</Description>
        </Slide>
      ))}
      <Controls>
        <Button onClick={prevSlide}>
          <PrevIcon />
        </Button>
        {!isPaused ? (
          <Button onClick={pauseSlider}>
            <PauseIcon />
          </Button>
        ) : (
          <Button onClick={resumeSlider}>
            <PlayIcon />
          </Button>
        )}
        <Button onClick={nextSlide}>
          <NextIcon />
        </Button>
      </Controls>
    </BannerWrapper>
  );
}

export default MainBanner;
