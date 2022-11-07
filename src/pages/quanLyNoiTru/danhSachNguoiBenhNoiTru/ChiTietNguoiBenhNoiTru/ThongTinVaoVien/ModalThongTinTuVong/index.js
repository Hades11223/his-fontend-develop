import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { Col, message, Row } from "antd";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { Button, ModalTemplate } from "components";
import { useTranslation } from "react-i18next";
import ThongTinBenhNhan from "./ThongTinBenhNhan";
import ThongTinTuVong from "./ThongTinTuVong";
import ThongTinNguoiMaiTang from "./ThongTinNguoiMaiTang";
import ThongTinNguoiDoBVMaiTang from "./ThongTinNguoiDoBVMaiTang";
import { cloneDeep } from "lodash";
import IcPrint from "assets/svg/pttt/ic-print.svg";
import IcSave from "assets/svg/ic-save.svg";

const ModalThongTinTuVong = (props, ref) => {
  const refModal = useRef(null);
  const refData = useRef({});
  const { nbThongTinTuVong, nbThongTinRaVien } = useSelector(
    (state) => state.nbDotDieuTri
  );
  const {
    nbDotDieuTri: {
      getThongTinTuVong,
      updateThongTinTuVong,
      getById,
      getThongTinRaVien,
    },
  } = useDispatch();

  const { t } = useTranslation();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
      });
      const { nbDotDieuTriId } = data;

      getById(nbDotDieuTriId);
      getThongTinTuVong(nbDotDieuTriId);
      getThongTinRaVien(nbDotDieuTriId);
    },
  }));

  useEffect(() => {
    refData.current = cloneDeep(nbThongTinTuVong);
    if (
      !nbThongTinTuVong?.thoiGianThongBao &&
      nbThongTinRaVien?.thoiGianRaVien
    ) {
      refData.current["thoiGianThongBao"] = nbThongTinRaVien?.thoiGianRaVien;
    }
  }, [nbThongTinTuVong]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const handleSetData = (key, e) => {
    const value = e?.currentTarget ? e.currentTarget.innerHTML : e;

    refData.current = {
      ...refData.current,
      [key]: value,
    };
  };

  const handleSetMultiData = (data) => {
    refData.current = {
      ...refData.current,
      ...data,
    };
  };

  const handleClickBack = () => {
    setState({ show: false });
  };

  const validateClickNext = () => {
    const { thoiGianThongBao, nguoiThongBaoId } = refData.current;
    console.log("refData.current", refData.current);

    if (!nguoiThongBaoId) {
      message.error("Vui lòng chọn người thông báo!");
      return false;
    }

    if (!thoiGianThongBao) {
      message.error("Vui lòng chọn thời gian thông báo!");
      return false;
    }

    return true;
  };

  const handleClickNext = () => {
    if (!validateClickNext()) {
      return;
    }

    updateThongTinTuVong(refData.current).then(() => {
      setState({ show: false });
    });
  };

  return (
    <ModalTemplate
      width={"90%"}
      ref={refModal}
      closable={false}
      onCancel={handleClickBack}
      title="Thông tin người bệnh tử vong"
      actionLeft={
        <Button height={30} minWidth={60} onClick={handleClickBack}>
          {t("common.quayLai")}
        </Button>
      }
      actionRight={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button height={30} iconHeight={15} rightIcon={<IcPrint />}>
            {t("thuNgan.inGiayTo")}
          </Button>
          <Button
            type={"primary"}
            height={30}
            minWidth={60}
            onClick={handleClickNext}
            rightIcon={<IcSave />}
          >
            {t("common.luu")}
          </Button>
        </div>
      }
    >
      <Main>
        <Row>
          <Col span={24}>
            <ThongTinBenhNhan />
          </Col>
        </Row>
        <Row className="main-content">
          <Col span={12}>
            <ThongTinTuVong handleSetData={handleSetData} />
          </Col>
          <Col span={11} offset={1}>
            <ThongTinNguoiMaiTang
              handleSetData={handleSetData}
              handleSetMultiData={handleSetMultiData}
            />

            <div className="main-content-right-bottom">
              <ThongTinNguoiDoBVMaiTang handleSetData={handleSetData} />
            </div>
          </Col>
        </Row>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalThongTinTuVong);
