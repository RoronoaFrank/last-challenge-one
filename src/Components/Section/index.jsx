import { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Card from "../Card";
import Api from "../APIs";

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

function Section({ category }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await Api.get("/");
        // Filtrar los videos por categoría
        const filteredVideos = response.data.filter(
          (video) => video.categoria === category
        );
        setVideos(filteredVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [category]);

  return (
    <StyledSection>
      <SectionTitle>{category}</SectionTitle>
      <CardContainer>
        {videos.map((video) => (
          <Card
            key={video.id}
            imagen={video.urlImagen}
            titulo={video.titulo}
            descripcion={video.descripcion}
            onDelete={() => handleDelete(video.id)}
          />
        ))}
      </CardContainer>
    </StyledSection>
  );
};

const handleDelete = (id) => {
  console.log(`Delete video with ID: ${id}`);
};

Section.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Section;
