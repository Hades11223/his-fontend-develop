import styled from "styled-components";

export const PrinterWrapper = styled.div`
  textarea {
    resize: none;
  }
  min-width: 1000px;
  @media ${`(min-width: 1441px)`} {
    min-width: 1150px;
  }
  padding: 10px 10px 44px 10px;
  background: ${(props) => (props.manualPrint ? "#c1f0db" : "#f0f0f1")};
  margin-bottom: 2px;
  border-radius: 8px;
  .ant-input-number {
    width: 100%;
  }
  .ant-form-item-explain {
    div {
      font-size: 11px;
    }
  }
`;

export const Main = styled.div`
  .create-body {
    .custom-w {
      overflow-x: auto;
      max-height: calc(100vh - 280px);
      .ant-input-disabled,
      .ant-select-disabled,
      .ant-input-number-disabled {
        pointer-events: none;
      }
      .custom-checkbox {
        display: flex;
        align-items: center;
        .ant-checkbox-wrapper {
          margin: 5px;
        }
      }
      .edit-checked {
        margin-left: 8px;
      }
    }
  }
  .row-actived {
    background: #c1f0db !important;
  }
`;
