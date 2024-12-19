import styled from "styled-components";
import Section from "../Section";

const BannerContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f4f4f4;
  height: auto;
`;

function Banner() {
  return (
    <BannerContainer>
      <Section title="Aperturas de Ajedrez" />
      <Section title="Tácticas de Ajedrez" />
      <Section title="Grandes Maestros y Partidas Históricas" />
      <Section title="Ajedrez y Entretenimiento/Curiosidades" />
    </BannerContainer>
  );
}

export default Banner;
