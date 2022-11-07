import { Input } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useEffect } from "react";
import { Main } from "./styled";
import { checkRole } from "utils/role-utils";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import { LOAI_DICH_VU, ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import { HIEU_LUC } from "constants/index";
import { useTranslation } from "react-i18next";

let timer = null;

const DsMauKetQua = (props) => {
  const { t } = useTranslation();

  const {
    handleChangeshowTable,
    handleCollapsePane,
    showFullTable,
    collapseStatus,
    setStateParent,
  } = props;

  const {
    mauKetQuaCDHA: {
      totalElements,
      page,
      size,
      listMauKetQuaCDHA,
      dataSortColumn,
      currentItem,
    },
  } = useSelector((state) => state);
  const {
    mauKetQuaCDHA: {
      onSizeChange,
      onSearch,
      onSortChange,
      onChangeInputSearch,
      updateData,
    },
  } = useDispatch();

  useEffect(() => {
    onChangeInputSearch({ loaiDichVu: LOAI_DICH_VU.CDHA });
  }, []);

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;

    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      key: "index",
      width: 60,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.ma")}
          dataSort={dataSortColumn["ma"] || 0}
          sort_key="ma"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.timKiem")}
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      dataIndex: "ma",
      key: "ma",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.tenMau")}
          dataSort={dataSortColumn["ten"] || 0}
          sort_key="ten"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.timKiem")}
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: 200,
    },
    {
      title: (
        <HeaderSearch
          title={t("danhMuc.ketQua")}
          dataSort={dataSortColumn["ketQua"] || 0}
          sort_key="ketQua"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.timKiem")}
              onChange={onSearchInput("ketQua")}
            />
          }
        />
      ),
      dataIndex: "ketQua",
      key: "ketQua",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.ketLuan")}
          dataSort={dataSortColumn["ketLuan"] || 0}
          sort_key="ketLuan"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.timKiem")}
              onChange={onSearchInput("ketLuan")}
            />
          }
        />
      ),
      dataIndex: "ketLuan",
      key: "ketLuan",
      width: 250,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.cachThucCanThiep")}
          dataSort={dataSortColumn["cachThuc"] || 0}
          sort_key="cachThuc"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.timKiem")}
              onChange={onSearchInput("cachThuc")}
            />
          }
        />
      ),
      key: "cachThuc",
      dataIndex: "cachThuc",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.phuongThucCanThiep")}
          dataSort={dataSortColumn["phuongThuc"] || 0}
          sort_key="phuongThuc"
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("common.timKiem")}
              onChange={onSearchInput("phuongThuc")}
            />
          }
        />
      ),
      dataIndex: "phuongThuc",
      key: "phuongThuc",
      width: 200,
    },
    {
      title: (
        <HeaderSearch
          title={t("common.tenDichVu")}
          search={
            <Input
              placeholder={t("common.timKiem")}
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      dataIndex: "dsDichVu",
      key: "dsDichVu",
      align: "left",
      width: 150,
      render: (item) => {
        let list = item?.map((x) => x.ten);
        return list?.join(",");
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder={t("danhMuc.chonHieuLuc")}
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title={t("danhMuc.coHieuLuc")}
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  const onRow = (record) => {
    return {
      onClick: () => {
        props.setStateParent({ editStatus: true });
        updateData({ currentItem: record });
      },
    };
  };
  const handleClickedBtnAdded = () => {
    updateData({ currentItem: null });
    setStateParent({ editStatus: false });
  };
  const setRowClassName = (record) => {
    let idDiff = currentItem?.id;
    return record.id === idDiff ? "row-actived" : "";
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  return (
    <Main>
      <TableWrapper
        title={t("danhMuc.danhMucMauKetQuaCDHATDCN")}
        scroll={{ x: 1000 }}
        classNameRow={"custom-header"}
        styleMain={{ marginTop: 0 }}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={
          checkRole([ROLES["DANH_MUC"].MAU_KQ_CDHA_TDCN_THEM])
            ? [
                {
                  title: t("danhMuc.themMoi"),
                  onClick: handleClickedBtnAdded,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: `btn-change-full-table ${
                    showFullTable ? "small" : "large"
                  }`,
                  title: <Icon component={showFullTable ? thuNho : showFull} />,
                  onClick: handleChangeshowTable,
                },
                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
            : [
                {
                  className: `btn-change-full-table ${
                    showFullTable ? "small" : "large"
                  }`,
                  title: <Icon component={showFullTable ? thuNho : showFull} />,
                  onClick: handleChangeshowTable,
                },
                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
        }
        columns={columns}
        dataSource={listMauKetQuaCDHA}
        onRow={onRow}
        rowKey={(record) => record.id}
        rowClassName={setRowClassName}
      ></TableWrapper>

      <div className="content">
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listMauKetQuaCDHA}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{
            flex: 1,
            paddingBottom: "5px",
            marginTop: "5px",
            justifyContent: "flex-start",
          }}
        />
      </div>
    </Main>
  );
};

export default DsMauKetQua;
