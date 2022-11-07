import styled from "styled-components";

const Main = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.focusing ? "#E6F7FF" : "")};
  min-height: 24px;
  width: ${(props) => props.itemProps?.width || 200}px;
  border: ${(props) => (props.mode == "config" ? "1px solid black" : "")};
  & .sign-body {
    width: ${(props) =>
      props.itemProps?.isPatient || !props.itemProps?.displayAsUserName
        ? (props.itemProps?.width || 200) + "px"
        : "auto"};
    height: ${(props) =>
      props.itemProps?.isPatient || !props.itemProps?.displayAsUserName
        ? (props.itemProps?.height || 200) + "px"
        : "auto"};
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    & .btn-reset-signature {
      padding: 0px;
      border: 0px;
      position: absolute;
      top: 0px;
      right: 0px;
      z-index: 100;
      i {
        margin: 0px;
        svg {
          fill: red;
        }
      }
    }
  }
  & .text-field-label {
    display: flex;
  }

  & .text-field-label:after {
    content: "";
    margin-right: 6px;
  }
  & .image-sign-area {
    & img {
      max-width: 100%;
      object-fit: contain;
      max-height: 100%;
    }
  }
  & .btn-signature {
    max-width: 100%;
    padding: 0 5px;
  }
  @media print {
    & .btn-reset-signature {
      display: none;
    }
    & .ant-btn {
      display: none;
    }
  }
`;

export { Main };
