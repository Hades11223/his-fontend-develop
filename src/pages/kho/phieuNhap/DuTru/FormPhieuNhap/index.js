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
          title={"Th??ng tin phi???u nh???p"}
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
                Kho xu???t<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                showSearch
                onChange={onChange("khoDoiUngId")}
                value={thongTinPhieu?.khoDoiUngId}
                filterOption={filterOption}
                placeholder={"Ch???n kho xu???t"}
                disabled={isEdit}
              >
                {optionsKhoDoiUng}
              </Select>
              {checkValidate && !thongTinPhieu?.khoDoiUngId && (
                <div className="error">Vui l??ng ch???n kho xu???t!</div>
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
                Kho nh???p<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                onChange={onChange("khoId")}
                value={thongTinPhieu?.khoId}
                placeholder={"Ch???n kho nh???p"}
                showSearch
                disabled={isEdit}
              >
                {optionsKho}
              </Select>
              {checkValidate && !thongTinPhieu?.khoId && (
                <div className="error">Vui l??ng ch???n kho nh???p!</div>
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
                Th??ng d??? tr??<span style={{ color: "red" }}> *</span>
              </label>
              <Select
                onChange={onChange("thangDuTru")}
                value={thongTinPhieu?.thangDuTru}
                placeholder={"Ch???n th??ng d??? tr??"}
                showSearch
              >
                {optionsThangDuTru}
              </Select>
              {checkValidate && !thongTinPhieu?.thangDuTru && (
                <div className="error">Vui l??ng ch???n th??ng d??? tr??!</div>
              )}
            </div>
          </Col>
          <Col span={6}>
            <div className="form-item">
              <label className={"label"}>Ghi ch??</label>
              <Input
                onChange={onChange("ghiChu")}
                value={thongTinPhieu?.ghiChu}
                placeholder={"Nh???p ghi ch??"}
              />
            </div>
          </Col>
        </Row>
      </Form>
    </Main>
  );
};

export default memo(FormPhieuNhap);
