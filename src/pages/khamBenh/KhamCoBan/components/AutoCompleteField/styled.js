import styled, { css } from "styled-components";

export const Main = styled.div`
  line-height: 25px;
  /* background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
    20px;
  background-position-y: 10px;
  background-size: 5px 25px; */
  display: flex;

  .label {
    padding-right: 5px;
    background: #ffffff;
  }

  .autocomplete-editable {
    flex: 1;

    .ant-select-selector {
      background: transparent;
      border: none;
    }
  }

  textarea {
    resize: none;
    overflow: hidden;
    flex: 1;
    border: none;
    padding: 0;
    line-height: 25px;
    height: 5px;

    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 6 6"><circle cx="3" cy="3" r="0.4" fill="black" /></svg>')
      20px;
    background-position-y: 7px;
    background-size: 5px 25px;
  }
`;
