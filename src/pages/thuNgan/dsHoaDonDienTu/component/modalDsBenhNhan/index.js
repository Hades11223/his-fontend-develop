import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { HeaderSearch, TableWrapper } from "components";
import { Pagination } from "components";
import { ModalStyled } from "./styled";
import { Button, Input, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { combineSort } from "utils";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
let timer = null;

const ModalDsNguoiBenh = ({}, ref) => {
  const { t } = useTranslation();

  const [state, _setState] = useState({
    show: false,
    dataSortColumn: {},
    listData: [],
    page: 0,
    size: 10,
    dataSearch: {},
    selectedRowKeys: [],
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { searchNBDotDieuTriTongHop, updateData } = dispatch.nbDotDieuTri;
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
    },
  }));
  const onSelectChange = (selectedRowKeys) => {
    setState({
      selectedRowKeys: selectedRowKeys?.length ? [selectedRowKeys.pop()] : [],
    });
    //
  };
  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange,
  };
  const onClickSort = (key, value) => {
    const sort = { [key]: value };
    setState({
      dataSortColumn: sort,
    });
    onSearch({ page: state.page, size: state.size });
  };
  const onRow = () => {};
  const setRowClassName = () => {};
  const onChangePage = (page) => {
    setState({
      page: page - 1,
    });
    onSearch({
      page: page - 1,
      size: state.size,
      dataSearch: state.dataSearch,
    });
  };
  const onSearch = ({ page, size, dataSearch }) => {
    const sort = combineSort(state.dataSortColumn);
    searchNBDotDieuTriTongHop({
      ...dataSearch,
      sort,
      page: page,
      size: size,
    }).then((s) => {
      setState({
        totalElements: s.totalElements,
        listData: s.data,
      });
    });
  };
  const handleSizeChange = (size) => {
    setState({
      size: size,
    });
    onSearch({ size: size, page: state.page, dataSearch: state.dataSearch });
  };
  const handleCancel = () => {
    setState({
      show: false,
    });
  };
  useEffect(() => {
    searchNBDotDieuTriTongHop({
      ...state.dataSearch,
      page: state.page,
      size: state.size,
    }).then((s) => {
      setState({
        totalElements: s.totalElements,
        listData: s.data,
      });
    });
  }, []);
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    setState({
      dataSearch: {
        ...state.dataSearch,
        [key]: value,
      },
    });
    const dataSearch = {
      ...state.dataSearch,
      [key]: value,
    };
    clearTimeout(timer);
    timer = setTimeout(() => {
      onSearch({
        page: state.page,
        size: state.size,
        dataSearch,
      });
    }, 500);
  };
  const confirm = () => {
    if (!state?.selectedRowKeys?.length) {
      message.error(t("common.vuiLongChonBenhNhan"));
    } else {
      console.log(state.selectedRowKeys);
      const benhNhan = state.listData.find((item, index) => {
        return index == state.selectedRowKeys[0].slice(3);
      });
      if (benhNhan) {
        updateData({
          nbDotDieuTri: benhNhan,
        });
        history.push(`/thu-ngan/tao-hoa-don-dien-tu/${benhNhan.id}`);
      }
    }
  };
  const columnsGroup = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 40,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (text, item, index) => state.size * state.page + index + 1,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maHoSo")}
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.maHoSo || 0}
          search={
            <Input
              placeholder={t("common.nhapMaHoSo")}
              onChange={onSearchInput("maHoSo")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.maNguoiBenh")}
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.maNb || 0}
          search={
            <Input
              placeholder={t("common.nhapMaNguoiBenh")}
              onChange={onSearchInput("maNb")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "maNb",
      key: "maNb",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.hoVaTenNguoiBenh")}
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={state.dataSortColumn?.tenNb || 0}
          search={
            <Input
              placeholder={t("common.nhapHoVaTenNguoiBenh")}
              onChange={onSearchInput("tenNb")}
            />
          }
        />
      ),
      width: 300,
      dataIndex: "tenNb",
      key: "tenNb",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title={t("common.diaChiNguoiBenh")}
          sort_key="diaChi"
          search={
            <Input
              placeholder={t("common.nhapDiaChiNguoiBenh")}
              onChange={onSearchInput("diaChi")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "diaChi",
      key: "diaChi",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("thuNgan.tenCongTy")}
          sort_key="tenCongTy"
          search={
            <Input
              placeholder={t("thuNgan.nhapTenCongTy")}
              onChange={onSearchInput("tenCongTy")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "tenCongTy",
      key: "tenCongTy",
      align: "left",
    },
  ];

  return (
    <ModalStyled
      title={t("common.timKiemNguoiBenh")}
      centered
      visible={state.show}
      footer={null}
      onCancel={() => {
        setState({
          show: false,
        });
      }}
      closable={false}
      width={1500}
    >
      <TableWrapper
        columns={columnsGroup}
        rowSelection={rowSelection}
        dataSource={state.listData || []}
        onRow={onRow}
        scroll={{ x: 200 }}
        rowClassName={setRowClassName}
      ></TableWrapper>
      <Pagination
        onChange={onChangePage}
        current={state?.page + 1}
        pageSize={state?.size || 10}
        listData={state.listData}
        total={state?.totalElements || 10}
        onShowSizeChange={handleSizeChange}
        style={{ flex: 1, justifyContent: "flex-end" }}
      />
      <div className="footer">
        <p className="button-cancel" onClick={handleCancel}>
          <ArrowLeftOutlined /> Quay lại{" "}
        </p>
        <Button className="button-ok" onClick={confirm}>
          {t("common.xacNhan")}{" "}
          <img
            style={{ marginLeft: 6 }}
            src={require("assets/images/kho/save.png")}
            alt=""
          ></img>
        </Button>
      </div>
    </ModalStyled>
  );
};

export default forwardRef(ModalDsNguoiBenh);
