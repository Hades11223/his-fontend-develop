const { keyframes, default: styled } = require("styled-components");

const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;

export const PercentageChartStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  font-size: 1.2625vw;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  @media all and (max-width: 2561px) {
    font-size: 1.1625vw;
  }
  @media all and (max-width: 1921px) {
    font-size: 1.1625vw;
  }
  @media all and (max-width: 1367px) {
    font-size: 0.9375vw;
  }
  position: relative;
  background: #ffffff;

  .title {
    font-weight: 900;
    font-size: 1.25vw;
    line-height: 1.45vw;
    // color: var(--text); //#ffffff
    margin-bottom: 0.5em;
  }
  .percent-wrapper {
    margin-bottom: 16px;
    .percent-title {
      margin-bottom: 4px !important;
      font-weight: 500;
      font-size: 0.9vw;
      line-height: 20px;
      /* identical to box height, or 143% */

      display: flex;
      align-items: center;
      text-align: right;

      color: #647589;
    }
    .total {
      display: flex;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #ffffff;

      & .chua-hoan-thanh {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        background-color: #f59e0b;
      }
      & .da-hoan-thanh {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        background-color: #65a30d;
      }
    }
  }
  .pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-pagination {
      padding: 0 !important;
      .ant-pagination-item {
        min-width: 8px;
        margin: 0.26020833333vw;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-options {
        display: none;
      }
      .ant-pagination-item-ellipsis {
        border: none;
        border-radius: 0;
        border-bottom: dashed 1px #f2994a;
      }
      .ant-pagination-jump-next,
      .ant-pagination-jump-prev {
        border: none;
        border-radius: 0;
        border-bottom: dashed 1px #f2994a;
      }
      li {
        border-radius: 50%;
        width: 0.57291666666vw !important;
        height: 0.57291666666vw !important;
        border: 0.10416666666vw solid #f2994a;
        background: transparent;
        &.ant-pagination-item-active {
          animation: ${paging_item_moving} 200ms ease-in-out;
          background: #f2994a;
        }
        a {
          display: none;
        }
      }
    }
  }
`;
