import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Form } from "antd";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { firstLetterWordUpperCase } from "utils";
import { Button, ModalTemplate, Select } from "components";
import IconSuccess from "assets/images/welcome/success.png";
import { DOI_TUONG_KCB_NOI_TRU, ENUM } from "constants/index";
import { useEnum, useStore } from "hook";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useTranslation } from "react-i18next";
const ModalLapBenhAn = (props, ref) => {
  const [form] = Form.useForm();
  const { id } = props;
  const { t } = useTranslation();
  const refModal = useRef(null);
  const { listDataTongHop } = useStore("khoa", []);
  const { listAllLoaiBenhAn } = useStore("loaiBenhAn", []);
  const { thongTinNb, nbLapBenhAn } = useStore("quanLyNoiTru", {});
  const {
    quanLyNoiTru: { postLapBenhAn, getNbLapBenhAnById },
    loaiBenhAn: { getListAllLoaiBenhAn },
    khoa: { getListKhoaTongHop },
  } = useDispatch();

  const [listdoiTuongKcb] = useEnum(ENUM.DOI_TUONG_KCB);
  const [listgioiTinh] = useEnum(ENUM.GIOI_TINH);
  const [state, _setState] = useState({});
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
  //
  useEffect(() => {
    if (state?.show) {
      getListAllLoaiBenhAn({ page: "", size: "", active: true });
      getListKhoaTongHop({
        page: "",
        size: "",
        active: true,
        dsTinhChatKhoa: 70,
      });
      form.setFieldsValue({
        doiTuongKcb: DOI_TUONG_KCB_NOI_TRU.DIEU_TRI_NOI_TRU,
        khoaNhapVienId: nbLapBenhAn?.khoaNhapVienId,
      });
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);
  const gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinNb?.gioiTinh) || {};

  const handleClickBack = () => {
    setState({ show: false });
    form.resetFields();
  };

  const handleClickNext = () => {
    form.submit();
  };

  const onHanldeSubmit = (values) => {
    const payload = { ...values, id: id };
    postLapBenhAn(payload).then((s) => {
      getNbLapBenhAnById(id);
      handleClickBack();
    });
  };

  useEffect(() => {
    if (nbLapBenhAn && listDataTongHop && listAllLoaiBenhAn) {
      const selectedKhoa = (listDataTongHop || []).find(
        (x) => x?.id == nbLapBenhAn?.khoaNhapVienId
      );
      if (selectedKhoa) {
        const selectedLoaiBenhAn = (listAllLoaiBenhAn || []).find(
          (x) => x?.ten == selectedKhoa?.tenLoaiBenhAn
        );
        form.setFieldsValue({ loaiBenhAnId: selectedLoaiBenhAn?.id || null });
      }
    }
  }, [nbLapBenhAn, listDataTongHop, listAllLoaiBenhAn, state?.show]);

  const listKhoa = useMemo(() => {
    return (listDataTongHop || []).map((item) => {
      return { ...item, ten: `${item.ma} - ${item.ten}` };
    });
  }, [listDataTongHop]);

  return (
    <ModalTemplate
      width={640}
      ref={refModal}
      title={t("quanLyNoiTru.lapBenhAn.title")}
      onCancel={handleClickBack}
      rightTitle={
        <>
          <span className="font-color">
            {firstLetterWordUpperCase(thongTinNb?.tenNb)}
          </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten} </span>
          )}

          {thongTinNb.tuoi && (
            <span className="normal-weight">- {thongTinNb?.tuoi} tuổi</span>
          )}
        </>
      }
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={handleClickBack}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          rightIcon={<img src={IconSuccess} alt={IconSuccess} />}
          iconHeight={25}
          onClick={handleClickNext}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onHanldeSubmit}
        >
          <Form.Item
            label={t("quanLyNoiTru.loaiBenhAn")}
            name="loaiBenhAnId"
            rules={[
              {
                required: "true",
                message: t("quanLyNoiTru.lapBenhAn.vuiLongChonLoaiBenhAn"),
              },
            ]}
          >
            <Select
              data={listAllLoaiBenhAn}
              placeholder={t("quanLyNoiTru.lapBenhAn.vuiLongChonLoaiBenhAn")}
            />
          </Form.Item>
          <Form.Item label={t("quanLyNoiTru.doiTuongKcb")} name="doiTuongKcb">
            <Select
              data={listdoiTuongKcb?.filter((x) => [2, 3].includes(x.id))}
            />
          </Form.Item>
          <Form.Item
            label={t("quanLyNoiTru.khoaNhapVien")}
            name="khoaNhapVienId"
          >
            <Select data={listKhoa} />
          </Form.Item>
        </Form>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalLapBenhAn);
