import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
} from "react";
import { Main, MainHeader } from "./styled";
import FormWraper from "components/FormWraper";
import { Input, Form, Row, Col, message, Checkbox, DatePicker } from "antd";
import { Select, Button, ModalTemplate } from "components";
import { SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import AddressFull from "components/AddressFull";
import DOBInput from "components/DOBInput";
import { groupBy } from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";

const ModalThemMoiNguoiBenh = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [form] = Form.useForm();
  //state
  const [state, _setState] = useState({
    show: false,
    diaChi: "",
    isThemMoi: true,
    quocTichId: null,
    doiTuong: null,
    loaiDoiTuongId: null,
    khoaId: null,
    loaiGiayTo: null,
    danTocId: null,
    xaPhuongId: null,
    quanHuyenId: null,
    chiNamSinh: false,
    loading: false,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  //redux
  const { listgioiTinh, listHinhThucTtDvNgoaiHd } = useSelector(
    (state) => state.utils
  );
  const { chiTietHopDong } = useSelector((state) => state.hopDongKSK);
  const { dsGoi, dsDichVuLe } = useSelector((state) => state.dichVuKSK);
  const { thongTinNb } = useSelector((state) => state.nbKSK);
  const { dataLOAI_DOI_TUONG_MAC_DINH } = useSelector(
    (state) => state.thietLap
  );
  const { listAllLoaiDoiTuong = [] } = useSelector(
    (state) => state.loaiDoiTuong
  );

  const {
    utils: { getUtils },
    nbKSK: { onSelectAddress, postNBKSK, patchNbKSK, getNBKSK, updateData },
    dichVuKSK: { getDsDichVuTheoGoi },
    hopDongKSK: { searchMaNb },
    thietLap: { getThietLap },
    loaiDoiTuong: { getListAllLoaiDoiTuong },
  } = useDispatch();

  //memo
  const listGoiMemo = useMemo(() => {
    const _groupGoi = groupBy(dsGoi, "boChiDinhId");

    return Object.keys(_groupGoi).map((x) => ({
      id: x,
      ten: _groupGoi[x][0]?.tenBoChiDinh,
    }));
  }, [dsGoi]);

  const dsDichVuLeMemo = useMemo(() => {
    return dsDichVuLe.map((x) => ({ ...x, ten: x.tenDichVu, id: x.dichVuId }));
  }, [dsDichVuLe]);

  useEffect(() => {
    getThietLap({ ma: "LOAI_DOI_TUONG_MAC_DINH" });
    getListAllLoaiDoiTuong({});
  }, []);

  useEffect(() => {
    if (thongTinNb.id) {
      const {
        maNb,
        maHoSo,
        tenNb,
        soDienThoai,
        gioiTinh,
        ngaySinh,
        email,
        noiLamViec,
        chiNamSinh,
        nbKhamSucKhoe,
        nbGiayToTuyThan,
        nbDiaChi,
      } = thongTinNb;

      const _diaChi = nbDiaChi?.diaChi
        ? nbDiaChi?.diaChi
        : nbDiaChi?.tinhThanhPho
        ? `${nbDiaChi?.xaPhuong?.ten ? nbDiaChi?.xaPhuong?.ten : ""}${
            nbDiaChi?.quanHuyen?.ten ? `, ${nbDiaChi?.quanHuyen?.ten}` : ""
          }${
            nbDiaChi?.tinhThanhPho?.ten
              ? `, ${nbDiaChi?.tinhThanhPho?.ten}`
              : ""
          }`
        : "";

      form.setFieldsValue({
        maNb,
        maHoSo,
        tenNb,
        soDienThoai,
        email,
        noiLamViec,
        dsBoChiDinhId: (nbKhamSucKhoe?.dsBoChiDinhId || []).map((x) => `${x}`),
        dsDichVuId: nbKhamSucKhoe?.dsDichVuId,
        hinhThucTtDvNgoaiHd: nbKhamSucKhoe?.hinhThucTtDvNgoaiHd,
        gioiTinh,
        ngaySinh: ngaySinh && {
          str: chiNamSinh
            ? moment(ngaySinh).format("YYYY")
            : moment(ngaySinh).format("DD/MM/YYYY"),
          date: ngaySinh,
        },
        chucVu: nbKhamSucKhoe?.chucVu,
        maNhanVien: nbKhamSucKhoe?.maNhanVien,
        phongBan: nbKhamSucKhoe?.phongBan,
        ngoaiVien: nbKhamSucKhoe?.ngoaiVien,
        denThoiGianKham: nbKhamSucKhoe?.denThoiGianKham
          ? moment(nbKhamSucKhoe?.denThoiGianKham)
          : null,
        denThoiGianLayMau: nbKhamSucKhoe?.denThoiGianLayMau
          ? moment(nbKhamSucKhoe?.denThoiGianLayMau)
          : null,
        tuThoiGianKham: nbKhamSucKhoe?.tuThoiGianKham
          ? moment(nbKhamSucKhoe?.tuThoiGianKham)
          : null,
        tuThoiGianLayMau: nbKhamSucKhoe?.tuThoiGianLayMau
          ? moment(nbKhamSucKhoe?.tuThoiGianLayMau)
          : null,
        diaDiemKham: nbKhamSucKhoe?.diaDiemKham,
        diaDiemLayMau: nbKhamSucKhoe?.diaDiemLayMau,
        diaChi: _diaChi,
        soNha: nbDiaChi?.soNha,
        maSo: nbGiayToTuyThan?.maSo,
      });
    } else {
      form.resetFields();
    }
  }, [thongTinNb]);

  useEffect(() => {
    if (chiTietHopDong?.id) {
      getDsDichVuTheoGoi({ hopDongKskId: chiTietHopDong.id, trongGoi: true });
      getDsDichVuTheoGoi({
        hopDongKskId: chiTietHopDong.id,
        trongGoi: false,
      });
    }
  }, [chiTietHopDong]);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
        isThemMoi: !data?.id,
      });

      getUtils({ name: "gioiTinh" });
      getUtils({ name: "HinhThucTtDvNgoaiHd" });

      if (data.id) {
        getNBKSK(data.id);
      } else {
        form.setFieldsValue({
          hinhThucTtDvNgoaiHd: 20,
        });
      }
    },
  }));

  //function
  const onClose = () => {
    form.resetFields();
    updateData({ thongTinNb: {} });
    setState({ show: false, loading: false });
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChangeAdrressText = (e) => {
    if (e != state.diaChi) {
      setState({ diaChi: e });
      form.setFields([{ name: "diaChi", value: e }]);
    }
  };

  const onErrorAddress = (address, listSuggest) => {
    message.error(
      "Địa chỉ hành chính không có trong hệ thống. Chọn địa chỉ từ gợi ý của hệ thống"
    );
  };

  const onSave = () => {
    form
      .validateFields()
      .then(() => {
        const {
          maSo,
          email,
          soDienThoai,
          ngaySinh,
          tenNb,
          gioiTinh,
          chucVu,
          maNhanVien,
          dsBoChiDinhId,
          maNb,
          ngoaiVien,
          phongBan,
          noiLamViec,
          dsDichVuId,
          denThoiGianKham,
          denThoiGianLayMau,
          tuThoiGianKham,
          tuThoiGianLayMau,
          diaDiemKham,
          diaDiemLayMau,
          hinhThucTtDvNgoaiHd,
          soNha,
        } = form.getFieldsValue();

        const {
          quocGiaId,
          tinhThanhPhoId,
          quocTichId,
          loaiGiayTo,
          danTocId,
          khoaId,
          xaPhuongId,
          quanHuyenId,
          chiNamSinh,
        } = state;

        const payload = {
          tenNb,
          gioiTinh,
          chiNamSinh,
          ngaySinh:
            ngaySinh?.date instanceof moment
              ? ngaySinh.date.format("YYYY-MM-DD")
              : ngaySinh.date,
          soDienThoai,
          email,
          quocTichId: quocTichId || 1,
          doiTuong: 1,
          loaiDoiTuongId: (listAllLoaiDoiTuong || []).find(
            (x) => x.ma == dataLOAI_DOI_TUONG_MAC_DINH
          )?.id,
          nbDiaChi: {
            quocGiaId: quocGiaId || 1,
            tinhThanhPhoId,
            xaPhuongId,
            quanHuyenId,
            soNha,
          },
          nbGiayToTuyThan: {
            loaiGiayTo: loaiGiayTo || 1,
            maSo: maSo,
          },
          khoaId: khoaId || 52,
          maNb,
          danTocId,
          khamSucKhoe: true,
          nbKhamSucKhoe: {
            hopDongKskId: chiTietHopDong?.id,
            dsBoChiDinhId,
            dsDichVuId,
            maNhanVien,
            chucVu,
            phongBan,
            ngoaiVien,
            hinhThucTtDvNgoaiHd,
            ...(!state.isThemMoi
              ? {
                  denThoiGianKham,
                  denThoiGianLayMau,
                  tuThoiGianKham,
                  tuThoiGianLayMau,
                  diaDiemKham,
                  diaDiemLayMau,
                }
              : {}),
          },
          noiLamViec,
        };
        setState({ loading: true });
        if (state.isThemMoi) {
          postNBKSK(payload)
            .then(() => {
              props.refreshList();
              onClose();
            })
            .catch(() => setState({ loading: false }));
        } else {
          patchNbKSK({
            id: state.currentItem?.id,
            ...payload,
          })
            .then(() => {
              props.refreshList();
              onClose();
            })
            .catch(() => setState({ loading: false }));
        }
      })
      .catch((e) => {
        console.log("e", e);
        message.error("Vui lòng điền đủ thông tin");
      });
  };

  const selectAdress = (data) => {
    onSelectAddress(data).then((address) => {
      form.setFields([{ name: "diaChi", value: address.diaChi }]);
      setState({
        quocGiaId: address.quocGiaId,
        tinhThanhPhoId: address.tinhThanhPhoId,
        diaChi: address.diaChi,
        xaPhuongId: address.xaPhuongId,
        quanHuyenId: address.quanHuyenId,
      });
    });
  };

  const onChangeTenNb = (e) => {
    const value = e?.target?.value;
    let dataTen = value.toUpperCase();
    let genderVan = dataTen.search("VĂN");
    let genderThi = dataTen.search("THỊ");

    if (genderVan >= 0) {
      form.setFieldsValue({ gioiTinh: 1 });
    } else if (genderThi >= 0) {
      form.setFieldsValue({ gioiTinh: 2 });
    }
  };

  const onKeyDownMaNb = (event) => {
    if (event.nativeEvent.key === "Enter") {
      const value = event?.target?.value;
      if (value.trim()) {
        searchMaNb({ maNb: value }).then((s) => {
          const {
            tenNb,
            soDienThoai,
            ngaySinh,
            gioiTinh,
            email,
            nbGiayToTuyThan,
            chiNamSinh,
            quocTichId,
            doiTuong,
            loaiDoiTuongId,
            khoaId,
            nbDiaChi,
            danTocId,
          } = s.data || {};
          const _diaChi = nbDiaChi?.diaChi
            ? nbDiaChi?.diaChi
            : nbDiaChi?.tinhThanhPho
            ? `${nbDiaChi?.xaPhuong?.ten ? nbDiaChi?.xaPhuong?.ten : ""}${
                nbDiaChi?.quanHuyen?.ten ? `, ${nbDiaChi?.quanHuyen?.ten}` : ""
              }${
                nbDiaChi?.tinhThanhPho?.ten
                  ? `, ${nbDiaChi?.tinhThanhPho?.ten}`
                  : ""
              }`
            : "";
          form.setFieldsValue({
            tenNb,
            soDienThoai,
            ngaySinh: ngaySinh && {
              str: chiNamSinh
                ? moment(ngaySinh).format("YYYY")
                : moment(ngaySinh).format("DD/MM/YYYY"),
              date: ngaySinh,
            },
            gioiTinh,
            email,
            maSo: nbGiayToTuyThan?.maSo,
            diaChi: _diaChi,
            soNha: nbDiaChi?.soNha,
          });

          setState({
            quocGiaId: nbDiaChi?.quocGiaId,
            tinhThanhPhoId: nbDiaChi?.tinhThanhPhoId,
            quanHuyenId: nbDiaChi?.quanHuyenId,
            xaPhuongId: nbDiaChi?.xaPhuongId,
            quocTichId,
            doiTuong,
            loaiDoiTuongId,
            khoaId,
            diaChi: _diaChi,
            loaiGiayTo: nbGiayToTuyThan?.loaiGiayTo,
            danTocId,
            soNha: nbDiaChi?.soNha,
          });
        });
      }
    }
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  return (
    <ModalTemplate
      ref={refModal}
      width={"65%"}
      onCancel={onClose}
      title={
        <MainHeader className="header-title">
          <div className="title">Thêm mới người bệnh</div>
          <div className="title-nb">{chiTietHopDong?.doiTac?.ten}</div>
        </MainHeader>
      }
      closable={false}
    >
      <Main>
        <div className="form-nb">
          <FormWraper
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout={"vertical"}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Row>
              <Col span={12}>
                <Form.Item label="Mã người bệnh" name="maNb">
                  <Input
                    placeholder="Nhập mã người bệnh"
                    onKeyDown={onKeyDownMaNb}
                    readOnly={!state.isThemMoi}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Mã hồ sơ" name="maHoSo">
                  <Input placeholder="Nhập mã hồ sơ" readOnly={true} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="Họ và tên"
                  name="tenNb"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên" },
                  ]}
                >
                  <Input
                    placeholder="Nhập họ và tên"
                    onChange={onChangeTenNb}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Số điện thoại" name="soDienThoai">
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="Ngày tháng năm sinh"
                  name="ngaySinh"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập ngày tháng năm sinh",
                    },
                  ]}
                >
                  <DOBInput
                    value="1970-01-01T00:00:00+07:00"
                    className="item-born"
                    placeholder={"Nhập ngày tháng năm sinh"}
                    onBlur={(e, nofi, ageStr, chiNamSinh) => {
                      form.setFields([{ name: "ngaySinh", value: e }]);
                      setState({ chiNamSinh });
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Giới tính"
                  name="gioiTinh"
                  rules={[
                    { required: true, message: "Vui lòng chọn giới tính" },
                  ]}
                >
                  <Select
                    className="item-male"
                    placeholder={"Chọn giới tính"}
                    data={listgioiTinh || []}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Row>
                  <Col span={8} style={{ padding: 0 }}>
                    <Form.Item label="Số nhà/ Thôn/ Xóm" name="soNha">
                      <Input placeholder="SN/ Thôn/ Xóm" />
                    </Form.Item>
                  </Col>
                  <Col span={16} style={{ padding: 0 }}>
                    <Form.Item
                      label="Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                      name="diaChi"
                      rules={[
                        { required: true, message: "Vui lòng nhập số địa chỉ" },
                      ]}
                    >
                      <AddressFull
                        onChangeAdrressText={onChangeAdrressText}
                        onBlur={(e) => {
                          form.setFields([
                            { name: "diaChi", value: e.target.value },
                          ]);
                        }}
                        value={state.diaChi}
                        placeholder="Phường/Xã, Quận/Huyện, Tỉnh/Thành Phố"
                        onSelectAddress={selectAdress}
                        onError={onErrorAddress}
                        delayTyping={300}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={12}>
                <Form.Item label="Số CMT/Căn cước" name="maSo">
                  <Input placeholder="Nhập số CMT/Căn cước" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item
                  label="Hình thức thanh toán dịch vụ ngoài hợp đồng"
                  name="hinhThucTtDvNgoaiHd"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn hình thức thanh toán",
                    },
                  ]}
                >
                  <Select
                    className="item-male"
                    placeholder={"Chọn hình thức thanh toán"}
                    data={listHinhThucTtDvNgoaiHd || []}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Gói dịch vụ áp dụng"
                  name="dsBoChiDinhId"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Vui lòng chọn gói dịch vụ áp dụng",
                  //   },
                  // ]}
                >
                  <Select
                    className="item-male"
                    mode="multiple"
                    placeholder={"Chọn gói dịch vụ"}
                    data={listGoiMemo || []}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item label="Dịch vụ lẻ áp dụng" name="dsDichVuId">
                  <Select
                    className="item-male"
                    mode="multiple"
                    placeholder={"Chọn dịch vụ lẻ áp dụng"}
                    data={dsDichVuLeMemo || []}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item label="Mã nhân viên" name="maNhanVien">
                  <Input placeholder="Nhập mã nhân viên" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Chức danh" name="chucVu">
                  <Input placeholder="Nhập chức danh" />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item label="Phòng ban" name="phongBan">
                  <Input placeholder="Nhập phòng ban" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Địa điểm làm việc" name="noiLamViec">
                  <Input placeholder="Nhập địa điểm làm việc" />
                </Form.Item>
              </Col>
            </Row>

            {!state.isThemMoi && (
              <>
                <Row>
                  <Col span={6}>
                    <Form.Item
                      label="Ngày lấy máu từ ngày"
                      name="tuThoiGianLayMau"
                    >
                      <DatePicker
                        showTime
                        placeholder="Chọn ngày"
                        format="DD/MM/YYYY HH:mm:ss"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Đến ngày" name="denThoiGianLayMau">
                      <DatePicker
                        showTime
                        placeholder="Chọn ngày"
                        format="DD/MM/YYYY HH:mm:ss"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Địa điểm lấy máu" name="diaDiemLayMau">
                      <Input placeholder="Nhập địa điểm lấy máu" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            {!state.isThemMoi && (
              <>
                <Row>
                  <Col span={6}>
                    <Form.Item label="Ngày khám từ ngày" name="tuThoiGianKham">
                      <DatePicker
                        showTime
                        placeholder="Chọn ngày"
                        format="DD/MM/YYYY HH:mm:ss"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Đến ngày" name="denThoiGianKham">
                      <DatePicker
                        showTime
                        placeholder="Chọn ngày"
                        format="DD/MM/YYYY HH:mm:ss"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="Địa điểm khám" name="diaDiemKham">
                      <Input placeholder="Nhập địa điểm khám" />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

            <Row>
              <Col span={12}></Col>

              <Col span={12}>
                <Form.Item
                  labelAlign="right"
                  name="ngoaiVien"
                  valuePropName="checked"
                >
                  <Checkbox>Ngoại viện</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </FormWraper>
        </div>

        <div className="footer-action">
          <Button.Text
            type="primary"
            leftIcon={<IcArrowLeft />}
            onClick={onClose}
          >
            {t("common.quayLai")}
          </Button.Text>

          <Button
            type="primary"
            onClick={onSave}
            minWidth={100}
            loading={state?.loading}
            rightIcon={<SaveOutlined />}
          >
            {t("common.luu")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalThemMoiNguoiBenh);
