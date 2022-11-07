import styled from "styled-components";

export const Main = styled.div`
    position: relative;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px;
    background: #f4f5f7;
    & .bg-color1 {
      display: flex;
      .line {
        margin: 20px 2px 20px 5px;
        background: #ffffff;
        box-shadow: 0px 0px 15px rgba(9, 30, 66, 0.07);
        border-radius: 12px;
        flex: 1;
      }
      & .image {
        margin: 25px 2px 20px 5px;
        
        & .item {
          box-shadow: 0px 0px 15px rgb(9 30 66 / 7%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          cursor: pointer;
          svg {
          height: 44px;
          width: 44px;
          rect {
              fill: #0762F7 !important;
            }
          }
          rect:hover {
              fill: #032254 !important;
            }
          }
        }
    }
    
    .button-bottom {
      align-items: center;
      margin-top: 15px;
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
    }
  }
  & input::placeholder,
  & textarea::placeholder {
    font-size: 14px !important;
    font-weight: normal;
  }
  & textarea {
    padding-top: 10px;
  }
  & .submit-form-button {
    img {
      max-height: 15px;
    }
    & .hotKey {
      display: inline-block;
      margin-left: 5px;
    }
`;
