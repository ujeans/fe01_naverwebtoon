import styled, { keyframes } from "styled-components";

const SkeletonLoader = ({ width, height, count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonWrapper key={index}>
        <SkeletonImage width={width} height={height} />
      </SkeletonWrapper>
    ))}
  </>
);

export default SkeletonLoader;

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkeletonImage = styled.div`
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "100%"};
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200px 100%;
  animation: ${loadingAnimation} 1.5s infinite linear;
  margin-bottom: 13px;
`;
