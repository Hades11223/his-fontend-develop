import styled from "styled-components";
import { Card } from "components";
export const Main = styled(Card)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  .ant-row {
    width: 100%;
  }
  .info {
    padding: 15px;
  }
  .title {
    padding: 10px 0px 0px 10px;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
  }

  .action-bottom {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  & .middile {
    flex: 1;
    overflow: auto;
  }
`;
