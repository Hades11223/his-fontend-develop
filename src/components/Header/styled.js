import styled from 'styled-components';

export const Main = styled.div`
    position: relative;
    width: 100%;
    .header {
        padding: 0 30px 0 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #03317C;
        /* box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31); */
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        width: 100%;
        height: 28px;
        margin-bottom: 10px;
        .content {
            /* margin-top: -17px; */
            font-style: normal;
            font-weight: bold;
            font-size: 13px;
            line-height: 24px;
            color: #ffffff;
            &-note{
                /* margin-top: -17px; */
                font-size: 14px;
                line-height: 18px;
                color: white;
                span{
                    font-weight: 900;
                }
            }
            /* @media screen and (min-width: 1200px) and (max-width: 1599px) {
                font-size: 15px !important;
                &-note {
                        font-size: 11px;
                    }
            } */
            
        }
        @media (min-width: 1440px) and (max-width: 1920px){
            height: 46px;
            .content {
                font-size: 22px;
                &-note {
                    font-size: 18px;
                }
            }
        }
    }
`;