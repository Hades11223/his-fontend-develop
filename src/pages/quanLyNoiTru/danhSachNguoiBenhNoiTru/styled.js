import styled from "styled-components";
import { Page } from "components";
export const Main = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  & .ic-action {
    margin: 0 5px;
    font-size: 24px;
  }
`;


export const WrapperPopover = styled.div`
  margin: -12px -16px;
  width: ${(p) => (p.width || 150) + "px"};
  .item-popover {
    padding: 5px 10px;
    cursor: pointer;
    :hover {
      background-color: #ccc;
    }
  }
`;

export const WrapButtonRight = styled.div`
  display: flex;
  justify-content: flex-end;
  .icon-more {
    svg {
      border-radius: 50%;
      width: 16px !important;
      :hover {
        background-color: #ccc;
      }
    }
  }
`;
export const MainPage = styled(Page)`
  .khoaLamViec {
    display: flex;
    align-items: center;
    font-size: 13px;
    span {
      color: #1890ff;
      padding-top: 2px;
    }
    img {
      padding-left: 5px;
      cursor: pointer;
    }
  }
  .main-page {
    .page-body {
      padding: 0;
    }
  }
`;
