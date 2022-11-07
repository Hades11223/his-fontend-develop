import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  .top-level-category {
    background-color: #f3f4f7;
    padding: 0px 30px;
    padding-top: 10px;
    .container {
      padding: 0px;
    }
  }
  .title {
    padding: 10px 40px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .main {
    width: 100%;
    padding: 10px 100px;
    .text {
      color: #172b4d;
      font-size: 1rem;
      margin-bottom: 10px;
      min-width: 180px;
    }
    .text-bold {
      font-size: 1.1rem;
      font-weight: 600;
    }
    .group-item {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .ant-select {
        width: 200px;
      }
      &-input {
        display: flex;
        justify-content: center;
      }
    }
  }
  .body {
    /* background: #F4F5F7; */
    font-family: "Nunito Sans" !important;
    position: relative;
    margin: auto;
    .wrap-content {
      border: 1px solid #03317c;
      border-radius: 15px;
      box-shadow: 0 3px 0 #03317c;
      overflow: hidden;
      .title {
        background-color: #03317b;
        color: white;
      }
      .action {
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
        padding-bottom: 10px;
      }
    }
  }
`;
