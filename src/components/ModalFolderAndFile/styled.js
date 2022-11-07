import styled, { createGlobalStyle } from "styled-components";
export const Main = styled.div`
  & .table-folder {
    .ant-table {
      padding-bottom: 20px;
    }
    .ant-table-body {
      max-height: 400px !important;
      min-height: unset !important;
      padding-bottom: 20px;
      td {
        border: none !important;
      }
    }
  }
  & .name-folder {
    .ant-image {
      display: none;
    }
    .name {
      display: flex;
      align-items: center;
      :hover {
        cursor: pointer;
      }
      .icon {
        margin-right: 10px;
      }
      .icon-image {
        width: 20px;
        height: 20px;
      }
    }
  }
  & .action {
    svg {
      margin: 0 5px;
      width: 20px;
      height: 20px;
    }
    .icon-edit {
      svg {
        path {
          fill: #0762f7;
        }
      }
    }

    .icon-delete {
      svg {
        path {
          fill: #fc3b3a;
        }
      }
    }
  }
`;
export const GlobalStyle = createGlobalStyle`

& .icon-back{
    path {
        fill: #172b4d;
    }
    :hover{
      cursor: pointer;
    }
}
& .modal-folder-and-file{
    .ant-modal-body{
        ::before{
            border-top: none !important;
        }
    }
    .button-content{
    display: flex;
    align-items: center;
    min-width: 60px;
    justify-content: center;
    svg{
      margin-left : 10px
    }
    
  }
    .title-box{
      border-bottom: none !important;
    }
}
& .popover-upload{
  .ant-popover-inner-content{
    padding: 0 !important;
  }
}
   & .list-action-upload{
    p{
        :hover{
            cursor: pointer;
            background: #dedede;
        }
        margin: 0 !important;
    }
    .icon-folder{
        border-bottom: 1px solid #ccd1d7;
    }

    .item{
      
      padding: 5px 10px;
        span{
            svg{
                margin-right: 10px;
                fill: #0762F7 ;
                width: 20px;
                height: 20px;
                path {
                    fill: #0762F7 ;
                }
            }
        }
    }
    .icon-upload-file{
      padding: 10px 10px 5px 10px ;
    }
   }
`;
