import styled from "styled-components";

const Main = styled("div")`
  background-color: #fff;
  margin-top: ${(props) =>
    props.itemProps?.marginTop ? props.itemProps?.marginTop + "px" : 0};
  margin-bottom: ${(props) =>
    props.itemProps?.marginBottom ? props.itemProps?.marginBottom + "px" : 0};
  margin-right: ${(props) =>
    props.itemProps?.marginRight ? props.itemProps?.marginRight + "px" : 0};
  margin-left: ${(props) =>
    props.itemProps?.marginLeft ? props.itemProps?.marginLeft + "px" : 0};

  & .qrcode-component {
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
  & .qrcode-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    & .qrcode-area {
      flex: 1;
      display: flex;
      justify-content: ${(props) =>
        props.contentAlign == "center"
          ? "center"
          : props.contentAlign == "left"
          ? "flex-start"
          : "flex-end"};
      overflow: hidden;
      & .qrcode-wrapper {
        width: ${(props) => props.qrCodeSize || 200}px !important;
        height: ${(props) => props.qrCodeSize || 200}px !important;
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
  & .qrcode-label {
    text-align: center;
    font-weight: bold;
  }
`;

export { Main };
