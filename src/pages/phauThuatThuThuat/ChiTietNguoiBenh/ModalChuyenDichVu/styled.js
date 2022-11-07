import styled from "styled-components";

export const MainTeamplate = styled.div`
  padding: 16px;
  .table-service {
    background: #049254;
    border-radius: 8px;
    height: 350px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    & .header-table {
      padding: 8px 17px 8px 20px;
      & .header-table__left {
        font-style: italic;
        font-weight: bold;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
      }
    }
    .main__container {
      .ant-table-header {
        .ant-table-thead {
          .custome-header {
            min-height: 40px !important;
            .title-box {
              min-height: 40px !important;
              display: flex;
              justify-content: center;
            }
          }
        }
      }
    }
  }
`;
