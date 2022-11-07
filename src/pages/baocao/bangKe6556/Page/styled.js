import styled from "styled-components";

export const Main = styled.div`
  font-family: "Times New Roman", sans-serif;
  font-size: ${(props) => (props.fontSize ? props.fontSize + "pt" : "14px")};
  transform: scale(1);
  transform-origin: top left;
  background-color: #fff;
  margin: 0;
  ${(props) => `width: ${props.layout.width}px;
  height: ${props.layout.height}px;`}

  ${(props) => (props.top ? `padding-top: ${props.top}px` : "")};
  ${(props) => (props.left ? `padding-left: ${props.left}px` : "")};
  ${(props) => (props.right ? `padding-right: ${props.right}px` : "")};
  ${(props) => (props.bottom ? `padding-bottom: ${props.bottom}px` : "")};

  padding-left: 10px;
  padding-right: 10px;
  line-height: 1.2;
  & table {
    border: solid 1px;
    border-collapse: collapse;
    color: #000 !important;
    font-size: 14px;
    & tr {
      border-top: 1px solid #000;
      &:first-child {
        border-top: 0;
      }
      & td {
        &:first-child {
          border-left: 0px solid #000;
        }
        vertical-align: top;
        border-left: 1px solid #000;
      }
    }
    & thead {
      border-bottom: 1px solid #000;
    }
    & tfoot {
      border-top: 1px solid #000;
    }
  }
  .border-left {
    border-left: 1px solid #000 !important;
  }
  .border-bottom {
    border-bottom: 1px solid #000 !important;
  }
  .center {
    text-align: center;
  }
  .bold {
    font-weight: bold;
  }
  .italic {
    font-style: italic;
  }
  .vam {
    vertical-align: middle;
    td {
      vertical-align: middle;
    }
  }

  p {
    margin-bottom: 0px;
  }
  .c001f60 {
    color: #001f60;
  }
  .bg-ddebf7 {
    background-color: #ddebf7;
  }
  .ml10 {
    margin-left: 10px;
  }
  .ml5 {
    margin-left: 10px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .mt10 {
    margin-top: 10px;
  }
  .mt15 {
    margin-top: 15px;
  }
  .mt25 {
    margin-top: 25px;
  }
  .ml30 {
    margin-left: 30px;
  }
  .mb5 {
    margin-bottom: 5px;
  }
  .mb10 {
    margin-bottom: 10px;
  }
  .mb20 {
    margin-bottom: 20px;
  }
  .mb80 {
    margin-bottom: 80px;
  }
  .mb100 {
    margin-bottom: 100px;
  }
  .pb5 {
    padding-bottom: 5px;
  }
  .fz20 {
    font-size: 20pt;
  }
  .fz18 {
    font-size: 18pt;
  }

  .w80 {
    width: 80px;
  }
  .w90 {
    width: 90px;
  }
  .w100 {
    width: 100px;
  }
  .w150 {
    width: 150px;
  }
  .w200 {
    width: 200px;
  }
  .w250 {
    width: 250px;
  }
  .w300 {
    width: 300px;
  }
  .w400 {
    width: 400px;
  }
  .h25 {
    height: 25px;
  }
  .flex {
    display: flex;
    flex-direction: row;
  }
  .flex1 {
    flex: 1;
  }
  .align-right {
    text-align: right;
  }

  .inline-block {
    display: inline-block;
  }

  .logo-header {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }
  .header-ic {
    width: 9px;
    margin-right: 100px;
  }
  @media print {
    /* break-before: always;
    page-break-before: always; */
    /* footer {
      position: fixed;
      bottom: 0;
    } */
  }
`;
