import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  padding: 16px;

  .btn-custom {
    padding-right: 10px;
  }

  .dieuTriSoKet {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    justify-content: center;
  }
  .image {
    display: flex;
    justify-content: center;
    img {
      margin-left: 10px;
    }
  }
  .title {
    display: flex;
    .right {
      margin-left: auto;
    }
  }
  .item {
    display: flex;
    overflow: hidden;
  }

  .btn-tool {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .ic-action {
      font-size: 20px;
    }
  }

  /* .table-content {
    .ant-table-wrapper {
      height: 500px;
    }
  } */
`;
