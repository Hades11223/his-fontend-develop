import styled, { keyframes } from "styled-components";

const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;

export const DoubleTableStyled = styled.div`
  position: relative;
  background: transparent;
  display: flex;
  width: 100%;
  height: 100%;
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
        width: 0.57291666666vw;
        height: 0.57291666666vw;
        border: 0.10416666666vw solid #f2994a;
        background: transparent;
        &.ant-pagination-item-active {
          animation: ${paging_item_moving} 300ms ease-in-out;
          background: #f2994a;
        }
        a {
          display: none;
        }
      }
    }
  }
  .card-info-content {
    width: 100%;
    height: 100%;
    padding: calc(16 * 100vw / 3840);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .title {
      width: 100%;
      font-weight: 900;
      font-size: calc(48 * 100vw / 3840);
      line-height: calc(65 * 100vw / 3840);
      text-transform: uppercase;
      color: var(--text);
    }
    .double-table-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      .table-wrapper {
        flex: 1;
        max-width: calc(50vw - 32 * 100vw / 3840);
        padding: calc(16 * 100vw / 3840);
        padding-bottom: calc(40 * 100vw / 3840);
        .table-card-wrapper {
          background: var(--background); //#000e25;
          width: 100%;
          height: 100%;
          border-radius: calc(32 * 100vw / 3840);
        }
      }
    }
  }
  .text-auto-running {
    display: inline-flex;
    text-overflow: clip;
    white-space: nowrap;
    max-width: 362px;
    overflow: hidden;
  }
`;
