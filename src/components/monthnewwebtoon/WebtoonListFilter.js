import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import SkeletonLoader from "../common/SkeletonLoader";

const WebtoonListFilter = ({ webtoons, loading }) => {
  const [randomWebtoons, setRandomWebtoons] = useState([]);
  const hasSelectedRandomWebtoons = useRef(false);

  const top40Webtoons = webtoons
    .sort((a, b) => {
      const idA = parseInt(a.id.split("_")[1], 10);
      const idB = parseInt(b.id.split("_")[1], 10);
      return idB - idA;
    })
    .slice(0, 40);

  useEffect(() => {
    if (!loading && !hasSelectedRandomWebtoons.current) {
      setRandomWebtoons(selectRandomWebtoons(top40Webtoons, 5));
      hasSelectedRandomWebtoons.current = true;
    }
  }, [loading, top40Webtoons]);

  const selectRandomWebtoons = (webtoons, count) => {
    const shuffled = [...webtoons].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <WebtoonListContainer>
      {loading ? (
        <SkeletonLoader width="220px" height="285px" count={5} />
      ) : (
        randomWebtoons.map(webtoon => (
          <BoxContainer key={webtoon._id}>
            <NewIcon>신작</NewIcon>
            <div>
              <TitleLink>
                <WebtoonImage
                  src={webtoon.thumbnail[0]}
                  alt="웹툰 이미지"
                  onClick={() => window.open(webtoon.url, "_blank")}
                />
              </TitleLink>
            </div>
            <div>
              <TitleLink
                href={webtoon.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TruncateText>{webtoon.title}</TruncateText>
              </TitleLink>
            </div>
            <div>
              <AuthorLink
                href={webtoon.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TruncateText className="author">{webtoon.author}</TruncateText>
              </AuthorLink>
            </div>
          </BoxContainer>
        ))
      )}
    </WebtoonListContainer>
  );
};

export default WebtoonListFilter;

const WebtoonListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
`;

const BoxContainer = styled.div`
  border: none;
  margin-bottom: 20px;
  position: relative;
`;

const TitleLink = styled.a`
  text-decoration: none;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: #1f1810;
  word-break: break-word;
`;

const AuthorLink = styled.a`
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  color: #1a1a1a;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
`;

const WebtoonImage = styled.img`
  margin-bottom: 5px;
  width: 220px;
  height: 285px;
  border-radius: 5px;
  border: ${props => props.theme.borderColor};
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
`;

const NewIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  background-color: #00dc64;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #002110;
  font-size: 12px;
  font-weight: 1000;
  margin: 7px 0 0 7px;
`;

const TruncateText = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${props => props.theme.fontColor};

  &.author {
    margin-top: 2px;
    font-size: 14px;
    font-weight: 600;
  }
`;

// 스켈레톤 애니메이션
const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;
