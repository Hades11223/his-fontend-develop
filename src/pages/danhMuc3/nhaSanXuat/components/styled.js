import styled, { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`

& .ant-modal-content{
    border-radius : 8px !important ; 
}
& .ant-modal-header{
    border-radius : 8px !important ; 
}
& .ant-modal-body{
    max-height: calc(100vh - 260px);
    overflow-y: scroll;
}
& .ant-modal-footer{
    display: flex;
    justify-content: space-between;
}
`;
export const Main = styled("div")``;
