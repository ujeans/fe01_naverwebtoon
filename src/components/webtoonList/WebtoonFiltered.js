import React, { useState, useEffect } from "react";
import styled from "styled-components";

const WebtoonFiltered = ({ setWebtoons }) => {
  const [selectedFilter, setSelectedFilter] = useState("popular");
  const [sortOrder, setSortOrder] = useState("desc");
  const [preloadedImages, setPreloadedImages] = useState([]);

  return (
    <FilteredWrapper>
      <OptionWrapper>
        <Option
          // onClick={() => handleOptionClick("popular")}
          selected={selectedFilter === "popular"}
        >
          인기순 <MiddleDot>&bull;</MiddleDot>
        </Option>
        <Option
          // onClick={() => handleOptionClick("update")}
          selected={selectedFilter === "update"}
        >
          최신업로드 <MiddleDot>&bull;</MiddleDot>
        </Option>
        <Option
          // onClick={() => handleOptionClick("rest")}
          selected={selectedFilter === "rest"}
        >
          휴재
        </Option>
      </OptionWrapper>
    </FilteredWrapper>
  );
};

export default WebtoonFiltered;

const FilteredWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Option = styled.div`
  margin: 0 5px;
  color: ${props => (props.selected ? "#00dc64" : "#666666")};
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #00dc64;
  }
`;

const MiddleDot = styled.span`
  color: #b2b2b2;
  margin-left: 8px;
`;
