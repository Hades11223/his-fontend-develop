import styled from "styled-components";

export const PatientInfoWrapper = styled("div")`
  display: flex;
  padding: 7px 20px;
  margin: 7px 2px 0 2px;

  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    #0762f7;
  box-shadow: 0px 1px 8px #ddd;
  border-radius: 3px;

  .name {
    font-weight: 900;
    line-height: 25px;
    color: #172b4d;
    padding-left: 10px;
    & .more-info {
      font-weight: 500;
    }
  }
  .benhAn {
    color: #0762f7;
    font-weight: 900;
    border: 1px dashed #0762f7;
    box-sizing: border-box;
    padding: 0 6px;
  }

  .content {
    color: #172b4d;
    font-weight: normal;
    padding-left: 10px;
    .bold {
      font-weight: 900;
      line-height: 25px;
      color: #172b4d;
    }
  }
`;
