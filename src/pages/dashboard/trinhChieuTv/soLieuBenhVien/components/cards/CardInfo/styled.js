import styled from "styled-components";

export const CardInfoStyled = styled.div`
  background: transparent;
  flex-grow: ${({ grow }) => grow || 0};
  width: ${(p) => (p.flex1 ? "auto" : "calc((100%)/ 7)")};
  flex: ${(p) => (p.flex1 ? "1" : "none")};
  padding: 0.41666666666vw;
  @media all and (max-width: 1921px) {
    /* padding: 0.3em; */
  }
  position: relative;
  .card-info-content {
    position: relative;
    /* width: ${(p) => (p.flex1 ? "auto" : "7.890625vw")}; */
    /* background: var(--background); //#000e25 */
    background: #ffffff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    /* border-radius: 0.83333333333vw; */
    border-radius: 6px;
    height: 100%;
    width: 7.890625vw;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    padding: 0.41666666666vw;
    position: relative;
    @media all and (max-width: 1921px) {
      padding: 0.3em;
    }
    :hover {
      transform: scale(0.95);
      transition-duration: 200ms;
    }
    .title {
      font-style: normal;
      font-weight: 900;
      font-size: 0.91145833333vw;
      line-height: 1.25vw;
      color: var(--text); //#ffffff
      @media all and (max-width: 1921px) {
        font-size: 0.75vw;
      }
    }
    .card-unit {
      font-style: normal;
      font-weight: 900;
      font-size: 0.72916666666vw;
      line-height: 0.72916666666vw;
      color: var(--text); //#ffffff
      padding: 0.5em;
    }
    .card-total {
      font-style: normal;
      font-weight: 900;
      font-size: 0.9375vw;
      line-height: 1.35416666667vw;
      /* color: var(--text); //#ffffff */
      color: #1ab69d;
    }
    .card-divider {
      background: #1c75bc;
      width: 100%;
      height: 2px;
      margin: 0.859375vw 0;
    }
    .info {
      flex: 1;
      .label {
        font-weight: 700;
        font-size: 0.9375vw;
        line-height: 1.35416666667vw;
        color: var(--text); //#ffffff
        margin-top: 0.25em;
      }
      .value {
        font-weight: 700;
        font-size: 0.9375vw;
        line-height: 1.35416666667vw;
        /* color: var(--text); //#ffffff */
        color: #1ab69d;
      }
      @media all and (max-width: 2561px) {
        .label,
        .value {
          font-size: 0.9vw;
        }
      }
      @media all and (max-width: 1367px) {
        .label,
        .value {
          font-size: 0.8375vw;
        }
      }
    }
  }
`;
