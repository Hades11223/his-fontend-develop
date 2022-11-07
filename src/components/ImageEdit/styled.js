import styled from "styled-components";

const Main = styled("div")`
  position: relative;
  @media print {
    display: ${(props) => (props.hideOnPrint ? "none" : "block")};
  }
  margin-top: ${(props) =>
    props.itemProps?.marginTop ? props.itemProps?.marginTop + "px" : 0};
  margin-bottom: ${(props) =>
    props.itemProps?.marginBottom ? props.itemProps?.marginBottom + "px" : 0};
  margin-right: ${(props) =>
    props.itemProps?.marginRight ? props.itemProps?.marginRight + "px" : 0};
  margin-left: ${(props) =>
    props.itemProps?.marginLeft ? props.itemProps?.marginLeft + "px" : 0};

  position: relative;
  display: flex;
  flex-direction: column;
  & .img-view {
    object-fit: contain;
    object-position: center;
  }
  .btn-edit {
    font-size: 16px;
    width: 27px;
    height: 27px;
  }
  & .group-btn1 {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    & .icon {
      font-size: 16px;
      width: 27px;
      height: 27px;
    }
  }
  &:hover .group-btn1 {
    display: flex !important;
  }
  &:hover .close-icon {
    display: block;
  }
  @media print {
    & .btn-add-image {
      display: none;
    }
  }
  .btn-camera {
    position: absolute;
    height: 40px;
    width: 40px;
    bottom: 45px;
    right: 15px;
    cursor: pointer;
  }
  .text-placeholder {
    margin-top: -108px;
    text-align: center;
    font-size: 16px;
    color: #767676;
  }
  .close-icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    width: 27px;
    height: 27px;
    display: none;
    svg {
      font-size: 16px;
    }
  }
`;

export { Main };
