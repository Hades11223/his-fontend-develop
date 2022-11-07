import styled from "styled-components";

const Main = styled("div")`
  background-color: #fff;
  min-height: 60px;

  & .barcode-component {
    display: flex;
    justify-content: ${(props) => {
      switch (props.contentAlign) {
        case "left":
          return "flex-start";
        case "right":
          return "flex-end";
        case "left":
        default:
          return "center";
      }
    }};
  }
  & .barcode-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    & .barcode-area {
      flex: 1;
      overflow: hidden;
      & .barcode-wrapper {
        width: ${(props) => props.barcodeWidth || 200}px !important;
        height: ${(props) => props.barcodeHeight || 90}px !important;
        overflow: hidden;
        & svg {
          width: 100% !important;
          height: auto;
        }
      }
    }
  }

  & img {
    width: 120px;
  }
  & .barcode-label {
    text-align: center;
    font-weight: bold;
  }
`;

export { Main };
