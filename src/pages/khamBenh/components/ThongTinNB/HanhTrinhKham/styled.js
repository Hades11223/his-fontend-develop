import styled from "styled-components";

export const Main = styled.div`
  & ul.chart {
    list-style: none;
    padding: 0;
    height: 240px;
    overflow: auto;
    width: 100%;
    display: -webkit-inline-box;
    /* display: flex; */
    /* flex-wrap: nowrap; */
    & > li {
      list-style: none;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      padding-bottom: 10px;
      & .ket-luan {
        position: absolute;
        top: calc(100% + 20px);
      }
      & > ul {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      & .item {
        z-index: 2;
        flex: 1;
        /* identical to box height */

        display: inline-flex;
        align-items: center;
        text-align: center;
        text-transform: uppercase;
        color: #7f6604;
        margin-bottom: 5px;
        position: relative;
        display: flex;
        flex-direction: column;
      }
      & .item-child {
        margin-top: 15px;
        & li {
          display: table;
        }
      }
    }
  }
`;
