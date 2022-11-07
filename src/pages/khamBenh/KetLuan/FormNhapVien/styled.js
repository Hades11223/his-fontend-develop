import styled from "styled-components";

export const SelectGroupNhapVien = styled.div`
    line-height: 25px;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
        20px;
    background-position-y: 12px;
    background-size: 5px 28px;
    display: flex;
    /* margin-top: 10px; */
    > span {
        display: inline-block;
        padding-right: 5px;
        background: #ffffff;
        vertical-align: sub;
        flex: 1 0 auto;
        /* height: ${(props) => (props.dimension?.firstHeight ? props.dimension?.firstHeight + "px" : "auto")}; */
        /* height: ${(props) => (props.dataHeight ? props.dataHeight + "px" : "auto")}; */
    }
    .select-box {
        display: inline-block;
    .ant-select-selector {
        margin-top: -13px;
        background: none;
        border: 0;
    }
    }
    .red-text {
        color: #ef4066;
    }
    .select-box {
        display: inline-block;
        & .ant-select {
            width: 100%;
            & .ant-select-selector {
            margin-top: -13px;
            background: none;
            border: 0;
            }
        }
    }
    .select-box-nhap-vien {
        display: inline-block;
        width: 100%;
        & .ant-select .ant-select-multiple .ant-select-allow-clear .ant-select-show-search{
            width: auto
        }
        & .ant-select {
            width: 100%;
            &.ant-select-show-search {
                width: auto
            }
            & .ant-select-selector {
            margin-top: -13px;
            background: none;
            border: 0;
                & .ant-select-selection-overflow {
                    width: 380px;
                }
            }
        }
    }
`;