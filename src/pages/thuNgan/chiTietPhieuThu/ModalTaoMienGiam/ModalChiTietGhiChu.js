import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, ModalTemplate, TableWrapper } from "components";
import { useTranslation } from "react-i18next";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import moment from "moment";
const { Column } = TableWrapper;

const ModalChiTietGhiChu = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);

  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (data) => {
      let dataSource = (data || []).map((item) => {
        const voucher = item.lists;
        const { moTa, tuNgay, denNgay } = voucher;
        const _tuNgay = tuNgay
          ? `từ ngày ${moment(tuNgay).format("DD/MM/YYYY")}`
          : "";
        const _denNgay = denNgay
          ? `đến ngày ${moment(denNgay).format("DD/MM/YYYY")}`
          : "";
        voucher.ghiChu = `${moTa || ""}, áp dụng ${_tuNgay} ${_denNgay}`;
        return voucher;
      });
      setState({ show: true, dataSource });
    },
  }));

  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  const onCancel = () => {
    setState({ show: false });
  };
  const columns = [
    Column({
      title: t("common.stt"),
      width: "50px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => index + 1,
    }),
    Column({
      title: "Voucher",
      width: "150px",
      dataIndex: "maVoucher",
      key: "maVoucher",
    }),
    Column({
      title: t("common.ghiChu"),
      width: "150px",
      dataIndex: "ghiChu",
      key: "ghiChu",
    }),
  ];
  console.log("dataSource", state?.dataSource);
  return (
    <ModalTemplate
      width={800}
      ref={refModal}
      title={t("thuNgan.danhSachVoucher")}
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
      <TableWrapper
        columns={columns}
        dataSource={state?.dataSource}
      ></TableWrapper>
    </ModalTemplate>
  );
};

export default forwardRef(ModalChiTietGhiChu);
