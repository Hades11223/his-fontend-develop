import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  width: 500px;
  & .header-button {
    display: flex;
    justify-content: end;
    & .item {
      box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
      cursor: pointer;
      svg {
        height: 44px;
        width: 44px;
        rect {
          fill: #0762f7 !important;
        }
      }
      rect:hover {
        fill: #032254 !important;
      }
    }
  }
  .header-panel {
    display: flex;
    justify-content: space-between;
  }
  & .panel-info {
    background: #ffffff;
    box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
    border-radius: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 0px !important;
    padding: 12px 0;
  }
  & > .w-split-vertical {
    max-height: 100%;
    overflow: hidden;
  }
`;
