import { createGlobalStyle } from "styled-components";

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
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: white;
        font-size: 1.05rem;
        line-height: 1.875rem;
        font-weight: 400;
    }
    h1 {
        font-weight: 600;
        font-size: 3.25rem;
        line-height: 2.375rem;
    }
    h2 {
        font-weight: 500;
        font-size: 2.4rem;
        line-height: 3.4rem;
    }
    h3 {
        font-weight: 500;
        font-size: 2rem;
        line-height: 3.5rem;
    }
    h4 {
        font-weight: 500;
        font-size: 1.5rem;
    }

    h5 {
        font-weight: 500;
        font-size: 1.35rem;
    }

    h6 {
        font-weight: 400;
        font-size: 1.05rem;
    }

    ul {
        list-style-position: inside;
        text-indent:-20px;
    }

    li {
        margin-left: 20px;
        margin-right: 20px;
    }

    a {
        /* display: inline-block; */
        text-decoration: none;
        text-decoration-skip-ink: auto;
        color: inherit;
        cursor: pointer;
        transition: opacity 0.2s ease-in-out;
 
        &:hover,
        &:focus {
          outline: 0;
          opacity: 0.5;
        }
    }
    code {
        font-size: 1.125rem;
        background-color: #edf2f7;
        padding: 0 .5rem;
    }
  
`;

export default GlobalStyle;
