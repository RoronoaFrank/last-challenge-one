import styled from 'styled-components';

const ResponsiveSvg = styled.svg`
  width: clamp(14px, 3.5vw, 18px);
  height: clamp(14px, 3.5vw, 18px);
  display: block;
  fill: currentColor;
  stroke: currentColor;
  shape-rendering: geometricPrecision;
`;

const PlayIcon = () => (
  <ResponsiveSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
  </ResponsiveSvg>
);

const PauseIcon = () => (
  <ResponsiveSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
    <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
  </ResponsiveSvg>
);

const NextIcon = () => (
  <ResponsiveSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M4 5v14l12 -7z" />
    <path d="M20 5l0 14" />
  </ResponsiveSvg>
);

const PrevIcon = () => (
  <ResponsiveSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M20 5v14l-12 -7z" />
    <path d="M4 5l0 14" />
  </ResponsiveSvg>
);

const CloseIcon = () => (
  <ResponsiveSvg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
  >
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </ResponsiveSvg>
);

const Icons = {
  PlayIcon,
  PauseIcon,
  NextIcon,
  PrevIcon,
  CloseIcon,
};

export default Icons;