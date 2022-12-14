import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, DatePicker, InputNumber } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { InputNumberFormat } from "components/common";
import InputBlockString from "../inputBlockString";
import { formatKetQuaThamChieu } from "../utils";
import { openInNewTab } from "../../../utils";
import { checkRole } from "utils/role-utils";
import { useTranslation } from "react-i18next";
import { useEnum } from "hook";
import { ENUM } from "constants/index";

function FormServiceInfo(props, ref) {
  const { t } = useTranslation();
  const {
    currentItem,
    layerId,
    refCallbackSave = {},
    isRequireChuyenKhoa,
    ignoreFetch,
    refTab,
  } = props;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  let editStatus = useMemo(() => props?.editStatus, [props?.editStatus]);
  const [listKetNoiPacsLis] = useEnum(ENUM.KET_NOI_PASC_LIS);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
    form.resetFields();
    loadCurrentItem(currentItem);
    refTab.current &&
      refTab.current.setKhoaChiDinh(!!currentItem?.hanCheKhoaChiDinh);
  }, [currentItem]);
  useEffect(() => {
    if (!ignoreFetch) {
      props.getUtils({ name: "nhomChiPhiBh" });
      props.getUtils({ name: "gioiTinh" });
      props.getUtils({ name: "PhanLoaiPtTt" });
      props.getUtils({ name: "Doituongsudung" });
      props.getUtils({ name: "loaiMau" });
      props.getListAllChuyenKhoa({});
      props.getListAllDonViTinh({ page: "", size: "" });
      props.getAllTongHopDichVuCap1();
      props.getAllTongHopDichVuCap2();
      props.getAllTongHopDichVuCap3();
    }
  }, []);

  const [form] = Form.useForm();

  const loadCurrentItem = (goiDichVu) => {
    if (goiDichVu) {
      const {
        dichVu: {
          donViTinhId,
          dsNguonKhacChiTra,
          giaBaoHiem,
          giaKhongBaoHiem,
          giaPhuThu,
          khongTinhTien,
          ma,
          maTuongDuong,
          nhomChiPhiBh,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          ten,
          tenTuongDuong,
          tyLeBhTt,
          tyLeTtDv,
          vietTat,
          thuNgoai,
          mucDichSuDung,
        } = {},
        id,
        phieuChiDinhId,
        chuyenKhoaId,
        dsChuyenKhoaId,
        dsDoiTuongSuDung,
        gioiTinh,
        hanCheKhoaChiDinh,
        thanhToanSau,
        ngayCongBo,
        soNgaySuDung,
        maKetNoi,
        tiepDonCls,
        quyetDinh,
        loaiMau,
        theTich,
        phiVanChuyen,
        active,
        ketQuaLau,
        phanLoaiPTTT,
        yeuCauBenhPham,
        chiSoNuCao,
        chiSoNuThap,
        chiSoNamCao,
        chiSoNamThap,
        loaiKetQua,
        ketQuaThamChieu,
        covid,
        tachPhieuChiDinh,
        online,
        theoYeuCau,
        tachSoLuong,
        phanLoaiPtTt,
        hienThiTomTatBa,
        ketNoi,
      } = goiDichVu || {};
      const data = {
        id,
        donViTinhId,
        giaBaoHiem,
        giaKhongBaoHiem,
        giaPhuThu,
        khongTinhTien,
        covid,
        ma,
        maTuongDuong,
        nhomChiPhiBh,
        nhomDichVuCap1Id,
        nhomDichVuCap2Id,
        nhomDichVuCap3Id,
        ten,
        tenTuongDuong,
        tyLeBhTt,
        tyLeTtDv,
        dsNguonKhacChiTra: dsNguonKhacChiTra || [],
        chuyenKhoaId,
        dsChuyenKhoaId: dsChuyenKhoaId || [],
        phieuChiDinhId,
        dsDoiTuongSuDung: dsDoiTuongSuDung || [],
        gioiTinh,
        hanCheKhoaChiDinh,
        thanhToanSau,
        ngayCongBo: (ngayCongBo && moment(ngayCongBo)) || null,
        quyetDinh,
        maKetNoi,
        soNgaySuDung,
        tiepDonCls,
        loaiMau,
        theTich,
        phiVanChuyen,
        active: active !== undefined ? active : true,
        phanLoaiPTTT,
        ketQuaLau,
        yeuCauBenhPham,
        chiSoNuCao,
        chiSoNuThap,
        chiSoNamCao,
        chiSoNamThap,
        ketQuaThamChieu: formatKetQuaThamChieu(loaiKetQua, ketQuaThamChieu),
        loaiKetQua,
        tachPhieuChiDinh,
        online,
        theoYeuCau,
        vietTat,
        thuNgoai,
        tachSoLuong,
        phanLoaiPtTt,
        hienThiTomTatBa,
        mucDichSuDung,
        ketNoi,
      };
      form.setFieldsValue(data);
      setState({
        data: data,
      });
      if (props.loaiDichVu === 20) {
        setState({
          loaiKetQuaXN: loaiKetQua,
        });
      }
    } else {
      form.resetFields();
      form.setFieldsValue({ phiVanChuyen: true, tachSoLuong: true });
      setState({
        data: null,
      });
    }
  };

  const onAddNewRow = () => {
    loadCurrentItem({});
    form.setFieldsValue({ phiVanChuyen: true, tachSoLuong: true });
  };

  const onCancel = () => {
    if (currentItem?.id) {
      loadCurrentItem({ ...currentItem });
    } else {
      loadCurrentItem({});
      form.resetFields();
    }
  };
  const onSave = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        const {
          donViTinhId,
          giaBaoHiem,
          giaKhongBaoHiem,
          giaPhuThu,
          khongTinhTien,
          covid,
          ma,
          maTuongDuong,
          nhomChiPhiBh,
          nhomDichVuCap1Id,
          nhomDichVuCap2Id,
          nhomDichVuCap3Id,
          ten,
          tenTuongDuong,
          tyLeBhTt,
          tyLeTtDv,
          dsNguonKhacChiTra,
          chuyenKhoaId,
          dsChuyenKhoaId = [],
          phieuChiDinhId,
          dsDoiTuongSuDung,
          gioiTinh,
          hanCheKhoaChiDinh,
          thanhToanSau,
          ngayCongBo,
          quyetDinh,
          tiepDonCls,
          loaiMau,
          theTich,
          active,
          phiVanChuyen,
          soNgaySuDung,
          maKetNoi,
          ketQuaLau,
          phanLoaiPTTT,
          yeuCauBenhPham,
          chiSoNuCao,
          chiSoNuThap,
          chiSoNamCao,
          chiSoNamThap,
          ketQuaThamChieu,
          loaiKetQua,
          tachPhieuChiDinh,
          online,
          theoYeuCau,
          vietTat,
          thuNgoai,
          tachSoLuong,
          phanLoaiPtTt,
          hienThiTomTatBa,
          mucDichSuDung,
          ketNoi,
        } = values;
        values = {
          dichVu: {
            donViTinhId,
            dsNguonKhacChiTra: dsNguonKhacChiTra || [],
            giaBaoHiem: giaBaoHiem?.toString().replaceAll(".", "") || null,
            giaKhongBaoHiem:
              giaKhongBaoHiem?.toString().replaceAll(".", "") || null,
            giaPhuThu: giaPhuThu?.toString().replaceAll(".", "") || null,
            khongTinhTien,
            ma,
            maTuongDuong,
            nhomChiPhiBh,
            nhomDichVuCap1Id,
            nhomDichVuCap2Id,
            nhomDichVuCap3Id,
            ten,
            tenTuongDuong,
            tyLeBhTt,
            tyLeTtDv,
            loaiDichVu: props.loaiDichVu,
            vietTat,
            thuNgoai,
            mucDichSuDung,
          },
          loaiMau,
          theTich,
          active,
          phiVanChuyen,
          chuyenKhoaId,
          dsChuyenKhoaId,
          phieuChiDinhId,
          dsDoiTuongSuDung,
          gioiTinh,
          hanCheKhoaChiDinh,
          thanhToanSau,
          ngayCongBo: (ngayCongBo && ngayCongBo.format("YYYY-MM-DD")) || null,
          quyetDinh,
          tiepDonCls,
          soNgaySuDung,
          maKetNoi,
          ketQuaLau,
          yeuCauBenhPham,
          phanLoaiPTTT,
          chiSoNuCao,
          chiSoNuThap,
          chiSoNamCao,
          chiSoNamThap,
          id: state.data?.id,
          loaiKetQua,
          covid,
          tachPhieuChiDinh,
          online,
          theoYeuCau,
          ketQuaThamChieu: formatKetQuaThamChieu(
            loaiKetQua,
            ketQuaThamChieu,
            "save"
          ),
          tachSoLuong,
          phanLoaiPtTt,
          hienThiTomTatBa,
          ketNoi,
        };
        props.createOrEdit(values, props.loaiDichVu).then((res) => {
          props.updateData && props.updateData({ currentItem: res.data });
          if (state.data?.id) {
            return;
          }
          form.resetFields();
          form.setFieldsValue({ phiVanChuyen: true, tachSoLuong: true });
        });
      })
      .catch((error) => {});
  };
  refCallbackSave.current = onSave;
  const renderKetQuaThamChieu = useCallback(() => {
    switch (state.loaiKetQuaXN) {
      case 10:
        return (
          <InputBlockString
            placeholder="Vui l??ng nh???p k???t qu??? tham chi???u"
            style={{ width: "100%" }}
          />
        );
      case 20:
        return (
          <Select
            placeholder="Vui l??ng nh???p k???t qu??? tham chi???u"
            mode="tags"
          ></Select>
        );
      case 30:
        return (
          <Select
            placeholder="Ch???n k???t qu??? tham chi???u"
            data={[
              { id: "-1", ten: "??m t??nh" },
              { id: "1", ten: "D????ng t??nh" },
            ]}
          />
        );
      default:
        return (
          <Input placeholder="Vui l??ng nh???p k???t qu??? tham chi???u" disabled />
        );
    }
  }, [state.loaiKetQuaXN]);
  const refAutoFocus = useRef(null);
  // useEffect(() => {
  //   // console.log("aaa", refAutoFocus.current.focus());
  //   console.log("refAutoFocus.current", refAutoFocus.current);
  // }, [currentItem]);
  // console.log("currentItem", currentItem);
  const onChangeHanCheKhoaChiDinh = (e) => {
    refTab.current && refTab.current.setKhoaChiDinh(!!e.target.checked);
  };
  return (
    <EditWrapper
      title="Th??ng tin d???ch v???"
      onCancel={onCancel}
      onSave={onSave}
      onAddNewRow={onAddNewRow}
      // isShowSaveButton={state.data}
      // isShowCancelButton={state.data}
      // showAdded={!state.data}
      roleSave={props.roleSave}
      roleEdit={props.roleEdit}
      editStatus={editStatus}
      forceShowButtonSave={checkRole(props.roleEdit) && true}
      forceShowButtonCancel={checkRole(props.roleEdit) && true}
      // showAdded={false}
      // isShowSaveButton={true}
      // isShowCancelButton={true}
      isHiddenButtonAdd={true}
      layerId={layerId}
    >
      <fieldset disabled={props.editStatus}>
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom"
        >
          <Form.Item
            label="M?? d???ch v???"
            name="ma"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p m?? d???ch v???!",
              },
              {
                max: 20,
                message: "Vui l??ng nh???p m?? d???ch v??? kh??ng qu?? 20 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p m?? d???ch v???!",
              },
            ]}
          >
            <Input
              autoFocus={true}
              className="input-option"
              placeholder="Vui l??ng nh???p m?? d???ch v???"
            />
          </Form.Item>
          <Form.Item
            label="T??n d???ch v???"
            name="ten"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??n d???ch v???!",
              },
              {
                max: 1000,
                message: "Vui l??ng nh???p t??n d???ch v??? kh??ng qu?? 1000 k?? t???!",
              },
              {
                whitespace: true,
                message: "Vui l??ng nh???p t??n d???ch v???!",
              },
            ]}
          >
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n d???ch v??? "
            />
          </Form.Item>
          <Form.Item label="T??n vi???t t???t" name="vietTat">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n vi???t t???t "
            />
          </Form.Item>
          <Form.Item
            label="????n gi?? kh??ng BH"
            name="giaKhongBaoHiem"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ????n gi?? kh??ng BH!",
              },
              {
                pattern: new RegExp(/^[0-9]/),
                message: "Vui l??ng nh???p s??? d????ng!",
              },
            ]}
          >
            <InputNumberFormat
              placeholder="Vui l??ng nh???p ????n gi?? kh??ng BH"
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="????n gi?? BH"
            name="giaBaoHiem"
            rules={[
              {
                pattern: new RegExp(/^[0-9]/),
                message: "Vui l??ng nh???p s??? d????ng!",
              },
            ]}
          >
            <InputNumberFormat
              placeholder="Vui l??ng nh???p ????n gi?? BH"
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="Ph??? thu"
            name="giaPhuThu"
            rules={[
              {
                pattern: new RegExp(/^[0-9]/),
                message: "Vui l??ng nh???p s??? d????ng!",
              },
            ]}
          >
            <InputNumberFormat
              placeholder="Vui l??ng nh???p Ph??? thu"
              className="input-option"
            />
          </Form.Item>
          <Form.Item
            label="T??? l??? BH thanh to??n"
            name="tyLeBhTt"
            rules={[
              {
                pattern: new RegExp(/^.{1,3}$/),
                message: "Vui l??ng nh???p t??? l??? BH thanh to??n kh??ng qu?? 3 k?? t???!",
              },
            ]}
          >
            <InputBlockString
              placeholder="Vui l??ng nh???p t??? l??? BH thanh to??n"
              maxLength={3}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="T??? l??? thanh to??n DV"
            name="tyLeTtDv"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p t??? l??? thanh to??n DV!",
              },
              {
                pattern: new RegExp(/^.{1,3}$/),
                message: "Vui l??ng nh???p t??? l??? thanh to??n DV kh??ng qu?? 3 k?? t???!",
              },
            ]}
          >
            <InputBlockString
              placeholder="Vui l??ng nh???p t??? l??? thanh to??n DV"
              maxLength={3}
              style={{ width: "100%" }}
            />
          </Form.Item>
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Lo???i k???t qu???" name="loaiKetQua">
              <Select
                data={props.listloaiKetQuaXetNghiem}
                placeholder="Vui l??ng ch???n lo???i k???t qu???"
                onChange={(e, item) => {
                  setState({ loaiKetQuaXN: e });
                  if (e === 20) {
                    form.setFieldsValue({
                      ketQuaThamChieu: [],
                    });
                  } else {
                    form.setFieldsValue({
                      ketQuaThamChieu: null,
                    });
                  }
                }}
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="K???t qu??? tham chi???u" name="ketQuaThamChieu">
              {renderKetQuaThamChieu()}
            </Form.Item>
          )}
          {[120].includes(props.loaiDichVu) && (
            <>
              <Form.Item
                label="Lo???i m??u"
                name="loaiMau"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng ch???n lo???i m??u!",
                  },
                ]}
              >
                <Select
                  data={props.listloaiMau || []}
                  placeholder="Ch???n lo???i m??u"
                />
              </Form.Item>
            </>
          )}
          {[120].includes(props.loaiDichVu) && (
            <>
              <Form.Item label="Th??? t??ch" name="theTich">
                <InputBlockString
                  placeholder="Nh???p th??? t??ch"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </>
          )}
          {[120].includes(props.loaiDichVu) && (
            <Form.Item label="S??? ng??y s??? d???ng" name="soNgaySuDung">
              <InputBlockString
                placeholder="Vui l??ng nh???p s??? ng??y s??? d???ng"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {[10, 20, 30].includes(props.loaiDichVu) && (
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/chuyen-khoa")}
                >
                  Chuy??n khoa
                </div>
              }
              name="chuyenKhoaId"
              rules={[
                isRequireChuyenKhoa
                  ? {
                      required: true,
                      message: "Vui l??ng ch???n chuy??n khoa",
                    }
                  : {},
              ]}
            >
              <Select
                data={props.listAllChuyenKhoa}
                placeholder="Vui l??ng ch???n chuy??n khoa"
              />
            </Form.Item>
          )}
          {[10].includes(props.loaiDichVu) && (
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/chuyen-khoa")}
                >
                  Chuy??n khoa KSK
                </div>
              }
              name="dsChuyenKhoaId"
            >
              <Select
                data={props.listAllChuyenKhoa}
                mode="multiple"
                placeholder="Vui l??ng ch???n chuy??n khoa KSK"
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/bao-cao")}
                >
                  T??n b??o c??o
                </div>
              }
              name="phieuChiDinhId"
            >
              <Select
                data={props.listAllBaoCao}
                placeholder="Vui l??ng ch???n t??n b??o c??o"
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Ch??? s??? n??? th???p" name="chiSoNuThap">
              <InputNumber
                type="number"
                placeholder="Vui l??ng nh???p ch??? s??? n??? th???p"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Ch??? s??? n??? cao" name="chiSoNuCao">
              <InputNumber
                type="number"
                placeholder="Vui l??ng nh???p ch??? s??? n??? cao"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Ch??? s??? nam th???p" name="chiSoNamThap">
              <InputNumber
                type="number"
                placeholder="Vui l??ng nh???p ch??? s??? nam th???p"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item label="Ch??? s??? nam cao" name="chiSoNamCao">
              <InputNumber
                type="number"
                placeholder="Vui l??ng nh???p ch??? s??? nam cao"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
          {/* <Form.Item
            label={
              // TODO: phan loai nhom theo chi phi cua bhyt
              <div
              // className="pointer"
              // onClick={() => openInNewTab("/danh-muc/nhom-dich-vu")}
              >
                Nh??m chi ph??
              </div>
            }
            name="nhomChiPhiBh"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m chi ph??",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m chi ph??"
              data={props.listnhomChiPhiBh}
            />
          </Form.Item> */}
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/don-vi-tinh")}
              >
                ??VT
              </div>
            }
            name="donViTinhId"
          >
            <Select
              data={props.listAllDonViTinh}
              placeholder="Vui l??ng ch???n ????n v??? t??nh"
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=1")}
              >
                Nh??m DV C???p 1
              </div>
            }
            name="nhomDichVuCap1Id"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m d???ch v??? c???p 1",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m d???ch v??? c???p 1"
              data={props.listAllNhomDichVuCap1}
              onChange={(e) => {
                if (e) {
                  props.getAllDichVuCap2({ nhomDichVuCap1Id: e });
                } else {
                  props.getAllDichVuCap2();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=2")}
              >
                Nh??m DV C???p 2
              </div>
            }
            name="nhomDichVuCap2Id"
            rules={[
              {
                required: true,
                message: "Vui l??ng ch???n nh??m d???ch v??? c???p 2",
              },
            ]}
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m d???ch v??? c???p 2"
              data={props.listAllNhomDichVuCap2}
              onChange={(e) => {
                if (e) {
                  props.getAllDichVuCap3({ nhomDichVuCap2Id: e });
                } else {
                  props.getAllDichVuCap3();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <div
                className="pointer"
                onClick={() => openInNewTab("/danh-muc/nhom-dich-vu?level=3")}
              >
                Nh??m DV C???p 3
              </div>
            }
            name="nhomDichVuCap3Id"
          >
            <Select
              placeholder="Vui l??ng ch???n nh??m d???ch v??? c???p 3"
              data={props.listAllNhomDichVuCap3}
            />
          </Form.Item>
          <Form.Item label="M?? t????ng ??????ng" name="maTuongDuong">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p m?? t????ng ??????ng"
            />
          </Form.Item>
          <Form.Item label="T??n t????ng ??????ng" name="tenTuongDuong">
            <Input
              className="input-option"
              placeholder="Vui l??ng nh???p t??n t????ng ??????ng"
            />
          </Form.Item>
          {[120].includes(props.loaiDichVu) && (
            <Form.Item name="phiVanChuyen" valuePropName="checked">
              <Checkbox>Chi ph?? v???n chuy???n</Checkbox>
            </Form.Item>
          )}
          {[10, 20, 30, 40, 60].includes(props.loaiDichVu) && (
            <Form.Item label="Gi???i t??nh" name="gioiTinh">
              <Select
                data={props.listgioiTinh}
                placeholder="Vui l??ng ch???n gi???i t??nh"
              />
            </Form.Item>
          )}
          {[10, 20, 30, 40, 60].includes(props.loaiDichVu) && (
            <Form.Item label="Tr?????ng h???p k?? DV" name="dsDoiTuongSuDung">
              <Select
                data={props.listDoituongsudung}
                placeholder="Vui l??ng ch???n tr?????ng h???p k?? DV"
                mode="multiple"
                showArrow
                style={{ paddingRight: "10pt" }}
              />
            </Form.Item>
          )}
          {[30].includes(props.loaiDichVu) && (
            <Form.Item name="tiepDonCls" valuePropName="checked">
              <Checkbox>Ti???p ????n CLS</Checkbox>
            </Form.Item>
          )}
          {[20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item
              label="M?? s??? quy???t ?????nh"
              name="quyetDinh"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p m?? s??? quy???t ?????nh",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p m?? s??? quy???t ?????nh"
              />
            </Form.Item>
          )}
          {[20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item
              label="Ng??y quy???t ?????nh"
              name="ngayCongBo"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n ng??y quy???t ?????nh",
                },
              ]}
            >
              <DatePicker
                className="input-option"
                placeholder="Vui l??ng ch???n ng??y quy???t ?????nh"
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
          )}
          {[40].includes(props.loaiDichVu) && (
            <Form.Item label="Ph??n lo???i PTTT" name="phanLoaiPtTt">
              <Select
                data={props.listPhanLoaiPtTt}
                placeholder="Ph??n lo???i PTTT"
              />
            </Form.Item>
          )}
          <Form.Item label="Ngu???n kh??c chi tr???" name="dsNguonKhacChiTra">
            <Select
              data={props.listnguonKhacChiTra}
              placeholder="Vui l??ng ch???n ngu???n chi tr??? kh??c"
              mode="multiple"
              showArrow
              style={{ paddingRight: "10pt" }}
            />
          </Form.Item>
          {[20, 30].includes(props.loaiDichVu) && (
            <Form.Item label="M?? g???i LIS/PACS" name="maKetNoi">
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p m?? g???i LIS/PACS"
              />
            </Form.Item>
          )}
          {[20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item label="????n v??? k???t n???i" name="ketNoi">
              <Select
                className="input-option"
                placeholder="????n v??? k???t n???i"
                data={listKetNoiPacsLis}
              />
            </Form.Item>
          )}
          {[20, 30].includes(props.loaiDichVu) && (
            <Form.Item valuePropName="checked" name="ketQuaLau">
              <Checkbox>DV c?? k???t qu??? l??u</Checkbox>
            </Form.Item>
          )}
          {[20].includes(props.loaiDichVu) && (
            <Form.Item valuePropName="checked" name="yeuCauBenhPham">
              <Checkbox>Y??u c???u b???nh ph???m </Checkbox>
            </Form.Item>
          )}
          <Form.Item name="khongTinhTien" valuePropName="checked">
            <Checkbox>Kh??ng t??nh ti???n</Checkbox>
          </Form.Item>
          {[10, 20, 30, 40, 60].includes(props.loaiDichVu) && (
            <Form.Item name="hanCheKhoaChiDinh" valuePropName="checked">
              <Checkbox onChange={onChangeHanCheKhoaChiDinh}>
                H???n ch??? khoa ch??? ?????nh
              </Checkbox>
            </Form.Item>
          )}
          {[10, 20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item name="thanhToanSau" valuePropName="checked">
              <Checkbox>Thanh to??n sau</Checkbox>
            </Form.Item>
          )}
          {![60].includes(props.loaiDichVu) && (
            <Form.Item name="covid" valuePropName="checked">
              <Checkbox>D??ng cho Covid</Checkbox>
            </Form.Item>
          )}
          {
            <Form.Item name="theoYeuCau" valuePropName="checked">
              <Checkbox>DV theo y??u c???u</Checkbox>
            </Form.Item>
          }
          {[20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item name="tachPhieuChiDinh" valuePropName="checked">
              <Checkbox>T??ch phi???u ch??? ?????nh khi tr??ng DV</Checkbox>
            </Form.Item>
          )}
          {state.data?.id && (
            <Form.Item name="active" valuePropName="checked">
              <Checkbox>C?? hi???u l???c</Checkbox>
            </Form.Item>
          )}
          {[10, 30].includes(props.loaiDichVu) && (
            <Form.Item name="online" valuePropName="checked">
              <Checkbox>?????t kh??m online</Checkbox>
            </Form.Item>
          )}
          <Form.Item name="thuNgoai" valuePropName="checked">
            <Checkbox>Thu ngo??i</Checkbox>
          </Form.Item>
          {[20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item
              name="tachSoLuong"
              initialValue={true}
              valuePropName="checked"
            >
              <Checkbox>T??ch s??? l?????ng khi k??</Checkbox>
            </Form.Item>
          )}
          {[20, 30].includes(props.loaiDichVu) && (
            <Form.Item
              name="hienThiTomTatBa"
              initialValue={true}
              valuePropName="checked"
            >
              <Checkbox>L??n TTBA</Checkbox>
            </Form.Item>
          )}
          {[20, 30, 40].includes(props.loaiDichVu) && (
            <Form.Item name="mucDichSuDung" valuePropName="checked">
              <Checkbox>{t("danhMuc.apDungTt35")}</Checkbox>
            </Form.Item>
          )}
        </Form>
      </fieldset>
    </EditWrapper>
  );
}

