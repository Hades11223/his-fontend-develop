import styled from "styled-components";
import { Modal } from "antd";

export const Main = styled.div`
  & .action-top {
    display: flex;
    margin: 10px;
    justify-content: flex-end;
  }
  & .action-bottom {
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: space-between;
  }
  .option-edit-image {
    display: flex;
    align-items: center;
  }
  & .image-canvas {
    overflow: auto;
    max-height: calc(100vh - 250px);
    .canvas-wrapper {
      margin: 0 auto;
      position: relative;
      .canvas {
        position: absolute;
        top: 0;
        right: 0;
      }
      // .color-box {
      //   display: flex;
      //   justify-content: space-around;
      //   .btn-color {
      //     width: 15px;
      //     height: 15px;
      //   }
      // }
    }
  }
  .img {
    /* width: 100%; */
    width: auto;
    height: auto;
    visibility: hidden;
  }
`;
