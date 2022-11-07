import styled from "styled-components";

const Main = styled("div")`
  position: relative;
  height: 100%;

  & .c-name-label {
    line-height: 24px;
    color: #0d0d0d;
  }

  & .component-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .properties-contain {
    /* height: calc(100vh - 322px); */
    overflow: hidden;
    height: 100%;
    flex-direction: column;
    & .component-config-body {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }

  & .props-form-item {
    margin-bottom: 0;
  }

  & .delete-btn {
    min-width: 30px;
  }
  & .action-bottom {
    display: flex;
    padding: 10px;
  }
  & .info-component {
    margin-bottom: 10px;
  }
`;

export { Main };
