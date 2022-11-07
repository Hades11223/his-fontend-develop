import { Row, Col, Tooltip } from "antd";
import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Main } from "../styled";
import IconArrowLeft from "assets/images/thuNgan/arrowLeft.png";
import IconList from "assets/images/thuNgan/icList.png";
import ModalDanhSachBN from "../../ModalDanhSachBN";
import { checkRole } from "utils/role-utils";
import { ROLES, TRANG_THAI_DICH_VU } from "constants/index";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import imgChangeStatus from "assets/images/utils/change-status.png";
import { Button } from "components";
import { refConfirm } from "app";
import { useStore } from "hook";
export const LayDSBN = ({ layerId }) => {
  const { t } = useTranslation();
  const refModalDanhSachBN = useRef(null);
  const refFuncGetNbTiepTheo = useRef(null);
  const refDsNb = useRef(null);
  const nbDvKyThuat = useStore("khamBenh.thongTinChiTiet.nbDvKyThuat", {});
  const {
    khamBenh: {
      boQuaKham,
      nguoiBenhTiepTheo,
      kiemTraTrangThaiLoadNguoiBenh,
      doiTrangThai,
    },
    phimTat: { onRegisterHotkey },
    khamBenh: { getStatisticsRoom },
  } = useDispatch();
  const infoNb = useStore("khamBenh.infoNb", {});
  const phongThucHienId = useStore("nbKhamBenh.phongThucHienId", null);
  const onShowDsNb = () => {
    if (refModalDanhSachBN.current) {
      refModalDanhSachBN.current.show();
    }
  };
  const boQuaNb = () => {
    boQuaKham({ loadNbTiepTheo: true });
  };
  const doiTrangThaiFunc = () => {
    doiTrangThai([
      {
        id: nbDvKyThuat.id,
        nbDvKyThuat: { trangThai: 20 },
      },
    ]).then((res) => {
      window.location.href = window.location.href;
    });
  };
  const onGetNbTiepTheo = () => {
    kiemTraTrangThaiLoadNguoiBenh()
      .then((s) => {
        nguoiBenhTiepTheo();
        getStatisticsRoom(phongThucHienId);
      })
      .catch((e) => {
        refConfirm.current &&
          refConfirm.current.show(
            {
              content: e,
              cancelText: t("common.huy"),
              okText: t("common.xacNhan"),
              showBtnOk: true,
              typeModal: "warning",
            },
            () => {
              nguoiBenhTiepTheo();
              getStatisticsRoom(phongThucHienId);
            },
            () => {}
          );
      });
  };
  refFuncGetNbTiepTheo.current = onGetNbTiepTheo;
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refFuncGetNbTiepTheo.current && refFuncGetNbTiepTheo.current();
          },
        },
        {
          keyCode: 118, //F1
          onEvent: (e) => {
            refDsNb.current && refDsNb.current.click();
          },
        },
      ],
    });
  }, []);
  return (
    <Main>
      <Row align="middle" gutter={4} style={{ flexWrap: "nowrap" }}>
        {checkRole([ROLES["KHAM_BENH"].GOI_NB_TIEP_THEO]) && (
          <Col xs={24} md={8}>
            <Button
              fit={true}
              type="primary"
              onClick={onGetNbTiepTheo}
              rightIcon={<img src={IconArrowLeft} />}
              iconHeight={12}
            >
              {t("khamBenh.nbTiepTheo")}
            </Button>
          </Col>
        )}
        <Col xs={24} md={8}>
          <Button
            fit={true}
            type="default"
            content=""
            onClick={onShowDsNb}
            rightIcon={<img src={IconList} />}
            iconHeight={12}
            ref={refDsNb}
          >
            {t("khamBenh.danhSachNb")}
          </Button>
        </Col>
        <Col xs={24} md={4}>
          {!(
            (infoNb?.khamSucKhoe || infoNb?.loaiDoiTuongKsk) &&
            infoNb?.trangThaiKsk != 20
          ) && (
            <Button
              onClick={boQuaNb}
              rightIcon={<CloseOutlined></CloseOutlined>}
              type="default"
              iconHeight={12}
            >
              {t("common.boQua")}
            </Button>
          )}
        </Col>
      </Row>
      <ModalDanhSachBN ref={refModalDanhSachBN} />
    </Main>
  );
};

export default LayDSBN;
