import styled from "styled-components";
export const Main = styled.div`
  display: flex;
  background-color: #f3f7ff;
  width: 100%;
  height: 48px;
  border-radius: 5px;
  align-items: center;
  padding-left: 20px;

  .left {
    display: flex;
    width: 90%;
    align-items: center;
    .ml2 {
      margin-left: 1em;
    }
    .ma-nb {
      white-space: pre;
      border: 2px dashed #0762f7;
      padding: 2px 10px;
      font-weight: 800;
      color: #0762f7;
    }
    .tt-nb {
      white-space: pre;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      /* : ; */
      b {
        font-weight: 800;
      }
    }
  }
  .right {
    margin-right: 20px;
    width: 10%;
    display: flex;
    justify-content: flex-end;
  }
`;
