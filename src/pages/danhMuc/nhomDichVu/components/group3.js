import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Input, InputNumber } from "antd";
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

const GroupUnit = ({
  listtrangThaiHoanThanh,
  getlistTrangThaiHoanThanhDV,
  listGroupService3,
  page,
  size,
  total,
  onEditGroup3,
  updateData,
  searchDichVuCap3,
  onPageChange,
  onSizeChange,
  onReset,
  dataSearch,
  sortData,
  getAllDichVuCap2,
  listAllNhomDichVuCap1,
  listAllNhomDichVuCap2,
  getAllDichVuCap1,
  listAllBaoCao,
  getListAllBaoCao,
  listtrangThaiKhongHoanThanh,
  listtrangThaiDichVu,
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
      onEditGroup3(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...sortData, [key]: value };
    updateData({ dataSortGroupService3: sort });
    const res = combineSort(sort);
    searchDichVuCap3({
      pageGroupService3: PAGE_DEFAULT,
      sizeGroupService3: size,
      sort: res,
      ...dataSearch,
    });
  };
  useEffect(() => {
    if (!listAllNhomDichVuCap1?.length) {
      getAllDichVuCap1({ page: 0, size: 9999, active: true });
    }
    if (!listAllNhomDichVuCap2?.length) {
      getAllDichVuCap2({ page: 0, size: 9999, active: true });
    }
    searchDichVuCap3({
      pageGroupService3: 0,
      sizeGroupService3: 10,
      sort: combineSort(sortData),
    });
    if (!listAllBaoCao?.length) {
      getListAllBaoCao({ page: "", size: "" });
    }
  }, []);
  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    if (name === "nhomDichVuCap1Id") {
      if (value) {
        getAllDichVuCap2({ page: 0, size: 9999, [name]: value });
      } else {
        getAllDichVuCap2({ page: 0, size: 9999 });
      }
    }
    let res = combineSort(sortData);
    timer = setTimeout(() => {
      updateData({
        dataSearchGroupService3: { ...dataSearch, [name]: value },
      });
      searchDichVuCap3({
        ...dataSearch,
        pageGroupService3: 0,
        sizeGroupService3: size,
        [name]: value,
        sort: res,
      });
    }, 300);
  };

  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "sttPage",
      key: "sttPage",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="STT tr??n b??o c??o"
          sort_key="stt"
          onClickSort={onClickSort}
          dataSort={sortData.stt || 0}
          search={
            <InputNumber
              type="number"
              placeholder="T??m th??? t???"
              onChange={(e) => {
                onSearchInput(e, "stt");
              }}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: (
        <HeaderSearch
          title="M?? nh??m dv c???p 3"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={sortData.ma || 0}
          search={
            <Input
              placeholder="T??m theo m?? nh??m dv c???p 3"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="T??n nh??m dv c???p 3"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="T??m theo t??n nh??m dv c???p 3"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="T??n b??o c??o"
          sort_key="phieuChiDinhId"
          onClickSort={onClickSort}
          dataSort={sortData["phieuChiDinh.ten"] || 0}
          searchSelect={
            <Select
              data={listAllBaoCao}
              placeholder="Ch???n b??o c??o"
              onChange={(value) => {
                onSearchInput(value, "phieuChiDinhId");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "phieuChiDinh",
      key: "phieuChiDinhId",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tr???ng th??i ho??n th??nh DV"
          sort_key="trangThaiHoanThanh"
          onClickSort={onClickSort}
          dataSort={sortData.trangThaiHoanThanh || 0}
          dafaultValue=""
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listtrangThaiHoanThanh]}
              placeholder="Ch???n tr???ng th??i ho??n th??nh dv"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "trangThaiHoanThanh");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "trangThaiHoanThanh",
      key: "trangThaiHoanThanh",
      render: (item) => {
        return getlistTrangThaiHoanThanhDV(item);
      },
    },
    // {
    //   title: (
    //     <HeaderSearch
    //       title="Nh??m dv c???p 2"
    //       sort_key="nhomDichVuCap2.ten"
    //       onClickSort={onClickSort}
    //       dataSort={sortData["nhomDichVuCap2.ten"] || 0}
    //       // search={
    //       //   <Input
    //       //     placeholder="T??m theo nh??m dv c???p 2"
    //       //     onChange={(e) => {
    //       //       onSearchInput(e.target.value, "nhomDichVuCap2.ten");
    //       //     }}
    //       //   />
    //       // }
    //     />
    //   ),
    //   width: 170,
    //   dataIndex: "nhomDichVuCap2",
    //   key: "nhomDichVuCap2",
    //   render: (item) => {
    //     return item?.ten;
    //   },
    // },
    // {
    //   title: (
    //     <HeaderSearch
    //       title="Nh??m dv c???p 1"
    //       sort_key="nhomDichVuCap1.ten"
    //       onClickSort={onClickSort}
    //       dataSort={sortData["nhomDichVuCap1.ten"] || 0}
    //       // search={
    //       //   <Input
    //       //     placeholder="T??m nh??m dv c???p 1"
    //       //     onChange={(e) => {
    //       //       onSearchInput(e.target.value, "nhomDichVuCap1.ten");
    //       //     }}
    //       //   />
    //       // }
    //     />
    //   ),
    //   width: 170,
    //   dataIndex: "nhomDichVuCap1",
    //   key: "nhomDichVuCap1",
    //   render: (item) => {
    //     return item?.ten;
    //   },
    // },
    {
      title: (
        <HeaderSearch
          title="Tr???ng th??i kh??ng ???????c ho??n th??nh DV"
          sort_key="dsTrangThaiKhongDuocHoanThanh"
          onClickSort={onClickSort}
          dataSort={sortData.dsTrangThaiKhongDuocHoanThanh || 0}
          dafaultValue=""
          searchSelect={
            <Select
              mode="multiple"
              data={listtrangThaiKhongHoanThanh}
              placeholder="Ch???n tr???ng th??i kh??ng ???????c ho??n th??nh dv"
              onChange={(value) => {
                onSearchInput(value, "dsTrangThaiKhongDuocHoanThanh");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dsTrangThaiKhongDuocHoanThanh",
      key: "dsTrangThaiKhongDuocHoanThanh",
      render: (item) => {
        return (
          item &&
          item
            .map(
              (e) => listtrangThaiKhongHoanThanh.find((i) => i.id === e)?.ten
            )
            .join(",")
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="B??? qua KL l??u"
          sort_key="boQuaKetQuaLau"
          onClickSort={onClickSort}
          dataSort={sortData.boQuaKetQuaLau || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={YES_NO}
              placeholder="B??? qua KL l??u"
              onChange={(value) => {
                onSearchInput(value, "boQuaKetQuaLau");
              }}
            />
          }
        />
      ),
      width: 120,
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
          title="Tr???ng th??i sinh s??? th??? t???"
          sort_key="trangThaiLayStt"
          onClickSort={onClickSort}
          dataSort={sortData.trangThaiLayStt || 0}
          dafaultValue=""
          searchSelect={
            <Select
              mode="multiple"
              data={listtrangThaiDichVu}
              placeholder="Tr???ng th??i sinh s??? th??? t???"
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
          title="Sinh s??? ri??ng cho NB ??u ti??n"
          sort_key="tachSttUuTien"
          onClickSort={onClickSort}
          dataSort={sortData.tachSttUuTien || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={YES_NO}
              placeholder="Ch???n ??u ti??n"
              onChange={(value) => {
                onSearchInput(value, "uuTien");
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
          title="Sinh s??? ri??ng cho NB N???i tr??"
          sort_key="tachSttNoiTru"
          onClickSort={onClickSort}
          dataSort={sortData.tachSttNoiTru || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={YES_NO}
              placeholder="Ch???n n???i tr??"
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
          title="Dv theo y??u c???u"
          sort_key="theoYeuCau"
          onClickSort={onClickSort}
          dataSort={sortData.theoYeuCau || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={YES_NO}
              placeholder="Ch???n dv theo y??u c???u"
              onChange={(value) => {
                onSearchInput(value, "theoYeuCau");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "theoYeuCau",
      key: "theoYeuCau",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={sortData.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Ch???n hi???u l???c"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  const onRow = (record) => ({
    onClick: () => {
      setEditStatus(true);
      setDataEditDefault(record.action);
      onEditGroup3(record.action);
    },
  });
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  const data = listGroupService3.map((item, index) => {
    return {
      ...item,
      action: item,
      sttPage: page * size + index + 1,
    };
  });
  const customeSelect = {
    width: "25%",
  };
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
                  content: (
                    <>
                      <Select
                        value={dataSearch?.nhomDichVuCap1Id || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m dv C???p 1" },
                          ...listAllNhomDichVuCap1,
                        ]}
                        placeholder="Ch???n nh??m dv c???p 1"
                        onChange={(value) => {
                          onSearchInput(value, "nhomDichVuCap1Id");
                        }}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={dataSearch?.nhomDichVuCap2Id || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m dv C???p 2" },
                          ...listAllNhomDichVuCap2,
                        ]}
                        placeholder="Ch???n nh??m dv c???p 2"
                        onChange={(value) => {
                          onSearchInput(value, "nhomDichVuCap2Id");
                        }}
                        style={customeSelect}
                      />
                    </>
                  ),
                },
                {
                  title: "Th??m m???i [F1]",
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
                    <Icon
                      component={collapseStatus ? extendTable : extendChiTiet}
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
            : [
                {
                  content: (
                    <>
                      <Select
                        value={dataSearch?.nhomDichVuCap1Id || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m dv C???p 1" },
                          ...listAllNhomDichVuCap1,
                        ]}
                        placeholder="Ch???n nh??m dv c???p 1"
                        onChange={(value) => {
                          onSearchInput(value, "nhomDichVuCap1Id");
                        }}
                        style={{ marginRight: "5pt", ...customeSelect }}
                      />
                    </>
                  ),
                },
                {
                  content: (
                    <>
                      <Select
                        value={dataSearch?.nhomDichVuCap2Id || ""}
                        data={[
                          { id: "", ten: "T???t c??? nh??m dv C???p 2" },
                          ...listAllNhomDichVuCap2,
                        ]}
                        placeholder="Ch???n nh??m dv c???p 2"
                        onChange={(value) => {
                          onSearchInput(value, "nhomDichVuCap2Id");
                        }}
                        style={customeSelect}
                      />
                    </>
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
        }
        columns={columnsGroup}
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
export default GroupUnit;
