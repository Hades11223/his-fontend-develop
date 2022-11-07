import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
  useMemo,
} from "react";
import { Main, ModalStyled } from "./styled";
import FormWraper from "components/FormWraper";
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Button as AntButton,
  Select as AntSelect,
} from "antd";
import Select from "components/Select";
import { useDispatch, useSelector } from "react-redux";
import { SaveOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Button } from "components";
import moment from "moment";

const { Option } = AntSelect;

const ModalChinhSuaHopDong = (props, ref) => {
  const { id } = useParams();
  const [state, _setState] = useState({
    show: false,
  });

  //state
  const [hopDongInfo, setHopDongInfo] = useState({
    ten: "",
    doiTacId: null,
    soHopDong: "",
    ngayHieuLuc: null,
    hinhThucTtDvNgoaiHd: 20,
  });

  const {
    hopDongKSK: { chiTietHopDong },
    doiTac: { listAllDoiTac },
  } = useSelector((state) => state);

  const {
    hopDongKSK: { updateHopDong },
  } = useDispatch();

  useEffect(() => {
    if (chiTietHopDong) {
      setHopDongInfo({
        ten: chiTietHopDong?.ten,
        doiTacId: chiTietHopDong?.doiTacId,
        soHopDong: chiTietHopDong?.soHopDong,
        ngayHieuLuc: chiTietHopDong?.ngayHieuLuc
          ? moment(chiTietHopDong?.ngayHieuLuc)
          : undefined,
        hinhThucTtDvNgoaiHd: chiTietHopDong.hinhThucTtDvNgoaiHd,
      });
    }
  }, [chiTietHopDong]);

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
      });
    },
  }));

  const optionsDoiTac = useMemo(() => {
    let options = listAllDoiTac?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {`${item?.ma}-${item?.ten}`}
      </Option>
    ));
    return options;
  }, [listAllDoiTac]);

  const onClose = () => {
    setState({ show: false });
  };

  function onFinish(values) {
    console.log("Success:", values);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  function onSave() {
    updateHopDong({
      id,
      ten: hopDongInfo.ten,
      doiTacId: hopDongInfo.doiTacId,
      soHopDong: hopDongInfo.soHopDong,
      ngayHieuLuc: hopDongInfo.ngayHieuLuc
        ? hopDongInfo.ngayHieuLuc.format("YYYY-MM-DD")
        : hopDongInfo.ngayHieuLuc,
      hinhThucTtDvNgoaiHd: hopDongInfo.hinhThucTtDvNgoaiHd,
    }).then(() => {
      onClose();
    });
  }

  return (
    <ModalStyled
      width={500}
      visible={state.show}
      footer={null}
      closable={false}
      title={<label className="modal-title">Chỉnh sửa hợp đồng</label>}
      onCancel={onClose}
    >
      <Main>
        <div className="hopdong-form">
          <FormWraper
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout={"vertical"}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelWrap={false}
          >
            <Row>
              <Col span={24}>
                <Form.Item label="Tên hợp đồng">
                  <Input
                    placeholder="Tên hợp đồng"
                    value={hopDongInfo.ten}
                    readOnly={chiTietHopDong?.trangThai === 20}
                    onChange={(e) =>
                      setHopDongInfo({
                        ...hopDongInfo,
                        ten: e.target.value,
                      })
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Tên công ty">
                  <AntSelect
                    placeholder="Tên công ty"
                    value={hopDongInfo.doiTacId}
                    disabled={chiTietHopDong?.trangThai === 20}
                    onSelect={(e) =>
                      setHopDongInfo({
                        ...hopDongInfo,
                        doiTacId: e?.target ? e.target?.value : e,
                      })
                    }
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {optionsDoiTac}
                  </AntSelect>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Số hợp đồng">
                  <Input
                    placeholder="Số hợp đồng"
                    value={hopDongInfo.soHopDong}
                    readOnly={chiTietHopDong?.trangThai === 20}
                    onChange={(e) =>
                      setHopDongInfo({
                        ...hopDongInfo,
                        soHopDong: e.target.value,
                      })
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Hình thức thanh toán DV ngoài hợp đồng">
                  <Select
                    placeholder={"Chọn trạng thái"}
                    disabled={chiTietHopDong?.trangThai === 20}
                    data={[
                      { id: 10, ten: "Thanh toán theo hợp đồng" },
                      { id: 20, ten: "Tự thanh toán" },
                    ]}
                    onChange={(e) =>
                      setHopDongInfo({
                        ...hopDongInfo,
                        hinhThucTtDvNgoaiHd: e,
                      })
                    }
                    value={hopDongInfo.hinhThucTtDvNgoaiHd}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Ngày hiệu lực hợp đồng">
                  <DatePicker
                    placeholder="20/11/2022"
                    format="DD/MM/YYYY"
                    disabled={chiTietHopDong?.trangThai === 20}
                    value={hopDongInfo?.ngayHieuLuc}
                    onChange={(e) =>
                      setHopDongInfo({
                        ...hopDongInfo,
                        ngayHieuLuc: e,
                      })
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </FormWraper>
        </div>

        <div className="footer-action">
          <AntButton
            type="text"
            className="back-text"
            icon={<ArrowLeftOutlined />}
            onClick={onClose}
          >
            Quay lại
          </AntButton>

          <div className="button-save">
            <Button
              type="primary"
              minWidth={"100px"}
              onClick={onSave}
              disabled={chiTietHopDong?.trangThai === 20}
            >
              Lưu [F4] <SaveOutlined />
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalChinhSuaHopDong);
