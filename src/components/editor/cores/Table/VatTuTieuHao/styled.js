import styled from "styled-components";
import { A4 } from "constants/index";

const width = A4.width - 48;
export const inputColWidth = width * 0.05;

const Main = styled("div")`
  counter-reset: pageTotal;
  counter-reset: currentPage;
  line-height: ${(props) => props.lineHeightText};
  font-size: ${(props) => props.fontSize}pt;
  & table {
    border: solid 1px;
    width: 100%;
  }

  & .col-header-name,
  & .col-header-stt {
    font-weight: bold;
  }
  & .col-header-stt {
    width: 40px;
    text-align: center;
    vertical-align: middle !important;
  }
  & .col-header-name {
    padding: 0 4px;
    position: relative;
    & svg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  & .col-stt {
    text-align: center;
  }
  & .col-name {
    padding-left: 4px;
  }
  & .col-dieu-duong {
    font-weight: bold;
    vertical-align: middle;
    padding: 5px;
    text-align: center;
  }
  & .col-dieu-duong-text {
    text-align: center;
    padding: 5px 2px;
    max-width: ${(props) => props.colDateWidth || 60}px;
    overflow: hidden;
  }
  & .col-header-date {
    width: ${(props) => props.colDateWidth || 60}px;
    font-weight: bold;
    text-align: center;
    vertical-align: middle !important;
  }
  & .col-soluong {
    width: ${(props) => props.colDateWidth || 60}px;
    text-align: right;
    padding: 0 4px;
  }
  & .col-header-tong-cong {
    width: 60px;
    font-weight: bold;
  }
  & .col-tong-cong {
  }

  & .header-info {
    display: flex;
    margin-bottom: 5px;
    & > div
    {
      margin-right: 30px;
    }
  }
  & .next-page {
    height: 100%;
    /* break-before: always; */
    /* width: ${A4.width}px; */
    /* height: ${A4.height}px; */
    page-break-after: always;
    /* counter-increment: pageTotal; */
    margin-top: 20px;
    /* counter-increment: currentPage; */
    /* counter-increment: currentPage;
    &:after {
      content: counter(currentPage);
    } */
  }

  /* @media screen {
    & .next-page {
      &:after {
        display: none;
      }
    }
  }
  @media print {
    & .next-page {
      &:after {
        position: fixed;
        bottom: 0;
      }
    }
  }

  @page {
    size: A4 portrait;
    position: relative;
  }
  @media print {
    & .next-page {
    }
  } */
`;

export { Main };
