import styled from "styled-components";

export const Main = styled.div`
  margin: 5px 20px;

  .table-content {
    .ant-table-wrapper {
      height: ${(props) => (props.discountBy == 1 ? "217px" : "250px")};
    }
  }

  .footer-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 16px;
    & .selected-item {
      flex: 1;
    }

    .back-text {
      color: #0762f7;
    }
  }

  .info-content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;

    .form-content-item {
      padding-bottom: 10px;
    }

    .form-item {
      padding: 0 10px;
    }

    .form-content-text {
      font-weight: 700;
      font-size: 13px;
      line-height: 20px;
      color: #172b4d;
    }
  }

  .table-content {
    .choose-header {
      background-color: #049254;
      color: #fff;
      padding: 12px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
    }

    .choose-content {
      height: 440px;
      border: 2px dashed #049254;
      border-style: none dashed dashed dashed;

      .ant-table-wrapper {
        height: 435px;
      }

      .ant-input-affix-wrapper {
        background-color: unset !important;
        border: none;
      }
    }
  }

  .success-content {
    margin: 5px 16px;

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

  .hopdong-table-title {
    color: #172b4d;
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
    margin: 10px 0;
  }
`;
