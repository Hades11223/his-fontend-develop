import styled from "styled-components";

const Main = styled("div")`
  font-family: "Times New Roman", Times, serif;
  margin: 0 auto !important;
  font-size: 14px;
  color: #000;
  width: 870px;
  margin: 10px;
  page-break-after: always;
  & .text-header {
    font-weight: bold;
    margin-left: 100px;
    font-size: 16pt;
  }
  & .list-surgery {
    list-style: none;
    padding: 0;
  }
  @page {
    size: A4; /* auto is the initial value */

    /* this affects the margin in the printer settings */
    margin: 40px;
  }
`;
export { Main };
