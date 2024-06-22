import React, { useState, useEffect } from "react";
import styled from "styled-components";
// components
import WebtoonFiltered from "./WebtoonFiltered";
import SkeletonLoader from "../common/SkeletonLoader";

const DaysWebtoonList = ({ webtoons, loading }) => {
  const [currentDay, setCurrentDay] = useState("");

  const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

  useEffect(() => {
    const currentDate = new Date();
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const currentDayIndex = currentDate.getDay();
    setCurrentDay(week[currentDayIndex]);
  }, []);

  const getUpdateDay = day => {
    switch (day) {
      case "월":
        return "MON";
      case "화":
        return "TUE";
      case "수":
        return "WED";
      case "목":
        return "THU";
      case "금":
        return "FRI";
      case "토":
        return "SAT";
      case "일":
        return "SUN";
      default:
        return "";
    }
  };

  return (
    <>
      <Header>
        <Title>요일별 전체 웹툰</Title>
        <WebtoonFiltered setWebtoons={() => {}} />
      </Header>
      <ListWrapper>
        {daysOfWeek.map((day, index) => (
          <ListItems key={index} day={day} currentDay={currentDay}>
            <Days day={day} currentDay={currentDay}>
              {day}요웹툰
            </Days>
            {loading ? (
              <SkeletonLoader width="95%" height="200px" />
            ) : (
              webtoons
                .filter(webtoon => webtoon.updateDays[0] === getUpdateDay(day))
                .map(webtoon => (
                  <ItemBox key={webtoon.id}>
                    <ImageBox>
                      <Image
                        src={webtoon.thumbnail[0]}
                        alt="웹툰 이미지"
                        onClick={() => window.open(webtoon.url, "_blank")}
                      />
                    </ImageBox>
                    <TitleBox>
                      {day === currentDay ? <Upload>UP</Upload> : ""}
                      <WebtoonTitle>{webtoon.title}</WebtoonTitle>
                    </TitleBox>
                  </ItemBox>
                ))
            )}
          </ListItems>
        ))}
      </ListWrapper>
    </>
  );
};

export default DaysWebtoonList;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 130px;
`;

const Title = styled.div`
  margin-right: 20px;
  font-size: 20px;
  font-weight: bolder;
`;

const ListWrapper = styled.div`
  width: 1180px;
  height: fit-content;
  display: flex;
  margin-top: 20px;
  border: ${props => props.theme.borderColor};
`;

const ListItems = styled.div`
  width: 14.2%;
  border-right: ${props => props.theme.borderColor};
  background-color: ${props =>
    props.day === props.currentDay ? "#DAF8E1" : ""};

  &:last-child {
    border: none;
  }
`;

const Days = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px 0;
  font-size: 15px;
  font-weight: bold;
  color: ${props => (props.day === props.currentDay ? "white" : "")};
  background-color: ${props =>
    props.day === props.currentDay ? "#00DC64" : ""};
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 25px 0;
  cursor: pointer;
`;

const ImageBox = styled.div`
  width: 95%;
  height: 200px;
  margin-bottom: 13px;
  border-radius: 4px;
  border: ${props => props.theme.borderColor};
  overflow: hidden;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  transform: scale(1);
  transition-duration: 0.3s;

  &:hover {
    transform: scale(1.05, 1.05);
    transition-duration: 0.5s;
  }
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  margin: 0 5px;
`;

const Upload = styled.div`
  padding: 1.5px;
  margin: 0 4px 0 8px;
  font-size: 8px;
  font-weight: bold;
  color: red;
  border: 1px solid red;
  border-radius: 2px;
`;

const WebtoonTitle = styled.div`
  width: 146px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;
