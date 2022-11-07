import styled from "styled-components";
export const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: "center";
  align-items: center;
  padding: ${(props) => (props.noPadding ? "0px" : "10px 16px")};
  ${(props) =>
    props.left !== undefined
      ? `margin-left: ${props.left || 0}px !important;`
      : ""}
  margin-bottom: ${(props) => props.bottom || 0}px;
  & > .title {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #172b4d;
    min-width: ${(props) => props.titleMinWidth || 0}px;
  }
`;
