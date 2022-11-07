import styled from "styled-components";
export const Main = styled.div`
  padding-right: 0;
  padding: 8px;
  background: #f4f5f7;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  overflow: hidden;
  min-width: 800px;
  .header {
    width: 100% !important;
    margin-top: 30px;
  }
  @media (max-width: 1200px) {
    max-height: 80%;
  }
`;
