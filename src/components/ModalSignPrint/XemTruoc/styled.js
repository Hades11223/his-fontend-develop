import styled from "styled-components";
import Box from "../Box";

export const Main = styled(Box)`
  & .section-body {
    height: 100% !important;
    background: #bababa;
    & > .ant-spin-spinning {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
