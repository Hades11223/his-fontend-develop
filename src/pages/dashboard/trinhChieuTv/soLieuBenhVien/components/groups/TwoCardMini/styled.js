import styled from "styled-components";

export const TwoCardInfoMiniStyled = styled.div`
  background: transparent;
  flex-grow: ${({ grow }) => grow || 0};
  height: calc(100% - 2em);
  width: calc(100% / ${({ numCard }) => numCard || 0});
  margin-top: 10px;
  .two-card-content {
    height: 100%;
    display: flex;
    flex-direction: ${({ isVertical }) => (isVertical ? "column" : "row")};
    gap: 10px;
    > div {
      display: flex;
      flex-direction: column;
      flex: 1 0 45%;
      /* margin-right: calc(100vw / 3840 * 8);
      margin-bottom: calc(100vw / 3840 * 8); */
      margin: 0;
      /* background: var(--background); //#000e25 */
      background: #ffffff;
      /* border-radius: 0.83333333333vw; */
      border-radius: 6px;
      > div {
        :nth-of-type(2) {
          justify-content: flex-end;
          margin-bottom: 2rem;
        }
      }
    }
  }
`;
