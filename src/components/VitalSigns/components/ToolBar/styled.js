import styled from "styled-components";

const Main = styled("div")`
  flex-direction: row;
  display: flex;
  justify-content: space-between;

  .radio-nhip-mach {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    .radio {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .ant-radio-wrapper {
        margin-right: 5px;
      }
    }
    .radio-content {
      margin-left: 5px;
    }
  }
  & .toolbar {
    flex: 1;
    background-color: #fff;
    padding: 12px;
    height: 80px;
    box-shadow: 1px 0px 20px 0px rgba(69, 104, 129, 0.33),
      0px 0px 20px 0 rgba(114, 119, 160, 0.12);
    position: relative;
    z-index: 1;
    & .toolbar-inner {
      display: content;
      .ant-btn {
        margin-left: 10px;
      }
      .toolbar-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
      .toolbar-head {
        display: flex;
        justify-content: flex-end;
      }
      .toolbar-left {
        display: flex;
        .name-patient {
          margin-right: 20px;
          font-weight: bold;
          font-size: 16px;
          color: #08aaa8;
          align-items: center;
        }
        .gender-age-patient {
          margin-top: 2px;
        }
      }
    }
  }
  @media (max-width: 765px) {
    & .toolbar {
      height: unset;
    }
    .toolbar-head {
      flex-direction: column;
    }
    & .toolbar-inner {
      .toolbar-right {
        flex-direction: column;
        button {
          width: 100%;
          margin-top: 2px;
          margin-left: 0px !important;
        }
      }
      .toolbar-left {
        margin-top: 5px;
        order: 2;
        .name-patient {
          font-weight: bold;
          font-size: 13px !important;
          color: #08aaa8;
          align-items: center;
        }
        .gender-age-patient {
          margin-top: unset !important;
        }
      }
    }
  }
  @media (min-width: 765px) and (max-width: 1200px) {
    & .toolbar {
      height: unset;
    }
    .toolbar-head {
      flex-direction: column;
    }
    & .toolbar-inner {
      .toolbar-left {
        order: 2;
        margin-top: 15px;
      }
    }
  }
`;

export { Main };
