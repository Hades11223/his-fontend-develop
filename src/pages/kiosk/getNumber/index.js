import React, { useEffect } from "react";
import { connect } from "react-redux";
import goiSoProvider from "data-access/goi-so-provider";
import printProvider from "data-access/print-provider";
import successImg from "assets/images/kiosk/success.png";
import arrowImg from "assets/images/kiosk/arrow.png";
import { KiosWrapper } from "../components";
import { MainWrapper } from "./styled";

const GetNumber = ({ infoGetNumber, step, uuTien, history, updateData }) => {
  useEffect(() => {
    goiSoProvider.getStt({ id: infoGetNumber.id }).then((res) => {
      if (res.code === 0) {
        printProvider
          .printPdf(res.data)
          .then(() => {
            console.info("Print success");
          })
          .catch((err) => {
            console.error("Print fail", err);
          });
      }
    });

    const timer = setTimeout(() => {
      updateData({
        uuTien: false,
        step: 0,
        infoGetNumber: {},
      });
      history.push("/kiosk");
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const formattedNumber = (num = 1) => {
    let text = `${num}`;
    if (text.length >= 4) return text;
    let numOf0 = 4 - text.length;
    while (numOf0 > 0) {
      text = 0 + text;
      numOf0--;
    }
    if (numOf0 === 0) return text;
  };

  return (
    <KiosWrapper step={step}>
      <MainWrapper>
        <div className="header">
          <div className="image">
            <img src={successImg} alt="bhyt" />
          </div>
          <div className="message">Lấy số thứ tự thành công</div>
          <div className="sub-message">
            Hãy chờ đến số thứ tự của mình để được phục vụ.
          </div>
        </div>
        <div className="content">
          <div className="stt">Số thứ tự của bạn là:</div>
          <div className="number">{formattedNumber(infoGetNumber.stt)}</div>
          {uuTien && <div className="sub-txt">Là đối tượng ưu tiên</div>}
          <div className="guideline">
            Hãy giữ phiếu số thứ tự và đợi đến lượt của mình ở quầy tiếp đón để
            được nhân viên phục vụ
          </div>
        </div>
        <div className="footer">
          <div className="footer-text">Xin mời lấy phiếu STT in ra</div>
          <div className="image">
            <img src={arrowImg} alt="arrowImg" />
          </div>
        </div>
      </MainWrapper>
    </KiosWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    step: state.kios.step,
    infoGetNumber: state.kios.infoGetNumber || 0,
    uuTien: state.kios.uuTien,
  };
};

const mapDispatchToProps = ({ kios: { updateData } }) => ({
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(GetNumber);
