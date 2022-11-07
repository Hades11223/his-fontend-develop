import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border: 1px solid rgba(23, 43, 77, 0.25);
  border-radius: 8px;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .header {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    align-items: center;
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.05),
        rgba(23, 43, 77, 0.05)
      ),
      #ffffff;
    padding: 2px 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 30px;
    ._title {
      font-size: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-style: normal;
      font-weight: 700;
      line-height: 25px;
      color: #172b4d;
      flex: 1;
      & > span {
        display: flex;
        align-items: center;
        & svg {
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
      }
    }
  }
  .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
    padding: ${(props) => (!props.noPadding ? "8px" : "0px")};
    background-color: #ffffff;
  }
`;
