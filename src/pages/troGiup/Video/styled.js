import styled from "styled-components";

export const WrapperStyled = styled.div`
  background: #f4f5f7;
  min-height: 100vh;
  height: 100vh;
  .ant-row {
    width: 100%;
  }
  .title-header {
    font-size: 18px;
    color: #172b4d;
    font-weight: 700;
    padding-left: 10px;
    margin-top: -20px;
    margin-bottom: 10px;
  }
  .left {
    > div {
      margin-right: 15px !important;
    }
  }
  .right {
    > div {
      margin-left: 15px !important;
    }
  }
`;

export const WrapperCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  margin-right: 10px;
  .input-search {
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid #cdd1d9;
    border-radius: 4px;
    padding: 2px 5px;
    margin-bottom: 10px;
    /* margin-left: 10px; */
    :focus-within,
    :hover {
      box-shadow: 0 0 0 3px #0062ff47 !important;
    }
    input::placeholder {
      font-size: 14px;
      color: #7a869a;
    }
    input {
      border: none !important;
    }
    input:hover,
    input:focus {
      box-shadow: none !important;
    }
  }
  .title-header {
    font-size: 16px;
    color: #172b4d;
    font-weight: bold;
    padding: 10px;
    margin-top: -20px;
  }
  .list-item {
    .ant-col {
      padding: 8px;
    }
  }
  .wrap-container {
    display: flex;
    .container-left {
      border-radius: 6px;
      border: 1px solid #ccc;
      width: 25%;
      padding: 2px;
      .list-item {
        height: 450px;
        padding: 10px;
        overflow-y: scroll;
        .item {
          width: 100%;
          padding: 10px 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
        .active {
          background-color: #c1d8fd;
          border-radius: 6px;
        }
      }
    }
    .container-right {
      padding: 15px;
      width: 75%;
      .content-video {
        padding: 15px 0;
        margin: -10px 0;
        height: 450px;
        overflow-y: scroll;
        &-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          .item-video {
            overflow: hidden;
            width: 30%;
            border-radius: 15px;
            box-shadow: 0px 0px 15px #ccc;
            transition: all 0.8s;
            margin-bottom: 25px;
            position: relative;
            cursor: pointer;
            img,
            .black {
              border-top-left-radius: 15px;
              border-top-right-radius: 15px;
            }
            .black {
              background-color: #172b4d;
              position: absolute;
              width: 100%;
              height: 137px;
              top: 0;
              opacity: 0.75;
              display: flex;
              align-items: center;
              justify-content: center;

              svg {
                width: 60px;
                height: 60px;
                transition: all 0.4s;
              }
            }
            .title-item {
              padding: 10px;
              font-size: 16px;
              color: #172b4d;
              font-weight: bold;
            }
            &:hover {
              box-shadow: 0px 0px 15px #00a;
              .black {
                svg {
                  transform: scale(1.4);
                }
              }
            }
          }
        }
      }
    }
  }
  .layer-video {
    display: block;
    position: fixed;
    top: 50px;
    left: 100%;
    width: 80%;
    height: 80%;
    background: black;
    transition: all 0.4s;
    transition-timing-function: cubic-bezier(0.17, 0.95, 0.7, 1.36);
    &-visible {
      left: 10%;
    }
    video {
      width: 100%;
      height: 100%;
    }
    &-close-icon {
      position: absolute;
      top: 0;
      right: 4px;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
  }
`;
