import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  background-color: #eef5fa;
  padding: 12px;
  & .editing-box {
    margin-right: auto;
    margin-left: auto;
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100% - 100px);
    background-color: #fff;
    width: ${(props) => props.layout.width + 24}px;
    padding: 0 12px;
    max-height: 1184px;
    box-shadow: 0 24px 24px -18px rgb(69 104 129 / 33%),
      0 9px 45px 0 rgb(114 119 160 / 12%);
    border-radius: 4px;
    thead {
      /* display: block; */
    }
    tfoot {
      /* display: block; */
    }
    @media print {
      thead {
        /* display: table-header-group; */
      }
      tfoot {
        /* display: table-footer-group; */
      }
    }
  }
`;
