import styled from "styled-components";

const Main = styled("div")`
  & .name-image {
    white-space: nowrap;
    /* overflow: hidden; */
    text-overflow: ellipsis;
    display: block;
    line-height: 20px;
    position: relative;
    i {
      margin-right: 10px;
    }
  }
  & .image-default-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .icon-remove {
    margin-right: 5px;
    margin-top: 2px;
  }
`;

export { Main };
