import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .ant-row {
    width: 100%;
  }
  .header-left {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    /* shadow-khung */

    box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
    border-radius: 8px;
  }
  .content {
    margin-top: 20px;
    height: 100%;
    overflow: hidden;
  }
  h1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
  & .bottom-action {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
  }
`;
