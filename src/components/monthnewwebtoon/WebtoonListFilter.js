import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import SkeletonLoader from "../common/SkeletonLoader";

const WebtoonListFilter = () => {
  const [webtoons, setWebtoons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState([]);

  useEffect(() => {
    const fetchWebtoons = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}?service=naver&perPage=3000`
        );
        if (!response.ok) {
          throw new Error("네트워크 응답이 실패했습니다");
        }
        const data = await response.json();

        const newWebtoons = data.webtoons.filter(
          webtoon => webtoon.additional && webtoon.additional.new === true
        );

        const shuffledNewWebtoons = shuffleArray(newWebtoons);
        const latestNewWebtoons = shuffledNewWebtoons.slice(0, 5);

        setWebtoons(latestNewWebtoons);

        preloadImages(latestNewWebtoons.map(webtoon => webtoon.img));
        setLoading(false);
        console.log("로드된 신규 웹툰 목록:", latestNewWebtoons);
      } catch (error) {
        console.error("웹툰 데이터를 불러오는 중 오류 발생:", error);
        setLoading(false);
      }
    };

    fetchWebtoons();
  }, []);

  const shuffleArray = array => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const preloadImages = srcs => {
    const promises = srcs.map(
      src =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        })
    );

    Promise.all(promises)
      .then(() => setPreloadedImages(srcs))
      .catch(err => console.error("이미지 미리 로드 중 오류 발생:", err));
  };

  return (
    <WebtoonListContainer>
      {loading ? (
        <SkeletonLoader width="220px" height="285px" count={5} />
      ) : (
        webtoons.map(webtoon => (
          <BoxContainer key={webtoon._id}>
            <NewIcon>신작</NewIcon>
            <div>
              <TitleLink>
                <WebtoonImage
                  src={webtoon.img}
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
  width: 220px;
  height: 335px;
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
