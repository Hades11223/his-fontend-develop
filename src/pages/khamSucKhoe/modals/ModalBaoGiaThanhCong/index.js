import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle,
  useMemo,
  useEffect,
} from "react";
import { Main, ModalStyled } from "./styled";
import { Form, Select, Button as AntButton } from "antd";
import {
  CheckCircleOutlined,
  SaveOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const now = moment().format("YYYY-MM-DD");

const ModalBaoGiaThanhCong = (props, ref) => {
  const { t } = useTranslation();
  const history = useHistory();
  const refFuncSubmit = useRef(null);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });
    },
  }));

  const {
    doiTac: { dataLichSuTongHop },
    khamSucKhoe: { chiTietPhieu },
  } = useSelector((state) => state);

  const {
    khamSucKhoe: { baoGiaThanhCong },
    doiTac: { getLichSuTongHop },
  } = useDispatch();

  const [state, _setState] = useState({
    show: false,
    doiTacId: null,
  });

  useEffect(() => {
    getLichSuTongHop({ dsLoaiDoiTac: 40, active: true, ngayHieuLuc: now });
  }, []);

  useEffect(() => {
    setState({ doiTacId: chiTietPhieu?.doiTacId });
  }, [chiTietPhieu]);

  const optionsDoiTac = useMemo(() => {
    let options = dataLichSuTongHop?.map((item, index) => (
      <Option key={index} value={item?.id}>
        {`${item?.ma}-${item?.ten}`}
      </Option>
    ));
    return options;
  }, [dataLichSuTongHop]);

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    baoGiaThanhCong({
      id: chiTietPhieu?.id,
      doiTacId: state.doiTacId,
    }).then(() => {
      onClose();
      history.push(`/kham-suc-khoe/hop-dong/chi-tiet/${chiTietPhieu?.id}`);
    });
  };

  refFuncSubmit.current = onSubmit;

  const onClose = () => {
    form.resetFields();
    setState({ show: false });
  };

  function onChangeDoiTacId(e) {
    setState({ doiTacId: e });
  }

  return (
    <ModalStyled
      width={450}
      visible={state.show}
      footer={null}
      closable={false}
      onCancel={onClose}
    >
      <Main>
        <div className="info-content">
          <div className="success-title">
            <CheckCircleOutlined className="check-icon" />{" "}
            <span>{t("khamSucKhoe.titleBaoGiaThanhCong")}</span>
          </div>

          <div className="success-content">
            <div className="text">
              {t("khamSucKhoe.tenPhieuBaoGia")}:&emsp;<b>{chiTietPhieu?.ten}</b>
            </div>
            <div>
              {t("khamSucKhoe.congTyBaoGia")}:&emsp;&emsp;
              <Select
                placeholder="Nhập tên công ty cần báo giá"
                value={state.doiTacId}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onSelect={onChangeDoiTacId}
              >
                {optionsDoiTac}
              </Select>
            </div>
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
            <Button
              type="primary"
              minWidth={100}
              rightIcon={<SaveOutlined />}
              onClick={onSubmit}
            >
              Lưu
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalBaoGiaThanhCong);
