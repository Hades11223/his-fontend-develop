import React, { memo, useRef } from "react";
import { Wrapper } from "./styled";
import { Button, Input } from "antd";
import IconQR from "assets/images/xetNghiem/icQR.png";
import LogoNgang from "assets/images/qms/logoIsofhNgang.png";

let intervalIput = null;

function QRCode(props) {
  const { onChangeQr, inputValue } = props;
  const { qrRef } = props;
  const elementForcusActiveKeybroad = useRef(null);

  const sendMessage = (value) => {
    let count = 1;
    return intervalIput = setInterval(() => {
      if (count > value) {
        return clearInterval(intervalIput)
      } else {
        elementForcusActiveKeybroad.current && elementForcusActiveKeybroad.current.focus();
        count++
      }
    }, 650)
  };

  const autoFocusInput = () => {
    return intervalIput && clearInterval(intervalIput);
  }

  return (
    <Wrapper>

      <div className="qr-box__content">
        <img src={LogoNgang} alt="..."/>
        <span>
          Hãy đưa phiếu chứa QR code vào vùng quét dưới đây để hệ thống xác nhận.
        </span>
      </div>
      <div className="qr-box__button" style={{ position: "relative" }}>
        <Button type="text" icon={<img className="sufix-btn" src ={IconQR} alt="..." />} >
          <Input
            onFocus={autoFocusInput()}
            className="sufix-input closeFocus"
            type="text"
            autoFocus
            onChange={onChangeQr}
            placeholder="Quét mã QR code"
            value={inputValue}
            ref={qrRef}
          />
          <Input
            className="sufix-input activeFocus"
            placeholder="Quét mã QR code"
            onChange={onChangeQr}
            value={inputValue}
            type="text"
            ref={elementForcusActiveKeybroad}
            onClick={() => sendMessage(2)}
          />
        </Button>
      </div>
    </Wrapper>
  );
}

export default memo(QRCode);