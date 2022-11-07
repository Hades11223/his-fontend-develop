import React, { useEffect, memo, useRef } from "react";
import { Main } from "./styled";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useInterval } from "hook";
import extendTable from "assets/svg/extendTable.svg";
import Icon from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const ButtonNguoiBenhTiepTheo = ({
  disabled,
  fit,
  type = "primary",
  layerId,
  ...props
}) => {
  const { t } = useTranslation();

  const refGetNbTiepTheo = useRef(null);
  const {
    goiSo: { getNbTiepTheo, updateData },
    phimTat: { onRegisterHotkey },
  } = useDispatch();
  const { nbTiepTheo, quayTiepDonId } = useSelector((state) => state.goiSo);

  useInterval(() => {
    {
      /*
        Cứ 10s là load lên người bệnh hiện trên nút người bệnh tiếp theo
        - trong trường hợp đã chọn quầy và chưa có người bệnh nào thì mới load.
      */
    }
    onGetNbTiepTheo();
  }, [5000]);

  useEffect(() => {
    {
      /*
      - Nếu chưa chọn quầy mà đã có nbTiepTheo thì set nbTiepTheo = null
      - Nếu đã chọn quầy mà chưa có nbTiepTheo thì gọi api get NbTiepTheo
      */
    }
    if (!quayTiepDonId) {
      if (nbTiepTheo?.id) updateData({ nbTiepTheo: {} });
    } else onGetNbTiepTheo();
  }, [nbTiepTheo, quayTiepDonId]);

  const onSetNbTiepTheo = (isLoadNguoiBenhTiepDon) => {
    if (quayTiepDonId) {
      const data = {
        id: quayTiepDonId,
        isLoadNguoiBenhTiepDon,
        data: {
          nbTiepTheo: nbTiepTheo?.id,
        },
      };
      updateData({
        daThanhToan: true,
        messageChuaThanhToan: "",
      });
      getNbTiepTheo(data);
    } else message.error(t("tiepDon.vuiLongChonQuayTiepDonTruocKhiGoiSo"));
  };

  const onGetNbTiepTheo = () => {
    if (!nbTiepTheo?.id)
      getNbTiepTheo({
        id: quayTiepDonId,
        isGet: true,
      });
  };
  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 112, //F4
          onEvent: () => {
            refGetNbTiepTheo.current && refGetNbTiepTheo.current();
          },
        },
      ],
    });
  }, []);
  const onClick = () => {
    if (!disabled) {
      if (props.onClick) props.onClick();
      else onSetNbTiepTheo(true);
    }
  };
  refGetNbTiepTheo.current = onClick;
  return (
    <Main
      className={`person ${props.className || ""}`}
      id="btn_nguoi_benh_tiep_theo"
      onClick={onClick}
      type={type}
      fit={fit}
      rightIcon={<Icon component={extendTable} />}
    >
      <span>{t("tiepDon.nbTiepTheo")}</span>
      <span className="phim-tat">[F1]</span>
    </Main>
  );
};

export default memo(ButtonNguoiBenhTiepTheo);
