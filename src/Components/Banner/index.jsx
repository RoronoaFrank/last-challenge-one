import styled from "styled-components";
import Section from "../Section";
import { CategoryProvider } from "../CategoryContext";

const BannerContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f4f4f4;
  height: auto;
`;

function Banner() {
  const categories = [
    "Aperturas de Ajedrez",
    "Tácticas de Ajedrez",
    "Grandes Maestros y Partidas Históricas",
    "Ajedrez y Entretenimiento/Curiosidades",
  ];

  return (
    <CategoryProvider categories={categories}>
      <BannerContainer>
        {categories.map((category) => (
          <Section key={category} title={category} />
        ))}
      </BannerContainer>
    </CategoryProvider>
  );
}

export default Banner;
