import styled from "styled-components";
import { Col } from "antd";

export const Main = styled.div`
  padding-right: 16px;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header {
    width: 100% !important;
  }
  .button-bottom {
    color: #172b4d;
    mix-blend-mode: normal;
    border: 1px solid #0762f7;
    box-shadow: 0px 3px 0px #03317c;
    border-radius: 8px;
    background: #ffffff;
    padding: 8px 30px;
    width: fit-content;
    position: fixed;
    bottom: 39px;
    left: 30px;
    max-width: 66.66666667%;
    z-index: 1000;
    line-height: 20px;
    font-weight: 600;
    cursor: pointer;
  }
`;
