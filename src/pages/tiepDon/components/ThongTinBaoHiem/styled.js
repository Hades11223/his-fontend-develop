import styled from "styled-components";
import { Row } from "antd";
export const Main = styled(Row)`
  .checkbox {
    & > div {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 16px;
      color: #172b4d;
      font-weight: 600;
      cursor: pointer;
    }
    display: flex;
    align-items: center;
    & .ant-checkbox-wrapper {
      margin-right: 5px;
    }
    margin-bottom: 10px;
    & svg {
      fill: #0762f7;
      margin-left: 5px;
      width: 22px;
      height: 15px;
    }
    & .disabled {
      color: #172b4d25;
      & svg {
        fill: #172b4d25;
      }
    }
  }

  & .upload-giay-chuyen-tuyen {
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #0762f7 !important;
    /* identical to box height, or 125% */
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  & .select-content {
    .select-drop-list {
      width: calc(200% - 0.5px) !important;
    }
  }

  /* @media (max-width: 1280px) { */
  & .co-lich-hen-kham-lai > div{
    font-size: 10pt !important;
    & svg{
      width: 18px;
    }
  }
  /* } */
`;
