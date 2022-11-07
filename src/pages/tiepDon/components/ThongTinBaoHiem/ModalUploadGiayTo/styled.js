import { Modal } from "antd";
import styled from "styled-components";
import { select, input, button } from "components/mixin";

export const Main = styled.div`
  padding: 10px;

  .header {
    position: relative;
    z-index: 5;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.95),
        rgba(255, 255, 255, 0.95)
      ),
      #0762f7;
    border-radius: 3px;
    padding: 20px 16px;
    color: rgba(0, 0, 0, 0.85);
    .info {
      line-height: 20px;
      display: inline-table;
      .title {
        font-weight: 600;
        font-size: 16px;
        color: #172b4d;
      }
      .content {
        font-style: italic;
        font-size: 14px;
        font-weight: normal;
      }
    }
    img.info {
      margin: 0 18px 0 2px;
    }
  }
  .body-camera {
    display: flex;
    border: solid 1px #e8eaed;
    margin-top: 30px;
    padding: 10px 7px 2px;
    .camera {
      width: calc(100% - 100px);
      overflow-x: scroll;
      display: flex;
      padding-bottom: 5px;
      height: 110px;
      ::-webkit-scrollbar-track {
        background: #ffffff;
      }
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .item {
        padding-right: 5px;
        position: relative;
        .image {
          border: solid 1px #83b0fb;
          width: 150px;
          height: 100px;
          object-fit: cover;
          background: #172b4d;
          opacity: 0.8;
        }
        .file-name {
          background: linear-gradient(
              0deg,
              rgba(23, 43, 77, 0.1),
              rgba(23, 43, 77, 0.1)
            ),
            #ffffff;
          font-size: 14px;
          line-height: 20px;
          color: #172b4d;
          font-weight: 400;
          padding: 3px 20px 3px 8px;
          border-radius: 4px;
          min-width: 150px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        & .file-overlay {
          position: absolute;
          right: 0px;
          top: 0px;
          bottom: 0px;
          left: 0px;
          background-color: #00000060;
          display: none;
          cursor: pointer;
        }
        &:hover {
          & .file-overlay {
            display: block;
          }
        }
        .icon-close {
          position: absolute;
          right: 8px;
          top: 4px;
          cursor: pointer;
        }
        .close-x {
          width: 9px;
          top: 8px;
          right: 10px;
        }
        &:last-child {
          padding-right: 0px;
        }
        .react-pdf__Document {
          width: 150px;
          height: 100px !important;
          canvas.react-pdf__Page__canvas {
            width: 150px;
            height: 100px !important;
          }
          .react-pdf__Page__textContent {
            height: 100px !important;
          }
        }
      }
    }
    .camera-icon {
      margin: auto;
      img {
        cursor: pointer;
        height: 30px;
      }
    }
  }

  .bottom-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
`;
