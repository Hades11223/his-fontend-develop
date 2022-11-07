import styled from "styled-components";

export const PGStyled = styled.div`
  margin: 10px 0;
  overflow: hidden;
`;

export const Main = styled.div`
  height: 320px;
  width: 100%;
  border-left: 1px solid #0762f7;
  border-right: 1px solid #0762f7;
  border-bottom: 1px solid #0762f7;

  border-bottom-left-radius: 8px;
  margin: 0 16px;
  padding: 10px;

  overflow: auto;
  white-space: nowrap;

  li {
    display: inline-block;
    *display: inline; /*For IE7*/
    *zoom: 1; /*For IE7*/
    vertical-align: top;
    /* width: 40px; */
    margin-right: 20px;
    white-space: normal;
  }
`;

export const TabLabelStyle = styled.div`
  margin-left: 16px;

  display: flex;
  justify-content: flex-start;

  .pg-name {
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    color: #0762f7;
    padding: 0 16px;
    width: 100px;

    border-left: 1px solid #0762f7;
    border-top: 1px solid #0762f7;
    border-right: 1px solid #0762f7;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .pg-info {
    padding-left: 16px;
    border-bottom: 1px solid #0762f7;
    width: 100%;

    color: #7a869a;
    font-weight: 900;
    font-size: 12px;
  }
`;
