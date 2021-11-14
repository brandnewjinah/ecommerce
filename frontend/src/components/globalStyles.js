import { createGlobalStyle } from "styled-components";
import { typeScale, typeScaleMobile, breakpoint } from "./token";

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
        font-size: ${typeScale.body}
    }
    div#root {
        height: 100%;
    }
    h1 {
        font-weight: 700;
        font-size: ${typeScale.header1};
        line-height: ${typeScale.header1};
        }
    h2 {
        font-weight: 700;
        font-size: ${typeScale.header2};
        line-height: ${typeScale.header2};
    }
    h3 {
        font-weight: 700;
        font-size: ${typeScale.header3};
        line-height: ${typeScale.header3};
    }
    h4 {
        font-weight: 700;
        font-size: ${typeScale.header4};
        line-height: ${typeScale.header4};
    }
    h5 {
        font-weight: 700;
        font-size: ${typeScale.header5};
        line-height: ${typeScale.header5};
    }
    h6 {
        font-weight: 700;
        font-size: ${typeScale.header6};
        line-height: ${typeScale.header6};
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
    h1 {
        font-weight: 700;
        font-size: ${typeScaleMobile.header1};
        line-height: 2.5rem;
        }
    h2 {
        font-weight: 700;
        font-size: ${typeScaleMobile.header2};
        line-height: ${typeScaleMobile.header2};
    }
    h3 {
        font-weight: 700;
        font-size: ${typeScaleMobile.header3};
        line-height: ${typeScaleMobile.header3};
    }
    h4 {
        font-weight: 700;
        font-size: ${typeScaleMobile.header4};
        line-height: ${typeScaleMobile.header4};
    }
    h5 {
        font-weight: 700;
        font-size: ${typeScaleMobile.header5};
        line-height: ${typeScaleMobile.header5};
    }
    h6 {
        font-weight: 700;
        font-size: ${typeScaleMobile.header6};
        line-height: ${typeScaleMobile.header6};
    }
    }
`;

export default GlobalStyle;
