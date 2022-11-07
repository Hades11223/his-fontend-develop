import { message } from "antd";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { encryptAES } from "utils";

const WrapperStyled = styled.div`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 2px 10px #eee;
  cursor: pointer;
  transform: scale(1);
  transition: 0.5s all;

  .item-bg {
    background-color: #56ccf2;
    height: 65px;
    display: flex;
    justify-content: center;

    img {
      width: 148px;
      height: 65px;
    }
  }

  .title-item {
    border-top: 2px solid #fc3b3a;
    padding: 3px;
    font-size: 14px;
    font-weight: 700;
    text-align: center;
  }
  :hover {
    transform: scale(1.11);
  }
`;

const Card = ({ icon, title, value, _filter }) => {
  const IconSvg = icon.default;

  const handleClick = () => {
    _filter({ ma: value })
      .then((dataFilter) => {
        if (dataFilter) {
          if (
            dataFilter.hdsd.substr(
              dataFilter.hdsd.length - 3,
              dataFilter.hdsd.length
            ) !== "pdf"
          ) {
            message.error("Tài liệu hướng dẫn không phải định dạnh pdf");
          } else
            window.open("/tro-giup/html-hdsd?" + encryptAES(dataFilter.hdsd));
        } else {
          message.error("Chưa có tài liệu hướng dẫn");
        }
      })
      .catch((e) => {
        message.error("Chưa có tài liệu hướng dẫn");
      });
  };

  return (
    <WrapperStyled onClick={handleClick}>
      <div className="item-bg">
        {/* <img src={bg} alt="iSofh" /> */}
        <IconSvg width={155} height={"100%"} />
      </div>
      <div className="title-item">{title}</div>
    </WrapperStyled>
  );
};

export default connect(
  () => ({}),
  ({ hdsd: { _filter } }) => ({ _filter })
)(Card);
