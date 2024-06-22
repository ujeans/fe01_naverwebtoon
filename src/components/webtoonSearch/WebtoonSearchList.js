import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const WebtoonSearchList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");
  const webtoons = location.state?.webtoons || [];

  const [selectedOption, setSelectedOption] = useState(0);
  const [filteredWebtoons, setFilteredWebtoons] = useState([]);

  useEffect(() => {
    setFilteredWebtoons(webtoons.filter(webtoon => !webtoon.isEnd === true));
  }, [webtoons]);

  const handleOptionClick = index => {
    setSelectedOption(index);
  };

  return (
    <Container>
      <Helmet>
        <title>검색 결과 : 네이버 웹툰</title>
      </Helmet>

      <SearchKeywordArea>
        <SearchKeyword>'{keyword}'</SearchKeyword>에 대한 검색결과입니다.
      </SearchKeywordArea>
      <TabControl>
        <Tab
          onClick={() => handleOptionClick(0)}
          isSelected={selectedOption === 0}
        >
          전체({webtoons.length})
        </Tab>
        <Tab
          onClick={() => handleOptionClick(1)}
          isSelected={selectedOption === 1}
        >
          웹툰({webtoons.length})
        </Tab>
        <Tab
          onClick={() => handleOptionClick(2)}
          isSelected={selectedOption === 2}
        >
          베스트도전(0)
        </Tab>
        <Tab
          onClick={() => handleOptionClick(3)}
          isSelected={selectedOption === 3}
        >
          도전만화(0)
        </Tab>
        <Tab
          onClick={() => handleOptionClick(4)}
          isSelected={selectedOption === 4}
        >
          단행본(0)
        </Tab>
        <Tab
          onClick={() => handleOptionClick(5)}
          isSelected={selectedOption === 5}
        >
          만화(0)
        </Tab>
        <Tab
          onClick={() => handleOptionClick(6)}
          isSelected={selectedOption === 6}
        >
          장르소설(0)
        </Tab>
      </TabControl>

      <ContentWrap>
        <Content>
          <ContentHeadArea>
            <ContentHeader>
              <TabName>웹툰</TabName>
              <ResultCount>총 {webtoons.length}</ResultCount>
            </ContentHeader>
          </ContentHeadArea>
          <Result>
            <ResultList>
              {webtoons.map(webtoon => (
                <ResultItemBox key={webtoon._id}>
                  <>
                    <ImageBox>
                      <Image
                        src={webtoon.thumbnail[0]}
                        alt={webtoon.title}
                      ></Image>
                    </ImageBox>
                    <ResultItemInfo>
                      <Title>
                        {webtoon.title.split(keyword).map((part, index) => (
                          <span key={index}>
                            {part}
                            {index <
                              webtoon.title.split(keyword).length - 1 && (
                              <HighlightedKeyword>{keyword}</HighlightedKeyword>
                            )}
                          </span>
                        ))}
                      </Title>
                      <WebtoonInfo>
                        <InfoBox>
                          <AuthorName>{webtoon.authors}</AuthorName> 글/그림
                        </InfoBox>
                        <InfoBox>
                          {filteredWebtoons.includes(webtoon) ? (
                            <span> 연재중</span>
                          ) : (
                            <span> 완결</span>
                          )}
                        </InfoBox>
                      </WebtoonInfo>
                      <TagArea>
                        <TagGroup>
                          <Tag>#판타지</Tag>
                          <Tag>#헌터물</Tag>
                          <Tag>#다크판타지</Tag>
                          <Tag>#소설원작</Tag>
                        </TagGroup>
                      </TagArea>
                    </ResultItemInfo>
                  </>
                </ResultItemBox>
              ))}
            </ResultList>
          </Result>
        </Content>
        {/* <WebtoonAside /> */}
      </ContentWrap>
    </Container>
  );
};

export default WebtoonSearchList;

const Container = styled.div`
  margin-bottom: 100px;
  padding-top: 30px;
  position: relative;
  width: 100%;
  max-width: 1230px;
`;

const SearchKeywordArea = styled.h2`
  display: block;
  align-items: center;
  font-size: 20px;
  width: 840px;
  height: 38px;
  font-weight: bold;
`;

const SearchKeyword = styled.strong`
  color: rgb(0, 220, 100);
  margin-right: 5px;
`;

const TabControl = styled.div`
  display: flex;
  width: 840px;
  border-bottom: ${props => props.theme.borderColor};
`;

const Tab = styled.div`
  display: flex;
  color: ${props => (props.isSelected ? "#00DC64" : "")};
  margin-right: 20px;
  align-items: center;
  border-bottom: ${props => (props.isSelected ? "2px solid #00DC64" : "")};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  line-height: 20px;
  font-weight: bold;
`;

const ContentWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 1190px;
`;

const Content = styled.div`
  display: block;
  width: 840px;
`;

const ContentHeadArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.theme.borderColor};
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  font-weight: bold;
`;

const Result = styled.div``;

const ResultList = styled.ul`
  padding-left: 0px;
`;

const ResultItemBox = styled.li`
  display: flex;
  align-items: start;
  column-gap: 16px;
  margin-top: 20px;
  width: 840px;
  height: 156px;
`;

const ImageBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 120px;
  height: 156px;
  overflow: hidden;
`;

const Image = styled.img`
  cursor: pointer;
  height: 100%;
  width: 100%;
  transform: scale(1);
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.05, 1.05);
    transition-duration: 0.5s;
  }
`;

const ResultItemInfo = styled.div``;

const TabName = styled.h2`
  font-size: 20px;
`;

const ResultCount = styled.span`
  align-items: center;
  color: rgb(102, 102, 102);
  display: flex;
  font-size: 15px;
  margin-left: 5px;
`;

const Title = styled.div`
  margin-bottom: 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  line-height: 25px;
  text-align: left;
`;

const HighlightedKeyword = styled.span`
  color: rgb(0, 220, 100);
`;

const WebtoonInfo = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  color: gray;
`;

const InfoBox = styled.div`
  padding: 0 5px;
  border-right: 1px solid grey;

  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: none;
  }
`;

const AuthorName = styled.span`
  color: ${props => props.theme.fontColor};
`;

const TagArea = styled.div`
  display: block;
  margin-top: 12px;
  height: 30px;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 7px 10px;
  border-radius: 4px;
  background-color: rgb(246, 246, 246);
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
  color: rgb(102, 102, 102);
  cursor: pointer;
`;
