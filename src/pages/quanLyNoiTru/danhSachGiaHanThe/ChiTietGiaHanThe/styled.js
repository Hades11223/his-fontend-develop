import styled from "styled-components";
export const Main = styled.div`
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  max-height: 100%;
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
    flex: 1;
    overflow: hidden;
  }
  h1 {
    font-family: "Nunito Sans";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
`;
