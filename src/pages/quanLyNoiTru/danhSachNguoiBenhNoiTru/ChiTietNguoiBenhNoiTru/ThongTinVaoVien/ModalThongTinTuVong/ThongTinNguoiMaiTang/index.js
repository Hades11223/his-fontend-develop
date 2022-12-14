import React, { useEffect, useState } from "react";
import Box from "pages/tiepDon/components/Box";
import { Row, Col, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InputTimeout } from "components";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import Select from "components/Select";
import AddressFull from "components/AddressFull";
import moment from "moment";
import DOBInput from "components/DOBInput";

const ThongTinNguoiMaiTang = ({
  layerId,
  onChange,
  handleSetData,
  handleSetMultiData,
  id,
  ...props
}) => {
  const { t } = useTranslation();
  const { listAllQuanHe } = useSelector((state) => state.moiQuanHe);
  const { nbThongTinTuVong } = useSelector((state) => state.nbDotDieuTri);
  const { getListAllQuanHe } = useDispatch().moiQuanHe;
  const { onSelectAddress } = useDispatch().tiepDon;

  const {
    nguoiMaiTang,
    ngaySinhNguoiMaiTang,
    diaChiNguoiMaiTang,
    tinhThanhPhoNguoiMaiTangId,
    quanHuyenNguoiMaiTangId,
    xaPhuongNguoiMaiTangId,
    tenTinhThanhPhoNguoiMaiTang,
    tenQuanHuyenNguoiMaiTang,
    tenXaPhuongNguoiMaiTang,
    diaChiMaiTang,
    moiQuanHeId,
  } = nbThongTinTuVong || {};

  const [state, _setState] = useState({
    diaChi: "",
    tuoi: "",
    ngaySinh: null,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getListAllQuanHe();
  }, []);

  useEffect(() => {
    const _diaChi = diaChiMaiTang
      ? diaChiMaiTang
      : tenTinhThanhPhoNguoiMaiTang
      ? `${tenXaPhuongNguoiMaiTang ? tenXaPhuongNguoiMaiTang : ""}${
          tenQuanHuyenNguoiMaiTang ? `, ${tenQuanHuyenNguoiMaiTang}` : ""
        }${
          tenTinhThanhPhoNguoiMaiTang ? `, ${tenTinhThanhPhoNguoiMaiTang}` : ""
        }`
      : "";
    setState({ diaChi: _diaChi });
  }, [
    diaChiNguoiMaiTang,
    tinhThanhPhoNguoiMaiTangId,
    quanHuyenNguoiMaiTangId,
    xaPhuongNguoiMaiTangId,
  ]);

  useEffect(() => {
    if (ngaySinhNguoiMaiTang) {
      setState({
        tuoi: moment(ngaySinhNguoiMaiTang)?._d?.getAge(),
        ngaySinh: {
          str: moment(ngaySinhNguoiMaiTang)?.format("DD/MM/YYYY") || "",
          date: moment(ngaySinhNguoiMaiTang),
          formatStr: "DD/MM/YYYY",
        },
      });
    }
  }, [ngaySinhNguoiMaiTang]);

  const onChangeAdrressText = (e) => {
    if (e != state.diaChi) {
      setState({ diaChi: e });
    }
  };

  const selectAdress = (data) => {
    onSelectAddress(data).then((address) => {
      handleSetMultiData({
        tinhThanhPhoNguoiMaiTangId: address.tinhThanhPhoId,
        diaChiNguoiMaiTang: address.diaChi,
        xaPhuongNguoiMaiTangId: address.xaPhuongId,
        quanHuyenNguoiMaiTangId: address.quanHuyenId,
      });
    });
  };

  const onErrorAddress = (address, listSuggest) => {
    message.error(t("tiepDon.diaChiHanhChinhKhongHopLe"));
  };

  const onChangeValue = (key) => (value) => {
    if (key == "ngaySinhNguoiMaiTang") {
      setState({
        ngaySinh: value,
      });
    } else {
      handleSetData(key, value);
    }
  };

  return (
    <Main>
      <Box title={"Th??ng tin ng?????i mai t??ng"}>
        <Row className="row-name" gutter={6}>
          <Col span={11}>
            <div className="item-input">
              <label className={"label"}>{"Ng?????i mai t??ng"}</label>
              <InputTimeout
                placeholder={"Nh???p ng?????i mai t??ng"}
                value={nguoiMaiTang}
                onChange={onChangeValue("nguoiMaiTang")}
              />
            </div>
          </Col>
          <Col span={11} offset={1}>
            <div className="item-input">
              <label className="label">{"Ng??y sinh ng?????i mai t??ng"}</label>
              <DOBInput
                className="item-born"
                value={state.ngaySinh}
                onBlur={(e, nofi, ageStr, chiNamSinh) => {
                  setState({ ngaySinh: e, tuoi: ageStr });

                  handleSetData(
                    "ngaySinhNguoiMaiTang",
                    chiNamSinh
                      ? `${e.str}-01-01`
                      : e?.date
                      ? moment(e?.date)?.format("YYYY-MM-DD")
                      : null
                  );
                }}
                onChange={onChangeValue("ngaySinhNguoiMaiTang")}
                placeholder={t("tiepDon.nhapNgayThangNamSinh")}
              />
            </div>
          </Col>

          <Col span={11}>
            <div className="item-input" key={moiQuanHeId}>
              <label className={"label"}>{"Quan h??? v???i ng?????i b???nh"}</label>
              <Select
                onChange={onChangeValue("moiQuanHeId")}
                defaultValue={moiQuanHeId}
                className="item-select"
                placeholder={"Ch???n m???i quan h??? v???i ng?????i b???nh"}
                data={listAllQuanHe || []}
              />
            </div>
          </Col>
          <Col span={11} offset={1}>
            <div className="item-input">
              <label className="label">{"Tu???i ng?????i mai t??ng"}</label>
              <InputTimeout disabled value={state.tuoi} />
            </div>
          </Col>

          <Col span={24}>
            <div className="item-input">
              <label className={"label"}>{"?????a ch??? ng?????i mai t??ng"}</label>
              <AddressFull
                onChangeAdrressText={onChangeAdrressText}
                onBlur={(e) => onChangeValue("diaChi")(e.target.value)}
                placeholder="Ph?????ng/X??, Qu???n/Huy???n, T???nh/Th??nh Ph???"
                value={state.diaChi}
                onSelectAddress={selectAdress}
                onError={onErrorAddress}
                delayTyping={300}
              />
            </div>
          </Col>
        </Row>
      </Box>
    </Main>
  );
};

export default ThongTinNguoiMaiTang;
