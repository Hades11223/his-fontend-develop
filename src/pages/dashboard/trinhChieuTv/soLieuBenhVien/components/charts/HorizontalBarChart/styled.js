import styled, { keyframes } from "styled-components";

export const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;

export const HorizontalBarChartStyled = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5em;
  font-size: 1.2625vw;
  display: flex;
  flex-direction: column;
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
  ${({ useBackground }) =>
    useBackground
      ? `
    background: var(--background);//#000E25
    border-radius: 0.83333333333vw;
    // width: calc(100% - 1em);
  `
      : ""}
  .title {
    font-weight: 900;
    font-size: 1.25vw;
    line-height: 1.45vw;
    color: var(--text); //#ffffff
    margin-bottom: 0.5em;
  }

  .chua-hoan-thanh,
  .da-hoan-thanh {
    height: 24px;
    text-align: center;
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
