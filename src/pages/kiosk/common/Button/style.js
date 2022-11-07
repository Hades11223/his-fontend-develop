import styled from "styled-components";

const ButtonWrapper = styled("div")`
  & {
    color: ${(props) => (props.color ? props.color : "black")};
    margin: 5px;
    padding: ${(props) => (props.padding ? `${props.padding}px` : "65px")};
    background: #ffffff;
    box-shadow: ${(props) =>
      props.bxShadow
        ? `0px 8px 0px ${props.bxShadow}, 0px 4px 10px rgb(10 47 108 / 30%)`
        : "unset"};
    border-radius: ${(props) => (props.rounded ? "32px" : "unset")};
    width: ${(props) => props.width};
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus {
      outline: none;
    }

    img {
      margin-right: 20px;
    }

    &.btn-sm {
      width: 349px;
      height: 184px;
    }

    &.btn-md {
      width: 439px;
      height: 184px;
    }

    &.btn-lg {
      width: 748px;
      height: 184px;
    }
  }
`;

export { ButtonWrapper };
