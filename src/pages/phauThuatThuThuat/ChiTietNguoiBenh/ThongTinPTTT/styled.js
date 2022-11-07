import styled from "styled-components";
export const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;

  div[disabled] {
    pointer-events: none;
    background-color: #f5f5f5;
    /* :hover{
      border: none;
    } */
  }

  .element-filter {
    padding: 0;
  }
  div {
    .ant-row {
      .ant-col {
        padding: 0 5px;
        /* height: 75px; */
        .item-select {
          margin-bottom: 10px;
        }
        .label-filter {
          white-space: nowrap;
        }
        .input-filter {
          .ant-select-selector {
            height: 40px !important;
          }
          .ant-select-selection-placeholder {
            line-height: 40px !important;
          }
          .ant-input-number-input-wrap{
            min-height: 40px;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  .cal-height {
    height: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    border: 1px solid #d9d9d9;
    .contain-img {
      display: flex;
      justify-content: center;
      height: 100%;
      margin-top: 0 !important;
      &.bg-gray {
        background-color: #f0f0f0;
      }
    }
    .info-image {
      position: relative;
      padding: 5px;
      .item-child {
        display: flex;
        align-items: center;

        span:last-child {
          flex: 1;
          border-bottom: 1px dashed #bbb;
          margin: 0 7px;
          .ant-picker {
            border: none;
            width: 100%;
          }
          input {
            border: none;
          }
        }
      }
    }
  }
  .p-relative {
    position: relative;
  }
  .img-pt {
    .img-view {
      max-height: 445px;
    }
  }
  .img-tt {
    .img-view {
      max-height: 285px;
    }
  }
  .h-100 {
    height: 100%;
  }
  .f-end {
    justify-content: flex-end;
  }
  .checkbox-pl {
    @media (max-width: 1368px) {
      margin-top: 20px;
    }
    .label-filter {
      margin-left: 4px;
    }
  }

  /* .icon-search {
    position: absolute;
    right: 12px;
    top: 33px;
  } */
`;
