import React, { useRef, useEffect, useState, memo } from "react";
import { Col, Input, Checkbox, Row, message } from "antd";
import { GlobalStyle, Main, PopoverWrapper } from "./styled";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/Select";
import { hexToUtf8, decodeBase64 } from "utils";
import ModalAddCapCuu from "./ModalAddCapCuu";
import ModalAddQuanNhan from "./ModalAddQuanNhan";
import moment from "moment";
import { ModalNotification2 } from "components/ModalConfirm";
import fileUtils from "utils/file-utils";
import { openInNewTab } from "utils";
import InputTimeout from "components/InputTimeout";
import { useTranslation } from "react-i18next";
import TakeImage from "../../TakeImage";
import { useCamera } from "hook";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import fileProvider from "data-access/file-provider";
import IcEye from "assets/svg/ic-eye.svg";
import IcQrCode from "assets/svg/ic-qrcode.svg";
import IcTakeAvatar from "assets/svg/tiep-don/ic-take-avatar.svg";
import { ISOFH_TOOL_HOST } from "client/request";
const InfoHeader = ({ layerId, id, ...props }) => {
  const { t } = useTranslation();
  const { onShowCamera } = useCamera();
  const { onCheckTrungThongTin } = props;
  const history = useHistory();
  const {
    tiepDon: {
      doiTuong,
      maHoSo,
      loaiDoiTuongId,
      nbTongKetRaVien,
      uuTien = false,
      capCuu = false,
      nbTheBaoHiem,
      nbCapCuu = {},
      nbQuanNhan = {},
      checkValidate = false,
      disableTiepDon,
      anhDaiDien,
      hangThe,
      covid = false,
      maDinhDanh: maDinhDanhRedux,
      dataMacDinh,
    },
    loaiDoiTuong: { listAllLoaiDoiTuong = [] },
    utils: { listdoiTuong = [] },
    theBaoHiem: { listAllTheBaoHiem = [] },
    thietLap: { dataNGUON_NGUOI_BENH },
    nguonNguoiBenh: { listAllNguonNguoiBenh },
    phong: { listAllPhong },
    tiepDonDichVu: { listDvKham },
    ttHanhChinh: {
      listAllTinh,
      listAllQuanHuyen,
      listAllXaPhuong,
      listAllQuocGia,
    },
    benhVien: { listAllBenhVien },
    ngheNghiep: { listAllNgheNghiep },
    moiQuanHe: { listAllQuanHe },
  } = useSelector((state) => state);
  const {
    goiSo: { updateData: updateDataGoiSo },
    tiepDon: { updateData, updateThongTinNb, updateThongTinTiepDon },
    ngoaiVien: { onSearch },
    phimTat: { onRegisterHotkey },
    thietLap: { getThietLap },
    phong: { getListAllPhong },
  } = useDispatch();
  const refModalNotification2 = useRef(null);
  const refAddCapCuu = useRef();
  const refQuanNhan = useRef();
  const refMaNb = useRef();
  const refMaDinhDanh = useRef();
  const refCheckboxCapCuu = useRef(null);
  const refWarningMessage = useRef(null);
  const searchMaNbTiepDon = useDispatch().tiepDon.searchMaNbTiepDon;
  const updateDetail = useDispatch().tiepDon.updateDetail;
  const { maNb, onSearchTime } = useSelector((state) => state.tiepDon);
  const { onChange, refModal, onCheckCardInsurance } = props;
  const { lyDoDenKham } = nbTongKetRaVien || {};
  const { maThe } = nbTheBaoHiem || {};

  const [state, _setState] = useState({
    maDinhDanh: "",
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const { maDinhDanh } = state;
  useEffect(() => {
    refModal({
      refQuanNhan,
      refAddCapCuu,
    });
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 113, //F2
          onEvent: () => {
            refMaDinhDanh.current && refMaDinhDanh.current.focus();
          },
        },
      ],
    });
    getThietLap({ ma: "NGUON_NGUOI_BENH" });
    getListAllPhong({ active: true, page: "", size: "" });
  }, []);
  useEffect(() => {
    if (!maDinhDanhRedux) {
      // nếu nhấn button người bệnh tiếp theo , sẽ clear input Mã định danh
      setState({ maDinhDanh: "" });
    }
  }, [maDinhDanhRedux]);

  useEffect(() => {
    if (onSearchTime && maDinhDanh) {
      //nếu người bệnh trong tiếp đón thay đổi thì clear trường mã định danh
      setState({ maDinhDanh: "" });
    }
  }, [onSearchTime]);

  const onSearchMaThe = (e, value) => {
    if (e.key === "Enter" || e.key === "Tab" || value) {
      const data = value || e.target.value;
      if (data) {
        if (data.length === 8 || data.startsWith("TM")) {
          if (data.length === 8) {
            getInfoPatientFromBVE(data);
          } else {
            getInfoPatientFromBVE(data);
          }
        } else if (data.startsWith("NB") && data.endsWith("$")) {
          searchQrNB(data);
        } else if (data.indexOf("$") == data.length - 1) {
          searchMaThe(data);
        } else if (data.endsWith("}")) {
          getInfoFromQrJson(JSON.parse(data));
        } else {
          getInfoFromCCCD(data.replaceAll("\n", ""));
        }
      }
    }
  };
  const getInfoFromQrJson = (value = {}) => {
    updateData({
      maNb: value?.maNb,
    });
    onSearchInfo(value?.maNb);
  };
  const getInfoFromCCCD = (value = "") => {
    let array = value.split("|");
    if (array.length === 7) {
      let date = moment(array[3], "DDMMYYYY");
      const arr = (array[5] || "").split(",").map((item) => item.trim());
      updateData({
        nbGiayToTuyThan: { loaiGiayTo: 2, maSo: array[0] },
        tenNb: array[2],
        ngaySinh: { date: date._d, str: date._d.format("dd/MM/yyyy") },
        tuoi: date._d.getAge() || "",
        gioiTinh: array[4] === "Nữ" ? 2 : 1,
        searchThe: true,
        nbDiaChi: {
          diaChi: arr.slice(1, 4).join(", "),
          soNha: arr[0],
        },
      });
    }
  };
  const getInfoPatientFromBVE = (data) => {
    let payload = {};
    if (data.startsWith("TM")) {
      payload = { soPhieuId: data.substring(2) };
    } else {
      payload = { maHoSo: data };
    }
    onSearch({ ...payload }).then((s) => {
      if (s.length) {
        let dataBVE = generateData(s[0]);
        updateDetail({
          ...dataBVE,
        });
        let payload = {
          tenNb: dataBVE.tenNb?.toUpperCase(),
          soDienThoai: dataBVE.soDienThoai?.replaceAll(" ", ""),
          gioiTinh: dataBVE?.gioiTinh,
          ngaySinh: dataBVE?.ngaySinh,
          sdtNguoiBaoLanh: dataBVE.sdtNguoiBaoLanh,
          maTheBhyt: dataBVE?.nbTheBaoHiem?.maThe,
          quocTichId: dataBVE?.quocTichId,
          quocGiaId: dataBVE?.nbDiaChi?.quocGiaId,
          danTocId: dataBVE?.danTocId,
          tinhThanhPhoId: dataBVE?.nbDiaChi?.tinhThanhPhoId,
          quanHuyenId: dataBVE?.nbDiaChi?.quanHuyenId,
          xaPhuongId: dataBVE?.nbDiaChi?.xaPhuongId,
          soNha: dataBVE?.nbDiaChi?.soNha,
          chiNamSinh: dataBVE.chiNamSinh,
        };
        onCheckTrungThongTin({ ...payload }, dataBVE);
      }
    });
  };

  const generateData = (data) => {
    let nguonNbId = listAllNguonNguoiBenh.find(
      (x) => x.ma === dataNGUON_NGUOI_BENH
    )?.id;
    let dsDichVu = (data.dsDichVu || [])
      .filter((x) => !x.chiDinh)
      .map((item) => {
        let dichVu = listDvKham?.find((x) => x.ma === item.maDichVu);
        return {
          ...item,
          dichVuId: dichVu?.dichVuId,
          phongId: listAllPhong.find((x) => x.ma === item.maPhongThucHien)?.id,
          loaiDichVu: dichVu?.loaiDichVu,
          ngoaiVienId: item?.id,
        };
      });
    if (dsDichVu.length) {
      let dichVu = dsDichVu.filter((x) => !x.dichVuId);
      let phong = dsDichVu.filter((x) => !x.phongId);
      if (dichVu.length || phong.length) {
        let messageMaDichVu = dichVu.map((item) => {
          return `${item.tenDichVu}(${item.maDichVu})`;
        });
        let messagePhong = phong.map((item) => {
          return item.maPhongThucHien;
        });
        refWarningMessage.current &&
          refWarningMessage.current.show({
            title: "Thông báo",
            content: `Không tìm thấy ${
              messageMaDichVu.length
                ? `dịch vụ ${messageMaDichVu.join(", ")}; `
                : ""
            } 
            ${
              messagePhong.length ? ` mã phòng(${messagePhong.join(", ")})` : ""
            } trong danh mục`,
            typeModal: "warning",
            showBtnOk: true,
            okText: "Xác nhận",
          });
      }
    }
    let xaPhuongVienE = listAllXaPhuong?.find((x) => x.ma === data.maXaPhuong);
    let tinhVienE = listAllTinh?.find((x) => x.ma === data.maTinhThanhPho);
    let quanHuyenVienE = listAllQuanHuyen?.find(
      (x) => x.ma === data.maQuanHuyen
    );

    let nbDiaChi = {
      soNha: data?.soNha,
      xaPhuongId: xaPhuongVienE?.id,
      tinhThanhPhoId: tinhVienE?.id,
      quanHuyenId: quanHuyenVienE?.id,
      diaChi: `${
        (xaPhuongVienE?.ten ? xaPhuongVienE?.ten + `,` : "") +
        (quanHuyenVienE?.ten ? quanHuyenVienE?.ten + `,` : "") +
        (tinhVienE?.ten ? tinhVienE?.ten : "")
      }`,
      quocGiaId: dataMacDinh?.quocTich?.id,
    };

    let nbTongKetRaVien = {
      cdNoiGioiThieu: data?.cdNoiGioiThieu,
      lyDoDenKham: data?.lyDoDenKham,
    };
    let nbTheBaoHiem = {
      tuNgay: data?.tuNgayTheBhyt,
      denNgay: data?.denNgayTheBhyt,
      maThe: data?.maTheBhyt,
      mucHuong: data?.mucHuongTheBhyt,
      thoiGianDu5Nam: data?.thoiGianDu5Nam,
      henKhamLai: data?.henKhamLai,
      noiDangKyId: listAllBenhVien.find((x) => x.ma === data.maNoiDangKy)?.id,
      noiGioiThieuId: listAllBenhVien.find((x) => x.ma === data.maNoiGioiThieu)
        ?.id,
      tuNgayMienCungChiTra: data?.tuNgayMienCungChiTra,
      denNgayMienCungChiTra: data?.denNgayMienCungChiTra,
    };
    let nbNguoiBaoLanh = {
      hoTen: data.tenNguoiBaoLanh,
      soDienThoai: data.sdtNguoiBaoLanh,
      soCanCuoc: data.soCanCuocNguoiBaoLanh,
      moiQuanHeId: listAllQuanHe.find((x) => x.ma === data.maMoiQuanHe)?.id,
    };

    let nbNguonNb = {
      nguonNbId: nguonNbId,
    };
    let value = {
      ...data,
      nbDiaChi: nbDiaChi,
      nbTongKetRaVien: nbTongKetRaVien,
      nbTheBaoHiem: nbTheBaoHiem,
      nbNguoiBaoLanh: nbNguoiBaoLanh,
      nbNguonNb: nbNguonNb,
      ngheNghiepId: listAllNgheNghiep.find((x) => x.ma === data.maNgheNghiep)
        ?.id,
      danTocId: dataMacDinh.danToc?.id,
      quocTichId: dataMacDinh?.quocTich?.id,
      dsDichVu: dsDichVu,
      soDienThoai: data.soDienThoai === "0" ? "" : data.soDienThoai,
      nbNgoaiVien: {
        maHoSo: data.maHoSo,
        doiTuong: data.doiTuong,
        doiTuongKcb: data.doiTuongKcb,
        maNb: data?.maNb,
      },
      maHoSo: null,
      maNb: null,
    };
    return value;
  };
  const searchQrNB = (value = "") => {
    let array = value.split("|");
    let maBenhVien = array[1];
    let maHoSo = array[3];
    let maNb = array[4];
    let hoTen = array[5];
    let ngaySinh = {
      str: array[6],
      date: new Date(moment(new Date(array[6])).format("DD-MM-YYYY")),
    };
    let gioiTinh = array[7];
    let soDienThoai = array[8];
    let soNha = array[9];
    let maPhuong = array[10];
    let maQuanHuyen = array[11];
    let maTinhThanhPho = array[12];
    let maQuocGia = array[13];
    let diaChiNb = array[14];
    let soTheBHYT = array[15];
    let giayToTuyThan = array[16];
    let nbDiaChi = {
      soNha: decodeBase64(soNha),
      xaPhuongId: listAllXaPhuong?.find((x) => x.ma === maPhuong)?.id,
      tinhThanhPhoId: listAllTinh?.find((x) => x.ma === maTinhThanhPho)?.id,
      quanHuyenId: listAllQuanHuyen?.find((x) => x.ma === maQuanHuyen)?.id,
      diaChi: decodeBase64(diaChiNb),
      quocGiaId: listAllQuocGia?.find((x) => x.ma === maQuocGia)?.id,
    };
    if (maBenhVien === "01111") {
      onSearchInfo(maNb);
    } else {
      updateThongTinTiepDon({
        nbTheBaoHiem: {
          maThe: soTheBHYT,
        },
        tenNb: decodeBase64(hoTen),
        ngaySinh: ngaySinh,
        gioiTinh: Number(gioiTinh),
        maHoSo: maHoSo,
        soDienThoai: soDienThoai,
        maNb: maNb,
        tuoi: ngaySinh?.date.getAge(),
        doiTuong: soTheBHYT ? 2 : 1,
        nbGiayToTuyThan: {
          maSo: giayToTuyThan,
        },
        nbDiaChi: nbDiaChi,
      });
    }
  };

  const searchMaThe = (value = "") => {
    let array = value.split("|");
    let day = array[2]?.split("/") || [];
    let dayLate = `${day[2]}/${day[1]}/${day[0]}`;
    let date = {
      str: array[2],
      date: new Date(moment(new Date(dayLate)).format("YYYY-MM-DD")),
    };
    let day5nam = (array[12] && array[12].split("/")) || [];
    let ten = hexToUtf8(array[1]);
    let mucHuong = array[0]?.substr(0, 3);
    let dataCheck = listAllTheBaoHiem?.find(
      (item) => item.ma.toLowerCase() === mucHuong.toLowerCase()
    );
    updateThongTinTiepDon({
      nbTheBaoHiem: {
        ...(nbTheBaoHiem || {}),
        mucHuong: dataCheck?.mucHuong,
        maThe: array[0],
        thoiGianDu5Nam:
          day5nam[2] && `${day5nam[2]}/${day5nam[1]}/${day5nam[0]}`,
        boQuaTheLoi: false,
      },
      tenNb: ten,
      ngaySinh: date,
      gioiTinh: array[3] && Number(array[3]),
      doiTuong: 2,
      // nbDiaChi: {
      //   diaChi: hexToUtf8(array[4]),
      // },
      searchThe: true,
    });
    if (ten && ten.length && date?.date) {
      // setState({ maDinhDanh: "" });
      onCheckCardInsurance(
        {
          hoTen: ten,
          maThe: array[0],
          ngaySinh: date?.date,
        },
        { ten }
      );
    }
  };
  const onShowModalCamera = () => {
    if (!disableTiepDon)
      onShowCamera(
        {
          title: t("common.chupAnh"),
        },
        async (file) => {
          const res = await fileProvider.uploadImage({
            file,
            type: "anhDaiDien",
          });
          if (res?.code === 0) return res.data;
          return null;
        },
        (data) => {
          if (data) updateData({ anhDaiDien: data });
        }
      );
  };
  const onSearchInfo = (value = "") => {
    if (value.trim())
      searchMaNbTiepDon({ maNb: value }).then((s) => {
        if (s.code === 7925 || s.code === 7924 || s.code === 7922) {
          refModalNotification2.current &&
            refModalNotification2.current.show(
              {
                showBtnOk: true,
                title: "Thông báo",
                content: s.message,
                subContent:
                  s.code === 7925
                    ? `<b>Lưu ý:</b><br/>
                    Chọn <b>Hủy:</b> Tiếp tục sử dụng mã hồ sơ cũ <br/>
                    Chọn <b>Đồng ý:</b> Bỏ qua điều kiện thanh toán, Tạo mã khám cho ngày hiện tại`
                    : "",
              },
              () => {
                if (s.code === 7922) {
                  updateDetail(s.data);
                } else {
                  updateDetail({
                    ...s.data,
                    maHoSo: null,
                    id: null,
                  });
                  updateDataGoiSo({
                    daThanhToan: false,
                    messageChuaThanhToan: s.message,
                  });
                }
              },
              () => {
                if (s.code === 7925) {
                  history.push(`/tiep-don/dich-vu/${s?.data?.id}`);
                } else {
                  updateData({
                    maNb: null,
                  });
                  updateDataGoiSo({
                    daThanhToan: true,
                    messageChuaThanhToan: null,
                  });
                }
              }
            );
        } else {
          if (s.code === 0) {
            updateDetail(s.data);
            if (s?.data?.doiTuong === 2) {
              let payload = s?.data;
              onCheckCardInsurance(
                {
                  hoTen: payload?.tenNb,
                  maThe: payload?.nbTheBaoHiem?.maThe,
                  ngaySinh: new Date(
                    moment(new Date(payload?.ngaySinh)).format("YYYY-MM-DD")
                  ),
                },
                { ten: payload?.tenNb }
              );
            }
          }
        }
      });
  };
  const onKeyDown = (event) => {
    if (event.nativeEvent.key === "Enter") refMaNb.current.blur();
  };
  const onShowAddCapCuu = (item) => {
    refAddCapCuu.current.show(
      {
        show: true,
        loaiCapCuuId: item?.loaiCapCuuId,
        viTriChanThuongId: item?.viTriChanThuongId,
        nguyenNhanNhapVienId: item?.nguyenNhanNhapVienId,
        thoiGianCapCuuId: item?.thoiGianCapCuuId,
        chuaXacDinhDanhTinh: item?.chuaXacDinhDanhTinh,
        khongCoNguoiThanDiKem: item?.khongCoNguoiThanDiKem,
      },
      (data = {}) => {
        updateThongTinNb(data, "nbCapCuu");
      }
    );
  };
  const onShowAddQuanNhan = (value) => {
    refQuanNhan.current.show(
      {
        show: true,
        donViId: value?.donViId,
        nguoiDaiDienId: value?.nguoiDaiDienId,
        chucVuId: value?.chucVuId,
        quanHamId: value?.quanHamId,
      },
      (data = {}) => {
        updateThongTinNb(data, "nbQuanNhan");
      }
    );
  };

  const onClearLoaiDoiTuong = () => {
    updateData({ loaiDoiTuongId: null });
  };
  const onShowModalQuetCCCD = () => {
    fetch(`${ISOFH_TOOL_HOST}$/cccd/reader`, { method: "GET" })
      .then((s) => s.json())
      .then((s) => {
        if (s.code == 0) {
          setState({ maDinhDanh: s.data });
          updateData({
            maDinhDanh: s.data,
          });
          onSearchMaThe(null, s.data);
        }
      })
      .catch((e) => {
        console.log(e, t("tiepDon.kiemTraLaiPhanMemiSofHTool"));
        // message.error(t("tiepDon.kiemTraLaiPhanMemiSofHTool"))
      });
  };
  return (
    <Main className="main-header fadeIn">
      <Row className="body-info">
        <Col sm={12} md={12} xl={12} xxl={12} style={{ padding: 0 }}>
          <Row>
            <Col sm={8} md={8} xl={7} xxl={6}>
              <div
                className={disableTiepDon ? "avatar avatar-no-drop" : "avatar"}
                onClick={() => onShowModalCamera()}
              >
                <div className="wrapperCamera">
                  {hangThe && hangThe?.icon && (
                    <div className="hangTheIcon">
                      <GlobalStyle />
                      <PopoverWrapper
                        content={`${hangThe?.ten}`}
                        placement="right"
                        trigger="hover"
                      >
                        <img
                          src={`${fileUtils.absoluteFileUrl(hangThe?.icon)}`}
                          alt=""
                        />
                      </PopoverWrapper>
                    </div>
                  )}
                  <TakeImage
                    className={"avatar__"}
                    value={anhDaiDien}
                    image={require("assets/images/welcome/avatar.png")}
                    svgIcon={<IcTakeAvatar className="avatar__icon" />}
                    titleTooltipIcon={t("tiepDon.taiLenAnhDaiDien")}
                  />
                </div>
              </div>
            </Col>
            <Col sm={14} md={14} xl={17} xxl={18}>
              <div className="header-item">
                <div className="item-input input-ma-dinh-danh">
                  <div className="d-flex">
                    <label className="label">{t("tiepDon.maDinhDanh")}</label>
                    <label className="label">
                      <i className="sub-color">
                        {t("tiepDon.quetQRCCCDBHYTmaNB")}
                      </i>
                    </label>
                  </div>
                  <InputTimeout
                    style={{ paddingRight: "35px" }}
                    ref={refMaDinhDanh}
                    onClick={onShowModalQuetCCCD}
                    autoFocus
                    placeholder={t("tiepDon.quetMaQR")}
                    value={maDinhDanh}
                    onChange={(e) => {
                      setState({ maDinhDanh: e });
                      updateData({
                        maDinhDanh: e,
                      });
                    }}
                    onKeyDown={(e) => onSearchMaThe(e)}
                    // onBlur={}
                    disabled={disableTiepDon}
                    // id="scan-ma-dinh-danh"
                  />
                  <IcQrCode className="qr-icon" />
                </div>
              </div>
              <div className="header-item">
                <div className="item-text-area">
                  <label className="label">{t("tiepDon.lyDoDenKham")}</label>
                  <InputTimeout
                    isTextArea={true}
                    className="text-content"
                    value={lyDoDenKham}
                    disabled={disableTiepDon}
                    onChange={(e) => {
                      updateThongTinNb({ lyDoDenKham: e }, "nbTongKetRaVien");
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={12} xl={12} xxl={12}>
          <Row style={{ width: "100%" }} className="meta-info">
            {/* <Col sm={24} md={24} xl={24} xxl={24} className="header-button">
              <div className="button-item" style={{ marginRight: 15 }}>
                {" "}
                Thẻ khám bệnh
              </div>
              <div className="button-item"> Tạo thẻ tạm</div>
            </Col> */}
            <Col sm={9} md={9} xl={9} xxl={9} className="header-item">
              <div className="item-select">
                <label className={!doiTuong ? `label label-error` : "label"}>
                  {t("common.doiTuong")}
                  <span style={{ color: "red" }}> *</span>
                </label>
                <Select
                  onChange={(e, list) => onChange(e, "doiTuong")}
                  value={doiTuong}
                  className="item__second-select"
                  placeholder={t("common.chonDoiTuong")}
                  data={listdoiTuong}
                  onClear={onClearLoaiDoiTuong}
                  id={"value"}
                  ten={"name"}
                  disabled={disableTiepDon}
                />
                {checkValidate && !doiTuong ? (
                  <div className="error">{t("common.vuiLongChonDoiTuong")}</div>
                ) : null}
              </div>
            </Col>

            <Col sm={8} md={8} xl={7} xxl={6} className="header-item">
              <div>
                <Checkbox
                  className="box-item"
                  onChange={(e) => onChange(e?.target?.checked, "uuTien")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onChange(!e?.target?.checked, "uuTien");
                    }
                  }}
                  checked={uuTien}
                  disabled={disableTiepDon}
                >
                  {t("tiepDon.laUuTien")}
                </Checkbox>
                <div className="d-flex">
                  <Checkbox
                    ref={refCheckboxCapCuu}
                    className="box-item"
                    onChange={(e) => {
                      let value = e?.target?.checked;
                      onChange(value, "capCuu");
                      if (value) onShowAddCapCuu();
                      else updateData({ nbCapCuu: {} });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        let value = e?.target?.checked;
                        onChange(!value, "capCuu");
                        if (!value) onShowAddCapCuu();
                        else updateData({ nbCapCuu: {} });
                      }
                    }}
                    checked={capCuu}
                    disabled={disableTiepDon}
                  >
                    <span>{t("tiepDon.laCapCuu")}</span>
                  </Checkbox>
                  {capCuu && nbCapCuu?.loaiCapCuuId ? (
                    <span className="detail-view">
                      {/* {"Chi tiết"} */}
                      <IcEye onClick={() => onShowAddCapCuu(nbCapCuu)} />
                    </span>
                  ) : null}
                </div>
              </div>
            </Col>
            <Col sm={7} md={7} xl={8} xxl={9} className="header-item">
              <div className="item-input">
                <label className="label">{t("tiepDon.maNguoiBenh")}</label>
                <Input
                  ref={refMaNb}
                  onChange={(e) => onChange(e.target.value, "maNb")}
                  placeholder={t("tiepDon.nhapMaNguoiBenh")}
                  onBlur={(e) => onSearchInfo(e.target.value)}
                  onKeyDown={onKeyDown}
                  value={maNb}
                  disabled={id}
                  type="number"
                />
              </div>
            </Col>
          </Row>
          <Row style={{ width: "100%" }} className="meta-info">
            <Col sm={9} md={9} xl={9} xxl={9} className="header-item">
              <div className="item-select">
                <label
                  className={
                    !loaiDoiTuongId
                      ? `label label-error pointer`
                      : "label pointer"
                  }
                >
                  <span
                    onClick={() => openInNewTab("/danh-muc/loai-doi-tuong")}
                  >
                    {t("tiepDon.loaiDoiTuong")}
                  </span>
                  <span style={{ color: "red" }}> *</span>
                  {nbQuanNhan?.donViId ? (
                    <span className="detail-view">
                      <IcEye onClick={() => onShowAddQuanNhan(nbQuanNhan)} />
                    </span>
                  ) : null}
                </label>
                <Select
                  onChange={(e, list) => {
                    let value = list?.lists?.quanNhan;
                    const newState = { quanNhan: value };
                    if (value) onShowAddQuanNhan();
                    else {
                      newState.nbQuanNhan = null;
                    }
                    updateData(newState);
                    onChange(e, "loaiDoiTuongId");
                  }}
                  value={loaiDoiTuongId}
                  className="item__select"
                  placeholder={t("tiepDon.chonLoaiDoiTuong")}
                  data={listAllLoaiDoiTuong}
                  disabled={disableTiepDon}
                />
                {checkValidate && !loaiDoiTuongId ? (
                  <div className="error">
                    {t("tiepDon.vuiLongChonLoaiDoiTuong")}
                  </div>
                ) : null}
              </div>
            </Col>

            <Col sm={8} md={8} xl={7} xxl={6} className="header-item">
              <div>
                <Checkbox
                  className="box-item"
                  // onChange={(e) => onChange(e?.target?.checked, "covid")}
                  // onKeyDown={(e) => {
                  //   if (e.keyCode === 13) {
                  //     onChange(!e?.target?.checked, "covid");
                  //   }
                  // }}
                  checked={maThe}
                  disabled
                >
                  {t("tiepDon.giuTheBHYT")}
                </Checkbox>
                <Checkbox
                  className="box-item"
                  onChange={(e) => onChange(e?.target?.checked, "covid")}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      onChange(!e?.target?.checked, "covid");
                    }
                  }}
                  checked={covid}
                  disabled={disableTiepDon}
                >
                  {t("tiepDon.nbCovid")}
                </Checkbox>
              </div>
            </Col>
            <Col sm={7} md={7} xl={8} xxl={9} className="header-item">
              <div className="item-input">
                <label className="label">{t("common.maHoSo")}</label>
                <Input value={maHoSo} disabled />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <ModalAddCapCuu ref={refAddCapCuu} />
      <ModalAddQuanNhan ref={refQuanNhan} />
      <ModalNotification2 ref={refModalNotification2} />
      <ModalNotification2 ref={refWarningMessage} />
    </Main>
  );
};

export default memo(InfoHeader);
