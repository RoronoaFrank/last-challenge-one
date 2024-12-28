import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../Card";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #1A1410;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-family: "Cinzel", sans-serif;
  font-size: 1.5rem;
  color: #C9A959;
  margin: 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function Section({ category, cards, onUpdateCard }) {
  return (
    <StyledSection>
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
