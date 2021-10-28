import React, { FC } from "react";
import styled from "styled-components";
import colors from "../Colors";

export interface Props {
  padding?: string;
  className?: string;
}

type StyleProps = {
  padding?: string | undefined;
};

export const Wrapper: FC<Props> = ({ children, padding, className }) => {
  return (
    <WrapperContainer padding={padding} className={className}>
      {children}
    </WrapperContainer>
  );
};

const WrapperContainer = styled.div<StyleProps>`
  width: 100%;
  height: 100%;

  .flex {
    display: flex;
  }

  .flexAignCenter {
    display: flex;
    align-items: center;
  }

  .flexSpaceBetween {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flexCenter {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flexOne {
    flex: 1;
  }

  .flexFour {
    flex: 4;
  }

  .four {
    flex: 0 0 39.5%;
  }

  .five {
    flex: 0 0 49.5%;
  }

  .bold {
    font-weight: 600;
  }

  .rightAlign {
    text-align: right;
  }

  .pageTitle {
    margin-bottom: 1rem;
  }

  .mr025 {
    margin-right: 0.25rem;
  }
`;

export default Wrapper;
