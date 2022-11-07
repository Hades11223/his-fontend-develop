import React, { memo, useEffect, useRef } from "react";
import { Row, Col, Input } from "antd";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import QuayTiepDon from "./QuayTiepDon";
import ButtonNguoiBenhTiepTheo from "../ButtonNguoiBenhTiepTheo";
import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { addPrefixNumberZero } from "utils";
import moment from "moment";
import { LENGTH_ZERO_PREFIX } from "constants/index";
import { useTranslation } from "react-i18next";
import IcCancel from "assets/svg/ic-cancel.svg";
const DanhSachBenhNhan = ({
  onChange,
  disabled,
  onGiamDinhThe,
  layerId,
  id,
  ...props
}) => {
  const { t } = useTranslation();
  const refTimeoutSearchSTT = useRef(null);
  const {
    dongQuay,
    searchGoiSo,
    updateData: updateDataGoiSo,
  } = useDispatch().goiSo;
  const { getAllQuayTiepDon } = useDispatch().quayTiepDon;
  const { updateData } = useDispatch().tiepDon;

  const { readOnlyDsGoiNho, quayTiepDonId, nbTiepTheo } = useSelector(
    (state) => state.goiSo
  );
  const { stt, disableTiepDon } = useSelector((state) => state.tiepDon);

  const onKeyDownStt = (event) => {
    if (event.nativeEvent.key === "Enter") {
      if (refTimeoutSearchSTT.current) {
        //nếu đang có 1 timeout chờ search stt thì clear timeout đi
        clearTimeout(refTimeoutSearchSTT.current);
        refTimeoutSearchSTT.current = null;
      }
      onSearch(stt);
    }
  };

  const onSearch = (stt) => {
    searchGoiSo({ stt }, true)
      .then(async (data) => {
        await checkGender(data);
        if (data.maTheBhyt)
          onGiamDinhThe &&
            onGiamDinhThe({
              data: {
                hoTen: data.tenNb,
                ngaySinh: data.ngaySinh,
                maThe: data.maTheBhyt,
              },
              tenNb: data.tenNb,
              diaChi: data.diaChi,
            });
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (disabled) {
      updateDataGoiSo({ readOnlyDsGoiNho: true });
    }
  }, [disabled]);

  useEffect(() => {
    getAllQuayTiepDon(); //lấy tất cả quầy tiếp đón
    return () => {
      //unmount
      if (refTimeoutSearchSTT.current) {
        //clear timeout search stt
        clearTimeout(refTimeoutSearchSTT.current);
      }
    };
  }, []);
  const onChangeSTT = (e) => {
    onChange(Number(e.target.value), "stt");
    if (refTimeoutSearchSTT.current) {
      //khi thay đổi dữ liệu trường stt thì clear timeout search theo stt hiện tại
      clearTimeout(refTimeoutSearchSTT.current);
    }
    refTimeoutSearchSTT.current = setTimeout(
      //đồng thời tạo mới 1 timeout mới (5s) để tự động search
      (value) => {
        onSearch(value);
      },
      5000,
      e.target.value
    );
  };

  const onClose = () => {
    if (!disabled && quayTiepDonId) {
      dongQuay({ quayHienTai: quayTiepDonId });
    }
  };

  const checkGender = (data) => {
    let genderVan = data.tenNb.search("VĂN");
    let genderThi = data.tenNb.search("THỊ");
    if (genderVan >= 0 && genderThi < 0) {
      updateData({ gioiTinh: 1 });
    } else if (genderThi >= 0) {
      updateData({ gioiTinh: 2 });
    } else {
      updateData({ gioiTinh: "" });
    }
  };

  return (
    <Main className="container fadeIn">
      {id ? (
        <div class="label" style={{ marginTop: 47 }}>
          Số lượt giới thiệu: 0
        </div>
      ) : (
        <>
          <Row md={24} xl={24} xxl={24} className="first-row">
            <div className="label">{t("tiepDon.chonQuay")}</div>
          </Row>
          <Row className="second-row" style={{ paddingBottom: 6 }}>
            <Col md={15} xl={15} xxl={15}>
              <AuthWrapper accessRoles={[ROLES["TIEP_DON"].CHON_QUAY]}>
                <QuayTiepDon disabled={disabled} />
              </AuthWrapper>
              <AuthWrapper accessRoles={[ROLES["TIEP_DON"].NB_TIEP_THEO]}>
                <ButtonNguoiBenhTiepTheo
                  fit={true}
                  disabled={disabled}
                  className={`btn-nb-tiep-theo ${
                    readOnlyDsGoiNho || disabled ? " disable-button" : ""
                  }`}
                  type="default"
                  layerId={layerId}
                />
              </AuthWrapper>
            </Col>
            <Col md={9} xl={9} xxl={9}>
              {/* <AuthWrapper accessRoles={[ROLES["TIEP_DON"].DS_NHO]}>
            <DanhSachGoiNho getListGoiNho={props.getListGoiNho} />
          </AuthWrapper> */}
              <div className="item-input">
                <Input
                  onChange={onChangeSTT}
                  placeholder={t("tiepDon.nhapSTTTiepDon")}
                  onKeyDown={onKeyDownStt}
                  disabled={disableTiepDon || disabled}
                  value={addPrefixNumberZero(stt, LENGTH_ZERO_PREFIX)}
                />
              </div>
              <div className="mt-10">
                <Button
                  className="btn-dong-quay"
                  onClick={onClose}
                  type="default"
                  fit={true}
                  rightIcon={<IcCancel />}
                  iconHeight={10}
                  >
                  {t("tiepDon.dongQuay")}
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="second-row" style={{ zIndex: 1019 }}>
            <Col md={24} xl={24} xxl={24}>
              <div className="elipsis">
                {nbTiepTheo?.stt && (
                  <b>{addPrefixNumberZero(nbTiepTheo?.stt)} </b>
                )}
                {nbTiepTheo?.tenNb && <span>{nbTiepTheo?.tenNb}</span>}
                {nbTiepTheo?.ngaySinh && (
                  <span>
                    {" - "}
                    {moment(nbTiepTheo?.ngaySinh)?._d?.getAge()}T
                  </span>
                )}
              </div>
            </Col>
          </Row>
        </>
      )}
    </Main>
  );
};

export default memo(DanhSachBenhNhan);
