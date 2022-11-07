import React, {
  forwardRef,
  useRef,
  useState,
} from "react";
import { Checkbox, Input } from "antd";
import { TableWrapper, Pagination } from "components";
import { useTranslation } from "react-i18next";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { useDispatch, useSelector } from "react-redux";
import Select from "components/Select";
import { formatDecimal, combineSort } from "utils";
import { HIEU_LUC, YES_NO, PAGE_DEFAULT, ENUM } from "constants/index";
import { useEnum } from "hook";

import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import thuNho from "assets/svg/thuNho.svg";
import showFull from "assets/svg/showFull.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import { QUANNHAN, YEUCAUTAMUNGNGOAITRU } from "../configs";
import { Main } from "../styled";

let timer = null;
const DanhMucLoaiDoiTuong = (
  { form, layerId, roleAdd, onSetEditMode, onChangeShowTable, onCollapsePane, showFullTable, collapseStatus, },
  ref
) => {
  const { t } = useTranslation();
  
  const [state, _setState] = useState({});
  const setState = (data = {}) => _setState((state) => ({ ...state, ...data }));

  const {
    dataSortColumn,
    listLoaiDoiTuong,
    dataEditDefault,
    totalElements,
    page,
    size,
    dataSearch,
  } = useSelector((state) => state.loaiDoiTuong);

  const [listdoiTuong] = useEnum(ENUM.DOI_TUONG);
  const [listloaiMienGiam] = useEnum(ENUM.LOAI_MIEN_GIAM);

  const {
    loaiDoiTuong: {
      updateData,
      getListLoaiDoiTuong,
    },
    loaiDoiTuongLoaiHinhTT: { getListLoaiDoiTuongTT },
  } = useDispatch();

  const onChangePage = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getListLoaiDoiTuong({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListLoaiDoiTuong({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const setRowClassName = (record) => {
    return record.id === dataEditDefault?.id
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  const onClickSort = (key, value) => {
    const sort = { ...dataSortColumn, [key]: value };
    updateData({ dataSort: sort });
    const res = combineSort(sort);
    getListLoaiDoiTuong({
      page: PAGE_DEFAULT,
      size: size,
      sort: res,
      ...dataSearch,
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        updateData({ dataEditDefault: record });
        onSetEditMode();
        form.setFieldsValue(record);
        getListLoaiDoiTuongTT({ loaiDoiTuongId: record.id });
      },
    };
  };

  const onChangeInputSearch = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListLoaiDoiTuong({
        ...dataSearch,
        page: 0,
        size: size,
        [name]: value,
        sort: combineSort(dataSortColumn),
      });
    }, 500);
  };

  const onSearchInput = (name) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else if (e?._d) value = e._d.format("dd/MM/yyyy");
    else value = e;
    onChangeInputSearch(value, name);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, idx) => page * size + idx + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Mã loại đối tượng"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã loại đối tượng"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      width: 140,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên loại đối tượng"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên loại đối tượng"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: 190,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Đối tượng"
          sort_key="doiTuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.doiTuong || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listdoiTuong]}
              placeholder="Chọn đối tượng"
              defaultValue=""
              onChange={onSearchInput("doiTuong")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "doiTuong",
      key: "doiTuong",
      render: (item) => {
        const index = listdoiTuong.findIndex((dt) => dt.id === item);
        if (index === -1) return;
        return listdoiTuong[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Yêu cầu tạm ứng ngoại trú"
          sort_key="tamUngNgoaiTru"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tamUngNgoaiTru || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...YEUCAUTAMUNGNGOAITRU]}
              placeholder="Chọn yêu cầu tạm ứng ngoại trú"
              defaultValue=""
              onChange={onSearchInput("tamUngNgoaiTru")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "tamUngNgoaiTru",
      key: "tamUngNgoaiTru",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
        title: (
          <HeaderSearch
            title="Khám sức khỏe "
            sort_key="khamSucKhoe"
            onClickSort={onClickSort}
            dataSort={dataSortColumn.khamSucKhoe || 0}
            searchSelect={
              <Select
                data={YES_NO}
                placeholder="Chọn khám sức khỏe "
                defaultValue=""
                onChange={onSearchInput("khamSucKhoe")}
              />
            }
          />
        ),
        width: 130,
        dataIndex: "khamSucKhoe",
        key: "khamSucKhoe",
        align: "center",
        render: (item) => {
          return <Checkbox checked={item} />;
        },
      },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={QUANNHAN}
              placeholder="Chọn quân nhân"
              defaultValue=""
              onChange={onSearchInput("quanNhan")}
            />
          }
          sort_key="quanNhan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.quanNhan || 0}
          title="Quân nhân"
        />
      ),
      width: 130,
      dataIndex: "quanNhan",
      key: "quanNhan",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại miễn giảm"
          sort_key="loaiMienGiam"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.doiTuong || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listloaiMienGiam]}
              placeholder="Chọn loại miễn giảm"
              defaultValue=""
              onChange={onSearchInput("loaiMienGiam")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "loaiMienGiam",
      key: "loaiMienGiam",
      render: (item) => {
        const index = listloaiMienGiam.findIndex((lmg) => lmg.id === item);
        if (index === -1) return;
        return listloaiMienGiam[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="% miễn giảm"
          sort_key="phanTramMienGiam"
          onClickSort={onClickSort}
        />
      ),
      width: 130,
      dataIndex: "phanTramMienGiam",
      key: "phanTramMienGiam",
      render: (item) => {
        return item || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tiền miễn giảm"
          sort_key="tienMienGiam"
          onClickSort={onClickSort}
        />
      ),
      width: 130,
      dataIndex: "tienMienGiam",
      key: "tienMienGiam",
      render: (item) => {
        return item ? formatDecimal(String(item)) : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ghi chú"
          sort_key="ghiChu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ghiChu || 0}
          search={
            <Input
              placeholder="Tìm ghi chú"
              onChange={onSearchInput("ghiChu")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 130,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  return (
    <Main>
      <TableWrapper
        title={t("danhMuc.danhMucLoaiDoiTuong")}
        scroll={{ x: 1000 }}
        classNameRow={"custom-header"}
        layerId={layerId}
        // styleMain={{ marginTop: 0 }}
        columns={columns}
        dataSource={listLoaiDoiTuong}
        onRow={onRow}
        rowClassName={setRowClassName}
        dataEditDefault={dataEditDefault}
        styleContainerButtonHeader={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 35,
        }}
        buttonHeader={
          roleAdd
            ? [
                {
                  type: "create",
                  title: "Thêm mới [F1]",
                  onClick: ref.current,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: `btn-change-full-table ${
                    showFullTable ? "small" : "large"
                  }`,
                  title: (
                    <Icon component={showFullTable ? thuNho : showFull} />
                  ),
                  onClick: onChangeShowTable,
                },

                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={
                        collapseStatus ? extendTable : extendChiTiet
                      }
                    />
                  ),
                  onClick: onCollapsePane,
                },
              ]
            : [
                {
                  className: `btn-change-full-table ${
                    showFullTable ? "small" : "large"
                  }`,
                  title: (
                    <Icon component={showFullTable ? thuNho : showFull} />
                  ),
                  onClick: onChangeShowTable,
                },
                {
                  className: "btn-collapse",
                  title: (
                    <Icon
                      component={
                        collapseStatus ? extendTable : extendChiTiet
                      }
                    />
                  ),
                  onClick: onCollapsePane,
                },
              ]
        }
      />
      {totalElements && (
        <Pagination
          listData={listLoaiDoiTuong}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
        />
      )}
    </Main>
  );
};

export default forwardRef(DanhMucLoaiDoiTuong);
