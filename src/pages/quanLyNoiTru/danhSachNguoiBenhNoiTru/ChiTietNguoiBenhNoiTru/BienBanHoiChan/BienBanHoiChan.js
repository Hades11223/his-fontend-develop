import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Row, Col, Popover, Input } from "antd";
import { GlobalStyle, MainBienBanHoiChan } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import TextField from "components/TextField";
import ThongTinBenhNhan from "pages/quanLyNoiTru/danhSachNguoiBenhNoiTru/ChiTietNguoiBenhNoiTru/ThongTinBenhNhan";
import fileUtils from "utils/file-utils";
import { PrinterOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DateTimePicker,
  HeaderSearch,
  Select,
  TableWrapper,
  SelectLargeData,
} from "components";
import { useEnum } from "hook";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { ENUM, GIAY_IN_BIEN_BAN_HOI_CHAN, LOAI_DICH_VU } from "constants/index";
import { SelectGroup } from "./styled";
import { printJS } from "data-access/print-provider";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import ChiDinhDichVuHoiChan from "./ChiTietBienBanHoiChan/ChiDinhDichVuHoiChan";
import { LOAI_DICH_VU_CHI_DINH } from "pages/khamBenh/configs";
import { useStore } from "hook";
import IconDelete from "assets/svg/kho/delete.svg";
import IcExpandDown from "assets/svg/noiTru/icExpandDown.svg";
import IcExpandRight from "assets/svg/noiTru/icExpandRight.svg";
import { refConfirm } from "app";

