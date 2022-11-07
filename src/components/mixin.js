const fontSizeTitle = "28px";
const fontSizeLabel = "14px";
const fontSizeText = "16px";
const displayFlex = (justifyContent, alignItem) => `
    display: flex;
    justify-content: ${justifyContent};
    align-items: ${alignItem};
`;
const item = () => `
    margin-top: 14px;
    font-weight: 600;
    font-size: ${fontSizeLabel};
    line-height: 16px;
    color: white;
    width: 100%;
`;

const input = () => `
    .label {
        font-size: 13px;
        line-height: 16px;
        color: #172B4D;
        font-weight: 600;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        @media(min-width: 1440px) {
            font-size: 16px;
        }
    }
    .ant-input, .form-control, ant-input-disabled {
        font-weight: 600;
        margin-top: 2px;
        color: #172B4D;
        font-size: 13px;
        line-height: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        height: 32px;
        width: 100%;
        &::placeholder {
            color: #7A869A;
            font-size: 13px;
            line-height: 20px;
        }
        @media(min-width: 1440px) {
            height: 40px;
            font-size: 18px;
            &::placeholder {
                font-size: 16px;
            }
        }
    }
`;
const date = () => `
    .label {
        font-size: 13px;
        line-height: 16px;
        color: #172B4D;
        font-weight: 600;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        @media(min-width: 1440px) {
            font-size: 16px;
        }
    }
    .ant-input, .ant-picker {
        margin-top: 2px;
        font-size: 13px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        height: 32px;
        width: 100%;
        line-height: 20px;
        font-weight: 600;
        color: #172B4D;
        &::placeholder {
            color: #7A869A;
            font-size: 13px;
            line-height: 20px;
        }
        .ant-picker-input {
            input {
                font-weight: 600;
                font-size: 13px;
                color: #172B4D;
                line-height: 20px;
                &::placeholder {
                    color: #7A869A;
                    font-size: 13px;
                    line-height: 20px;
                }
            }
            .ant-picker-suffix {
                font-size: 20px;
                color: #7A869A;
            }
        }
        @media(min-width: 1440px) {
            height: 40px;
            font-size: 18px;

            .ant-picker-input {
                input {
                    &::placeholder {
                        font-size: 16px;
                    }
                }
            }
        }
    }
`;
const select = () => `
    .label {
        font-size: 13px;
        line-height: 16px;
        color: #172B4D;
        font-weight: 600;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        @media(min-width: 1440px) {
            font-size: 16px;
        }
    }
    .ant-select {
        margin-top: 2px;
        font-weight: 600;
        font-size: 13px;
        color: #172B4D;
        background-color: white;
        border-radius: 3px;
        height: 32px;
        width: 100%;
        .ant-select-selector {
            border-radius: 4px;
            border: 1px solid #e0e0e0;
            height: 32px;
            color: #172B4D;
            line-height: 20px;
            font-weight: 600;
            .ant-select-selection-item {
                padding-top: 2px;
                ${displayFlex("flex-start", "center")};
            }
        }
        .ant-select-selection-search, .ant-select-selection-item, .ant-select-selection-placeholder {
            font-family: "Nunito Sans" !important;
        }
        .ant-select-selection-placeholder {
            font-size: 13px;
            line-height: 28px;
            color: #7A869A;
        }
        .ant-select-selection-item {
            padding-top: 0px;
        }
        @media screen and (max-width:1199px) {
            .ant-select-arrow {
                color: #2f588873 !important;
                font-size: 13px !important;
                right: 12px !important;
            }
        }
        @media(min-width: 1440px) {
            height: 40px;
            font-size: 18px;
            .ant-select-selector {
                height: 40px;
            }
            .ant-select-selection-placeholder {
                line-height: 40px !important;
            }
            &::placeholder {
                font-size: 16px;
            }
        }
    }
`;
const button = () => `
    background: #0762F7;
    mix-blend-mode: normal;
    box-shadow: 0px 3px 0px #03317c;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    color: #FFFFFF;
    padding: 8px;
    line-height: 20px;
    
    &:hover {
        cursor: pointer;
        transition: 0.3s;
        background-color: #9e9e9e;
        color: white;
    }
    &:active {
        background-color: #d4d4d4;
        transition: 0.3s;
        -webkit-box-shadow: 0px 3px 6px 1px rgba(209, 207, 209, 1);
        -moz-box-shadow: 0px 3px 6px 1px rgba(209, 207, 209, 1);
        box-shadow: 0px 3px 6px 1px rgba(209, 207, 209, 1);
    }
    &.btn-cancel {
        background: #FFFFFF;
        border: 1px solid #0762F7;
        color: #172B4D;
        padding: 8px 30px;
    }
    &.btn-accept {
        padding: 8px 30px;
        span {
            padding-right: 10px;
        }
    }
`;
const time = () => `
    margin-top: 2px;
    border: 2px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 3px;
    height: 37px;
    width: 100%;
`;
const checkbox = () => `
    font-weight: 400;
    line-height: 20px;
    margin-left: 0px;
    span {
        font-size: 16px;
        color: #172B4D ;
    }
`;

const panel = () => `
    height: 243px;
    background: #f2f2f2;
    box-shadow: 0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31);
    border-radius: 16px 16px 0 0;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #42526e;
`;
export {
    fontSizeTitle,
    fontSizeLabel,
    fontSizeText,
    displayFlex,
    item,
    input,
    date,
    select,
    button,
    time,
    checkbox,
    panel
}