import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../Card";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #2a2a42;
  margin: 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

function Section({ title }) {
  return (
    <StyledSection>
      <SectionTitle>{title}</SectionTitle>
      <CardContainer>
       <Card/>
       <Card/>
       <Card/>
       <Card/>
      </CardContainer>
    </StyledSection>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Section;

