import styled from "styled-components";

const Main = styled("div")`
  & tr,
  & td,
  & table {
    font-size: ${(props) => (props.fontSize ? props.fontSize + "pt" : "12pt")};
    border: ${(props) =>
      !props.hideKhung && props?.mode !== "config"
        ? "none !important"
        : "1px solid #000"};
  }
  @media print {
    & .hide-print {
      display: none;
    }
  }

  & .td-contain {
    min-height: 24px;
  }
  & .column-ttba {
    .icon-action {
      z-index: 100;
      position: absolute;
      display: none;
      top: 0px;
      right: 0px;
      .icon {
        font-size: 16px;
        width: 20px;
        height: 20px;
        i {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .input-multiple-line {
      background-position-y: 30px !important;
      background-size: 5px 30px;
      display: inline-block;
      min-width: 20px;
      text-align: justify;
      padding-right: 15px;
    }
    :hover {
      .icon-action {
        display: block;
        cursor: pointer;
      }
    }
  }
  & .column-ttba {
    .ten {
      .input-multiple-line {
        background: none !important;
        :focus {
          background: red !important;
        }
      }
    }
  }

  & .ten {
    width: max-content;
  }

  & .ant-input {
    padding: 0;
    width: auto;
    border: none;
  }
`;

export { Main };
