import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AuthWrapper from "components/AuthWrapper";
import { ROLES } from 'constants/index';
import contactImg from "assets/images/kiosk/contact.png";
import phoneImg from "assets/images/kiosk/phone.png";
import qrcodeImg from "assets/images/kiosk/qrcode.png";
import NewImg from "assets/images/kiosk/new.png";
import { textColor } from "../common/variables";
import { KiosWrapper } from "../components";
import Button from "../common/Button";
import { MainWrapper } from "./styled";

const RegistrationPersional = ({ step, updateData }) => {
  const history = useHistory();
  const handleClick = (type) => () => {
    updateData({
      step: step + 1,
    });
    switch (type) {
      case 1:
        history.push("/kiosk/dang-ky-kham-benh");
        break;
      case 2:
        history.push("/kiosk/dang-ky-qua-so/dienthoai");
        break;
      case 3:
        history.push("/kiosk/dang-ky-qua-so/cmnd");
        break;
      default:
        history.push("/kiosk/dang-ky-qua-qr");
        break;
    }
  };

  return (
    <KiosWrapper showBtnBack step={step}>
      <MainWrapper>
        <div className="header">Đăng ký khám bệnh bằng thông tin cá nhân</div>
        <div className="btn-action">
        <AuthWrapper>
            <Button
              onClick={handleClick(1)}
              rounded
              className="btn-lg"
              color={textColor}
              bxShadow="#3B618F"
              padding={60}
            >
              <img src={NewImg} alt="bhyt" /> <span>Lần đầu đến khám</span>
            </Button>
          </AuthWrapper>
          <AuthWrapper accessRoles={[ROLES['KIOSK'].TIM_HS_SDT]}>
            <Button
              onClick={handleClick(2)}
              rounded
              className="btn-lg"
              color={textColor}
              bxShadow="#3B618F"
              padding={60}
            >
              <img src={phoneImg} alt="bhyt" /> <span>Số điện thoại</span>
            </Button>
          </AuthWrapper>
          <AuthWrapper accessRoles={[ROLES['KIOSK'].TIM_HS_CMND]}>
            <Button
              onClick={handleClick(3)}
              rounded
              className="btn-lg"
              color={textColor}
              bxShadow="#3B618F"
              padding={60}
            >
              <img src={contactImg} alt="bhyt" />{" "}
              <span>Chứng minh thư nhân dân</span>
            </Button>
          </AuthWrapper>
          <AuthWrapper accessRoles={["kiosk_timHS_qr"]}>
            <Button
              onClick={handleClick(4)}
              rounded
              className="btn-lg"
              color={textColor}
              bxShadow="#3B618F"
              padding={60}
            >
              <img src={qrcodeImg} alt="bhyt" /> <span>Mã QR người bệnh</span>
            </Button>
          </AuthWrapper>
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
)(RegistrationPersional);
