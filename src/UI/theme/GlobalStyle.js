import { createGlobalStyle } from "styled-components"; // 글로벌 스타일 적용을 도와주는 styled-components내장 메서드
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}
@font-face {
    font-family: 'YourFontFamily';
    src: url('/path/to/your-font.woff2') format('woff2');
    font-display: swap;
  }
  
body {
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};
  font-family: 'YourFontFamily', sans-serif;
}
`;
