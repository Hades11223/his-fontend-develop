import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { Row, Checkbox, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Button, ModalTemplate, TableWrapper } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { printJS } from "data-access/print-provider";
import { flatten } from "lodash";
import { useTranslation } from "react-i18next";
import { useEnum, useLoading } from "hook";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import nbDvKyThuat from "data-access/nb-dv-ky-thuat-provider.js";

const ModalInChiDinhTheoDV = (props, ref) => {
  const { showLoading, hideLoading } = useLoading();
  const refModal = useRef(null);
  const { t } = useTranslation();
  const [listTrangThaiDichVu] = useEnum("trangThaiDichVu");
  const {
    khamBenh: { getTatCaGiayChiDinh },
    phieuIn: { getDataDanhSachPhieu },
  } = useDispatch();
  const [state, _setState] = useState({
    show: false,
    hoanThuoc: 2,
    selectedRowKeys: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const { id } = useParams();

  useImperativeHandle(ref, () => ({
    show: (data = [], selectedRowKeys) => {
      let listKeys = (data || []).map((item) => {
        return item?.id;
      });
      // let selectedKey = selectedRowKeys ? selectedRowKeys : listKeys;
      // if (data?.length === selectedKey?.length) checkedAll = true;
      // else checkedAll = false;
      setState({
        show: true,
        currentItem: data,
        // selectedRowKeys : selectedKey,
        selectedRowKeys: [],
        isCheckedAll: false,
        listKeys,
      });
    },
  }));
  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  const oncheckAll = (e) => {
    setState({
      selectedRowKeys: e.target?.checked ? state.listKeys : [],
      isCheckedAll: e.target?.checked,
    });
  };

  const onSelectChange = (selectedRowKeys, data) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    if (state?.currentItem.length === updatedSelectedKeys.length) {
      setState({
        isCheckedAll: true,
        selectedRowKeys: updatedSelectedKeys,
      });
    } else {
      setState({
        isCheckedAll: false,
        selectedRowKeys: updatedSelectedKeys,
      });
    }
  };

  const rowSelection = {
    columnTitle: (
      <HeaderSearch
        title={
          <Checkbox
            style={{ color: "#03317c" }}
            onChange={oncheckAll}
            checked={state.isCheckedAll}
          ></Checkbox>
        }
      />
    ),
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.tenDichVu")} />,
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      width: "200px",
    },
    {
      title: <HeaderSearch title={t("common.trangThaiDichVu")} />,
      dataIndex: "trangThai",
      key: "trangThai",
      width: "80px",
      render: (item) => {
        return listTrangThaiDichVu?.find((itemTT) => itemTT.id === item)?.ten;
      },
    },
  ];

  const onHandleSubmit = async (values) => {
    if (state?.selectedRowKeys?.length === 0) {
      message.error(t("common.vuiLongChonDichVu"));
      return null;
    }
    try {
      showLoading();
      let res;
      try {
        res = await nbDvKyThuat.getPhieuChiDinhTongHop({
          nbDotDieuTriId: id,
          chiDinhTuDichVuId: id,
          dschiDinhTuLoaiDichVu: 200,
          dsNbDichVuId: state.selectedRowKeys,
        });
      } catch (e) {
        message.error(e?.message);
        return null;
      }

      const dsFilePdf = Array.isArray(res?.data)
        ? res?.data.map((itemChild) => itemChild.file.pdf)
        : res?.data.file.pdf
        ? [res?.data.file.pdf]
        : [];
      if (!dsFilePdf.length) {
        return null;
      }
      getDataDanhSachPhieu({ dsFile: flatten(dsFilePdf), mode: 0 }).then(
        (s) => {
          printJS({
            printable: s,
            type: "pdf",
          });
        }
      );
      onOK(false)();
    } catch (error) {
    } finally {
      hideLoading();
    }
  };
  const onOK = (isOk) => () => {
    if (isOk) {
      onHandleSubmit();
    } else setState({ show: false });
  };

  return (
    <ModalTemplate
      width={960}
      onCancel={onOK(false)}
      ref={refModal}
      title={t("khamBenh.inChiDinhTheoDichVu")}
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
          {t("common.in")}
        </Button>
      }
    >
      <Main>
        <span style={{ color: "#FC3B3A", fontWeight: "blod" }}>
          {t("khamBenh.chonDichVuDeIn")}
        </span>
        <div className="table-service">
          <Row className="header-table">
            <div className="header-table__left">{`${t("common.daChon")} ${
              state?.selectedRowKeys?.length
                ? state?.selectedRowKeys?.length
                : 0
            } ${t("common.dichVu")}`}</div>
          </Row>
          <TableWrapper
            columns={columns}
            dataSource={state?.currentItem}
            rowSelection={rowSelection}
            // onRow={onRow}
            scroll={{ y: 265 }}
            rowKey={(record) => record?.id}
          />
        </div>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalInChiDinhTheoDV);
