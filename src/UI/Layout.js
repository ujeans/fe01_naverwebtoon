import React from "react";
import styled from "styled-components";
import Toggle from "./Toggle";
import { useTheme } from "../context/themeProvider";
import WebtoonHeader from "../components/webtoonHeader/WebtoonHeader";
import WebtoonCategoryHeader from "../components/webtoonHeader/WebtoonCategoryHeader";

const Layout = ({ children }) => {
  const [ThemeMode, toggleTheme] = useTheme();
  return (
    <>
      <Container>
        <Wrapper>
          <WebtoonHeader />
          <WebtoonCategoryHeader />
          {children}
        </Wrapper>
      </Container>
      <Toggle toggle={toggleTheme} mode={ThemeMode}>
        DarkMode
      </Toggle>
    </>
  );
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1180px;
  height: 100%;
`;
