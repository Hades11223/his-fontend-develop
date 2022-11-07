import styled, { createGlobalStyle } from "styled-components";

const PopupTool = styled("div")`
  display: flex;
  & .item-tool {
    margin-left: 5px;
  }
`;
const Main = styled("div")`
  border-bottom: solid 1px #dedede;

  & .toolbar {
    background-color: #fff;
    padding: 12px;
    box-shadow: 1px 0 20px 0 rgba(69, 104, 129, 0.33),
      0px 0px 20px 0 rgba(114, 119, 160, 0.12);
    position: relative;
    z-index: 1;
    width: 100%;
    /* & .text-btn {
      min-width: 90px;
    } */
    & .btn-quick-sign {
      padding: 5px 15px;
    }
    & .item-tool {
      margin-left: 5px;
    }

    & .btn-print {
      display: flex;
      align-items: center;
      & i {
        margin-right: 5px;
      }
      & label {
        margin: 0;
        margin-left: 5px;
      }
    }
    & .file-system-tool {
      display: flex;
      @media (max-width: 650px) {
        justify-content: flex-end;
        margin-bottom: 10px;
      }
      & .item-tool {
        display: flex;
        justify-content: center;
        align-items: center;
        &:last-child {
          // margin-right: 12px;
        }
      }
    }

    & .toolbarStyle1 {
      display: flex;
      margin-top: 10px;
      @media (max-width: 800px) {
        flex-direction: column;
      }
    }
    & .editor-tool {
      display: flex;
      margin-top: 12px;
      flex: 1;
    }
    & .editor-tool-right {
      display: flex;
      align-items: center;
      & .ant-select-selector {
        width: 200px;
      }
      & .ant-select-selection-search-input {
        width: 200px;
      }
      & .title {
        margin-right: 5px;
      }
    }
    & .zoom-tool {
      display: flex;
      flex: 1;
      align-items: center;

      & .slider-tool {
        width: 120px;
        margin: 3px 6px 0 6px;
        @media (max-width: 700px) {
          flex: 1;
        }
      }
    }

    & .file-selection {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 350px;
      @media (max-width: 800px) {
        margin-top: 10px;
        align-self: flex-end;
      }
      @media (max-width: 450px) {
        width: 100%;
        flex-direction: row;
      }
      @media (max-width: 1366px) {
        & .btn-benh-an {
          align-self: start;
        }
      }

      & .arrow-btn {
        border: none;
        width: 24px;
        background: none;
        cursor: pointer;
        outline: none;
      }

      & .file-name-d {
        cursor: pointer;
        color: #08aaa8;
        width: 100%;

        & .file-name-text {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
        }
      }

      & .arrow-btn {
        display: flex;
        justify-content: center;
        &:hover {
          color: #08aaa8;
          background-color: #dafaf9;
        }
      }
    }
  }

  & .select-font-size {
    height: auto;
    padding: 0 5px;
    min-width: 50px;
  }
`;

const GlobalStyle = createGlobalStyle`
  & .popover-fontfamily {
    & .ant-popover-inner-content{
      display: flex;
        flex-direction: column;
        max-height: 200px;
        overflow: auto;
        min-width: 100px;
        padding: 0;
        & button{
          height: auto;
          padding: 10px 5px;
          border: none;
        }
    }  
  }
  & .popover-template{
      .ant-popover-content{
        width: 600px ;
      }
      & .name-bieu-mau{
        font-weight: 700;
        margin-bottom: 10px;
      }
      & .box{
        & .list-template{
          max-height: 400px;
          overflow-y: scroll;
        .template{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          :hover{
            background: #dbdbdb;
          }
          & .name {
            :hover{
              cursor: pointer;
            }
          }
          .action-item  {
            display: flex;
            .edit,.delete{
              :hover{
                cursor: pointer;
              }
            }
            .edit{
              margin-right: 10px;
            }
          }
        }
      }
      & .action{
        margin-top: 10px;
        padding:   0 10px;
      }
      }
      & .ant-popover-inner-content{
        padding: 0 0 10px 0;
        
      }
   
    }  
`;

export { Main, PopupTool, GlobalStyle };
