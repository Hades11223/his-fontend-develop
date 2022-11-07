import styled from 'styled-components';

export const Main = styled.div`
    width: 100%;
    position: relative;
    & .form-control {
        background: #F8FAFB;
        border: 1px solid rgba(151, 151, 151, 0.15);
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #34335B;
        padding: 8px 10px 8px 14px;
        height: auto;
        color: #000;
        background: #fff;
        &::placeholder {
            color: #34335bad;
        }
        &:focus {
            border-color: #40a9ff;
            border-right-width: 1px !important;
            outline: 0;
            -webkit-box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
            box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
        }
    }
    .disabled {
        background-color: #DFE1E6 !important;
        cursor: not-allowed;
    }
`;