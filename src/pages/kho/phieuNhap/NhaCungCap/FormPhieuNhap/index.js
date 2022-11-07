import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Input,
  Form,
  Col,
  Row,
  Select,
  DatePicker,
  message,
  Checkbox,
} from "antd";
import Button from "pages/kho/components/Button";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Main } from "./styled";
import { openInNewTab } from "utils";
import IcSave from "assets/images/kho/ic-save.svg";
import IcSendApprove from "assets/images/kho/ic-send-approve.svg";
import Header1 from "pages/kho/components/Header1";
import CustomSelect from "components/Select";
import { useHistory } from "react-router-dom";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";

const { Option } = Select;
const { Item } = Form;

const FormPhieuNhap = ({ ...props }, ref) => {
  const history = useHistory();
  const {
    quyetDinhThau: { listQuyetDinhThau },
    nguonNhapKho: { listData: listNguonNhapKho },
    hinhThucNhapXuat: { listHinhThucNhapXuat },
    kho: { currentItem: khoHienTai, listKhoUser },
    phieuNhapXuat: { thongTinPhieu, dsNhapXuatChiTiet, nhapKhongTheoThau },
    doiTac: { listDataTongHop },
  } = useSelector((state) => state);

  const {
    quyetDinhThau: { onSearch },
    nhapKho: { kiemTraSoHoaDon },
    nguonNhapKho: { onSearch: searchNguonNhapKho },
    hinhThucNhapXuat: { getListHinhThucNhapXuat: searchHinhThucNhapXuat },
    kho: { searchById: searchKhoById, getTheoTaiKhoan },
    phieuNhapXuat: { updateData },
    doiTac: { getListTongHop },
  } = useDispatch();

  const formRef = useRef();
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    ngayHoaDon: new Date(),
    loaiNhapXuat: 10,
    isKhoKyGui: false,
  });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    setData: (data) => {
      //TODO: set value form
      const thongTinForm = [
        "khoId",
        "soHoaDon",
        "kyHieuHoaDon",
        "ngayHoaDon",
        "soHopDong",
        "quyetDinhThauId",
        "nguonNhapKhoId",
        "hinhThucNhapXuatId",
      ].reduce(
        (a, item) => ({
          ...a,
          [item]: data[item],
        }),
        {}
      );
      form.setFieldsValue(thongTinForm);
      setState({ id: data?.id });
    },
  }));

  const onChange = (type) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e?.target?.value
      : e?.hasOwnProperty("_d")
      ? moment(e._d)
      : e;
    updateData({
      thongTinPhieu: {
        ...thongTinPhieu,
        [type]: value,
      },
    });
    if (type == "quyetDinhThauId") {
      const goiThau = listQuyetDinhThau?.find((item) => item?.id == value);
      if (moment().isAfter(moment(goiThau?.ngayHieuLuc))) {
        message.warning(
          `Gói thầu đã hết hiệu lực ngày ${moment(goiThau?.ngayHieuLuc).format(
            `DD/MM/YYYY`
          )}`
        );
      }
    }

    if (type == "khoId") {
      console.log("e", e);
    }
    // }, 700);
  };
  const onBlur = (type) => (e) => {
    const value = e?.hasOwnProperty("target")
      ? e.target.value
      : e?.hasOwnProperty("_d")
      ? moment(e._d)
      : e;
    if (type == "soHoaDon") {
      //TODO: check trung hoa don
      kiemTraSoHoaDon({
        [type]: value,
        id: thongTinPhieu?.id ? thongTinPhieu?.id : 0,
        ngayHoaDon: moment(form.getFieldValue("ngayHoaDon")).format(
          "YYYY-MM-DD"
        ),
      });
    }
    if (type == "ngayHoaDon" && e) {
      kiemTraSoHoaDon({
        [type]: moment(value).format("YYYY-MM-DD"),
        id: thongTinPhieu?.id ? thongTinPhieu?.id : 0,
        soHoaDon: thongTinPhieu?.soHoaDon,
      });
    }
  };
  const onSave = (guiDuyet) => () => {
    form.validateFields().then((values) => {
      props.onCreateOrUpdate({
        ...values,
        id: thongTinPhieu?.id,
        guiDuyet,
      });
    });
  };
  useEffect(() => {
    const thongTinForm = [
      "khoId",
      "soHoaDon",
      "kyHieuHoaDon",
      "soHopDong",
      "quyetDinhThauId",
      "nguonNhapKhoId",
      "hinhThucNhapXuatId",
    ].reduce(
      (a, item) => ({
        ...a,
        [item]: thongTinPhieu[item],
      }),
      {}
    );

    if (history.location.pathname.includes("chinh-sua")) {
      if (!thongTinForm["quyetDinhThauId"]) {
        form.setFieldsValue({ ...thongTinForm, nhapKhongTheoThau: true });
        updateData({ nhapKhongTheoThau: true });
      } else {
        form.setFieldsValue({ ...thongTinForm, nhapKhongTheoThau: false });
        updateData({ nhapKhongTheoThau: false });
      }
    } else {
      form.setFieldsValue({ ...thongTinForm });
    }

    form.setFieldsValue({
      ngayHoaDon:
        thongTinPhieu["ngayHoaDon"] && moment(thongTinPhieu["ngayHoaDon"]),
    });
  }, [thongTinPhieu]);

  useEffect(() => {
    if (thongTinPhieu.khoId) {
      searchKhoById(thongTinPhieu.khoId).then((data) => {
        console.log("data", data);
        onSearch({
          dataSearch: {
            active: true,
            trangThai: 30,
            dsLoaiDichVu: data.dsLoaiDichVu,
          },
        });
        getListTongHop({
          dsLoaiDoiTac: [20],
          active: true,
          page: "",
          size: "",
          dsLoaiDichVu: data.dsLoaiDichVu,
        });

        setState({
          isKhoKyGui: data?.khoKyGui || false,
        });

        if (data?.khoKyGui) {
          form.setFieldsValue({
            nhapKhongTheoThau: true,
            chuaTaoHoaDon: true,
          });
        }
      });
    } else onSearch({ dataSearch: { active: true, trangThai: 30 } });
  }, [thongTinPhieu.khoId]);

  useEffect(() => {
    if (thongTinPhieu.nhaCungCapId) {
      if (!khoHienTai && thongTinPhieu?.khoId)
        searchKhoById(thongTinPhieu?.khoId).then((data) => {
          onSearch({
            dataSearch: {
              active: true,
              trangThai: 30,
              dsLoaiDichVu: data?.dsLoaiDichVu,
              nhaCungCapId: thongTinPhieu?.nhaCungCapId,
            },
          });
        });
      else
        onSearch({
          dataSearch: {
            active: true,
            trangThai: 30,
            dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
            nhaCungCapId: thongTinPhieu?.nhaCungCapId,
          },
        });
    }
  }, [thongTinPhieu.nhaCungCapId]);

  useEffect(() => {
    if (khoHienTai) {
      let dataSearch = {
        active: true,
        dsLoaiDichVu: khoHienTai?.dsLoaiDichVu,
        thau: !nhapKhongTheoThau,
      };
      searchNguonNhapKho({ dataSearch });
    }
  }, [nhapKhongTheoThau, khoHienTai]);
  useEffect(() => {
    getTheoTaiKhoan({
      nhapTuNcc: true,
      // dsKhoaQuanLyId: (dsKhoaPhuTrachId || []).join(","),
    });
    searchHinhThucNhapXuat({ active: true, dsHinhThucNhapXuat: 10 });
  }, []);

  // kho theo nhân viên hiện tại và active
  let khoOption = useMemo(() => {
    let options = listKhoUser?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listKhoUser]);

  let nhaCungCapOption = useMemo(() => {
    let options = listDataTongHop?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listDataTongHop]);

  const quyetDinhThauOption = useMemo(() => {
    return (listQuyetDinhThau || []).map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.quyetDinhThau}
      </Option>
    ));
  }, [listQuyetDinhThau]);

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };

  useEffect(() => {
    form.setFieldsValue({ nhaCungCapId: thongTinPhieu.nhaCungCapId });
  }, [thongTinPhieu.nhaCungCapId]);

  const onChangeField = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    updateData({
      nhapKhongTheoThau: value,
      thongTinPhieu: {
        ...thongTinPhieu,
        quyetDinhThauId: null,
      },
    });
    form.setFieldsValue({ quyetDinhThauId: null });
  };

  return (
    <Main>
      <Form
        ref={formRef}
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        // onFinish={}
      >
        <Header1
          title={"Thông tin phiếu nhập"}
          noPadding={true}
          bottom={10}
          left={0}
        ></Header1>

        <Row gutter={[0, 0]}>
          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/kho/quan-tri-kho")}
                >
                  Kho nhập
                </div>
              }
              name="khoId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn kho nhập!",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieu?.khoId}
            >
              <Select
                allowClear
                showSearch
                disabled={thongTinPhieu?.id}
                filterOption={filterOption}
                placeholder="Chọn kho nhập"
                onSelect={onChange("khoId")}
              >
                {khoOption}
              </Select>
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/doi-tac")}
                >
                  Nhà cung cấp
                </div>
              }
              name="nhaCungCapId"
              rules={
                !nhapKhongTheoThau
                  ? [
                      {
                        required: true,
                        message: "Vui lòng chọn nhà cung cấp!",
                      },
                    ]
                  : []
              }
              style={{ width: "100%" }}
              initialValue={thongTinPhieu?.nhaCungCapId}
            >
              <Select
                allowClear
                showSearch
                filterOption={filterOption}
                placeholder="Chọn nhà cung cấp"
                onChange={onChange("nhaCungCapId")}
                disabled={!nhapKhongTheoThau}
              >
                {nhaCungCapOption}
              </Select>
            </Item>
          </Col>

          <Col span={23}>
            <Item name="nhapKhongTheoThau" valuePropName="checked">
              <Checkbox
                onChange={onChangeField("nhapKhongTheoThau")}
                disabled={(dsNhapXuatChiTiet || []).length}
              >
                Nhập không theo thầu
              </Checkbox>
            </Item>
          </Col>
          {state.isKhoKyGui && (
            <Col span={23}>
              <Item name="chuaTaoHoaDon" valuePropName="checked">
                <Checkbox onChange={onChangeField("chuaTaoHoaDon")}>
                  Chưa tạo hóa đơn
                </Checkbox>
              </Item>
            </Col>
          )}

          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/kho/quan-ly-thau")}
                >
                  Quyết định thầu
                </div>
              }
              name="quyetDinhThauId"
              rules={[]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieu?.quyetDinhThauId}
            >
              <Select
                allowClear
                showSearch
                disabled={thongTinPhieu.id || nhapKhongTheoThau}
                placeholder={
                  nhapKhongTheoThau ? "" : `Vui lòng chọn quyết định thầu`
                }
                onSelect={onChange("quyetDinhThauId")}
                onClear={() => {
                  setState({ quyetDinhThauId: "", nguonNhapKhoId: "" });
                  updateData({
                    thongTinPhieu: {
                      ...thongTinPhieu,
                      quyetDinhThauId: null,
                    },
                  });
                }}
              >
                {quyetDinhThauOption}
              </Select>
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/nguon-nhap-kho")}
                >
                  Nguồn nhập kho
                </div>
              }
              name="nguonNhapKhoId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nguồn nhập kho",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={thongTinPhieu?.nguonNhapKhoId}
            >
              <CustomSelect
                allowClear
                showSearch
                onChange={onChange("nguonNhapKhoId")}
                placeholder="Vui lòng chọn nguồn nhập kho"
                data={listNguonNhapKho}
              ></CustomSelect>
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/hinh-thuc-nhap-xuat")}
                >
                  Hình thức nhập
                </div>
              }
              name="hinhThucNhapXuatId"
              style={{ width: "100%" }}
              initialValue={thongTinPhieu?.hinhThucNhapXuatId}
            >
              <CustomSelect
                allowClear
                showSearch
                onChange={onChange("hinhThucNhapXuatId")}
                placeholder="Vui lòng chọn hình thức nhập"
                data={listHinhThucNhapXuat}
              ></CustomSelect>
            </Item>
          </Col>

          <Col span={23}>
            <Item
              label="Số hóa đơn"
              name="soHoaDon"
              style={{ width: "100%" }}
              rules={
                !state.isKhoKyGui
                  ? [
                      {
                        required: true,
                        message: "Vui lòng nhập số hóa đơn!",
                      },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập số hóa đơn!",
                      },
                    ]
                  : []
              }
              initialValue={thongTinPhieu?.soHoaDon}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập số hóa đơn"
                onBlur={onBlur("soHoaDon")}
                onChange={onChange("soHoaDon")}
                disabled={
                  !checkRole([ROLES["KHO"].SUA_PHIEU_NHAP_KHO_HOAN_THẠNH])
                }
              />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label="Ngày hóa đơn"
              name="ngayHoaDon"
              style={{ width: "100%" }}
              rules={
                !state.isKhoKyGui
                  ? [
                      {
                        required: true,
                        message: "Vui lòng chọn ngày hóa đơn!",
                      },
                    ]
                  : []
              }
              initialValue={moment(thongTinPhieu?.ngayHoaDon)}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Vui lòng chọn ngày hóa đơn"
                format="DD / MM / YYYY"
                disabled={
                  !checkRole([ROLES["KHO"].SUA_PHIEU_NHAP_KHO_HOAN_THẠNH])
                }
                onChange={(e) => {
                  onBlur("ngayHoaDon")(e);
                  onChange("ngayHoaDon")(e);
                }}
              />
            </Item>
          </Col>

          <Col span={23}>
            <Item
              label="Ký hiệu hóa đơn"
              name="kyHieuHoaDon"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieu?.kyHieuHoaDon}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập ký hiệu hóa đơn"
                onChange={onChange("kyHieuHoaDon")}
              />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label="Số hợp đồng"
              name="soHopDong"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieu?.soHopDong}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập số hợp đồng"
                onChange={onChange("soHopDong")}
              />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label="Ghi chú"
              name="ghiChu"
              style={{ width: "100%" }}
              rules={[]}
              initialValue={thongTinPhieu?.ghiChu}
            >
              <Input.TextArea
                onChange={onChange("ghiChu")}
                rows={3}
                className="input-option"
                placeholder="Vui lòng nhập ghi chú"
              />
            </Item>
          </Col>
          <Col span={23}>
            <Item
              label="Loại nhập xuất"
              name="loaiNhapXuat"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại nhập xuất",
                },
              ]}
              style={{ width: "100%" }}
              initialValue={state?.loaiNhapXuat}
              hidden
            >
              <Select
                onChange={onChange("loaiNhapXuat")}
                allowClear
                showSearch
                placeholder="Vui lòng chọn loại nhâp xuất"
              ></Select>
            </Item>
          </Col>
        </Row>
      </Form>
      <div className="action">
        {checkRole([ROLES["KHO"].GUI_DUYET_PHIEU_NHAP_KHO]) && (
          <Button onClick={onSave(true)} rightIcon={<IcSendApprove />}>
            Lưu và gửi duyệt
          </Button>
        )}
        {!checkRole([ROLES["KHO"].GUI_DUYET_PHIEU_NHAP_KHO]) && (
          <Button
            onClick={onSave(false)}
            type={"primary"}
            minWidth={120}
            rightIcon={<IcSave />}
          >
            Lưu
          </Button>
        )}
      </div>
    </Main>
  );
};

export default forwardRef(FormPhieuNhap);
