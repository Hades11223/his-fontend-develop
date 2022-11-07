import styled from "styled-components";

export const MultipleMiniCardStyled = styled.div`
  position: relative;
  background: transparent;
  padding: calc(100vw / 3840 * 8);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .cards-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 calc(100vw / 3840 * 8);
    @media all and (max-width: 1367px) {
      margin: 0;
    }
    border-left: solid 2px var(--border); //#56ccf2;
    > div {
      flex: 1;
      border-top: solid 2px var(--border); //#56ccf2;
      margin-left: calc(100vw / 3840 * 8);
      @media all and (max-width: 1367px) {
        margin-left: 5px;
      }
      > div {
        width: 100%;
        height: 100%;
      }
    }
    > div:first-child {
      border-top: none;
    }
    :first-child {
      border-left: none;
    }
  }
  .content-wrapper {
    background: var(--background); //#000e25;
    border-radius: calc(32 / 3840 * 100vw);
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: calc(16 / 3840 * 100vw);
  }
`;
