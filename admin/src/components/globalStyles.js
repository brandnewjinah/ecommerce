import { createGlobalStyle } from "styled-components";
import { breakpoint, fontSize } from "./token";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    width: 100%;
    height: 100%;
  }

  body {
    height: 100%;
    font-size: ${fontSize.base}
  }

  div#root {
    height: 100%;
  }
    
  ul {
    list-style: none;
  }

  li {
    list-style-type: none;
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    cursor: pointer;
  }

  .flexHalf {
    flex: 0.5;
  }

  .flexOne {
    flex: 1;
  }

  .flexTwo {
    flex: 2;
  }

  .flexThree {
    flex: 3;
  }

  .flexFour {
    flex: 4;
  }

  .flexFive {
    flex: 5;
  }

  .flexSix {
    flex: 6;
  }

  .flexSeven {
    flex: 7;
  }

  .flexEight {
    flex: 8;
  }

  .flexNine {
    flex: 9;
  }

  .flexTen {
    flex: 10;
  }
    
    @media ${breakpoint.lg} {
    
    }
`;

export default GlobalStyle;
