import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
} from "react";
import { Main } from "./styled";
import { Input, Form, Row, Col, Select as AntdSelect } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormWraper from "components/FormWraper";
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Button, ModalTemplate } from "components";
import { useTranslation } from "react-i18next";

const { Option } = AntdSelect;

const ModalThemMoiHopDong = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const [form] = Form.useForm();
  const history = useHistory();
  //redux
  const { listAllDoiTac } = useSelector((state) => state.doiTac);
  //state
  const [state, _setState] = useState({
    show: false,
    loaiDichVu: 10,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const {
    doiTac: { getListAllDoiTac },
    hopDongKSK: { taoMoiHopDongTuDS },
  } = useDispatch();

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });
    },
  }));

  //effect
  useEffect(() => {
    getListAllDoiTac({ dsLoaiDoiTac: 40, active: true });
  }, []);

  //memo
  const optionsDoiTac = useMemo(() => {
    let options = listAllDoiTac?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {`${item?.ma}-${item?.ten}`}
      </Option>
    ));
    return options;
  }, [listAllDoiTac]);

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const onOk = (isOk) => () => {
    if (isOk) {
      form.validateFields().then((values) => {
        taoMoiHopDongTuDS(values).then((res) => {
          onOk(false)();
          history.push(`/kham-suc-khoe/hop-dong/chi-tiet/${res?.id}`);
        });
      });
    } else {
      setState({ show: false });
    }
  };

  return (
    <ModalTemplate
      width="45%"
      ref={refModal}
      closable={false}
      onCancel={onOk(false)}
      title={t("khamSucKhoe.themMoiHopDong")}
      actionLeft={
        <div className="footer-action">
          <Button.Text
            type="primary"
            leftIcon={<ArrowLeftOutlined />}
            onClick={onOk(false)}
          >
            {t("common.quayLai")}
          </Button.Text>
        </div>
      }
      actionRight={
        <Button
          onClick={onOk(true)}
          className="confirm-btn"
          type="primary"
          rightIcon={<SaveOutlined />}
          iconHeight={15}
        >
          {t("common.xacNhan")}
        </Button>
      }
    >
      <Main>
        <div className="info-content">
          <div className="form-hop-dong">
            <FormWraper
              name="basic"
              form={form}
              initialValues={{ remember: true }}
              layout={"vertical"}
              autoComplete="off"
            >
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Thông tin công ty"
                    name="doiTacId"
                    rules={[
                      {
                        required: true,
                        message: "Tên công ty là bắt buộc!",
                      },
                    ]}
                  >
                    <AntdSelect
                      placeholder="Nhập tên công ty cần báo giá"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {optionsDoiTac}
                    </AntdSelect>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Tên hợp đồng"
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Tên hợp đồng là bắt buộc!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập tên hợp đồng" />
                  </Form.Item>
                </Col>
              </Row>
            </FormWraper>
          </div>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalThemMoiHopDong);
