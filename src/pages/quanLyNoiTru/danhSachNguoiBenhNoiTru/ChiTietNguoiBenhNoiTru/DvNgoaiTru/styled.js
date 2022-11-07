import styled from "styled-components";
export const Main = styled.div`
  height: 100%;
  padding: 16px;
  .table-content {
    height: 100%;
    .ant-table-wrapper {
      height: 500px;
    }
  }
  .image {
    display: flex;
    justify-content: center;
    img {
      margin-left: 10px;
      object-fit: contain;
    }
  }
  .title {
    display: flex;
    .right {
      margin-left: auto;
    }
  }
  .item {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  & svg.icon {
    width: 22px;
    height: 22px;
  }
`;
