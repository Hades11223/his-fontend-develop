import { Col, Row } from "antd";
import SortDeleteIcon from "assets/images/utils/sort-delete.png";
import SortSendIcon from "assets/images/utils/sort-send.png";
import { dataPath } from "client/request";
import { BaseSearch } from "components";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import fileUtils from "utils/file-utils";
import { NB_79A_XML1 } from "../../../../client/api";
import ModalDayBaoHiemHangLoat from "../ModalDayBaoHiemHangLoat";
import ModalXoaHoSoHangLoat from "../ModalXoaHoSoHangLoat";
import { Main } from "./styled";

const TimKiem = (props) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const { listTrangThaiQuyetToan } = useSelector((state) => state.utils);
  const { searchByParams, onSizeChange } =
    useDispatch().danhSachHoSoBaoHiem79A46QD4201;
  const { getListKhoaTongHop } = useDispatch().khoa;
  const { getUtils } = useDispatch().utils;
  const refDayHoSoHangLoat = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getUtils({ name: "TrangThaiQuyetToan" });
    getListKhoaTongHop({});
  }, []);
  const onDownload = () => {
    fileUtils.downloadFileZip(
      `${dataPath}${NB_79A_XML1}/xml`,
      {
        tuThoiGianTaoHoSo: state?.tuThoiGianTaoHoSo,
        denThoiGianTaoHoSo: state?.denThoiGianTaoHoSo,
        hoTen: state?.hoTen,
        dsMaLk: state?.dsMaLk,
        maBn: state?.maBn,
        trangThai: state?.trangThai,
      },
      "ho_so_XML"
    );
  };

  const functionChangeInput = (data) => {
    setState(data);
    searchByParams(data);
  };

  const onDayHoSoBaoHiemHangLoat = () => {
    refDayHoSoHangLoat.current &&
      refDayHoSoHangLoat.current.show({}, () => {
        onSizeChange({});
      });
  };

  return (
    <Main>
      <Row>
        <span className="title-sort sort-1" onClick={onDayHoSoBaoHiemHangLoat}>
          Gửi giám định hàng loạt{" "}
          <img src={SortSendIcon} alt="IconSearch" className="icon-search" />
        </span>
        <span
          className="title-sort sort-2"
          onClick={() => refModal?.current?.show()}
        >
          Xóa hồ sơ hàng loạt{" "}
          <img src={SortDeleteIcon} alt="IconSearch" className="icon-search" />
        </span>
      </Row>
      <BaseSearch
        dataInput={[
          {
            widthInput: "170px",
            placeholder: t("quyetToanBhyt.nhapHO_TEN"),
            functionChangeInput,
            keyValueInput: "hoTen",
          },
          {
            widthInput: "170px",
            placeholder: t("quyetToanBhyt.nhapMA_LK"),
            functionChangeInput,
            keyValueInput: "dsMaLk",
          },
          {
            widthInput: "170px",
            placeholder: t("quyetToanBhyt.nhapMA_BN"),
            functionChangeInput,
            keyValueInput: "maBn",
          },
          {
            widthInput: "170px",
            placeholder: t("quyetToanBhyt.nhapMA_THE"),
            functionChangeInput,
            keyValueInput: "maThe",
          },
          {
            widthInput: "180px",
            placeholder: t("quyetToanBhyt.tatCaTrangThai"),
            keyValueInput: "trangThai",
            functionChangeInput,
            type: "select",
            listSelect: listTrangThaiQuyetToan,
          },
          {
            widthInput: "350px",
            type: "dateRange",
            state: state,
            setState: setState,
            functionChangeInput,
            keyValueInput: ["tuThoiGianTaoHoSo", "denThoiGianTaoHoSo"],
            // (e) => {
            //   onSearchDate(
            //     {
            //       tuThoiGianTaoHoSo: e.tuThoiGianVaoVien?.format(
            //         "YYYY-MM-DD 00:00:00"
            //       ),
            //       denThoiGianTaoHoSo: e.denThoiGianVaoVien?.format(
            //         "YYYY-MM-DD 23:59:59"
            //       ),
            //     },
            //     !!e.tuThoiGianVaoVien
            //   );
            // },
            title: t("quyetToanBhyt.ngayTaoHoSo"),
            placeholder: [t("common.tuNgay"), t("common.denNgay")],
            format: "DD/MM/YYYY",
          },
          {
            widthInput: "170px",
            type: "addition",
            component: (
              <Row
                align="middle"
                style={{ height: "100%" }}
                className="btn"
                onClick={onDownload}
              >
                <a
                  style={{
                    padding: "0px 10px",
                    fontSize: 14,
                    fontWeight: "normal",
                  }}
                >
                  Tải xuống hồ sơ
                </a>
                <img
                  src={require("assets/images/bao-cao/icDownload.png")}
                  alt=""
                />
              </Row>
            ),
          },
        ]}
      />
      <ModalXoaHoSoHangLoat ref={refModal} />
      <ModalDayBaoHiemHangLoat
        ref={refDayHoSoHangLoat}
        listTrangThaiQuyetToan={listTrangThaiQuyetToan}
      />
    </Main>

    //   <Row>
    //     <Col span={4}>
    //       <InputSearch>
    //         <Input
    //           placeholder="Nhập HO_TEN"
    //           onChange={onChange("hoTen")}
    //           onKeyDown={onKeyDown}
    //         />
    //         <img src={IconSearch} alt="IconSearch" className="icon-search" />
    //       </InputSearch>
    //     </Col>
    //     <Col span={3}>
    //       <InputSearch>
    //         <Input
    //           placeholder="Nhập MA_LK"
    //           onChange={onChange("dsMaLk")}
    //           onKeyDown={onKeyDown}
    //         />
    //         <img src={IconSearch} alt="IconSearch" className="icon-search" />
    //       </InputSearch>
    //     </Col>
    //     <Col span={4}>
    //       <InputSearch>
    //         <Input
    //           placeholder="Nhập MA_BN"
    //           onChange={onChange("maBn")}
    //           onKeyDown={onKeyDown}
    //         />
    //         <img src={IconSearch} alt="IconSearch" className="icon-search" />
    //       </InputSearch>
    //     </Col>
    //     <Col span={4}>
    //       <InputSearch>
    //         <Input
    //           placeholder="Nhập MA_THE"
    //           onChange={onChange("maThe")}
    //           onKeyDown={onKeyDown}
    //         />
    //         <img src={IconSearch} alt="IconSearch" className="icon-search" />
    //       </InputSearch>
    //     </Col>
    //     <Col span={3}>
    //       <SearchKho>
    //         <Select
    //           style={{ width: "100%" }}
    //           // mode="multiple"
    //           showArrow
    //           showSearch
    //           placeholder="Tất cả trạng thái"
    //           data={listTrangThaiQuyetToan}
    //           ten="trangThai"
    //           onChange={onSearchInput("trangThai")}
    //         ></Select>
    //       </SearchKho>
    //     </Col>
    //     <Col span={3}>
    //       <div className="date">
    //         <label className="title">Ngày tạo hồ sơ</label>
    //         <RangePicker
    //           value={
    //             state?.tuThoiGianTaoHoSo && state?.denThoiGianTaoHoSo
    //               ? [
    //                   moment(state?.tuThoiGianTaoHoSo, "YYYY-MM-DD HH:mm:ss"),
    //                   moment(state?.denThoiGianTaoHoSo, "YYYY-MM-DD HH:mm:ss"),
    //                 ]
    //               : []
    //           }
    //           style={{ paddingTop: 0 }}
    //           placeholder={["Từ ngày", "đến ngày"]}
    //           bordered={false}
    //           showTime
    //           onChange={onChangeDate("Duyet")}
    //           suffixIcon={
    //             <img src={Calendar} alt="..." style={{ marginRight: 5 }} />
    //           }
    //           separator={<div>-</div>}
    //         ></RangePicker>
    //       </div>
    //     </Col>
    //     <Col span={3}>
    //       <Row
    //         align="middle"
    //         style={{ height: "100%" }}
    //         className="btn"
    //         onClick={onDownload}
    //       >
    //         <a style={{ padding: "0px 10px" }}>Tải xuống hồ sơ</a>
    //         <img src={require("assets/images/bao-cao/icDownload.png")} alt="" />
    //       </Row>
    //     </Col>
    //   </Row>
    // </Main>
  );
};

export default TimKiem;
