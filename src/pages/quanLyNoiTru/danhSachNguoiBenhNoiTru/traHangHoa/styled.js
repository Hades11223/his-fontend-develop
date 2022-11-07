import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .element-filter {
    padding: 0;
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
  .icon-add {
    background-color: #049254;
    span {
      color: white;
    }
    svg {
      transform: rotate(45deg);
      path {
        fill: white;
      }
    }
  }
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

export const WrapperTimKiem = styled.div`
  margin-top: 10px;
  .ant-row {
    .ant-col {
      padding: 0 5px !important;
      padding-right: 15px;
      /* margin-bottom: 20px; */
      .item-input,
      .item-date,
      .item-select {
        margin-bottom: 10px;
      }
    }
  }
`;

export const DsHangHoaWrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  margin-top: -12px;
  flex: 1;
  display: flex;
  flex-direction: column;

  .button-bottom-modal {
    display: flex;
    justify-content: flex-end;
    margin: 0.5rem;
    gap: 0.5rem;
  }

  .home-table-warrper {
    padding: 5px;
  }
  .main__container {
    /* height: calc(100vh - 375px); */
    height: auto;
    flex: auto;
  }

  .cell {
    .cell-total {
      min-height: 32px;
      .cell-total-add {
        width: 100%;
        display: flex;
        align-items: center;
        color: #049254;
        gap: 1rem;
        svg {
          width: 16px;
          height: 16px;
          path {
            fill: #049254;
          }
        }
      }
      .cell-total-number {
        font-weight: 600;
        /* margin: 0 .8rem; */
        /* font-size: 17px; */
        text-align: center;
      }
    }
    .cell-list {
      .cell-item-input {
        width: 100%;
        background-color: unset;
        border: none;
        border-bottom: 1px solid #999;
      }
      .cell-item {
        min-height: 32px;
        display: flex;
        /* justify-content: center; */
        align-items: center;
      }
      .cell-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-action {
          margin-left: 5px;
          width: 20px;
          height: 20px;
        }
      }
      .cell-active {
        background: red;
      }
    }
  }

  .ant-table-container {
    height: calc(100vh - 450px) !important;
  }
`;