const mapStateToProps = (state) => {
  const {
    chuyenKhoa: { listAllChuyenKhoa },
    donViTinh: { listAllDonViTinh = [] },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
    utils: {
      listgioiTinh = [],
      listnhomChiPhiBh = [],
      listnguonKhacChiTra = [],
      listPhanLoaiPtTt = [],
      listloaiMau = [],
      listloaiKetQuaXetNghiem = [],
      listDoituongsudung = [],
    },
    baoCao: { listAllBaoCao },
  } = state;

  return {
    listnhomChiPhiBh,
    listnguonKhacChiTra,
    listPhanLoaiPtTt,
    listDoituongsudung,
    listgioiTinh,
    listAllDonViTinh,
    listAllChuyenKhoa,
    listAllNhomDichVuCap1,
    listAllNhomDichVuCap2,
    listAllNhomDichVuCap3,
    listloaiMau,
    listloaiKetQuaXetNghiem,
    listAllBaoCao,
  };
};
const mapDispatchToProps = ({
  dichVuKyThuat: { createOrEdit },
  utils: { getUtils },
  donViTinh: { getListAllDonViTinh },
  nhomDichVuCap1: { getAllDichVuCap1, getAllTongHopDichVuCap1 },
  nhomDichVuCap2: { getAllDichVuCap2, getAllTongHopDichVuCap2 },
  nhomDichVuCap3: { getAllDichVuCap3, getAllTongHopDichVuCap3 },
  chuyenKhoa: { getListAllChuyenKhoa },
}) => ({
  getUtils,
  createOrEdit,
  getListAllDonViTinh,
  getAllDichVuCap1,
  getAllDichVuCap2,
  getAllDichVuCap3,
  getAllTongHopDichVuCap1,
  getAllTongHopDichVuCap2,
  getAllTongHopDichVuCap3,
  getListAllChuyenKhoa,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(FormServiceInfo));
