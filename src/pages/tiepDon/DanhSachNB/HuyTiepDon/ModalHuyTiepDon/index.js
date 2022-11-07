import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import { Row, Input } from "antd";
import { Main, ContentTable } from "./styled";
import IcArrowLeft from "assets/svg/ic-arrow-left.svg";
import IconSuccess from "assets/images/welcome/success.png";
import { useDispatch, useSelector } from "react-redux";
import { Button, ModalTemplate, Pagination } from "components";
import HeaderSearch from "components/TableWrapper/headerSearch";
import TableWrapper from "components/TableWrapper";
import { useTranslation } from "react-i18next";

const ModalHuyTiepDon = (props, ref) => {
  const refModal = useRef(null);
  const { t } = useTranslation();
  const { dataSortColumn, listNguoiBenhTiepDon, totalElements, page, size } =
    useSelector((state) => state.danhSachNbTiepDon);
  const {
    danhSachNbTiepDon: {
      getListNguoiBenhTiepDon,
      onSizeChange,
      onSortChange,
      onChangeInputSearch,
    },
    danhSachNbHuyTiepDon: { huyTiepDon },
  } = useDispatch();

  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };

  useEffect(() => {
    getListNguoiBenhTiepDon({ active: true });
  }, []);
  useEffect(() => {
    if (!state.show) {
      setState({ selectedRowKeys: [] });
    }
  }, [state.show]);
  const onClose = () => {
    setState({ show: false });
  };

  useEffect(() => {
    if (state.show) {
      refModal.current && refModal.current.show();
    } else {
      refModal.current && refModal.current.hide();
    }
  }, [state.show]);

  useImperativeHandle(ref, () => ({
    show: (data = {}) => {
      setState({ show: true });
    },
  }));

  const onChangePage = (page) => {
    getListNguoiBenhTiepDon({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    onChangeInputSearch({
      [key]: value,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHs")}
          sort_key="maHoSo"
          dataSort={dataSortColumn["maHoSo"] || ""}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.nhapMaHoSo")}
              onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.maNguoiBenh")}
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || ""}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("tiepDon.nhapMaNguoiBenh")}
              onChange={onSearchInput("maNb")}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "maNb",
      key: "maNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.hoTenNguoiBenh")}
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("tiepDon.nhapTenNguoiBenh")}
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: "130px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.diaChiNguoiBenh")}
          search={
            <Input
              placeholder={t("tiepDon.nhapDiaChiNguoiBenh")}
              onChange={onSearchInput("diaChi")}
            />
          }
        />
      ),
      width: "130px",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: (
        <HeaderSearch
          title={t("tiepDon.tenCongTy")}
          // sort_key="soDienThoai"
          // dataSort={dataSortColumn["soDienThoai"] || ""}
          // onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("tiepDon.nhapTenCongTy")}
              // onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: "130px",
      dataIndex: "",
      key: "",
    },
  ];
  const onAccept = () => {
    huyTiepDon({ dsId: state.selectedRowKeys, active: false }).then(onClose());
  };

  const onSelectChange = (selectedRowKeys) => {
    let updatedSelectedKeys = selectedRowKeys;
    updatedSelectedKeys = [...new Set(updatedSelectedKeys)];
    setState({
      selectedRowKeys: updatedSelectedKeys,
    });
  };

  const rowSelection = {
    columnTitle: <HeaderSearch />,
    columnWidth: 25,
    onChange: onSelectChange,
    selectedRowKeys: state.selectedRowKeys,
  };

  return (
    <ModalTemplate
      width={1840}
      ref={refModal}
      closable={true}
      title={t("tiepDon.timKiemNguoiBenh")}
      onCancel={onClose}
      actionLeft={
        <Button.Text
          type="primary"
          minWidth={100}
          onClick={onClose}
          leftIcon={<IcArrowLeft />}
        >
          {t("common.quayLai")}
        </Button.Text>
      }
      actionRight={
        <Button
          type="primary"
          minWidth={100}
          onClick={onAccept}
          iconHeight={30}
          rightIcon={<img src={IconSuccess} alt={IconSuccess} />}
        >
          <span>{t("common.xacNhan")}</span>
        </Button>
      }
    >
      <Main>
        <Row className="content">
          <div className="info">
            <ContentTable>
              <TableWrapper
                columns={columns}
                dataSource={listNguoiBenhTiepDon}
                rowKey={(record) => `${record.id}`}
                rowSelection={rowSelection}
              />
              <Pagination
                onChange={onChangePage}
                current={page + 1}
                pageSize={size}
                listData={listNguoiBenhTiepDon}
                total={totalElements}
                onShowSizeChange={handleSizeChange}
              />
            </ContentTable>
          </div>
        </Row>
      </Main>
    </ModalTemplate>
  );
};

export default forwardRef(ModalHuyTiepDon);
