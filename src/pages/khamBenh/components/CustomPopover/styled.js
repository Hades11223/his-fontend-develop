import styled, { createGlobalStyle } from "styled-components";

export const Main = styled("div")`
& span{
  display: flex;
}
`;
export const ContentWrapper = styled("div")`
  width: ${(props) => (props.width ? `${props.width}px` : "600px")};
  position: relative;
  z-index: 1001;
  background: white;
  padding: ${(props) => (props.overlayClassName ? `10px` : "0px")};
  .content-popover {
    z-index: 100;
    .popover-btn-list {
      display: flex;
      justify-content: flex-end;
    }
  }
`;
// export const GlobalStyled = createGlobalStyle`
//     .custom-popover {
//       z-index: 100;
//     }
// `;

export const GlobalStyled = createGlobalStyle`
.custom-popover {
  z-index: 50;
}
.popover-custom-all{
  .ant-popover-inner-content{
    padding: 0px !important;
  }
  .ant-popover-arrow{
    z-index: 1001;
  }
  &_res{
      .ant-form{
        padding: 8px 8px 0px 8px;
        .ant-form-item-label{
          padding : 0px ; 
        }
        .ant-form-item{
          margin-bottom : 15px !important;
        }
      }
  }
  label {
      /* margin-bottom: 4px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 600;
      color: #172b4d; */
      &.ant-form-item-required {
        &:after {
          display: inline-block;
          margin-right: 4px;
          color: red;
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          line-height: 1;
          content: "*";
        }
        &:before {
          display: none !important;
        }
      }
    }
  }
  
`;
