import styled from "styled-components";

const Main = styled("div")`
  & .ant-upload {
    position: relative;
  }
  & .icon {
    width: 27px;
    height: 27px;
    font-size: 16px;
    z-index: 100;
  }
  & .group-btn {
    display: none;
  }
  &:hover .group-btn {
    display: flex;
    position: absolute;
    top: 0px;
    left: 0;
  }
`;
export { Main };
