import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form } from "antd";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import {
  Button,
  DateTimePicker,
  HeaderSearch,
  ModalTemplate,
  TableWrapper,
} from "components";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IconSuccess from "assets/images/welcome/success.png";

const ModalDuyetYeuCauMuonNb = (props, ref) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const refModal = useRef(null);
  const infoPatient = useStore("danhSachNguoiBenhNoiTru.infoPatient", {});
  const listDsMuonNb = useStore("danhSachNguoiBenhNoiTru.listDsMuonNb", []);
  const {
    danhSachNguoiBenhNoiTru: { duyetYeuCauMuonNb, getDanhSachMuonNb },
    khoa: { getListKhoaTongHop },
  } = useDispatch();

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      form.setFieldsValue({ tenKhoaNb: infoPatient?.tenKhoaNb });
      getListKhoaTongHop({ tuDongDuyetMuonNb: true });
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show, infoPatient]);

  useEffect(() => {}, []);

  const onSave = (item) => {
    const payload = {
      id: item.id,
      denThoiGian:
        item.denThoiGian &&
        moment(item.denThoiGian).format("YYYY-MM-DD HH:mm:ss"),
    };
    duyetYeuCauMuonNb(payload).then(() => {
      getDanhSachMuonNb({ nbDotDieuTriId: infoPatient.id });
      onCancel();
    });
  };

  const onCancel = () => {
    setState({ show: false });
  };

  const onChange = (key, index) => (e) => {
    listDsMuonNb[index][key] = e;
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "35px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => index + 1,
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.khoaMuon")} />,
      width: "120px",
      dataIndex: "tenDenKhoa",
      key: "tenDenKhoa",
      render: (item) => {
        return <div className="item">{item}</div>;
      },
    },
    {
      title: <HeaderSearch title={t("quanLyNoiTru.thoiGian")} />,
      width: "150px",
      dataIndex: "denThoiGian",
      key: "denThoiGian",
      render: (item, data, index) => {
        return (
          <DateTimePicker
            value={moment(item)}
            onChange={onChange("denThoiGian", index)}
          />
        );
      },
    },
    {
      title: <HeaderSearch title={t("common.tienIch")} />,
      width: "60px",
      dataIndex: "action",
      key: "action",
      render: (item, data) => {
        return (
          <Button
            type="primary"
            rightIcon={<img src={IconSuccess} alt={IconSuccess} />}
            onClick={() => onSave(data)}
            iconHeight={20}
          >
            {t("quanLyNoiTru.duyet")}
          </Button>
        );
      },
    },
  ];

  return (
    <ModalTemplate
      width={700}
      ref={refModal}
      title={t("quanLyNoiTru.duyetYeuCauMuonNb")}
      onCancel={onCancel}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onCancel}
          iconHeight={15}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
    >
      <Main>
        <TableWrapper columns={columns} dataSource={listDsMuonNb} />
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalDuyetYeuCauMuonNb);
