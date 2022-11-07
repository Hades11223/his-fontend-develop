import styled from "styled-components";

export const MainChoose = styled.div`
  .choose-header {
    background-color: #049254;
    color: #fff;
    padding: 12px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }

  .choose-content {
    height: 300px;
    border: 2px dashed #049254;
    border-style: none dashed dashed dashed;
    overflow: hidden;

    .ant-table-wrapper {
      height: 290px;
    }

    .item-container {
      display: contents;

      .item {
        background: linear-gradient(
            0deg,
            rgba(23, 43, 77, 0.1),
            rgba(23, 43, 77, 0.1)
          ),
          #ffffff;
        border-radius: 3px;
        font-size: 14px;
        padding: 5px;
        margin: 5px;
      }
    }
  }
`;
