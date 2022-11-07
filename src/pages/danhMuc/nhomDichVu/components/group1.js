import React, { useEffect, useMemo, useRef, useState } from "react";
import { Checkbox, Input } from "antd";
import { Pagination, HeaderSearch, TableWrapper, Select } from "components";
import { PAGE_DEFAULT, HIEU_LUC, YES_NO } from "constants/index";
import { combineSort } from "utils";
import { checkRole } from "utils/role-utils";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import { useDispatch } from "react-redux";
let timer = null;

const GroupService1 = ({
  getlistTrangThaiHoanThanhDV,
  searchDichVuCap1,
  page,
  size,
  total,
  listGroupService1,
  onPageChange,
  onSizeChange,
  onReset,
  updateData,
  onEditGroupService1,
  dataSearch,
  listtrangThaiHoanThanh,
  listtrangThaiKhongHoanThanh,
  listtrangThaiDichVu,
  sortData,
  setEditStatus,
  handleChangeshowTable,
  showFullTable,
  collapseStatus,
  handleCollapsePane,
  layerId,
}) => {
  const [dataEditDefault, setDataEditDefault] = useState(null);
  const refSelectRow = useRef();
  const { onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId });
    };
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (data?.findIndex((item) => item.id === dataEditDefault?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setEditStatus(true);
      setDataEditDefault(data[indexNextItem]);
      onEditGroupService1(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...sortData, [key]: value };
    updateData({ dataSortGroupService1: sort });
    const res = combineSort(sort);
    searchDichVuCap1({
      pageGroupService1: PAGE_DEFAULT,
      sizeGroupService1: size,
      sort: res,
      ...dataSearch,
    });
  };
  useEffect(() => {
    searchDichVuCap1({
      pageGroupService1: 0,
      sizeGroupService1: 10,
      sort: combineSort(sortData),
    });
  }, []);

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataSearchGroupService1: { ...dataSearch, [name]: value },
      });
      searchDichVuCap1({
        ...dataSearch,
        pageGroupService1: 0,
        sizeGroupService1: size,
        [name]: value,
        sort: combineSort(sortData),
      });
    }, 500);
  };
  const columnsService = [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã nhóm dv cấp 1"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={sortData.ma || 0}
          search={
            <Input
              placeholder="Tìm theo mã nhóm dv cấp 1"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên nhóm dv cấp 1"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="Tìm theo tên nhóm dv cấp 1"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="STT trên bảng kê"
          sort_key="sttBangKe"
          onClickSort={onClickSort}
          dataSort={sortData.sttBangKe || 0}
          search={
            <Input
              placeholder="Tìm theo STT trên bảng kê"
              onChange={(e) => {
                onSearchInput(e.target.value, "sttBangKe");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "sttBangKe",
      key: "sttBangKe",
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái hoàn thành DV"
          sort_key="trangThaiHoanThanh"
          onClickSort={onClickSort}
          dataSort={sortData.trangThaiHoanThanh || 0}
          dafaultValue=""
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listtrangThaiHoanThanh]}
              placeholder="Chọn trạng thái hoàn thành dv"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "trangThaiHoanThanh");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "trangThaiHoanThanh",
      key: "trangThaiHoanThanh",
      render: (item) => {
        return getlistTrangThaiHoanThanhDV(item);
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái không được hoàn thành DV"
          sort_key="dsTrangThaiKhongDuocHoanThanh"
          onClickSort={onClickSort}
          dataSort={sortData.dsTrangThaiKhongDuocHoanThanh || 0}
          dafaultValue=""
          searchSelect={
            <Select
              mode="multiple"
              data={listtrangThaiKhongHoanThanh}
              placeholder="Chọn trạng thái không được hoàn thành dv"
              onChange={(value) => {
                onSearchInput(value, "dsTrangThaiKhongDuocHoanThanh");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "dsTrangThaiKhongDuocHoanThanh",
      key: "dsTrangThaiKhongDuocHoanThanh",
      render: (item) => {
        return (
          item &&
          item
            .map(
              (e) => listtrangThaiKhongHoanThanh?.find((i) => i.id === e)?.ten
            )
            .join(",")
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Bỏ qua KL lâu"
          sort_key="boQuaKetQuaLau"
          onClickSort={onClickSort}
          dataSort={sortData.boQuaKetQuaLau || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={YES_NO}
              placeholder="Bỏ qua KL lâu"
              onChange={(value) => {
                onSearchInput(value, "boQuaKetQuaLau");
              }}
            />
          }
        />
      ),
      width: 90,
      dataIndex: "boQuaKetQuaLau",
      key: "boQuaKetQuaLau",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái sinh số thứ tự"
          sort_key="trangThaiLayStt"
          onClickSort={onClickSort}
          dataSort={sortData.trangThaiLayStt || 0}
          dafaultValue=""
          searchSelect={
            <Select
              data={listtrangThaiDichVu}
              placeholder="Trạng thái sinh số thứ tự"
              onChange={(value) => {
                onSearchInput(value, "trangThaiLayStt");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "trangThaiLayStt",
      key: "trangThaiLayStt",
      render: (item) => {
        return item && listtrangThaiDichVu?.find((e) => e.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Sinh số riêng cho NB Ưu tiên"
          sort_key="tachSttUuTien"
          onClickSort={onClickSort}
          dataSort={sortData.tachSttUuTien || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={YES_NO}
              placeholder="Chọn ưu tiên"
              onChange={(value) => {
                onSearchInput(value, "tachSttUuTien");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tachSttUuTien",
      key: "tachSttUuTien",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Sinh số riêng cho NB Nội trú"
          sort_key="tachSttNoiTru"
          onClickSort={onClickSort}
          dataSort={sortData.tachSttNoiTru || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={YES_NO}
              placeholder="Chọn nội trú"
              onChange={(value) => {
                onSearchInput(value, "tachSttNoiTru");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tachSttNoiTru",
      key: "tachSttNoiTru",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={sortData.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
        />
      ),
      width: 90,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  const onRow = (record, index) => ({
    onClick: (event) => {
      setEditStatus(true);
      setDataEditDefault(record.action);
      onEditGroupService1(record.action);
    },
  });
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  const data = listGroupService1.map((item, index) => {
    return {
      ...item,
      action: item,
      stt: page * size + index + 1,
    };
  });

  return (
    <div>
      <TableWrapper
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
          checkRole([ROLES["DANH_MUC"].NHOM_DICH_VU_THEM])
            ? [
                {
                  title: "Thêm mới [F1]",
                  onClick: onReset,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: `btn-change-full-table ${showFullTable ? "small" : "large"}`,
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
                  className: `btn-change-full-table ${showFullTable ? "small" : "large"}`,
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
        columns={columnsService}
        dataSource={data}
        onRow={onRow}
        rowClassName={setRowClassName}
      />
      {total && (
        <Pagination
          onChange={onPageChange}
          current={page + 1}
          pageSize={size}
          total={total}
          listData={data}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      )}
    </div>
  );
};
export default GroupService1;
