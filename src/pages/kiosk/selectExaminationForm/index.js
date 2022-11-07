import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthWrapper from "components/AuthWrapper";
import khamBhytImg from "assets/images/kiosk/kham-bhyt.png";
import khongBhytImg from "assets/images/kiosk/khong-bhyt.png";
import { KiosWrapper } from "../components";
import Button from "../common/Button";
import { MainWrapper } from "./styled";
import { Checkbox, Popover } from "antd";
import IcExclam from "assets/images/xetNghiem/icExclam.png";
import "./styled.css";
import { checkRole } from "utils/role-utils";

const BHYT = "BHYT";

const SelectExaminationForm = ({ step, updateData }) => {
  const history = useHistory();
  const [priority, setPriority] = useState(false);
  const handleClick = (type) => () => {
    updateData({
      step: step + 1,
      doiTuong: type === BHYT ? 2 : 1,
    });
    if (type === BHYT) {
      history.push("/kiosk/dang-ky-kham-bhyt");
    } else {
      history.push("/kiosk/dang-ky-thong-tin-ca-nhan");
    }
  };

  const handleClickPrio = () => {
    setPriority(!priority);
    updateData({
      uuTien: !priority,
    });
  };

  const content = (
    <div>
      <label>1. Cấp cứu</label>
      <label>2. Trẻ em dưới 6 tuổi</label>
      <label>3. Người khuyết tật nặng</label>
      <label>4. Người từ 80 tuổi trở lên</label>
      <label>5. Người có công với cách mạng</label>
      <label>6. Phụ nữ có thai</label>
    </div>
  );

  return (
    <KiosWrapper  step={step}>
      <MainWrapper>
        <div className="top">
          <div className="header">
            <div className="title">KIOSK Đăng ký khám bệnh tự động</div>
            <p className="sub-header">Xin kính chào Quý khách!</p>
          </div>
          <div className="desc">
            Vui lòng chọn một trong các tính năng sau để đăng ký khám!
          </div>
        </div>
        {checkRole(["kiosk_dangKy_uuTien"]) && (
          <div className="middle">
            <Checkbox onClick={() => handleClickPrio()}>
              <span className="title">Người bệnh là đối tượng ưu tiên</span>
            </Checkbox>
            <Popover
              className="content-uu-tien"
              content={content}
              placement="topRight"
            >
              <img src={IcExclam}></img>
            </Popover>
          </div>
        )}

        <div className="btn-action">
          <AuthWrapper accessRoles={["kiosk_dangKy_khamBHYT"]}>
            <Button
              onClick={handleClick(BHYT)}
              rounded
              className="btn-md"
              bxShadow="#0762F7"
              padding={60}
            >
              <img src={khamBhytImg} alt="bhyt" /> <span>Khám BHYT</span>
            </Button>
          </AuthWrapper>
          <Button
            onClick={handleClick("")}
            rounded
            className="btn-md"
            bxShadow="#05c270"
            padding={60}
          >
            <img src={khongBhytImg} alt="bhyt" /> <span>Không BHYT</span>
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
)(SelectExaminationForm);
