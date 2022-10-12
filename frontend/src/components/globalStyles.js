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
    
    @media ${breakpoint.lg} {
    
    }
`;

export default GlobalStyle;
