import styled from "styled-components";

export const Main = styled.div`
  .row-actived {
    background: #c1f0db !important;
  }
  .ant-popover {
    z-index: 9999;
  }
  .custom-header {
    & .btn-collapse {
      display: flex;
      align-items: center;
      right: 10px;
      padding: 0;
      margin-right: 15px;
      background: none;
      box-shadow: none;
      svg {
        width: 37px;
        height: 37px;
      }
    }
  }
`;
