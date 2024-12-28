import styled from "styled-components";

const MainBannerContainer = styled.div`
width: 100%;
height: 400px;
border: 1px solid #8B4513;
`;

const MainBanner = () => {
  return (
    <MainBannerContainer>
      <h1>Main Banner</h1>
    </MainBannerContainer>
  );
};

export default MainBanner;