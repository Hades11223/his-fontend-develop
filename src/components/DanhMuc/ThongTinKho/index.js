import React, { forwardRef, useState, useEffect, useRef } from "react";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import { Form, Input, Row, Col } from "antd";
import { connect } from "react-redux";
import TabPanel from "components/MultiLevelTab/TabPanel";
function ThongTinKho(props, ref) {
  const { currentItem, layerId } = props;
  const [state, _setState] = useState({ hideGPP: true });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    form.resetFields();
    loadCurrentItem(currentItem);
  }, [currentItem]);
  useEffect(() => {}, []);

  const [form] = Form.useForm();

  const loadCurrentItem = (thongTinKho) => {
    if (thongTinKho) {
      const {
        ma,
        ten,
        id,
        dsLoaiDichVu,
        dsCoCheDuTru,
        dsCoCheDuyetPhat,
        dsGiuTonKhaDung,
        khoaQuanLyId,
        nhapTuNcc,
        nhaThuoc,
        active,
        khongSuDung,
        khoKyGui,
        maGpp,
        taiKhoanGpp,
        matKhauGpp,
      } = thongTinKho || {};
      const data = {
        id,
        ma,
        ten,
        khoaQuanLyId,
        dsLoaiDichVu: dsLoaiDichVu || [],
        dsCoCheDuTru: dsCoCheDuTru || [],
        dsCoCheDuyetPhat: dsCoCheDuyetPhat || [],
        dsGiuTonKhaDung: dsGiuTonKhaDung || [],
        nhapTuNcc,
        nhaThuoc,
        active,
        khongSuDung,
        khoKyGui,
        maGpp,
        taiKhoanGpp,
        matKhauGpp,
      };
      form.setFieldsValue(data);
      setState({
        data: data,
        hideGPP: !nhaThuoc,
      });
    } else {
      form.resetFields();
      setState({
        data: null,
      });
    }
  };

  const onAddNewRow = () => {
    loadCurrentItem({});
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
          ma,
          ten,
          dsLoaiDichVu,
          dsCoCheDuTru,
          dsCoCheDuyetPhat,
          dsGiuTonKhaDung,
          khoaQuanLyId,
          nhapTuNcc,
          nhaThuoc,
          active,
          khongSuDung,
          khoKyGui,
          maGpp,
          taiKhoanGpp,
          matKhauGpp,
        } = values;
        values = {
          ma,
          ten,
          id: state.data?.id,
          dsLoaiDichVu,
          dsCoCheDuTru,
          dsCoCheDuyetPhat,
          dsGiuTonKhaDung,
          khoaQuanLyId,
          nhapTuNcc,
          nhaThuoc,
          active,
          khongSuDung,
          khoKyGui,
          maGpp,
          taiKhoanGpp,
          matKhauGpp,
        };
        props.createOrEdit(values, props.id).then(() => {
          if (state.data?.id) {
            return;
          }
          form.resetFields();
        });
      })
      .catch((error) => {});
  };
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [currentItem]);

  //function
  function nhaThuocFieldChange(e) {
    if (e?.nhaThuoc !== undefined) {
      setState({ hideGPP: !e.nhaThuoc });
    }
  }

  return (
    <TabPanel>
      <EditWrapper
        title="Th??ng tin kho"
        onCancel={onCancel}
        onSave={onSave}
        onAddNewRow={onAddNewRow}
        // isShowSaveButton={state.data}
        // isShowCancelButton={state.data}
        // showAdded={!state.data}
        showAdded={false}
        isShowSaveButton={true}
        isShowCancelButton={true}
        layerId={layerId}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          className="form-custom-new"
          onValuesChange={nhaThuocFieldChange}
        >
          <Row>
            <Col span="12">
              <Form.Item
                label="M?? kho"
                name="ma"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p m?? kho!",
                  },
                  {
                    max: 20,
                    message: "Vui l??ng nh???p m?? kho kh??ng qu?? 20 k?? t???!",
                  },
                  {
                    whitespace: true,
                    message: "Vui l??ng nh???p m?? kho!",
                  },
                ]}
              >
                <Input
                  autoFocus={true}
                  ref={refAutoFocus}
                  className="input-option"
                  placeholder="Vui l??ng nh???p m?? kho"
                />
              </Form.Item>
              <Form.Item
                label="T??n kho"
                name="ten"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng nh???p t??n kho!",
                  },
                  {
                    max: 1000,
                    message: "Vui l??ng nh???p t??n d???ch v??? kh??ng qu?? 1000 k?? t???!",
                  },
                  {
                    whitespace: true,
                    message: "Vui l??ng nh???p t??n kho!",
                  },
                ]}
              >
                <Input
                  className="input-option"
                  placeholder="Vui l??ng nh???p t??n kho "
                />
              </Form.Item>
              <Form.Item label="Lo???i kho" name="dsLoaiDichVu">
                <Select
                  data={props.listloaiDichVuKho}
                  placeholder="Vui l??ng ch???n lo???i kho"
                  mode="multiple"
                  showArrow
                  style={{ paddingRight: "10pt" }}
                />
              </Form.Item>
              <Form.Item label="Khoa qu???n l??" name="khoaQuanLyId">
                <Select
                  data={props.listKhoa}
                  placeholder="Vui l??ng ch???n khoa qu???n l??"
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
              <Row>
                <Col span={12}>
                  <Form.Item name="nhapTuNcc" valuePropName="checked">
                    <Checkbox>Nh???p t??? NCC</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="nhaThuoc" valuePropName="checked">
                    <Checkbox>Nh?? thu???c</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="active" valuePropName="checked">
                    <Checkbox>C?? hi???u l???c</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="khongSuDung" valuePropName="checked">
                    <Checkbox>Kh??ng s??? d???ng</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="khoKyGui" valuePropName="checked">
                    <Checkbox>Kho k?? g???i</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Form.Item label="C?? ch??? duy???t ph??t" name="dsCoCheDuyetPhat">
                <Select
                  data={props.listCoCheDuyetPhat}
                  placeholder="Vui l??ng ch???n c?? ch??? duy???t ph??t"
                  mode="multiple"
                  showArrow
                  style={{ paddingRight: "10pt" }}
                />
              </Form.Item>
              <Form.Item label="C?? ch??? d??? tr??/ L??nh b??" name="dsCoCheDuTru">
                <Select
                  data={props.listCoCheDuTru}
                  placeholder="Vui l??ng ch???n C?? ch??? d??? tr??/ L??nh b??"
                  mode="multiple"
                  showArrow
                  style={{ paddingRight: "10pt" }}
                />
              </Form.Item>
              <Form.Item label="Gi??? ch??? ngay khi k??" name="dsGiuTonKhaDung">
                <Select
                  data={props.listGiuTonKhaDung}
                  placeholder="Vui l??ng ch???n Gi??? ch??? ngay khi k??"
                  mode="multiple"
                  showArrow
                  style={{ paddingRight: "10pt" }}
                />
              </Form.Item>

              <Form.Item
                label="M?? c?? s??? GPP"
                name="maGpp"
                hidden={state.hideGPP}
              >
                <Input
                  className="input-option"
                  placeholder="Vui l??ng nh???p m?? c?? s??? GPP"
                />
              </Form.Item>

              <Form.Item
                label="T??i kho???n GPP"
                name="taiKhoanGpp"
                hidden={state.hideGPP}
              >
                <Input
                  className="input-option"
                  placeholder="Vui l??ng nh???p t??i kho???n GPP"
                />
              </Form.Item>

              <Form.Item
                label="M???t kh???u GPP"
                name="matKhauGpp"
                hidden={state.hideGPP}
              >
                <Input
                  className="input-option"
                  placeholder="Vui l??ng nh???p m???t kh???u GPP"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </EditWrapper>
    </TabPanel>
  );
}

const mapStateToProps = (state) => {
  const {
    khoa: { listKhoa },
    utils: {
      listloaiDichVuKho = [],
      listCoCheDuyetPhat = [],
      listCoCheDuTru = [],
      listGiuTonKhaDung = [],
    },
  } = state;

  return {
    listKhoa,
    listloaiDichVuKho,
    listCoCheDuyetPhat,
    listCoCheDuTru,
    listGiuTonKhaDung,
  };
};
const mapDispatchToProps = ({
  kho: { createOrEdit },
  utils: { getUtils },
}) => ({
  getUtils,
  createOrEdit,
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(ThongTinKho));
