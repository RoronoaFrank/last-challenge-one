import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../Card";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 1.5rem);
  background-color: #1A1410;
  border-radius: 8px;
  padding: clamp(0.75rem, 2vw, 1rem);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  scroll-margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: "Cinzel Decorative", sans-serif;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: #C9A959;
  text-align: left;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 4px;
    height: 70%;
    background: #8B4513;
    transform: translateY(-50%);
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;

  /* Centrado solo en móvil */
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

function Section({ category, cards, onUpdateCard }) {
  const sectionId = category.toLowerCase().replace(/\s+/g, '-');

  return (
    <StyledSection id={sectionId}>
      <SectionTitle>{category}</SectionTitle>
      <CardContainer>
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.urlImage}
            video={card.urlVideo}
            title={card.title}
            category={card.category}
            description={card.description}
            onEditSuccess={onUpdateCard}
          />
        ))}
      </CardContainer>
    </StyledSection>
  );
}

Section.propTypes = {
  category: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  onUpdateCard: PropTypes.func.isRequired,
};

export default Section;
