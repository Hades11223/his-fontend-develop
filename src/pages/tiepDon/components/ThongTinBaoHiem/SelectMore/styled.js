import styled from "styled-components";

export const Main = styled.div`
  &.select-content {
    position: relative;
    .select-drop-list {
      background-color: #fff;
      ${(props) =>
        props.placement == "bottom" ? `{top: 100%}` : `{bottom: 100%}`}
      position: absolute;
      width: calc(100% - 0.5px);
      color: #333;
      z-index: 1050;
      box-shadow: 0 0 1px #555;
      margin-top: 3px;
      border-radius: 4px;
      .list-item {
        cursor: pointer;
        padding: 6px 12px;
        word-break: break-word;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        line-height: 25px;
        &:hover {
          background-color: #ede7e7;
        }
        &:focus {
          background-color: #ede7e7;
        }
      }
      .active-item {
        background-color: #ede7e7;
      }
    }
    .ant-input.select-more {
      margin-top: 2px;
      font-weight: 600;
      font-size: 13px;
      line-height: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 3px;
      height: 32px;
      width: 100%;
    }
    .select-drop-list > div::-webkit-scrollbar {
      width: 5px;
      height: 8px;
    }
    .select-drop-list > div::-webkit-scrollbar-track {
      border-bottom-right-radius: 20px;
    }
    .select-drop-list > div::-webkit-scrollbar-thumb {
      background: #333333d1;
      border-radius: 25px;
    }
    .ant-input-disabled {
      margin-top: 5px;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      border: 2px solid #e0e0e0;
      border-radius: 3px;
      height: 37px;
      width: 100%;
      background-color: #dfe1e6 !important;
    }
    @media (min-width: 1440px) {
      .ant-input.select-more {
        height: 40px;
        font-size: 16px;
      }
    }
  }
`;
