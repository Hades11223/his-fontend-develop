import styled from "styled-components";

export const CardFrameStyled = styled.div`
  position: relative;
  background: transparent;
  height: 100%;
  display: flex;
  .content-wrap {
    padding: calc(8 / 3840 * 100vw);
    background: transparent;
    width: 100%;
    height: 100%;
    .border-wrap {
      border: 1px solid var(--border); //#56ccf2;
      border-radius: calc(32 / 3840 * 100vw);
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .title {
        font-weight: 900;
        font-size: calc(50 / 3840 * 100vw);
        line-height: calc(68 / 3840 * 100vw);
        display: flex;
        align-items: center;
        text-align: center;
        color: var(--text); //#ffffff;
        width: 100%;
        justify-content: center;
        padding: 0;
      }
      .card-list {
        padding: 0 calc(16 / 3840 * 100vw);
        display: flex;
        flex-direction: ${({ isVerticle }) => (isVerticle ? "row" : "column")};
        height: 100%;
        width: 100%;
        .card-item {
          flex: 1;
          display: flex;
        }
      }
    }
  }
`;
