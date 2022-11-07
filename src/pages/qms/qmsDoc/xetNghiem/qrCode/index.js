import React, { memo, useRef } from "react";
import { Wrapper } from "./styled";
import { Button, Input } from "antd";
import IconQR from "assets/images/xetNghiem/icQR.png";
import LogoDoc from "assets/images/qms/logoIsofhDoc.png";

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
      <img src={LogoDoc} alt="..."/>
        <span>
          Hãy đưa phiếu chứa QR code vào vùng 
          <br/> 
          quét dưới đây để hệ thống xác nhận.
        </span>
      </div>
      <div className="qr-box__button" style={{ position: "relative" }}>
        <Button type="text" icon={<img className="sufix-btn" src ={IconQR} />} >
          <Input
            onFocus={autoFocusInput()}
            className="sufix-input closeFocus"
            type="text"
            autoFocus
            onChange={onChangeQr}
            placeholder="Nhập mã QR code"
            value={inputValue}
          />
          <Input
            className="sufix-input activeFocus"
            placeholder="Nhập mã QR code"
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