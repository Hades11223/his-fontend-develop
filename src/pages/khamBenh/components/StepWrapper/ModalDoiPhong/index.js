import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Main } from "./styled";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ModalTemplate,
  Pagination,
  Select,
  TableWrapper,
} from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useTranslation } from "react-i18next";
import { useStore } from "hook";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const ModalDoiPhong = (props, ref) => {
  const refModal = useRef(null);
  const { t } = useTranslation();
  const history = useHistory();
  const thongTinChiTiet = useSelector(
    (state) => state.khamBenh.thongTinChiTiet
  );
  const infoNb = useStore("khamBenh.infoNb", {});
  const {
    phongThucHien: { getData, onSearch, onSizeChange, onChangeInputSearch },
    nbKhamBenh: { themThongTin },
  } = useDispatch();
  const listData = useStore("phongThucHien.listData", []);
  const { size, page, totalElements } = useSelector(
    (state) => state.phongThucHien
  );
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
      getData({ dichVuId: thongTinChiTiet?.nbDichVu?.dichVuId });
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const listAllPhong = useMemo(() => {
    return listData.map((item) => item?.phong);
  }, [listData]);
  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      dataIndex: "index",
      key: "index",
      align: "center",
      width: "50px",
    },
    {
      title: <HeaderSearch title=" " />,
      key: "check",
      width: "50px",
      align: "center",
      render: (_, data, index) => {
        return (
          <Radio
            checked={state?.index === index}
            onChange={() => {
              setState({ currentItem: data, index: index });
            }}
          />
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("common.phong")}
          searchSelect={
            <Select
              data={listAllPhong}
              onChange={(e) => onChangeInputSearch({ phongId: e })}
            />
          }
        />
      ),
      dataIndex: "phong",
      key: "phong",
      width: "400px",
      render: (item, data) => {
        return item?.ten;
      },
    },
  ];

  const onChangePage = (page) => {
    onSearch({ page: page - 1, dichVuId: thongTinChiTiet?.nbDichVu?.dichVuId });
  };

  const onHandleSizeChange = (size) => {
    onSizeChange({ size: size, dichVuId: thongTinChiTiet?.nbDichVu?.dichVuId });
  };

  const onOK = (isOk) => () => {
    if (isOk) {
      if (state?.currentItem) {
        let payload = [
          {
            id: thongTinChiTiet?.id,
            nbDvKyThuat: { phongThucHienId: state?.currentItem?.phongId },
          },
        ];
        themThongTin(payload).then(() => {
          history.push(
            `/kham-benh/${state?.currentItem?.phongId}/${infoNb.maHoSo}/${thongTinChiTiet.id}`
          );
          setState({ show: false });
        });
      }
    } else setState({ show: false });
  };

  return (
    <ModalTemplate
      width={640}
      onCancel={onOK(false)}
      ref={refModal}
      title={t("khamBenh.chonPhongCanDoi")}
      actionLeft={
        <Button.Text
          leftIcon={<IcArrowLeft />}
          type="primary"
          iconHeight={15}
          onClick={onOK(false)}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          iconHeight={15}
          onClick={onOK(true)}
        >
          {t("common.luu")}
        </Button>
      }
    >
      <Main>
        <TableWrapper
          columns={columns}
          dataSource={listData}
          scroll={{ y: 265 }}
          rowKey={(record) => record?.id}
        />
        {totalElements ? (
          <Pagination
            onChange={onChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={onHandleSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalDoiPhong);
