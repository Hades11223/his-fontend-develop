import styled from "styled-components";
import { date } from "components/mixin";

export const Main = styled.div`
  font-family: Nunito Sans;
 
  .ant-col {
    padding: 0 5px;

    .item-date {
      ${date};
    }
  }
  .ant-popover {
    z-index: 9999;
  }
  .main-info {
    background:
    // linear-gradient(
    //     0deg,
    //     rgba(23, 43, 77, 0.1),
    //     rgba(23, 43, 77, 0.1)
    //   ),
      #ffffff;
    border-radius: 16px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2),
    0px 0px 1px rgba(9, 30, 66, 0.31);
    width: 100%;
    padding: 0 1rem;
    .title-info {
      padding: 5px 30px;
      color: #172b4d;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
    }
    .right-info {
      float: right;
      color: #0762f7;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 24px;
      background: transparent;
      border: none;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    .table-info {
      // border-radius: 16px;
      // border-top: 2px solid #3984ff;
      // padding: 16px !important;
      overflow: auto;
      .main__container {
        margin: 1rem 0;
      }
      .ant-table-container {
        min-height: 300px;
      }
    }
    .table-header-custom {
      margin: 1rem 1rem 0rem;
      // border-bottom: 1px solid #e7e9ed;
      .title {
        font-size: 20px;
        line-height: 24px;
        color: #172b4d;
        font-weight: bold;
      }
    }
  }

  .main-kho {
    margin-top: 15px;
    background: linear-gradient(
        0deg,
        rgba(23, 43, 77, 0.1),
        rgba(23, 43, 77, 0.1)
      ),
      #ffffff;
    border-radius: 20px 0px 0px 0px;
    width: 100%;
    .title-info {
      padding: 5px 30px;
      color: #172b4d;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
    }
    .right-info {
      float: right;
      color: #0762f7;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 24px;
      background: transparent;
      border: none;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    .table-info {
      border-radius: 20px;
      border-top: 2px solid #3984ff;
      overflow: auto;
      padding-top: 2px;
      .main__container {
        margin-top: 0;
      }
      .ant-table-body {
        min-height: auto !important;
      }
    }
  }

  .row-actived {
    background: #c1f0db !important;
  }

  .group-image {
    display: flex;
    padding-left: 10px;
    .ant-col {
      padding: 0px;
    }
  }

  .responsive-col {
    width: 100%;
    // display: flex;

    //  .custom-col-2 {
    //   width: 36%;
    // }
    
    // @media screen and (max-width: 1860px) {
    //   .custom-col-3:nth-child(1),
    //   .custom-col-3:nth-child(2) {
    //     width: 50%;
    //   }
    //   .custom-col-3:nth-child(3) {
    //     width: 100%;
    //   }
    // }
    // @media screen and (min-width: 1861px) {
    //   .custom-col-3:nth-child(1),
    //   .custom-col-3:nth-child(2) {
    //     width: 40%;
    //   }
    //   .custom-col-3:nth-child(3) {
    //     width: 40%;
    //   }
    // }
  }
  .h-100 {
    height: 100%;
  }
`;
