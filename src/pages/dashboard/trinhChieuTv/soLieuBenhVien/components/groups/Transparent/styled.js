import styled, { keyframes } from "styled-components";

const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;
export const GroupTransparentStyled = styled.div`
  background: transparent;
  height: 100%;
  width: 100%;
  display: flex;
  ${({ isPaging }) =>
    isPaging ? "padding-bottom: calc(40 * 100vw / 3840);" : ""}
  position: relative;
  .group-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: ${({ isVertical }) => (isVertical ? "column" : "row")};
    align-items: stretch;
    align-content: stretch;
    /* background: transparent !important; */
    & > div {
      display: flex;
      flex: 1;
      background: transparent;
      flex-direction: column;
      border-radius: 6px;
    }
    #doanh-thu-theo-loai-dv {
      margin-bottom: 10px;
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
`;
