import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, message } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IconQR from "assets/images/xetNghiem/icQR.png";
import { Main, SearchPartient, InputSearch, GlobalStyle } from "./styled";
import { useHistory } from "react-router-dom";
import ModalDanhSachBN from "../ModalDanhSachBN";
import { InputTimeout, Select } from "components";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
export const TimKiemBN = (props) => {
  const { t } = useTranslation();
  const {
    khamBenh: { infoNb, listPhongKham, thongTinChiTiet },
  } = useSelector((state) => state);

  const {
    nbKhamBenh: { onSearch },
    phimTat: { onRegisterHotkey },
  } = useDispatch();

  const refModalDanhSachBN = useRef(null);
  const refTraCuuBN = useRef(null);
  let history = useHistory();
  const { phongThucHienId } = useParams();
  const { layerId, className = "" } = props;
  const [state, _setState] = useState({ listPhongKham: [] });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  const showDsNb = ({ timKiem }) => {
    if (refModalDanhSachBN.current) {
      refModalDanhSachBN.current.show({
        search: true,
        timKiem: timKiem,
      });
    }
  };
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refTraCuuBN.current && refTraCuuBN.current.focus();
          },
        },
      ],
    });

    // }
  }, []);

  useEffect(() => {
    if (
      !isEmpty(infoNb) &&
      !isEmpty(thongTinChiTiet) &&
      thongTinChiTiet.nbDvKyThuat.phongThucHienId
    ) {
      const newLocation = `/kham-benh/${thongTinChiTiet.nbDvKyThuat.phongThucHienId}/${infoNb.maHoSo}/${thongTinChiTiet.id}`;
      if (newLocation != history.location.pathname) {
        history.push(newLocation);
      }
    }
  }, [thongTinChiTiet, infoNb]);
  useEffect(() => {
    setState({
      phongLayMauId:
        Number(phongThucHienId) ||
        (listPhongKham?.length && listPhongKham[0].id) ||
        null,
    });
  }, [phongThucHienId, listPhongKham]);

  const { phongLayMauId } = state;
  const onChange = (key, needEnter) => (e, item) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({
      [key]: value,
    });
    if (key === "phongLayMauId") {
      onSearch({
        phongThucHienId: value,
        isSingleSearch: true,
      });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      let param = {};
      let check = e?.target?.value?.trim();
      if (check) {
        if (/^[0-9]+$/.test(check)) {
          param = { maHoSo: Number(check) };
        } else {
          if (
            check.indexOf("NB|") === 0 &&
            check.indexOf("$") === check.length - 1
          ) {
            let array = check.split("|");
            param = { maHoSo: array[4] };
          } else {
            param = { tenNb: check };
          }
        }
        if (Object.keys(param).length > 0) {
          refModalDanhSachBN.current.show({
            search: true,
            ...param,
          });
        }
      } else {
        showDsNb({ timKiem: e.target?.value || "" });
      }
    }
  };
  const onBlur = () => {
    setState({
      focusInput: false,
    });
  };
  return (
    <Main className={className}>
      <Row align="middle">
        <GlobalStyle />
        <Col xs={24} md={12} className="paddingRight">
          <SearchPartient>
            <Select
              placeholder={t("common.chonPhongKham")}
              data={listPhongKham || []}
              value={phongLayMauId}
              onChange={onChange("phongLayMauId")}
              dropdownClassName="kham-benh-select-phong-kham"
            />
          </SearchPartient>
        </Col>
        <Col xs={24} md={12} className="paddingLeft">
          <InputSearch focusInput={state.focusInput}>
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
            <InputTimeout
              placeholder={t("common.nhapMaHoTenQuetQrNb")}
              autoFocus
              onKeyDown={onKeyDown}
              onFocus={() =>
                setState({
                  focusInput: true,
                })
              }
              ref={refTraCuuBN}
              onBlur={onBlur}
            />
            <img src={IconQR} alt="IconQrCode" className="qr-search" />
          </InputSearch>
        </Col>
      </Row>
      <ModalDanhSachBN ref={refModalDanhSachBN} />
    </Main>
  );
};

export default React.memo(TimKiemBN);
