import React from "react";
import styled from "styled-components";

const Pie = () => {
  return (
    <Donut>
      <div className="donut__slice donut__slice__first"></div>
      <div className="donut__slice donut__slice__second"></div>
      <div className="donut__slice donut__slice__third"></div>
      <div className="donut__slice donut__slice__fourth"></div>
      <div className="donut__slice donut__slice__fifth"></div>
    </Donut>
  );
};

const Donut = styled.div`
  --donut-size: 200px;
  --donut-border-width: 20px;
  --donut-spacing: 0;
  --donut-spacing-color: 255, 255, 255;
  --donut-spacing-deg: calc(1deg * var(--donut-spacing));
  --first: 0.4;
  --second: 0.33;
  --third: 0.12;
  --fourth: 0.08;
  --fifth: 0.07;

  border-radius: 50%;
  height: var(--donut-size);
  margin: 40px;
  position: relative;
  width: var(--donut-size);

  .donut__slice {
    position: absolute;
    height: 100%;
    width: 100%;

    &:before,
    &:after {
      content: "";
      height: 100%;
      width: 100%;
      border: var(--donut-border-width) solid rgba(0, 0, 0, 0);
      border-radius: 50%;
      left: 0;
      position: absolute;
      top: 0;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }

    &:before {
      border-width: calc(var(--donut-border-width) + 1px);
      box-shadow: 0 0 1px 0
        rgba(var(--donut-spacing-color), calc(100 * var(--donut-spacing)));
    }
  }

  .donut__slice__first {
    &:before {
      border-top-color: rgba(
        var(--donut-spacing-color),
        calc(100 * var(--donut-spacing))
      );
      transform: rotate(calc(360deg * 0 + 45deg));
    }

    &:after {
      border-top-color: #ff6838;
      border-right-color: rgba(255, 104, 56, calc(100 * (var(--first) - 0.25)));
      border-bottom-color: rgba(255, 104, 56, calc(100 * (var(--first) - 0.5)));
      border-left-color: rgba(255, 104, 56, calc(100 * (var(--first) - 0.75)));
      transform: rotate(calc(360deg * 0 + 45deg + var(--donut-spacing-deg)));
    }
  }

  /*

  .donut__slice__second {
    --second-start: calc(var(--first));
    --second-check: max(calc(var(--second-start) - 0.5), 0);
    -webkit-clip-path: inset(
      0 calc(50% * (var(--second-check) / var(--second-check))) 0 0
    );
    clip-path: inset(
      0 calc(50% * (var(--second-check) / var(--second-check))) 0 0
    );
    &:before {
      border-top-color: rgba(
        var(--donut-spacing-color),
        calc(100 * var(--donut-spacing))
      );
      -webkit-transform: rotate(calc(360deg * var(--second-start) + 45deg));
      transform: rotate(calc(360deg * var(--second-start) + 45deg));
    }

    &:after {
      border-top-color: #ffc820;
      border-right-color: rgba(
        255,
        200,
        32,
        calc(100 * (var(--second) - 0.25))
      );
      border-bottom-color: rgba(
        255,
        200,
        32,
        calc(100 * (var(--second) - 0.5))
      );
      border-left-color: rgba(255, 200, 32, calc(100 * (var(--second) - 0.75)));
      -webkit-transform: rotate(
        calc(360deg * var(--second-start) + 45deg + var(--donut-spacing-deg))
      );
      transform: rotate(
        calc(360deg * var(--second-start) + 45deg + var(--donut-spacing-deg))
      );
    }
  }

  .donut__slice__third {
    --third-start: calc(var(--first) + var(--second));
    --third-check: max(calc(var(--third-start) - 0.5), 0);
    -webkit-clip-path: inset(
      0 calc(50% * (var(--third-check) / var(--third-check))) 0 0
    );
    clip-path: inset(
      0 calc(50% * (var(--third-check) / var(--third-check))) 0 0
    );

    &:before {
      border-top-color: rgba(
        var(--donut-spacing-color),
        calc(100 * var(--donut-spacing))
      );
      -webkit-transform: rotate(calc(360deg * var(--third-start) + 45deg));
      transform: rotate(calc(360deg * var(--third-start) + 45deg));
    }
    &:after {
      border-top-color: #97c95c;
      border-right-color: rgba(151, 201, 92, calc(100 * (var(--third) - 0.25)));
      border-bottom-color: rgba(151, 201, 92, calc(100 * (var(--third) - 0.5)));
      border-left-color: rgba(151, 201, 92, calc(100 * (var(--third) - 0.75)));
      -webkit-transform: rotate(
        calc(360deg * var(--third-start) + 45deg + var(--donut-spacing-deg))
      );
      transform: rotate(
        calc(360deg * var(--third-start) + 45deg + var(--donut-spacing-deg))
      );
    }
  }

  .donut__slice__fourth {
    --fourth-start: calc(var(--first) + var(--second) + var(--third));
    --fourth-check: max(calc(var(--fourth-start) - 0.5), 0);
    -webkit-clip-path: inset(
      0 calc(50% * (var(--fourth-check) / var(--fourth-check))) 0 0
    );
    clip-path: inset(
      0 calc(50% * (var(--fourth-check) / var(--fourth-check))) 0 0
    );

    &:before {
      border-top-color: rgba(
        var(--donut-spacing-color),
        calc(100 * var(--donut-spacing))
      );
      -webkit-transform: rotate(calc(360deg * var(--fourth-start) + 45deg));
      transform: rotate(calc(360deg * var(--fourth-start) + 45deg));
    }
    &:after {
      border-top-color: #1cb2f6;
      border-right-color: rgba(
        28,
        178,
        246,
        calc(100 * (var(--fourth) - 0.25))
      );
      border-bottom-color: rgba(
        28,
        178,
        246,
        calc(100 * (var(--fourth) - 0.5))
      );
      border-left-color: rgba(28, 178, 246, calc(100 * (var(--fourth) - 0.75)));
      -webkit-transform: rotate(
        calc(360deg * var(--fourth-start) + 45deg + var(--donut-spacing-deg))
      );
      transform: rotate(
        calc(360deg * var(--fourth-start) + 45deg + var(--donut-spacing-deg))
      );
    }
  }

  .donut__slice__fifth {
    --fifth-start: calc(
      var(--first) + var(--second) + var(--third) + var(--fourth)
    );
    --fifth-check: max(calc(var(--fifth-start) - 0.5), 0);
    -webkit-clip-path: inset(
      0 calc(50% * (var(--fifth-check) / var(--fifth-check))) 0 0
    );
    clip-path: inset(
      0 calc(50% * (var(--fifth-check) / var(--fifth-check))) 0 0
    );

    &:before {
      border-top-color: rgba(
        var(--donut-spacing-color),
        calc(100 * var(--donut-spacing))
      );
      -webkit-transform: rotate(calc(360deg * var(--fifth-start) + 45deg));
      transform: rotate(calc(360deg * var(--fifth-start) + 45deg));
    }
    &:after {
      border-top-color: #1685b8;
      border-right-color: rgba(22, 133, 184, calc(100 * (var(--fifth) - 0.25)));
      border-bottom-color: rgba(22, 133, 184, calc(100 * (var(--fifth) - 0.5)));
      border-left-color: rgba(22, 133, 184, calc(100 * (var(--fifth) - 0.75)));
      -webkit-transform: rotate(
        calc(360deg * var(--fifth-start) + 45deg + var(--donut-spacing-deg))
      );
      transform: rotate(
        calc(360deg * var(--fifth-start) + 45deg + var(--donut-spacing-deg))
      );
    }
  } */
`;
export default Pie;
