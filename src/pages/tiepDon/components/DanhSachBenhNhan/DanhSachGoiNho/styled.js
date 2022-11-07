import styled from 'styled-components';
import { Col } from 'antd';
import { panel } from "components/mixin";

export const Main = styled.div`
    &.pannel {
        /* ${panel}; */
        /* height: 65px; */
        width: 100%;
        border: 1px solid;
        height: 157px;
        border: 1px solid #172b4d40;
        border-radius: 8px;
        .title {
            background: linear-gradient(0deg, rgba(23, 43, 77, 0.05), rgba(23, 43, 77, 0.05)), #FFFFFF;
            height: 24px;
            font-family: Nunito Sans;
            font-style: normal;
            font-weight: bold;
            font-size: 13px;
            line-height: 24px;
            color: #172B4D;
            padding: 3px 10px;
        }
    }
    .ant-table-header {
        border-radius: unset;
    }
    .ant-table-header table::before {
        content: "";
    }
    .custome-header .title-box {
        border-bottom: unset;
    }
    .ant-table-container {
        tr {
            td:first-child {
                    padding-left:12px!important;
                }
        }
        tr {
            th:first-child {
                .title-box {
                    padding-left:12px;
                }
            }
            th {
                .title-box {
                    padding: 7px ​0 7px 6px;
                }
            }
        }
        .ant-table-body{
            height: 99px;
            min-height: 99px;
            .ant-table-tbody {
                .ant-table-row {
                    cursor: pointer;
                }
            }
        }
    }
    @media (max-width:1200px) {
        .ant-table-container {
            tr {
                td:first-child {
                        text-align:center;
                    }
            }
            tr {
                th:first-child{
                    .title-box{
                        text-align:center;
                    }
                }
            }
        }
    } 
`;