import React, { useEffect, useState } from "react";
import { Col, Collapse, Row } from "antd";
import { Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import { firstLetterWordUpperCase } from "utils";
import { SelectGroup } from "../../ToDieuTri/styled";
import TextField from "components/TextField";
import { Button, ModalTemplate, Select, SelectLargeData } from "components";
import DateTimePicker from "components/DateTimePicker";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { DOI_TUONG, ENUM } from "constants/index";
const { SelectChanDoan } = SelectLargeData;
const { Panel } = Collapse;

const ModalThongTinRaVien = (props) => {
  const { refModal, onShowModalChuyenVien } = props;
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const { nbThongTinRaVien, chiTietNb } = useSelector(
    (state) => state.nbDotDieuTri
  );
  const { listNhanVien } = useSelector((state) => state.nhanVien);
  const {
    nbDotDieuTri: { updateThongTinRaVien, getThongTinRaVien, getChiTietById },
    nhanVien: { getListNhanVienTongHop },
  } = useDispatch();
  const [listDiaDiemTuVong] = useEnum(ENUM.DIA_DIEM_TU_VONG);
  const [listLyDoTuVong] = useEnum(ENUM.lyDoTuVong);
  const [listGioiTinh] = useEnum(ENUM.gioiTinh);
  const [listKetQuaDieuTri] = useEnum(ENUM.KET_QUA_DIEU_TRI);
  const [listHuongDieuTriNoiTru] = useEnum(ENUM.HUONG_DIEU_TRI_NOI_TRU);
  const [listTreEmKhongThe] = useEnum(ENUM.TRE_EM_KHONG_THE);
  const [listDinhChiThaiNghen] = useEnum(ENUM.DINH_CHI_THAI_NGHEN);

  const { t } = useTranslation();
  const [state, _setState] = useState();
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (infoPatient) {
      getListNhanVienTongHop({ khoaId: infoPatient?.khoaNbId });
      getChiTietById(infoPatient?.id);
    }
  }, [infoPatient]);
  const gioiTinh =
    (listGioiTinh || []).find((item) => item.id === infoPatient?.gioiTinh) ||
    {};

  const handleClickBack = () => {
    refModal.current && refModal.current.hide();
  };

  useEffect(() => {
    if (nbThongTinRaVien) {
      setState({
        dsCdChinhId: nbThongTinRaVien?.dsCdChinhId,
        dsCdKemTheoId: nbThongTinRaVien?.dsCdKemTheoId,
        moTa: nbThongTinRaVien?.moTa,
        phuongPhapDieuTri: nbThongTinRaVien?.phuongPhapDieuTri,
        loiDanBacSi: nbThongTinRaVien?.loiDanBacSi,
        tinhTrang: nbThongTinRaVien?.tinhTrang,
        quaTrinhBenhLy: nbThongTinRaVien?.quaTrinhBenhLy,
        ketQuaCls: nbThongTinRaVien?.ketQuaCls,
        huongDieuTri: nbThongTinRaVien?.huongDieuTri,
        ketQuaDieuTri: nbThongTinRaVien?.ketQuaDieuTri,
        thoiGianTuVong:
          nbThongTinRaVien?.thoiGianTuVong &&
          moment(nbThongTinRaVien?.thoiGianTuVong),
        diaDiemTuVong: nbThongTinRaVien?.diaDiemTuVong,
        lyDoTuVong: nbThongTinRaVien?.lyDoTuVong,
        ghiChuTuVong: nbThongTinRaVien?.ghiChuTuVong,
        thoiGianRaVien:
          nbThongTinRaVien?.thoiGianRaVien &&
          moment(nbThongTinRaVien?.thoiGianRaVien),
        thoiGianHenKham:
          nbThongTinRaVien?.thoiGianHenKham &&
          moment(nbThongTinRaVien?.thoiGianHenKham),

        treEmKhongThe: nbThongTinRaVien?.treEmKhongThe || 0,
        tenCha: nbThongTinRaVien?.tenCha,
        tenMe: nbThongTinRaVien?.tenMe,
        thuTruongDonVi: nbThongTinRaVien?.thuTruongDonVi,
        dinhChiThaiNghen: nbThongTinRaVien?.dinhChiThaiNghen || 0,
        tuoiThai: nbThongTinRaVien?.tuoiThai,
        truongKhoaId: nbThongTinRaVien?.truongKhoaId,
        tuThoiGianNghiNgoaiTru: nbThongTinRaVien?.tuThoiGianNghiNgoaiTru
          ? moment(nbThongTinRaVien?.tuThoiGianNghiNgoaiTru)
          : nbThongTinRaVien?.thoiGianRaVien
          ? moment(nbThongTinRaVien?.thoiGianRaVien)
          : null,
        denThoiGianNghiNgoaiTru:
          nbThongTinRaVien?.denThoiGianNghiNgoaiTru &&
          moment(nbThongTinRaVien?.denThoiGianNghiNgoaiTru),
        thoiGianChungTu: nbThongTinRaVien?.thoiGianChungTu
          ? moment(nbThongTinRaVien?.thoiGianChungTu)
          : nbThongTinRaVien?.thoiGianRaVien
          ? moment(nbThongTinRaVien?.thoiGianRaVien)
          : null,

        truongKhoa: nbThongTinRaVien?.truongKhoa,
      });
    }
  }, [nbThongTinRaVien]);
  const handleClickNext = () => {
    const {
      dsCdChinhId,
      dsCdKemTheoId,
      moTa,
      phuongPhapDieuTri,
      loiDanBacSi,
      tinhTrang,
      quaTrinhBenhLy,
      ketQuaCls,
      huongDieuTri,
      ketQuaDieuTri,
      thoiGianTuVong,
      diaDiemTuVong,
      lyDoTuVong,
      ghiChuTuVong,
      thoiGianRaVien,
      thoiGianHenKham,
      treEmKhongThe,
      tenCha,
      tenMe,
      thuTruongDonVi,
      dinhChiThaiNghen,
      tuoiThai,
      tuThoiGianNghiNgoaiTru,
      denThoiGianNghiNgoaiTru,
      thoiGianChungTu,
      truongKhoaId,
      maTheBhyt,
      truongKhoa,
      soBaoHiemXaHoi,
    } = state;

    const payload = {
      dsCdChinhId,
      dsCdKemTheoId,
      moTa,
      phuongPhapDieuTri,
      loiDanBacSi,
      tinhTrang,
      quaTrinhBenhLy,
      ketQuaCls,
      huongDieuTri,
      ketQuaDieuTri,
      thoiGianTuVong,
      diaDiemTuVong,
      lyDoTuVong,
      ghiChuTuVong,
      thoiGianRaVien,
      thoiGianHenKham,
      treEmKhongThe,
      tenCha,
      tenMe,
      thuTruongDonVi,
      dinhChiThaiNghen,
      tuoiThai,
      tuThoiGianNghiNgoaiTru,
      denThoiGianNghiNgoaiTru,
      thoiGianChungTu,
      truongKhoaId,
      truongKhoa,
      maTheBhyt,
      soBaoHiemXaHoi: soBaoHiemXaHoi || chiTietNb?.soBaoHiemXaHoi,
      id: infoPatient?.id,
    };
    if (
      (!lyDoTuVong && ketQuaDieuTri === 5) ||
      (!thoiGianTuVong && ketQuaDieuTri === 5) ||
      !ketQuaDieuTri ||
      !huongDieuTri ||
      !phuongPhapDieuTri ||
      !dsCdChinhId
      // ||
      // !truongKhoaId ||
      // !truongKhoa?.chungChi ||
      // !thoiGianChungTu ||
      // (!tuoiThai && dinhChiThaiNghen == 1) ||
      // (treEmKhongThe == 1 && !tenCha && !tenMe)
    ) {
      setState({ validate: true });
    } else {
      setState({ validate: false });
      updateThongTinRaVien({ ...payload }).then((s) => {
        getThongTinRaVien(infoPatient?.id).then(() => {
          if (s?.huongDieuTri === 40) {
            onShowModalChuyenVien(s.dsCdChinhId);
          }
        });
      });
      setTimeout(() => refModal.current.hide(), 50);
    }
  };
  const onChangeInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    if (key == "truongKhoaId") {
      const selectNv = listNhanVien.find((item) => item.id === e);
      if (selectNv) {
        setState({
          truongKhoa: selectNv,
          [key]: value,
        });
      }
    } else {
      setState({ [key]: value });
    }
  };

  return (
    <ModalTemplate
      width={"85%"}
      ref={refModal}
      title="Thông tin ra viện"
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(infoPatient?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {infoPatient?.tuoi && (
            <span className="normal-weight">
              - {infoPatient?.tuoi} {t("common.tuoi")}
            </span>
          )}
        </>
      }
      actionLeft={
        <Button height={30} minWidth={60} onClick={handleClickBack}>
          {t("common.quayLai")}
        </Button>
      }
      actionRight={
        <div>
          <Button
            type={"primary"}
            height={30}
            minWidth={60}
            onClick={handleClickNext}
          >
            {t("common.luu")}
          </Button>
        </div>
      }
    >
      <Main>
        <Row>
          <Col span={15}>
            <SelectGroup>
              <span>
                {t("quanLyNoiTru.chanDoanRaVienChinh")}
                <span className={"title-error"}>*</span>:
              </span>
              <div className="select-box-chan-doan">
                <SelectChanDoan
                  mode="multiple"
                  value={(state?.dsCdChinhId || []).map((item) => item + "")}
                  style={{
                    width: "100%",
                  }}
                  maxItem={1}
                  onChange={onChangeInput("dsCdChinhId")}
                />
              </div>
            </SelectGroup>
            {state?.validate && !state?.dsCdChinhId?.length && (
              <span className="title-error">
                {t("quanLyNoiTru.chuaNhapChanDoanRaVien")}
              </span>
            )}
            <SelectGroup>
              <span>{t("quanLyNoiTru.chanDoanRaVienKemTheo")}: </span>
              <div className="select-box-chan-doan">
                <SelectChanDoan
                  mode="multiple"
                  value={(state?.dsCdKemTheoId || []).map((item) => item + "")}
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeInput("dsCdKemTheoId")}
                />
              </div>
            </SelectGroup>

            <TextField
              label={t("quanLyNoiTru.chanDoanRaVienMoTaChiTiet")}
              className="input_custom"
              marginTop={5}
              maxLine={1}
              onChange={onChangeInput("moTa")}
              html={state?.moTa}
            />

            <TextField
              label={
                <div>
                  {t("quanLyNoiTru.phuongPhapDieuTri")}
                  <span className={"title-error"}>*</span>
                </div>
              }
              classNameLabel="flex"
              className="input_custom"
              marginTop={5}
              maxLine={1}
              onChange={onChangeInput("phuongPhapDieuTri")}
              html={state?.phuongPhapDieuTri}
            />
            {state?.validate && !state?.phuongPhapDieuTri && (
              <span className="title-error">
                {t("quanLyNoiTru.chuaNhapPhuongPhapDieuTri")}
              </span>
            )}
            <TextField
              label={t("quanLyNoiTru.loiDanBacSy")}
              className="input_custom"
              marginTop={5}
              maxLine={1}
              onChange={onChangeInput("loiDanBacSi")}
              html={state?.loiDanBacSi}
            />

            <TextField
              label={t("quanLyNoiTru.tinhTrangNguoiBenh")}
              className="input_custom"
              marginTop={5}
              maxLine={1}
              onChange={onChangeInput("tinhTrang")}
              html={state?.tinhTrang}
            />

            <TextField
              label={t("quanLyNoiTru.quaTrinhBenhLyVaDienBienLamSang")}
              className="input_custom"
              marginTop={5}
              maxLine={1}
              onChange={onChangeInput("quaTrinhBenhLy")}
              html={state?.quaTrinhBenhLy}
            />

            <TextField
              label={t("quanLyNoiTru.tomTatKetQuaCls")}
              className="input_custom"
              marginTop={5}
              maxLine={1}
              onChange={onChangeInput("ketQuaCls")}
              html={state?.ketQuaCls}
            />
          </Col>
          <Col span={8} offset={1}>
            <SelectGroup>
              <span>
                {t("quanLyNoiTru.tinhTrangRaVien")}
                <span className={"title-error"}>*</span>:
              </span>
              <div className="select-box-chan-doan">
                <Select
                  data={listHuongDieuTriNoiTru}
                  value={state?.huongDieuTri}
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeInput("huongDieuTri")}
                />
              </div>
            </SelectGroup>
            {state?.validate && !state?.huongDieuTri && (
              <span className="title-error">
                {t("quanLyNoiTru.chuaChonTinhTrangRaVien")}
              </span>
            )}

            <SelectGroup>
              <span>
                {t("quanLyNoiTru.ketQuaDieuTri")}{" "}
                <span className={"title-error"}>*</span>:
              </span>
              <div className="select-box-chan-doan">
                <Select
                  data={listKetQuaDieuTri}
                  value={state?.ketQuaDieuTri}
                  style={{
                    width: "100%",
                  }}
                  onChange={onChangeInput("ketQuaDieuTri")}
                />
              </div>
            </SelectGroup>
            {state?.validate && !state?.ketQuaDieuTri && (
              <span className="title-error">
                {t("quanLyNoiTru.chuaChonKetQuaDieuTri")}
              </span>
            )}

            {state?.ketQuaDieuTri === 5 && (
              <div className="date">
                <span className="title">
                  {t("quanLyNoiTru.thoiGianTuVong")}{" "}
                  <span className={"title-error"}>*</span>:
                </span>
                <DateTimePicker
                  showTime={{ format: "HH:mm:ss" }}
                  value={state?.thoiGianTuVong}
                  onChange={onChangeInput("thoiGianTuVong")}
                  placeholder={"Chọn thời gian"}
                />
              </div>
            )}
            {state?.validate &&
              state?.ketQuaDieuTri === 5 &&
              !state?.thoiGianTuVong && (
                <span className="title-error">
                  {t("quanLyNoiTru.chuaNhapThoiGianTuVong")}
                </span>
              )}
            {state?.ketQuaDieuTri === 5 && (
              <SelectGroup>
                <span>{t("quanLyNoiTru.diaDiemTuVong")}: </span>
                <div className="select-box-chan-doan">
                  <Select
                    style={{
                      width: "100%",
                    }}
                    data={listDiaDiemTuVong}
                    value={state?.diaDiemTuVong}
                    onChange={onChangeInput("diaDiemTuVong")}
                  />
                </div>
              </SelectGroup>
            )}

            {state?.ketQuaDieuTri === 5 && (
              <SelectGroup>
                <span>
                  {t("quanLyNoiTru.lyDoTuVong")}
                  <span className={"title-error"}>*</span>:
                </span>
                <div className="select-box-chan-doan">
                  <Select
                    data={listLyDoTuVong}
                    style={{
                      width: "100%",
                    }}
                    onChange={onChangeInput("lyDoTuVong")}
                    value={state?.lyDoTuVong}
                  />
                </div>
              </SelectGroup>
            )}
            {state?.validate &&
              state?.ketQuaDieuTri === 5 &&
              !state?.lyDoTuVong && (
                <span className="title-error">
                  {t("quanLyNoiTru.chuaChonLyDoTuVong")}
                </span>
              )}
            {state?.ketQuaDieuTri === 5 && (
              <TextField
                label={t("quanLyNoiTru.ghiChuTuVong")}
                className="input_custom"
                marginTop={5}
                maxLine={1}
                onChange={onChangeInput("ghiChuTuVong")}
                value={state?.ghiChuTuVong}
              />
            )}
            <div className="date">
              <span className="title">{t("quanLyNoiTru.thoiGianRaVien")}:</span>
              <DateTimePicker
                showTime={{ format: "HH:mm:ss" }}
                value={state?.thoiGianRaVien}
                onChange={onChangeInput("thoiGianRaVien")}
                placeholder={"Chọn thời gian"}
                pointTime={
                  infoPatient?.thoiGianVaoKhoaNhapVien ||
                  infoPatient?.thoiGianVaoVien
                }
                compareTime={(a, b) => a < b}
              />
            </div>

            <div className="date">
              <span className="title">
                {t("quanLyNoiTru.thoiGianHenKham")}{" "}
                {/* <span
                  className={`${state?.thoiGianHenKham ? "" : "title-error"}`}
                >
                  *
                </span> */}
                :
              </span>
              <DateTimePicker
                showTime={{ format: "HH:mm:ss" }}
                value={state?.thoiGianHenKham}
                onChange={onChangeInput("thoiGianHenKham")}
                placeholder={"Chọn thời gian"}
                pointTime={
                  infoPatient?.thoiGianVaoKhoaNhapVien ||
                  infoPatient?.thoiGianVaoVien
                }
                compareTime={(a, b) => a < b}
              />
            </div>
          </Col>
        </Row>
        {/* người bệnh bảo hiểm + trạng thái ra viện = ra viện, trón viện, xin ra viện */}
        {[15, 50, 60].includes(state?.huongDieuTri) &&
          infoPatient?.doiTuong == 2 && (
            <div className="more-info">
              <Collapse defaultActiveKey={["1", "2"]}>
                <Panel header="Thông tin khác" key="1">
                  <Row>
                    <Col span={15}>
                      <Row>
                        <Col span={24}>
                          <TextField
                            label={
                              <span>
                                Mã số BHXH
                                {/* <span className={"title-error"}>*</span> */}
                              </span>
                            }
                            className="input_custom"
                            marginTop={5}
                            maxLine={1}
                            // disabled={chiTietNb?.doiTuong === DOI_TUONG.BAO_HIEM}
                            html={chiTietNb?.soBaoHiemXaHoi}
                            onChange={onChangeInput("soBaoHiemXaHoi")}
                          />
                        </Col>

                        <Col span={11}>
                          <SelectGroup>
                            <span>{"Đình chỉ thai nghén"}: </span>
                            <div className="select-box-chan-doan">
                              <Select
                                style={{
                                  width: "100%",
                                }}
                                data={listDinhChiThaiNghen}
                                value={state?.dinhChiThaiNghen}
                                onChange={onChangeInput("dinhChiThaiNghen")}
                              />
                            </div>
                          </SelectGroup>
                        </Col>

                        <Col span={12} offset={1}>
                          <TextField
                            label={"Tuổi thai"}
                            className="input_custom"
                            marginTop={5}
                            maxLine={1}
                            type="number"
                            onChange={onChangeInput("tuoiThai")}
                            html={state?.tuoiThai}
                          />
                          {/* {state?.validate &&
                            !state?.tuoiThai &&
                            state?.dinhChiThaiNghen == 1 && (
                              <span className="title-error">
                                {"Bắt buộc nhập tuổi thai"}
                              </span>
                            )} */}
                        </Col>

                        <Col span={11}>
                          <div className="date">
                            <span className="title">
                              {"Nghỉ ngoại trú từ ngày"} :
                            </span>
                            <DateTimePicker
                              showTime={{ format: "HH:mm:ss" }}
                              value={state?.tuThoiGianNghiNgoaiTru}
                              onChange={onChangeInput("tuThoiGianNghiNgoaiTru")}
                              placeholder={"Chọn thời gian"}
                            />
                          </div>
                        </Col>

                        <Col span={12} offset={1}>
                          <div className="date">
                            <span className="title">
                              {"Nghỉ ngoại trú đến ngày"} :
                            </span>
                            <DateTimePicker
                              showTime={{ format: "HH:mm:ss" }}
                              value={state?.denThoiGianNghiNgoaiTru}
                              onChange={onChangeInput(
                                "denThoiGianNghiNgoaiTru"
                              )}
                              placeholder={"Chọn thời gian"}
                            />
                          </div>
                        </Col>

                        <Col span={11}>
                          <div className="date">
                            <span className="title">
                              {"Ngày chứng từ "}
                              {/* <span className={"title-error"}>*</span> */}:
                            </span>

                            <DateTimePicker
                              showTime={{ format: "HH:mm:ss" }}
                              value={state?.thoiGianChungTu}
                              onChange={onChangeInput("thoiGianChungTu")}
                              placeholder={"Chọn thời gian"}
                            />
                          </div>
                          {/* {state?.validate && !state?.thoiGianChungTu && (
                            <span className="title-error">
                              {"Bắt buộc chọn ngày chứng từ"}
                            </span>
                          )} */}
                        </Col>

                        <Col span={12} offset={1}>
                          <TextField
                            label={"Thủ trưởng đơn vị"}
                            className="input_custom"
                            marginTop={5}
                            maxLine={1}
                            onChange={onChangeInput("thuTruongDonVi")}
                            html={state?.thuTruongDonVi}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={8} offset={1}>
                      <TextField
                        label={"Mã thẻ"}
                        className="input_custom"
                        marginTop={5}
                        maxLine={1}
                        disabled={chiTietNb?.doiTuong === DOI_TUONG.BAO_HIEM}
                        html={infoPatient?.maTheBhyt}
                        onChange={onChangeInput("maTheBhyt")}
                      />

                      <SelectGroup>
                        <span>{"Trẻ em không thẻ"}: </span>
                        <div className="select-box-chan-doan">
                          <Select
                            style={{
                              width: "100%",
                            }}
                            data={listTreEmKhongThe}
                            value={state?.treEmKhongThe}
                            onChange={onChangeInput("treEmKhongThe")}
                          />
                        </div>
                      </SelectGroup>

                      <SelectGroup>
                        <span>
                          {"Tên trưởng khoa"}
                          {/* <span className={"title-error"}>*</span>:{" "} */}
                        </span>
                        <div className="select-box-chan-doan">
                          <Select
                            style={{
                              width: "100%",
                            }}
                            data={listNhanVien}
                            value={state?.truongKhoaId}
                            onChange={onChangeInput("truongKhoaId")}
                          />
                        </div>
                      </SelectGroup>
                      {/* {state?.validate && !state?.truongKhoaId && (
                        <span className="title-error">
                          {"Bắt buộc chọn trưởng khoa"}
                        </span>
                      )} */}

                      <TextField
                        label={
                          <span>
                            Mã CCHN trưởng khoa
                            {/* <span className={"title-error"}>*</span> */}
                          </span>
                        }
                        className="input_custom"
                        marginTop={5}
                        maxLine={1}
                        disabled={true}
                        html={state.truongKhoa?.chungChi}
                      />
                      {/* {state?.validate && !state?.truongKhoa?.chungChi && (
                        <span className="title-error">
                          {"Mã CCHN trưởng khoa là bắt buộc"}
                        </span>
                      )} */}
                    </Col>
                  </Row>
                </Panel>
                <Panel
                  header="Thông tin cha, mẹ (Áp dụng cho người bệnh dưới 7 tuổi)"
                  key="2"
                >
                  <Row>
                    <Col span={7}>
                      <TextField
                        label={"Họ tên cha"}
                        className="input_custom"
                        marginTop={5}
                        maxLine={1}
                        onChange={onChangeInput("tenCha")}
                        html={state?.tenCha}
                      />
                    </Col>
                    <Col span={7} offset={1}>
                      <TextField
                        label={"Họ tên mẹ"}
                        className="input_custom"
                        marginTop={5}
                        maxLine={1}
                        onChange={onChangeInput("tenMe")}
                        html={state?.tenMe}
                      />
                    </Col>
                  </Row>
                  {state?.validate &&
                    !state?.tenCha &&
                    !state?.tenMe &&
                    state?.treEmKhongThe == 1 && (
                      <span className="title-error">
                        {"Bắt buộc nhập tên cha hoặc tên mẹ"}
                      </span>
                    )}
                </Panel>
              </Collapse>
            </div>
          )}
      </Main>
    </ModalTemplate>
  );
};

export default ModalThongTinRaVien;
