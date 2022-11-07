import styled from "styled-components";

export const Main = styled.div`
  background: #f4f5f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 210px;
  padding: 10px 20px;

  .ant-picker {
    width: 100%;
  }
  .ant-picker-input > input[disabled] {
    color: rgba(0, 0, 0, 0.95);
  }
`;
