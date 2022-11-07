import styled from "styled-components";

const Main = styled("div")`
  width: 100%;

  & .zoom-tool {
    display: flex;
    align-items: center;

    & .slider-tool {
      width: 80px;
      margin: 3px 6px 0 6px;
    }
  }

  & .extra-content {
    display: flex;
    justify-content: flex-end;

    & .extra-item {
      margin-left: 12px;
    }

    & .type-form-tool {
      display: flex;
      align-items: center;
    }
  }

  & .ant-card-extra {
    width: 60%;
  }

  & .ant-upload.ant-upload-select {
    display: block;
  }
  & .form-info {
    display: flex;
    & .form-info-detail {
      flex: 1;
      & label {
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
    & .form-info-action {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      & button {
        margin-bottom: 5px;
      }
    }
  }
`;

export { Main };
