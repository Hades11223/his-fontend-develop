import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import utImg from "assets/images/kiosk/success.png";
import khongutImg from "assets/images/kiosk/delete-2.png";
import { btnGreen, btnBlue } from "../common/variables";
import { KiosWrapper } from "../components";
import Button from "../common/Button";
import { MainWrapper } from "./styled";

const SelectPriorityPerson = ({ updateData, step }) => {
  const history = useHistory();
  const handleClick = (prior) => () => {
    updateData({
      uuTien: prior,
      step: step + 1,
    });

    history.push("/kiosk/lua-chon-hinh-thuc-kham");
  };
  return (
    <KiosWrapper step={step}>
      <MainWrapper>
        <div className="top">
          <div className="header">
            <div className="title">KIOSK Đăng ký khám bệnh tự động</div>
            <p className="sub-header">Xin kính chào Quý khách!</p>
          </div>
        </div>
        <div className="content">
          <p className="title">Bạn có thuộc đối tượng ưu tiên không?</p>
          <ul className="list">
            <li>Cấp cứu</li>
            <li>Trẻ em dưới 6 tuổi</li>
            <li>Người khuyết tật nặng</li>
            <li>Người từ 80 tuổi trở lên</li>
            <li>Người có công với cách mạng</li>
            <li>Phụ nữ có thai</li>
          </ul>
        </div>
        <div className="btn-action">
          <Button
            onClick={handleClick(true)}
            rounded
            className="btn-sm"
            bxShadow={btnGreen}
            padding={60}
          >
            <img src={utImg} alt="utImg" /> <span>Ưu tiên</span>
          </Button>
          <Button
            onClick={handleClick(false)}
            rounded
            className="btn"
            bxShadow={btnBlue}
            padding={60}
            width={476}
          >
            <img src={khongutImg} alt="khongutImg" /> <span>Không ưu tiên</span>
          </Button>
        </div>
      </MainWrapper>
    </KiosWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    step: state.kios.step,
  };
};

const mapDispatchToProps = ({ kios: { updateData } }) => ({
  updateData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPriorityPerson);
