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
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    console.log("Videos updated:", videos);
  }, [videos]);

  useEffect(() => {
    console.log("Category changed:", category);
  }, [category]);

  useEffect(() => {
    let isMounted = true;
    const fetchVideos = async () => {
      try {
        const response = await Api.get("/");
        // Filtrar los videos por categoría
        const filteredVideos = response.data.filter(
          (video) => video.category === category
        );
        console.log("Fetched videos:", filteredVideos);
        if (isMounted) {
          setVideos(filteredVideos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, [category,fetchTrigger]);

  const handleEditSuccess = (updatedVideo) => {
    console.log("HandleEditSuccess received:", updatedVideo);
    setVideos((prevVideos) => {
      const updatedVideos = prevVideos.map((video) =>
        video.id === updatedVideo.id ? { ...video, ...updatedVideo } : video
      );
      console.log("Updated videos array:", updatedVideos);
      return updatedVideos;
    });
    setFetchTrigger((prev) => !prev);
  };

  const handleDelete = (id) => {
    console.log(`Delete video with ID: ${id}`);
  };

  return (
    <StyledSection>
      <SectionTitle>{category}</SectionTitle>
      <CardContainer>
        {videos.map((video) => (
          <Card
            key={video.id}
            id={video.id}
            image={video.urlImage}
            video={video.urlVideo}
            title={video.title}
            category={video.category}
            description={video.description}
            onEditSuccess={handleEditSuccess}
            onDelete={() => handleDelete(video.id)}
          />
        ))}
      </CardContainer>
    </StyledSection>
  );
}

Section.propTypes = {
  category: PropTypes.string.isRequired,
};

export default Section;
