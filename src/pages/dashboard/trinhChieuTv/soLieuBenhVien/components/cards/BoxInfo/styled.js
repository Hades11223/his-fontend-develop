import styled from "styled-components";

export const CardInfoStyled = styled.div`
  background: transparent;
  flex-grow: ${({ grow }) => grow || 0};
  width: ${(p) => (p.flex1 ? "auto" : "calc(100% / 7)")};
  flex: ${(p) => (p.flex1 ? "1" : "none")};
  padding: 0.41666666666vw 0 0.41666666666vw 0.41666666666vw;

  position: relative;
  .box-info-content {
    /* background: red; */
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-direction: column;
    gap: 0.41666666666vw;

    .info-content {
      padding: 0.41666666666vw;
      border-radius: 0.83333333333vw;
      background: var(--background); //#000e25
      flex: 1;
      color: #fff;
      @media all and (max-width: 1921px) {
        padding: 0.3vw;
      }
      :hover {
        transform: scale(0.95);
        transition-duration: 200ms;
      }
      /* .label {
      font-style: normal;
      font-weight: 900;
      font-size: 0.91145833333vw;
      line-height: 1.25vw;
      color: var(--text); //#ffffff
      @media all and (max-width: 1921px) {
        font-size: 0.75vw;
      }
    } */
      .label {
        font-weight: 700;
        font-size: 0.9375vw;
        line-height: 1.35416666667vw;
        color: var(--text); //#ffffff
        margin-top: 0.25em;
      }
      .value {
        font-weight: 400;
        font-size: 0.9375vw;
        line-height: 1.35416666667vw;
        color: var(--text); //#ffffff
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
