import styled from "styled-components";

export const Main = styled.div`
  height: 100%;
  .w100 {
    width: 100% !important;
  }
  .row-actived {
    td {
      background: #c1f0db !important;
    }
  }
  .container {
    padding: 0 40px 15px 40px;
  }
  .ant-popover {
    z-index: 9999;
  }
  .home-child {
    flex-wrap: nowrap;
    & > .ant-col {
      height: 100%;
      &:first-of-type {
        overflow: visible !important;
      }
    }

    .dm-footer-table {
      padding: 1em;
      margin: 0 1px;
      box-shadow: 0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 31%);
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .dm-focus-border {
      overflow: hidden;
      border-radius: 16px;
      box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
        0px 0px 1px rgba(9, 30, 66, 0.31);
      border-radius: 20px;
      transition: none;
      .header-create {
        border-bottom: 2px solid #dfe1e6;
      }
      :focus-within {
        .create-wrapper-style {
          border: 2px solid #c1d8fd;
          margin: -1px;
        }
      }
    }
    .form-custom {
      .ant-form-item {
        .input-option {
          height: unset;
        }
      }
    }
  }
`;
