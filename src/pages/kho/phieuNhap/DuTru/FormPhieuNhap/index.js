import React, { memo, useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Col, Row, Input, Form } from "antd";
import { Main } from "./styled";
import Header1 from "pages/kho/components/Header1";
import { useParams } from "react-router-dom";
const { Option } = Select;

const FormPhieuNhap = ({ ...props }) => {
  const { id } = useParams();
  const [state, _setState] = useState({
    khoDoiUng: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    phieuNhapXuat: { checkValidate, thongTinPhieu },
    utils: { listthang },
    kho: { listKhoUser, listAllKho },
  } = useSelector((state) => state);

  const {
    kho: { getTheoTaiKhoan, getAllTongHop },
    utils: { getUtils },
    phieuNhapXuat: { updateData },
  } = useDispatch();

  const isEdit = useMemo(() => {
    return !!id;
  }, [id]);
  const [form] = Form.useForm();

  const onChange = (type) => (e) => {
    const value = e?.target ? e.target?.value : e;
    updateData({
      thongTinPhieu: {
        ...thongTinPhieu,
        [type]: value,
      },
    });
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };
  const optionsKhoDoiUng = useMemo(() => {
    let options = (listAllKho || [])?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listAllKho]);
  const optionsThangDuTru = useMemo(() => {
    let options = listthang?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {`${item.ten}`}
      </Option>
    ));
    return options;
  }, [listthang]);

  const optionsKho = useMemo(() => {
    let options = listKhoUser?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {item?.ten}
      </Option>
    ));
    return options;
  }, [listKhoUser]);
  useEffect(() => {
    if (!isEdit) {
      updateData({
        thongTinPhieu: {
          ...thongTinPhieu,
          khoDoiUngId: null,
        },
      });
    }
    if (thongTinPhieu?.khoId)
      getAllTongHop({
        ignoreSetState: true,
        khoTrucThuocId: thongTinPhieu?.khoId,
        page:"",
        size:""
      });
  }, [thongTinPhieu?.khoId]);
  useEffect(() => {
    getUtils({ name: "thang" });
    getTheoTaiKhoan();
  }, []);

  return (
    <Main>
      <Form style={{ width: "100%" }} form={form} layout="vertical">
        <Header1
          title={"Thông tin phiếu nhập"}
          noPadding={true}
          bottom={10}
        ></Header1>
        <Row gutter={[10, 10]}>
          <Col span={6}>
            <div className="form-item">
              <label
                className={
                  !thongTinPhieu?.khoDoiUngId ? `label label-error` : "label"
                }
              >
                Kho xuất<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                showSearch
                onChange={onChange("khoDoiUngId")}
                value={thongTinPhieu?.khoDoiUngId}
                filterOption={filterOption}
                placeholder={"Chọn kho xuất"}
                disabled={isEdit}
              >
                {optionsKhoDoiUng}
              </Select>
              {checkValidate && !thongTinPhieu?.khoDoiUngId && (
                <div className="error">Vui lòng chọn kho xuất!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="form-item">
              <label
                className={
                  !thongTinPhieu?.khoId ? `label label-error` : "label"
                }
              >
                Kho nhập<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                onChange={onChange("khoId")}
                value={thongTinPhieu?.khoId}
                placeholder={"Chọn kho nhập"}
                showSearch
                disabled={isEdit}
              >
                {optionsKho}
              </Select>
              {checkValidate && !thongTinPhieu?.khoId && (
                <div className="error">Vui lòng chọn kho nhập!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="form-item">
              <label
                className={
                  !thongTinPhieu?.thangDuTru ? `label label-error` : "label"
                }
              >
                Tháng dự trù<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                onChange={onChange("thangDuTru")}
                value={thongTinPhieu?.thangDuTru}
                placeholder={"Chọn tháng dự trù"}
                showSearch
              >
                {optionsThangDuTru}
              </Select>
              {checkValidate && !thongTinPhieu?.thangDuTru && (
                <div className="error">Vui lòng chọn tháng dự trù!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="form-item">
              <label className={"label"}>Ghi chú</label>
              <Input
                onChange={onChange("ghiChu")}
                value={thongTinPhieu?.ghiChu}
                placeholder={"Nhập ghi chú"}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Main>
  );
};

export default memo(FormPhieuNhap);
