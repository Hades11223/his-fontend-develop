import styled,{ createGlobalStyle } from "styled-components";
import { PhieuChiDinhWrapper } from "../styled";

export const Main = styled(PhieuChiDinhWrapper)`
    .red {
        color : #FF0000
    }
`;
export const GlobalStyle = createGlobalStyle`
    .date-custom-kham-benh-hen-kham {
        .ant-picker-header-super-prev-btn{
            display: none;
        }
        /* .ant-picker-header-prev-btn{
            margin-left: 15px !important;
        } */
        .ant-picker-header-super-next-btn{
            display: none;
        }
        /* .ant-picker-header-next-btn{
            margin-right: 15px !important;
        } */
    }
`;