const { SelectChanDoan } = SelectLargeData;
const BienBanHoiChan = (props) => {
  const { nbDotDieuTriId, id, nbBienBanHoiChan, isShowTuVan, isReadonly } =
    props;
  const refChiDinhDichVu = useRef(null);
  const { infoPatient } = useSelector((state) => state.danhSachNguoiBenhNoiTru);
  const { listNhanVien } = useSelector((state) => state.nhanVien);
  const listDsBienBanHoiChanTuVan = useStore(
    "nbBienBanHoiChan.listDsBienBanHoiChanTuVan",
    []
  );
  const {
    maBenh: { getListAllMaBenh },
    toDieuTri: { updateData },
    nhanVien: { getListNhanVienTongHop },
    nbBienBanHoiChan: {
      createOrEdit,
      getPhieu,
      getBienBanHoiChanTuVan,
      onDeleteTuVan,
      getById,
    },
    danhSachNguoiBenhNoiTru: { getNbNoiTruById },
  } = useDispatch();

  const [listcapHoiChan] = useEnum(ENUM.CAP_HOI_CHAN);
  const [listtienLuong] = useEnum(ENUM.TIEN_LUONG);
  const [listLoaidichVu] = useEnum(ENUM.LOAI_DICH_VU);

  const { t } = useTranslation();
  const history = useHistory();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (nbDotDieuTriId) {
      getNbNoiTruById(nbDotDieuTriId);
      getBienBanHoiChanTuVan({
        nbDotDieuTriId: nbDotDieuTriId,
        bienBanHoiChanId: id,
      });
    }
  }, [nbDotDieuTriId]);

  useEffect(() => {
    if (nbBienBanHoiChan) {
      setState({
        tienSuBanThan: nbBienBanHoiChan?.tienSuBanThan,
        tienSuGiaDinh: nbBienBanHoiChan?.tienSuGiaDinh,
        toanThan: nbBienBanHoiChan?.toanThan,
        cacBoPhan: nbBienBanHoiChan?.cacBoPhan,
        ketQuaLamSang: nbBienBanHoiChan?.ketQuaLamSang,
        dsCdVaoVienId: nbBienBanHoiChan?.dsCdVaoVienId,
        thoiGianThucHien: moment(nbBienBanHoiChan?.thoiGianThucHien),
        capHoiChan: nbBienBanHoiChan?.capHoiChan,
        tienLuong: nbBienBanHoiChan?.tienLuong,
        chuTriId: nbBienBanHoiChan?.chuTriId,
        thuKyId: nbBienBanHoiChan?.thuKyId,
        dsThanhPhan: nbBienBanHoiChan?.dsThanhPhan,
        lyDo: nbBienBanHoiChan?.lyDo,
        diaDiem: nbBienBanHoiChan?.diaDiem,
        dsCdChinhId: nbBienBanHoiChan?.dsCdChinhId,
        dsCdKemTheoId: nbBienBanHoiChan?.dsCdKemTheoId,
        huongDieuTri: nbBienBanHoiChan?.huongDieuTri,
        ketLuan: nbBienBanHoiChan?.ketLuan,
        dienBienBenh: nbBienBanHoiChan?.dienBienBenh,
        kinhGui: nbBienBanHoiChan?.kinhGui,
      });
    }
  }, [nbBienBanHoiChan]);

  useEffect(() => {
    getListNhanVienTongHop({ page: "", size: "", active: true });
    getListAllMaBenh({ page: "", size: "", active: true });
  }, []);
  const onChange = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e;
    else value = e;
    setState({ [key]: value });
    if (key === "capHoiChan" && value === 10) {
      getListNhanVienTongHop({
        khoaId: infoPatient?.khoaNbId,
        page: "",
        size: "",
        active: true,
      });
    }
  };
  const onDeleteItem = (item) => {
    refConfirm.current &&
      refConfirm.current.show(
        {
          title: t("common.xoaDuLieu"),
          content: `${t("common.banChacChanMuonXoa")} ${item?.dichVu?.ten}?`,
          cancelText: t("common.quayLai"),
          okText: t("common.dongY"),
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteTuVan(item?.id).then(() => {
            getBienBanHoiChanTuVan({
              nbDotDieuTriId: nbDotDieuTriId,
              bienBanHoiChanId: id,
            });
          });
        }
      );
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => index + 1,
    },
    {
      title: <HeaderSearch title={t("common.loaiDichVu")} />,
      width: "100px",
      dataIndex: "loaiDichVu",
      key: "loaiDichVu",
      render: (item) => (
        <div className="item">
          {(listLoaidichVu || []).find((x) => x.id === item)?.ten}
        </div>
      ),
    },
    {
      title: <HeaderSearch title={t("common.tenDichVu")} />,
      width: "400px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => <div className="item">{item?.ten}</div>,
    },
    {
      title: <HeaderSearch title={t("hoiChan.nguoiTuVan")} />,
      width: "200px",
      dataIndex: "nguoiTuVan",
      key: "nguoiTuVan",
      render: (item) => <div className="item">{item?.ten}</div>,
    },
    {
      title: <HeaderSearch title={t("common.tienIch")} />,
      width: "80px",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (item, data) => <IconDelete onClick={() => onDeleteItem(data)} />,
    },
  ];
  const onCreateOrEdit = () => {
    const {
      thoiGianThucHien,
      capHoiChan,
      tienLuong,
      chuTriId,
      thuKyId,
      dsThanhPhan,
      lyDo,
      diaDiem,
      dsCdChinhId,
      dsCdKemTheoId,
      dsCdVaoVienId,
      huongDieuTri,
      ketLuan,
      tienSuBanThan,
      tienSuGiaDinh,
      toanThan,
      cacBoPhan,
      ketQuaLamSang,
      dienBienBenh,
      kinhGui
    } = state;
    createOrEdit({
      nbDotDieuTriId: nbDotDieuTriId,
      thoiGianThucHien: moment(thoiGianThucHien).format("YYYY-MM-DD HH:mm:ss"),
      capHoiChan,
      tienLuong,
      chuTriId,
      thuKyId,
      dsThanhPhan,
      lyDo,
      diaDiem,
      dsCdChinhId,
      dsCdKemTheoId,
      dsCdVaoVienId,
      huongDieuTri,
      ketLuan,
      tienSuBanThan,
      tienSuGiaDinh,
      toanThan,
      cacBoPhan,
      ketQuaLamSang,
      dienBienBenh,
      kinhGui,
      id: id,
    }).then((s) => {
      if (id) {
        getById(id);
      } else {
        history.push(
          `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/bien-ban-hoi-chan/chi-tiet/${s?.id}`
        );
      }
    });
  };

  const onBack = () => {
    setState({
      thoiGianThucHien: null,
      capHoiChan: null,
      tienLuong: null,
      chuTriId: null,
      thuKyId: null,
      dsThanhPhan: null,
      lyDo: null,
      diaDiem: null,
      dsCdChinhId: null,
      dsCdKemTheoId: null,
      dsCdVaoVienId: null,
      huongDieuTri: null,
      ketLuan: null,
      tienSuBanThan: null,
      tienSuGiaDinh: null,
      toanThan: null,
      cacBoPhan: null,
      ketQuaLamSang: null,
      dienBienBenh: null,
      kinhGui: null
    });
    updateData({ activeKey: "5" });
    history.push(
      `/quan-ly-noi-tru/chi-tiet-nguoi-benh-noi-tru/${infoPatient?.id}`
    );
  };
  const handlePrint = (item) => {
    if (nbBienBanHoiChan?.id) {
      getPhieu({ id: nbBienBanHoiChan.id, ...item }).then((s) => {
        fileUtils
          .getFromUrl({ url: fileUtils.absoluteFileUrl(s?.file?.pdf) })
          .then((s) => {
            const blob = new Blob([new Uint8Array(s)], {
              type: "application/pdf",
            });
            const blobUrl = window.URL.createObjectURL(blob);
            printJS({
              printable: blobUrl,
              type: "pdf",
            });
          });
      });
    }
  };
  const contentPopover = () => {
    return (
      <div>
        {GIAY_IN_BIEN_BAN_HOI_CHAN.map((item, index) => (
          <div
            className="item-file"
            key={index}
            onClick={() => handlePrint(item)}
          >
            {t(`quanLyNoiTru.${item.ten}`)}
          </div>
        ))}
      </div>
    );
  };
  const onChiDinhDichVu = () => {
    let { chuTriId, dsThanhPhan } = state;
    let listNguoiTuVan = listNhanVien.filter(
      (x) =>
        (dsThanhPhan || []).map((item) => Number(item)).includes(x.id) ||
        x.id === chuTriId
    );
    refChiDinhDichVu.current &&
      refChiDinhDichVu.current.show(listNguoiTuVan, () => {
        getBienBanHoiChanTuVan({
          nbDotDieuTriId: nbDotDieuTriId,
          bienBanHoiChanId: id,
        });
        setState({ expanDown: true });
      });
  };

  const listLoaiChiDinhDV = useMemo(() => {
    const list = LOAI_DICH_VU_CHI_DINH.filter((x) => x.id && x.id !== 150).map(
      (item) => {
        item.ten = t(item.i18n);
        return item;
      }
    );
    return list;
  }, [t]);
  return (
    <MainBienBanHoiChan>
      <GlobalStyle></GlobalStyle>
      <fieldset disabled={isReadonly} style={{ width: "100%" }}>
        <Row>
          <h1>{t("hoiChan.chiTietBienBanHoiChan")}</h1>
          <span style={{ flex: 1, textAlign: "right" }}>
            <img src={require("assets/images/utils/location.png")} alt="" />
            {infoPatient?.maKhoaNb && infoPatient?.tenKhoaNb && (
              <b>
                {infoPatient?.maKhoaNb} - {infoPatient?.tenKhoaNb}
              </b>
            )}
          </span>
        </Row>
        <Row>
          <Col className="header-left" span={24}>
            <ThongTinBenhNhan />
          </Col>
        </Row>
        <Card className="content">
          <Row gutter={12}>
            {/* ------ Left ------ */}
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <span>
                    {t("hoiChan.capHoiChan")}: {"  "}
                  </span>
                  <Select
                    style={{ minWidth: "200px" }}
                    onChange={onChange("capHoiChan")}
                    data={listcapHoiChan}
                    value={state?.capHoiChan}
                    disabled={isReadonly}
                  />
                </Col>
                <Col span={12}>
                  <span>
                    {t("hoiChan.tienLuong")}: {"  "}
                  </span>
                  <Select
                    style={{ minWidth: "200px" }}
                    onChange={onChange("tienLuong")}
                    data={listtienLuong}
                    value={state?.tienLuong}
                    disabled={isReadonly}
                  />
                </Col>

                <Col span={24}>
                  <TextField
                    label={t("hoiChan.kinhGui")}
                    className="input_custom"
                    marginTop={5}
                    onChange={onChange("kinhGui")}
                    html={state?.kinhGui}
                    maxLine={1}
                  />
                </Col>

                <Col span={12}>
                  <SelectGroup>
                    <span>
                      {t("hoiChan.chuTri")}: {"  "}
                    </span>
                    <Select
                      className="select-box"
                      onChange={onChange("chuTriId")}
                      data={listNhanVien}
                      showArrow={false}
                      value={state?.chuTriId}
                      disabled={isReadonly}
                    />
                  </SelectGroup>
                </Col>

                <Col span={12}>
                  <SelectGroup>
                    <span>
                      {t("hoiChan.thuKy")}: {"  "}
                    </span>
                    <Select
                      className="select-box"
                      onChange={onChange("thuKyId")}
                      data={listNhanVien}
                      showArrow={false}
                      value={state?.thuKyId}
                      disabled={isReadonly}
                    />
                  </SelectGroup>
                </Col>

                <Col span={24}>
                  <SelectGroup>
                    <span>
                      {t("hoiChan.thanhPhanThamGia")}: {"  "}
                    </span>
                    <div className="select-box">
                      <Select
                        mode="multiple"
                        onChange={onChange("dsThanhPhan")}
                        style={{
                          width: "100%",
                        }}
                        data={listNhanVien}
                        value={(state?.dsThanhPhan || []).map((item) =>
                          Number(item)
                        )}
                        disabled={isReadonly}
                      />
                    </div>
                  </SelectGroup>
                  <TextField
                    label={t("hoiChan.lyDoHoiChan")}
                    className="input_custom"
                    marginTop={5}
                    onChange={onChange("lyDo")}
                    html={state?.lyDo}
                    maxLine={1}
                  />
                  <TextField
                    label={t("hoiChan.diaDiem")}
                    className="input_custom"
                    marginTop={5}
                    onChange={onChange("diaDiem")}
                    html={state?.diaDiem}
                    maxLine={1}
                  />
                  <h1>{t("hoiChan.tomTatQuaTrinhDienBien")}</h1>
                  <ul>
                    <span>
                      {" "}
                      {"1. "}
                      {t("hoiChan.tomTatTienSuBenh")}
                      {":"}
                    </span>
                    <li>
                      <TextField
                        label={t("hoiChan.banThan")}
                        className="input_custom"
                        marginTop={5}
                        html={state?.tienSuBanThan}
                        onChange={onChange("tienSuBanThan")}
                        maxLine={1}
                      />
                    </li>
                    <li>
                      <TextField
                        label={t("hoiChan.giaDinh")}
                        className="input_custom"
                        marginTop={5}
                        html={state?.tienSuGiaDinh}
                        onChange={onChange("tienSuGiaDinh")}
                        maxLine={1}
                      />
                    </li>
                  </ul>
                  <ul>
                    <span>
                      {" "}
                      {"2. "}
                      {t("hoiChan.tinhTrangLucVaoVien")}
                      {":"}
                    </span>
                    <li>
                      <TextField
                        label={t("hoiChan.toanThan")}
                        className="input_custom"
                        marginTop={5}
                        html={state?.toanThan}
                        onChange={onChange("toanThan")}
                        maxLine={1}
                      />
                    </li>
                    <li>
                      <TextField
                        label={t("hoiChan.cacBoPhanKhac")}
                        className="input_custom"
                        marginTop={5}
                        html={state?.cacBoPhan}
                        onChange={onChange("cacBoPhan")}
                        maxLine={1}
                      />
                    </li>
                    <li>
                      <TextField
                        label={t("hoiChan.tomTatKetQuaCLS")}
                        className="input_custom"
                        marginTop={5}
                        html={state?.ketQuaLamSang}
                        onChange={onChange("ketQuaLamSang")}
                        maxLine={1}
                      />
                    </li>
                    <li>
                      <SelectGroup>
                        <span>{t("hoiChan.chanDoanBenh")}:</span>
                        <div className="select-box">
                          <SelectChanDoan
                            mode="multiple"
                            value={(state?.dsCdVaoVienId || []).map(
                              (item) => item + ""
                            )}
                            style={{
                              width: "100%",
                            }}
                            maxItem={1}
                            onChange={onChange("dsCdVaoVienId")}
                            disabled={isReadonly}
                          />
                        </div>
                      </SelectGroup>
                    </li>
                  </ul>
                  <ul>
                    <span>
                      {" "}
                      {"3. "}
                      {t("hoiChan.tomTatDienBenhQuaTrinhDieuTri")}
                      {":"}
                    </span>
                    <li>
                      <TextField
                        label={""}
                        className="input_custom"
                        marginTop={5}
                        onChange={onChange("dienBienBenh")}
                        html={state?.dienBienBenh}
                        maxLine={1}
                      />
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>

            {/* ------ Right ------ */}
            <Col span={12}>
              <Row>
                <Col span={24}>
                  <div className="date">
                    <div className="left">
                      <label className="title">{t("hoiChan.ngay")} : </label>
                      <DateTimePicker
                        showTime={{ format: "HH:mm:ss" }}
                        value={state?.thoiGianThucHien}
                        onChange={onChange("thoiGianThucHien")}
                        placeholder={"Chọn thời gian"}
                        disabled={isReadonly}
                      />
                    </div>
                    <div className="right">
                      <img
                        style={{ width: 15, height: 15, cursor: "pointer" }}
                        src={require("assets/images/utils/x-gray.png")}
                        alt=""
                        onClick={() => {
                          onBack();
                        }}
                      />
                    </div>
                  </div>

                  <h1>{t("hoiChan.ketQuaHoiChan")}</h1>
                  <ul>
                    <span>
                      {" "}
                      {"1. "}
                      {t("hoiChan.chanDoan")}
                      {":"}
                    </span>
                    <li>
                      <SelectGroup>
                        <span>{t("hoiChan.chanDoanBenh")}:</span>
                        <div className="select-box">
                          <SelectChanDoan
                            mode="multiple"
                            value={(state?.dsCdChinhId || []).map(
                              (item) => item + ""
                            )}
                            style={{
                              width: "100%",
                            }}
                            maxItem={1}
                            onChange={onChange("dsCdChinhId")}
                            disabled={isReadonly}
                          />
                        </div>
                      </SelectGroup>
                    </li>
                    <li>
                      <SelectGroup>
                        <span>{t("hoiChan.chanDoanKemTheo")}:</span>
                        <div className="select-box">
                          <SelectChanDoan
                            mode="multiple"
                            value={(state?.dsCdKemTheoId || []).map(
                              (item) => item + ""
                            )}
                            style={{
                              width: "100%",
                            }}
                            onChange={onChange("dsCdKemTheoId")}
                            disabled={isReadonly}
                          />
                        </div>
                      </SelectGroup>
                    </li>
                  </ul>

                  <TextField
                    label={`2. ${t("hoiChan.huongDieuTri")}`}
                    className="input_custom"
                    marginTop={5}
                    onChange={onChange("huongDieuTri")}
                    html={state?.huongDieuTri}
                    maxLine={1}
                  />
                  <TextField
                    label={`3. ${t("hoiChan.ketLuan")}`}
                    className="input_custom"
                    marginTop={5}
                    onChange={onChange("ketLuan")}
                    html={state?.ketLuan}
                    maxLine={1}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          {isShowTuVan && !isReadonly && (
            <Row className="table-content">
              <div className="table-header">
                <div
                  className="left"
                  onClick={() => setState({ expanDown: !state?.expanDown })}
                >
                  {state?.expanDown ? <IcExpandDown /> : <IcExpandRight />}
                  Tư vấn thực hiện dịch vụ
                </div>
                <div className="right">
                  <img src={IconSearch} alt="IconSearch" className="ic-down" />
                  <Input
                    placeholder={t("common.timKiem")}
                    onClick={onChiDinhDichVu}
                  />
                </div>
              </div>
              {state?.expanDown && (
                <TableWrapper
                  columns={columns}
                  dataSource={listDsBienBanHoiChanTuVan}
                />
              )}
            </Row>
          )}
        </Card>
        <Row className="action-bottom">
          <div className="button-right">
            <Button
              minWidth={100}
              onClick={() => {
                onBack();
              }}
            >
              {t("common.quayLaiEsc")}
            </Button>
            {isShowTuVan && (
              <Popover
                overlayClassName="popover-list-giay-in"
                placement="topLeft"
                content={contentPopover()}
                trigger="click"
              >
                <Button
                  // onClick={onPrint(0)}
                  rightIcon={<PrinterOutlined />}
                  iconHeight={15}
                >
                  {t("common.inPhieu")}
                </Button>
              </Popover>
            )}
            {!isReadonly && (
              <Button
                type="primary"
                minWidth={100}
                onClick={() => onCreateOrEdit()}
              >
                {t("common.luu")} [F4]
              </Button>
            )}
          </div>
        </Row>
        <ChiDinhDichVuHoiChan
          ref={refChiDinhDichVu}
          dataNb={nbBienBanHoiChan}
          listLoaiChiDinh={listLoaiChiDinhDV}
          dsDoiTuongSuDung={30}
          dsLoaiDichVu={[
            LOAI_DICH_VU.KHAM,
            LOAI_DICH_VU.XET_NGHIEM,
            LOAI_DICH_VU.CDHA,
            LOAI_DICH_VU.PHAU_THUAT_THU_THUAT,
          ].join(",")}
        />
      </fieldset>
    </MainBienBanHoiChan>
  );
};
export default memo(BienBanHoiChan);
