import styled, { keyframes } from "styled-components";

const paging_item_moving = keyframes`
0% {
  opacity: 0;
  transform: translateX(-100%);
}
100% {

}
`;

export const GroupPagingStyled = styled.div`
  background: transparent;
  padding: 0.1em;
  padding-bottom: 0;
  padding-right: 1em;
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 0 ${({ minimumFlex }) => minimumFlex} !important;
  min-width: ${({ minimumFlex }) => minimumFlex};
  flex-grow: ${({ grow }) => grow} !important;
  :first-child {
    padding-left: 0;
  }
  :last-child {
    padding-right: 0;
  }
  .group-content {
    height: calc(100%);
    width: calc(100% - 0.41666666666vw);
    background: var(--background); //#000e25
    border-radius: 0.83333333333vw;
    padding: 0.41666666666vw;
    position: relative;
    .title {
      font-weight: 900;
      font-size: 1.25vw;
      line-height: 1.69270833333vw;
      color: var(--text); //#ffffff
    }
    .content-cards {
      display: flex;
      flex-direction: ${({ vertical }) => (vertical ? "column" : "row")};
      justify-content: flex-start;
      height: 100%;
      flex: 1 0 calc(100% / 3);
      height: 100%;
      .paging-card-wrapper {
        height: 100%;
        padding: 0.41666666666vw;
        padding-bottom: 4vw;
        width: calc(100% / ${(props) => props.numPerPage || 3});
        .paging-card-content {
          padding: 0.41666666666vw;
          width: 100%;
          height: 100%;
          border: 0.10416666666vw solid #56ccf2;
          border-radius: 0.83333333333vw;
          display: flex;
          flex-direction: column;
          color: var(--text); //#ffffff
          position: relative;
          .rating-number {
            position: absolute;
            right: calc(100vw / 3840 * 8);
            bottom: 0.7em;
            padding: 0.41666666666vw;
            font-weight: 900;
            font-size: 1vw;
            line-height: 1.5vw;
            color: var(--text); //#ffffff
            border: 0.10416666666vw solid #ffffff;
            border-radius: 50%;
            width: 1.78333333333vw;
            height: 1.78333333333vw;
            align-items: center;
            text-align: center;
            display: flex;
            justify-content: center;
          }
          .name {
            font-weight: 900;
            font-size: 1.171875vw;
            line-height: 1.84895833333vw;
            min-height: 1.84895833333vw;
            overflow-x: scroll;
            overflow-y: hidden;
            ::-webkit-scrollbar {
              display: none;
            }
            display: inline-flex;
            text-overflow: clip;
            white-space: nowrap;
          }
          .bhyt {
            height: 1.5vw;
            > span {
              font-weight: 900;
              font-size: 1.171875vw;
              line-height: 1.84895833333vw;
              background: #1c75bc;
              border-radius: 8px;
              width: auto;
              padding: 0.1em;
              color: white;
            }
          }
          .fields {
            margin-top: 1em;
            display: flex;
            flex-direction: column;
            .field {
              ::webkit-scrollbar {
                display: none;
              }
              display: inline-flex;
              overflow: hidden;
              white-space: nowrap;
              width: 100%;
              flex-direction: row;
              justify-content: flex-start;
              .label {
                font-weight: 900;
                font-size: 1.171875vw;
                line-height: 1.84895833333vw;
                color: var(--text); //#ffffff
                white-space: nowrap;
              }
              .value {
                &.two-line {
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: pre-wrap;
                }

                overflow: scroll;
                ::-webkit-scrollbar {
                  display: none;
                }
                /* display: inline-flex; */
                font-weight: 400;
                /* text-overflow: clip; */
                font-size: 1.171875vw;
                line-height: 1.84895833333vw;
                color: var(--text); //#ffffff
                white-space: initial;
              }
              @media all and (max-width: 1367px) {
                .label,
                .value {
                  font-size: 1vw;
                  line-height: 1.5vw;
                }
              }
            }
          }
          .advanceMoney,
          .hospitalFee {
            margin-top: 1em;
            > div:first-child {
              font-weight: 400;
              font-size: 1.30208333333vw;
              line-height: 1.77083333333vw;
              color: var(--text); //#ffffff
            }
            > div:last-child {
              font-weight: 900;
              font-size: 1.5vw;
              line-height: 1.8vw;
            }
            @media all and (max-width: 1367px) {
              > div:first-child {
                font-size: 1.1vw;
                line-height: 1.3vw;
              }
              > div:last-child {
                font-size: 1.2vw;
                line-height: 1.5vw;
              }
            }
          }
          .advanceMoney {
            > div:last-child {
              color: #ff0000;
            }
          }
          .hospitalFee {
            > div:last-child {
              color: #27ae60;
            }
          }
        }
      }
      ${({ customStyled = "" }) => customStyled}
    }
    .pagination {
      .ant-pagination-options {
        display: none;
      }
      .ant-pagination-item-ellipsis {
        color: var(--text3); //#56ccf2
        opacity: 0.7;
      }
      position: absolute;
      bottom: 0;
      width: 100%;
      justify-content: center;
      align-items: center;
      .first-page,
      .last-page {
        font-size: 1.04166666667vw;
        line-height: 1.43229166667vw;
        text-align: center;
        align-items: center;
        justify-content: center;
        display: flex;
        color: var(--text3); //#56ccf2
        width: 2.39583333333vw;
        height: 1.953125vw;
        background: transparent;
        cursor: pointer;
      }
      .ant-pagination {
        padding: 0.26041666666vw 0 !important;
        button {
          font-size: 1.04166666667vw;
          line-height: 1.43229166667vw;
          text-align: center;
          align-items: center;
          justify-content: center;
          display: flex;
          color: var(--text3); //#56ccf2
          width: 2.39583333333vw;
          height: 1.43229166667vw;
          background: transparent;
        }
        li {
          font-weight: 700;
          font-size: 1.04166666667vw;
          line-height: 1.43229166667vw;
          text-align: center;
          color: var(--text3); //#56ccf2
          width: 2.39583333333vw;
          height: 1.43229166667vw;
          background: transparent;
          border: none;
        }
        .ant-pagination-item-active {
          /* animation: ${paging_item_moving} 200ms ease-in-out; */
          border: solid 0.10416666666vw var(--header-text); //white
          border-radius: 50%;
          color: var(--text3); //white
          width: 2vw;
          height: 2vw;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          a {
            color: var(--text3) !important; //white
          }
        }
        @media all and (max-width: 1367px) {
          button {
            font-size: 1vw;
            line-height: 1.2vw;
            width: 1.3vw;
            height: 1.3vw;
          }
          li {
            font-size: 1vw;
            line-height: 1.2vw;
            width: 1.3vw;
            height: 1.3vw;
          }
          .ant-pagination-item-active {
            width: 1.3vw;
            height: 1.3vw;
          }
        }
      }
    }
  }
  .super-script {
    position: relative;
    top: -0.35em;
    font-size: 70%;
  }
`;
