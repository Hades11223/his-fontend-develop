import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Main } from "./styled";
import { Button, ModalTemplate } from "components";
import { Form, Select, DatePicker, TimePicker, Row } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { HOTKEY } from "constants/index";
const ModalKetThucKham = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const infoNb = useSelector((state) => state.khamBenh.infoNb);
  const auth = useSelector((state) => state.auth.auth);
  const listNhanVien = useSelector((state) => state.nhanVien.listNhanVien);
  const refCallback = useRef(null);
  const [form] = Form.useForm();
  const {
    nhanVien: { getListNhanVienTongHop },
  } = useDispatch();
  const [state, _setState] = useState({
    thoiGianKetLuan: moment(),
    thoiGianKetLuanTime: moment(),
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: ({}, onOK) => {
      refCallback.current = onOK;
      getListNhanVienTongHop();
      setState({
        show: true,
        thoiGianKetLuan: moment(),
        thoiGianKetLuanTime: moment(),
      });
    },
  }));
  useEffect(() => {
    let hour = state?.thoiGianKetLuanTime?.get("hour");
    let minute = state?.thoiGianKetLuanTime?.get("minute");
    let second = state?.thoiGianKetLuanTime?.get("second");
    let result = state?.thoiGianKetLuan?.set({ hour, minute, second });
    setState({ thoiGianKetLuan: result });
  }, [state.thoiGianKetLuan, state.thoiGianKetLuanTime]);
  const onOK = (isOk) => () => {
    if (isOk) {
      if (
        state.thoiGianKetLuan?.unix() <
        moment(infoNb?.thoiGianVaoVien, "YYYY-MM-DD HH:mm:ss")?.unix()
      ) {
        return null;
      }
      refCallback.current({
        thoiGianKetLuan: state.thoiGianKetLuan,
        bacSiKetLuanId: form.getFieldValue("bacSiKetLuanId"),
      });
      setState({ show: false });
    } else {
      setState({ show: false });
    }
  };
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);
  const hotKeys = [
    {
      keyCode: HOTKEY.ESC,
      onEvent: () => {
        onOK(false)();
      },
    },
    {
      keyCode: HOTKEY.F4,
      onEvent: () => {
        onOK(true)();
      },
    },
  ];
  return (
    <ModalTemplate
      ref={refModal}
      title={t("khamBenh.ketLuanKham.thongTinKetThucKham")}
      onCancel={onOK(false)}
      width={530}
      hotKeys={hotKeys}
    >
      <Main>
        <div className="info-content">
          <Form
            form={form}
            initialValues={{
              thoiGianKetLuan: moment(),
              thoiGianKetLuanTime: moment(),
              bacSiKetLuanId: auth.nhanVienId,
            }}
          >
            <Form.Item
              label={t("khamBenh.ketLuanKham.bacSiKetLuan")}
              name="bacSiKetLuanId"
            >
              <Select
                className="input-option"
                showSearch
                optionFilterProp="children"
                placeholder={t("khamBenh.ketLuanKham.vuiLongNhapBsKetLuan")}
                filterOption={(input, option) =>
                  option &&
                  option.children &&
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                    0
                }
              >
                {(listNhanVien || [])?.map((option, index) => {
                  return (
                    <Select.Option key={index} value={option.id}>
                      {`${option.taiKhoan} - ${option.ten}`}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Row>
              <Form.Item
                label={t("khamBenh.ketLuanKham.thoiGianKetLuan")}
                name="thoiGianKetLuan"
                style={{ marginRight: 10 }}
              >
                <DatePicker
                  value={state.thoiGianKetLuan}
                  onChange={(e) => {
                    setState({ thoiGianKetLuan: e });
                  }}
                  disabledDate={(date) => {
                    if (new Date().ddmmyyyy() == date._d.ddmmyyyy())
                      return false;
                    if (new Date() < date._d) return true;
                    return false;
                  }}
                  placeholder={t(
                    "khamBenh.ketLuanKham.vuiLongNhapThoiGianKetLuan"
                  )}
                />
              </Form.Item>
              <Form.Item label=" ">
                <TimePicker
                  value={state.thoiGianKetLuanTime}
                  onChange={(e) => {
                    setState({ thoiGianKetLuanTime: e });
                  }}
                />
              </Form.Item>
            </Row>
            {state.thoiGianKetLuan?.unix() <
            moment(infoNb?.thoiGianVaoVien, "YYYY-MM-DD HH:mm:ss")?.unix() ? (
              <span style={{ color: "red" }}>
                {t(
                  "khamBenh.ketLuanKham.thoiGianKetLuanPhaiSauThoiGianVaoVien"
                )}
              </span>
            ) : (
              <></>
            )}
          </Form>
        </div>
        <div className="footer-btn">
          <Button type="default" onClick={onOK(false)} minWidth={100}>
            {t("common.quayLai")}
          </Button>
          <Button type="primary" onClick={onOK(true)} minWidth={100}>
            {t("common.dongY")}
          </Button>
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalKetThucKham);
