import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { Button, HeaderSearch, ModalTemplate, TableWrapper } from "components";
import IconSave from "assets/images/thuNgan/icSave.png";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
const { Column } = TableWrapper;
const ModalSaoChepDichVu = (props, ref) => {
  const { t } = useTranslation();
  const refModal = useRef(null);
  const {
    goiDichVuChiTiet: { createBatch, getListDichVuSaoChep },
  } = useDispatch();
  const listDichVuSaoChep = useStore("goiDichVuChiTiet.listDichVuSaoChep", []);
  const [state, _setState] = useState({ show: false });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (options = {}) => {
      const { boChiDinhSaoChep, boChiDinhId } = options;
      setState({ show: true, boChiDinhSaoChep, boChiDinhId });
    },
    hide: () => {
      setState({ show: false });
    },
  }));
  useEffect(() => {}, []);
  useEffect(() => {
    if (state?.show) {
      refModal.current && refModal.current.show();
      getListDichVuSaoChep({
        page: "",
        size: "",
        boChiDinhId: 10952,
      });
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state?.show]);

  useEffect(() => {
    if (state?.boChiDinhSaoChepId) {
    }
  }, [state?.boChiDinhSaoChepId]);

  const onCancel = () => {
    setState({ show: false });
  };
  const onSubmit = () => {
    const payload = (state?.dataSource || []).map((item) => ({
      boChiDinhId: state?.boChiDinhId,
      soLuong: item.soLuong,
      dichVuId: item?.dichVuId,
      phongId: item?.phongId,
    }));
    createBatch(payload).then(() => {
      onCancel();
    });
  };

  useEffect(() => {
    let data = (listDichVuSaoChep || []).map((item) => {
      return { ...item, tenBo: state?.boChiDinhSaoChep?.ten };
    });
    setState({
      dataSource: data,
      selectedRowKeys: listDichVuSaoChep.map((item) => item?.id),
    });
  }, [listDichVuSaoChep]);

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
      title: t("danhMuc.tenBo"),
      width: "150px",
      dataIndex: "index",
      key: "index",
    }),

    Column({
      title: t("danhMuc.dichVuTrongBo"),
      width: "300px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      render: (item, data) => data?.dichVu?.ten,
    }),

    Column({
      title: t("danhMuc.phongThucHien"),
      width: "150px",
      dataIndex: "phongThucHien",
      key: "phongThucHien",
      render: (item, data) => data?.phong?.ten,
    }),
  ];
  const onChangeSelection = (selectedRowKeys, data) => {
    setState({ selectedRowKeys, dataSource: data });
  };
  const rowSelection = {
    columnTitle: <HeaderSearch title={t("common.chon")} />,
    columnWidth: 50,
    onChange: onChangeSelection,
    selectedRowKeys: state.selectedRowKeys,
    preserveSelectedRowKeys: true,
  };
  return (
    <ModalTemplate
      width={800}
      ref={refModal}
      title={t("danhMuc.thongTinDichVuTrongBo")}
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
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onSubmit}
          iconHeight={30}
          rightIcon={<img src={IconSave} alt={IconSave} />}
        >
          {t("common.xacNhan")}
        </Button>
      }
    >
      <TableWrapper
        rowKey={(record) => {
          return record.id;
        }}
        columns={columns}
        dataSource={state?.dataSource}
        rowSelection={rowSelection}
        styleWrap={{ height: "500px" }}
      />
    </ModalTemplate>
  );
};

export default forwardRef(ModalSaoChepDichVu);
