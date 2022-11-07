import React, { useEffect, useState } from "react";
import { Pagination, TableWrapper, HeaderSearch, Select } from "components";
import IcCreate from "assets/images/kho/IcCreate.png";
import { checkRole } from "utils/role-utils";
import { HIEU_LUC, PAGE_DEFAULT, ROLES } from "constants/index";
import Icon from "@ant-design/icons";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import { Checkbox, Input } from "antd";
import { combineSort } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { useStore } from "hook";

let timer = null;

const DanhSachNhanVien = React.forwardRef(
  (
    {
      collapseStatus,
      setCollapseStatus,
      dataSortColumn,
      setDataSortColumn,
      handleClickedBtnAdded,
      handleChangeshowTable,
      showFullTable,
      onRow,
    },
    ref
  ) => {
    const {
      listNhanVien,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    } = useSelector((state) => state.nhanVien);
    const { listAllHocHamHocVi } = useSelector((state) => state.hocHamHocVi);
    const { listAllVanBang } = useSelector((state) => state.vanBang);
    const { listAllKhoa } = useSelector((state) => state.khoa);

    // const { listAllKhoa } = useStore("khoa", []);
    // const { listAllVanBang } = useStore("vanBang", []);
    // const { listAllHocHamHocVi } = useStore("hocHamHocVi", []);
    // const { listNhanVien,
    //     totalElements,
    //     page,
    //     size,
    //     dataEditDefault,
    //     dataSearch, } = useStore("nhanVien", []);

    const { getListNhanVien, updateData } = useDispatch().nhanVien;
    const { getListAllKhoa } = useDispatch().khoa;

    const [data, setData] = useState([]);

    useEffect(() => {
      const data = listNhanVien.map((item, index) => {
        return { ...item, action: item, stt: page * size + index + 1 };
      });
      setData(data);
    }, [listNhanVien, page, size]);

    useEffect(() => {
      getListAllKhoa();
    }, []);

    const onSizeChange = (size) => {
      const params = { page, size };
      updateData(params);
      getListNhanVien({
        ...params,
        ...dataSearch,
        sort: combineSort(dataSortColumn),
      });
    };

    const onPageChange = (page) => {
      const params = { page: page - 1, size };
      updateData(params);
      getListNhanVien({
        ...params,
        ...dataSearch,
        sort: combineSort(dataSortColumn),
      });
    };

    const onClickSort = (key, value) => {
      const sort = { [key]: value, ...dataSortColumn, [key]: value };
      setDataSortColumn(sort);
      const res = combineSort(sort);
      getListNhanVien({
        page: PAGE_DEFAULT,
        size,
        sort: res,
        ...dataSearch,
      });
    };

    const onSearchInput = (value, name) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        updateData({ dataSearch: { ...dataSearch, [name]: value } });
        getListNhanVien({
          ...dataSearch,
          page: PAGE_DEFAULT,
          size,
          [name]: value,
          sort: combineSort(dataSortColumn),
        });
      }, 500);
    };

    const columns = [
      {
        title: <HeaderSearch title="STT" />,
        width: 48,
        dataIndex: "stt",
        key: "stt",
        align: "center",
      },
      {
        title: (
          <HeaderSearch
            title="Mã NV"
            sort_key="ma"
            onClickSort={onClickSort}
            dataSort={dataSortColumn.ma || 0}
            search={
              <Input
                placeholder="Tìm kiếm"
                onChange={(e) => {
                  onSearchInput(e.target.value, "ma");
                }}
              />
            }
          />
        ),
        width: 108,
        dataIndex: "ma",
        key: "ma",
        render: (item) => {
          return item && <span>{item}</span>;
        },
      },
      {
        title: (
          <HeaderSearch
            title="Họ tên"
            sort_key="ten"
            onClickSort={onClickSort}
            dataSort={dataSortColumn.ten || 0}
            search={
              <Input
                placeholder="Tìm kiếm"
                onChange={(e) => {
                  onSearchInput(e.target.value, "ten");
                }}
              />
            }
          />
        ),
        width: 191,
        dataIndex: "ten",
        key: "ten",
      },
      {
        title: (
          <HeaderSearch
            title="Bằng chuyên môn"
            sort_key="vanBangId"
            onClickSort={onClickSort}
            dataSort={dataSortColumn.vanBangId || 0}
            searchSelect={
              <Select
                placeholder="Tìm kiếm"
                data={listAllVanBang}
                onChange={(value) => {
                  onSearchInput(value, "dsVanBangId");
                }}
              />
            }
          />
        ),
        width: 174,
        dataIndex: "vanBang",
        key: "vanBang",
        render: (item) => {
          return item?.ten;
        },
      },
      {
        title: (
          <HeaderSearch
            title="Khoa"
            searchSelect={
              <Select
                placeholder="Tìm kiếm"
                data={listAllKhoa}
                onChange={(value) => {
                  onSearchInput(value, "khoaId");
                }}
              />
            }
          />
        ),
        width: 140,
        dataIndex: "dsKhoa",
        key: "dsKhoa",
        render: (item) => {
          return (
            item && item.length > 0 && item.map((e) => e.khoa.ten).join(",")
          );
        },
      },
      {
        title: (
          <HeaderSearch
            title="Học hàm học vị"
            sort_key="hocHamHocViId"
            onClickSort={onClickSort}
            dataSort={dataSortColumn.hocHamHocViId || 0}
            searchSelect={
              <Select
                placeholder="Tìm kiếm"
                data={listAllHocHamHocVi}
                onChange={(value) => {
                  onSearchInput(value, "hocHamHocViId");
                }}
              />
            }
          />
        ),
        width: 140,
        dataIndex: "hocHamHocVi",
        key: "hocHamHocVi",
        render: (item) => {
          return item?.ten;
        },
      },

      {
        title: (
          <HeaderSearch
            title="Chứng chỉ"
            sort_key="chungChi"
            onClickSort={onClickSort}
            dataSort={dataSortColumn.chungChi || 0}
            search={
              <Input
                placeholder="Tìm kiếm"
                onChange={(e) => {
                  onSearchInput(e.target.value, "chungChi");
                }}
              />
            }
          />
        ),
        width: 140,
        dataIndex: "chungChi",
        key: "chungChi",
      },

      {
        title: (
          <HeaderSearch
            searchSelect={
              <Select
                data={HIEU_LUC}
                placeholder="Chọn hiệu lực"
                defaultValue=""
                onChange={(value) => {
                  onSearchInput(value, "active");
                }}
              />
            }
            sort_key="active"
            onClickSort={onClickSort}
            dataSort={dataSortColumn.active || 0}
            title="Có hiệu lực"
          />
        ),
        width: 108,
        dataIndex: "active",
        key: "active",
        align: "center",
        render: (item) => {
          return <Checkbox checked={item} />;
        },
      },
    ];

    return (
      <>
        <TableWrapper
          title="Danh mục nhân viên"
          scroll={{ x: 1000 }}
          classNameRow={"custom-header"}
          styleMain={{ marginTop: 0 }}
          styleContainerButtonHeader={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: 45,
          }}
          buttonHeader={
            checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_THEM])
              ? [
                  {
                    type: "create",
                    title: "Thêm mới [F1]",
                    onClick: handleClickedBtnAdded,
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
                    onClick: handleChangeshowTable,
                  },
                  {
                    className: "btn-collapse",
                    title: (
                      <Icon
                        component={collapseStatus ? extendTable : extendChiTiet}
                      />
                    ),
                    onClick: () => setCollapseStatus(!collapseStatus),
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
                    onClick: handleChangeshowTable,
                  },
                  {
                    className: "btn-collapse",
                    title: (
                      <Icon
                        component={collapseStatus ? extendTable : extendChiTiet}
                      />
                    ),
                    onClick: () => setCollapseStatus(!collapseStatus),
                  },
                ]
          }
          columns={columns}
          dataSource={data}
          onRow={onRow}
          layerId={ref.current}
          dataEditDefault={dataEditDefault}
          // rowClassName={setRowClassName}
        ></TableWrapper>
        {totalElements && (
          <Pagination
            onChange={onPageChange}
            current={page + 1}
            pageSize={size}
            listData={data}
            total={totalElements}
            onShowSizeChange={onSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        )}
      </>
    );
  }
);

export default DanhSachNhanVien;
