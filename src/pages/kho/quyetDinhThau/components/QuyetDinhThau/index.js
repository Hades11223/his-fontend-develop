import React, { useEffect, useMemo, useRef } from "react";
import { Checkbox, DatePicker, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { HIEU_LUC } from "constants/index";
import { useDispatch, useSelector } from "react-redux";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import { useTranslation } from "react-i18next";
let timer = null;
const dateFormat = "DD-MM-YYYY";

const QuyetDinhThau = ({
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,
  layerId,
}) => {
  const { onRegisterHotkey } = useDispatch().phimTat;
  const {
    onSizeChange,
    onSearch,
    onChangeInputSearch,
    onSortChange,
    updateData,
  } = useDispatch().quyetDinhThau;
  const { t } = useTranslation();
  const refClickBtnAdd = useRef();
  const refSelectRow = useRef();
  const {
    listQuyetDinhThau,
    dataEditDefault,
    totalElements,
    page,
    size,
    dataSortColumn,
  } = useSelector((state) => state.quyetDinhThau);
  const { listKhoaTheoTaiKhoan } = useSelector((state) => state.khoa);
  const { listData: listNguonNhapKho } = useSelector(
    (state) => state.nguonNhapKho
  );
  const { listloaiDichVuThuocVatTuHoaChat, listloaiThau, listtrangThaiThau } =
    useSelector((state) => state.utils);

  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: (e) => {
            refClickBtnAdd.current && refClickBtnAdd.current(e);
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            if (refSelectRow.current && e?.target?.nodeName !== "INPUT")
              refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            if (refSelectRow.current && e?.target?.nodeName !== "INPUT")
              refSelectRow.current(1);
          },
        },
      ],
    });
    onSizeChange(10);
  }, []);

  const onReset = () => {
    updateData({ dataEditDefault: null });
  };

  refSelectRow.current = (index) => {
    const indexNextItem =
      (data?.findIndex((item) => item.id === dataEditDefault?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      updateData({ dataEditDefault: data[indexNextItem] });
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  refClickBtnAdd.current = onReset;

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

  const onRow = (record, index) => ({
    onClick: (event) => {
      updateData({
        dataEditDefault: record,
      });
    },
  });

  const data = useMemo(() => {
    return listQuyetDinhThau.map((item, index) => {
      return {
        ...item,
        action: item,
        stt: page * size + index + 1,
      };
    });
  }, [listQuyetDinhThau]);

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };

  const columns = [
    {
      title: <HeaderSearch title={t("common.stt")} />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.nam")}
          sort_key="nam"
          dataSort={dataSortColumn["nam"] || 0}
          onClickSort={onClickSort}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timNam")}
              onChange={onSearchInput("nam")}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "nam",
      key: "nam",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.title")}
          sort_key="quyetDinhThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyetDinhThau"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timQuyetDinhThau")}
              onChange={onSearchInput("quyetDinhThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "quyetDinhThau",
      key: "quyetDinhThau",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.tenGoiThau")}
          sort_key="goiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["goiThau"] || 0}
          search={
            <Input
              placeholder={t("kho.quyetDinhThau.timGoiThau")}
              onChange={onSearchInput("goiThau")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "goiThau",
      key: "goiThau",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.loaiDv")}
          sort_key="loaiDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["loaiDichVu"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timLoaiDichVu")}
              data={listloaiDichVuThuocVatTuHoaChat}
              onChange={onSearchInput("loaiDichVu")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "loaiDichVu",
      key: "loaiDichVu",
      render: (item) => {
        return (listloaiDichVuThuocVatTuHoaChat || []).find(
          (x) => x.id === item
        )?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.nguonNhapKho")}
          sort_key="nguonNhapKhoId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nguonNhapKhoId"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timNguonNhapKho")}
              data={listNguonNhapKho}
              onChange={onSearchInput("nguonNhapKhoId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nguonNhapKho",
      key: "nguonNhapKho",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.loaiThau")}
          sort_key="loaiThau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["loaiThau"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.quyetDinhThau.timLoaiThau")}
              data={listloaiThau}
              onChange={onSearchInput("loaiThau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiThau",
      key: "loaiThau",
      render: (item) => {
        return (listloaiThau || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.ngayCongBo")}
          sort_key="ngayCongBo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayCongBo"] || 0}
          searchSelect={
            <DatePicker
              format={dateFormat}
              placeholder={t("kho.quyetDinhThau.timNgayCongBo")}
              onChange={onSearchInput("ngayCongBo")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ngayCongBo",
      key: "ngayCongBo",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.quyetDinhThau.hieuLucThau")}
          sort_key="ngayHieuLuc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayHieuLuc"] || 0}
          searchSelect={
            <DatePicker
              placeholder={t("kho.quyetDinhThau.timHieuLucThau")}
              onChange={onSearchInput("ngayHieuLuc")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ngayHieuLuc",
      key: "ngayHieuLuc",
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.khoa")}
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaId"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.timKhoa")}
              data={listKhoaTheoTaiKhoan}
              onChange={onSearchInput("khoaId")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "khoa",
      key: "khoa",
      render: (item) => {
        return item && item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.trangThai")}
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["trangThai"] || 0}
          searchSelect={
            <Select
              placeholder={t("kho.timTrangThai")}
              data={listtrangThaiThau}
              onChange={onSearchInput("trangThai")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return (listtrangThaiThau || []).find((x) => x.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title={t("kho.coHieuLuc")}
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["active"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder={t("kho.chonHieuLuc")}
              onChange={onSearchInput("active")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  return (
    <div>
      <TableWrapper
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
        buttonHeader={[
          {
            title: "Thêm mới [F1]",
            onClick: onReset,
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
              <Icon component={collapseStatus ? extendTable : extendChiTiet} />
            ),
            onClick: handleCollapsePane,
          },
        ]}
        columns={columns}
        dataSource={listQuyetDinhThau}
        onRow={onRow}
        rowClassName={(record, index) =>
          dataEditDefault?.id === record.id
            ? "row-actived row-id-" + record.id
            : "row-id-" + record.id
        }
        rowKey={(record) => record.id}
      />
      {!!totalElements && (
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          listData={listQuyetDinhThau}
          onShowSizeChange={handleSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};

export default QuyetDinhThau;
