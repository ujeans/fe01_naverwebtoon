import styled from "styled-components";
// components
import WebtoonListFilter from "./WebtoonListFilter";
// assets
import arrowSvg from "../../assets/arrow.svg";

const MonthNewWebtoonUI = () => {
  return (
    <Webtoonbox>
      <Header>
        <Title>이달의 신규 웹툰</Title>
        <MoreWatch>
          신작웹툰 더보기
          <MoreWatchImage src={arrowSvg} alt="화살표 이미지" />
        </MoreWatch>
      </Header>

      <WebtoonListFilter />
    </Webtoonbox>
  );
};

export default MonthNewWebtoonUI;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 5px;
  font-size: 12px;
`;

const Webtoonbox = styled.div`
  width: 1180px;
  height: 331px;
  padding-top: 15px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bolder;
`;

const MoreWatch = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  line-height: 21px;
  font-weight: bold;
  color: ${props => props.theme.boldGrayFontColor};
  cursor: pointer;
`;

const MoreWatchImage = styled.img`
  padding-bottom: 2px;
  width: 18px;
  height: 18px;
  margin-right: 12px;
`;
