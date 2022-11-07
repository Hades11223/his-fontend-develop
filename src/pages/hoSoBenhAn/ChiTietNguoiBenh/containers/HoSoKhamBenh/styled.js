import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  width: 100%;
  border-radius: 5px;
  height: 100%;
  display: flex;
  background-color: #f8f9f9;
  & .header {
    padding: 13px 16px;
  }

  .left-content {
    flex: 1;
    padding: 5px 10px;
    & .mn-box {
      height: 100%;
    }
  }
  .right-content {
    width: 350px;
    padding: 5px 0px;
    display: flex;
    flex-direction: column;
    .right-title {
      /* height: 44px; */
      font-size: 16px;
      font-weight: bold;

      .right-title_top {
        padding: 10px;
        border-bottom: 1px solid #dbdde4;
      }
      .right-title_bottom {
        padding: 5px;
        color: #42649d;
        font-size: 14px;
        border-bottom: 1px solid #dbdde4;
      }
    }
    .right-li {
      flex: 1;
      overflow: hidden;
    }

    .right-print {
      display: flex;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  & .popover-hsba-dieu-tri {
    min-width: 200px;
    & .nhat-ky {
      display: flex;
      flex-direction: column;
      span {
       min-width: 250px;
       cursor: pointer;
      }
    }
  }
`;