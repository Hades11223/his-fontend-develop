import styled from "styled-components";

export const Main = styled.div`
  @media screen and (min-width: 768px) {
    & .select__goiDichVu {
      width: calc(100% - 15px);
    }

    & .searchDV {
      width: calc(100% - 5px) !important;
      margin-left: 5px;
    }
    & .input__wrapper {
      display: flex;
      width: calc(100% - 15px);
      .input-goi {
        flex: 1;
      }
      &-2 {
        width: calc(100% - 5px) !important;
        margin-left: 5px;
      }
    }
  }
  & .noPadding {
    padding: 10px 0 !important;
  }
  .info-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
  }

  .success-title {
    background: #fc3b3a;
    border-radius: 16px;
    padding: 8px 12px;
    margin: 16px;
    display: flex;
    align-items: center;

    span {
      color: #fff;
      font-size: 14px;
      font-weight: 900;
    }

    .check-icon {
      font-size: 24px;
      padding-right: 10px;
    }
  }

  .success-content {
    margin: 5px 10px;

    .text {
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1; /* number of lines to show */
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .ant-col {
    padding: 10px;
  }

  .input-goi {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
      20px;
    background-position-y: 7px;
    background-size: 5px 25px;
    border: none;
    width: 100%;
  }

  .ma-disable {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .header {
    background-color: #0762f7;
    color: #fff;
    padding: 12px;
    font-size: 16px;
  }

  .table-service {
    height: 300px;
    border: 1px solid #172b4d40;
    border-style: none solid solid solid;
    /* overflow: scroll; */
    .ant-table-wrapper {
      height: 295px;
    }
  }

  .select-goi-item {
    background-color: #0762f7;
  }

  .list-goi-dichvu {
    height: 300px;
    border: 1px solid #172b4d40;
    border-style: none solid solid solid;
    overflow: scroll;
  }
`;

export const MainChoose = styled.div`
  .header {
    background-color: #049254;
    color: #fff;
    padding: 12px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }

  .content {
    height: 300px;
    border: 2px dashed #049254;
    border-style: none dashed dashed dashed;

    .item {
      background: linear-gradient(
          0deg,
          rgba(23, 43, 77, 0.1),
          rgba(23, 43, 77, 0.1)
        ),
        #ffffff;
      border-radius: 3px;
      font-size: 14px;
      padding: 5px;
      margin: 5px;
    }
  }
`;
