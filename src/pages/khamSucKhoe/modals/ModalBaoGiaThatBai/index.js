import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useMemo,
  useEffect,
} from "react";
import { Main, ModalStyled } from "./styled";
import { Input, Button as AntButton, message, Select } from "antd";
import { CloseCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "components";
import { isEmpty } from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const now = moment().format("YYYY-MM-DD");

const ModalBaoGiaThatBai = (props, ref) => {
  const { t } = useTranslation();
  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({
        show: true,
        currentItem: data,
      });
    },
  }));

  const {
    khamSucKhoe: { chiTietPhieu },
    doiTac: { dataLichSuTongHop },
  } = useSelector((state) => state);

  const { baoGiaThatBai, getPhieuBaoGia } = useDispatch().khamSucKhoe;
  const { getLichSuTongHop } = useDispatch().doiTac;

  const [state, _setState] = useState({
    show: false,
    reason: "",
    doiTacId: null,
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (!state.doiTacId) {
      message.error(t("khamSucKhoe.messChonDoiTac"));
      return;
    }

    if (isEmpty(state.reason)) {
      message.error(t("khamSucKhoe.messNhapLyDoThatBai"));
      return;
    }

    baoGiaThatBai({
      id: chiTietPhieu?.id,
      doiTacId: state.doiTacId,
      lyDo: state.reason,
    }).then(() => {
      getPhieuBaoGia(chiTietPhieu?.id);
      onClose();
    });
  };

  function onChangeDoiTacId(e) {
    setState({ doiTacId: e });
  }

  const onClose = () => {
    setState({ show: false, reason: "" });
  };

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
            <CloseCircleOutlined className="check-icon" />{" "}
            <span>{t("khamSucKhoe.titleBaoGiaThatBai")}</span>
          </div>

          <div className="success-content">
            <div className="field-item">
              <label>{t("khamSucKhoe.tenPhieuBaoGia")}:</label>
              <div className="field-item-content">{`${chiTietPhieu?.ma} - ${chiTietPhieu?.ten}`}</div>
            </div>

            <div className="field-item">
              <label>
                {t("khamSucKhoe.congTyBaoGia")}
                <span style={{ color: "red" }}>*</span>
              </label>

              <div className="field-item-content">
                <Select
                  placeholder="Nhập tên công ty cần báo giá"
                  value={state.doiTacId}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onSelect={onChangeDoiTacId}
                >
                  {optionsDoiTac}
                </Select>
              </div>
            </div>

            <div className="field-item">
              <label>
                {t("khamSucKhoe.lyDoThatBai")}
                <span style={{ color: "red" }}>*</span>
              </label>

              <div className="field-item-content">
                <Input
                  value={state.reason}
                  onChange={(e) => setState({ reason: e?.target?.value || "" })}
                  placeholder={`Nhập lý do báo giá thất bại`}
                />
              </div>
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
              className="confirm-btn"
              type="primary"
              minWidth={100}
              onClick={onSubmit}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Main>
    </ModalStyled>
  );
};

export default forwardRef(ModalBaoGiaThatBai);
