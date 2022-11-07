import React from "react";
import IcCircleCheck from "assets/svg/pttt/check-circle.svg";
import IcCircleClose from "assets/svg/pttt/close-circle.svg";
import { Button } from "components";
import { WrapperHeaderPTTT } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { message } from "antd";

const HeaderPTTT = ({ title }) => {
  const { t } = useTranslation();
  const { dataDetail } = useSelector((state) => state.pttt);
  const {
    pttt: { tiepNhan, huyTiepDon, hoanThanh, huyHoanThanh, khongPhauThuat },
  } = useDispatch();

  const clickBtnHeader = (type) => () => {
    let callApi;
    let messageSuccess = "";
    if (type === 1) {
      callApi = tiepNhan;
      messageSuccess = "Tiếp nhận thành công";
    } else if (type === 2) {
      callApi = huyTiepDon;
      messageSuccess = "Hủy tiếp nhận thành công";
    } else if (type === 3) {
      if (!dataDetail.thoiGianKetThuc) {
        message.error("Vui lòng nhập Thời gian kết thúc PTTT");
        return;
      }
      callApi = hoanThanh;
      messageSuccess = "Hoàn thành thành công";
    } else if (type === 4) {
      callApi = huyHoanThanh;
      messageSuccess = "Hủy hoàn thành thành công";
    } else if (type === 5) {
      callApi = khongPhauThuat;
      messageSuccess = "Không phẫu thuật thành công";
    }
    if (callApi) {
      callApi().then((res) => {
        if (res && res.code === 0) {
          message.success(messageSuccess);
        }
      });
    }
  };

  return (
    <WrapperHeaderPTTT>
      <div>{title.toUpperCase()}</div>
      <div>
        {dataDetail.trangThaiHoan!==40&&(
        [25, 43].some((i) => i === dataDetail.trangThai) ? (
          <>
            <Button
              type="primary"
              rightIcon={<IcCircleCheck />}
              minWidth={100}
              onClick={clickBtnHeader(1)}
            >
              {t("common.tiepNhan")}
            </Button>
            <Button
              type="default"
              rightIcon={<IcCircleClose />}
              minWidth={100}
              onClick={clickBtnHeader(5)}
            >
              {t("pttt.khongPhauThuat")}
            </Button>
          </>
        ) : dataDetail.trangThai === 63 ? (
          <>
            <Button
              type="primary"
              rightIcon={<IcCircleCheck />}
              minWidth={100}
              onClick={clickBtnHeader(3)}
            >
              {t("common.hoanThanh")}
            </Button>
            <Button
              type="primary"
              rightIcon={<IcCircleClose />}
              minWidth={100}
              onClick={clickBtnHeader(2)}
            >
              {t("pttt.huyTiepNhan")}
            </Button>
            <Button
              type="default"
              rightIcon={<IcCircleClose />}
              minWidth={100}
              onClick={clickBtnHeader(5)}
            >
              {t("pttt.khongPhauThuat")}
            </Button>
          </>
        ) : dataDetail.trangThai === 155 ? (
          <>
            <Button
              type="primary"
              rightIcon={<IcCircleCheck />}
              minWidth={100}
              onClick={clickBtnHeader(4)}
            >
              {t("pttt.huyHoanThanh")}
            </Button>
          </>
        ) : (
          <></>
        ))}
      </div>
    </WrapperHeaderPTTT>
  );
};

HeaderPTTT.propTypes = {};

export default HeaderPTTT;
