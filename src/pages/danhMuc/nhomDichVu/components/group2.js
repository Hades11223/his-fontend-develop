import React, { useEffect, useRef, useState } from "react";
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
import {useDispatch} from "react-redux";
let timer = null;

const Index = ({
  getlistTrangThaiHoanThanhDV,
  listGroupService2,
  page,
  size,
  total,
  onEditGroup2,
  updateData,
  searchDichVuCap2,
  onPageChange,
  onSizeChange,
  onReset,
  dataSearch,
  sortData,
  listtrangThaiHoanThanh,
  listtrangThaiKhongHoanThanh,
  listtrangThaiDichVu,
  listAllNhomDichVuCap1,
  listAllBaoCao,
  getListAllBaoCao,
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
      onEditGroup2(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { ...sortData, [key]: value };

    updateData({ dataSortGroupService2: sort });
    const res = combineSort(sort);
    searchDichVuCap2({
      pageGroupService2: PAGE_DEFAULT,
      sizeGroupService2: size,
      sort: res,
      ...dataSearch,
    });
  };
  useEffect(() => {
    searchDichVuCap2({
      pageGroupService2: 0,
      sizeGroupService2: 10,
      sort: combineSort(sortData),
    });
    if (!listAllBaoCao?.length) {
      getListAllBaoCao({ page: "", size: "" });;
    }
  }, []);

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({
        dataSearchGroupService2: { ...dataSearch, [name]: value },
      });
      searchDichVuCap2({
        ...dataSearch,
        pageGroupService2: 0,
        sizeGroupService2: size,
        [name]: value,
        sort: combineSort(sortData),
      });
    }, 500);
  };

  const columnsGroup = [
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
          title="M?? nh??m dv c???p 2"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={sortData.ma || 0}
          search={
            <Input
              placeholder="T??m theo m?? nh??m dv c???p 2"
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
          title="T??n nh??m dv c???p 2"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={sortData.ten || 0}
          search={
            <Input
              placeholder="T??m theo t??n nh??m dv c???p 2"
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
    //       title="Nh??m dv c???p 1"
    //       sort_key="nhomDichVuCap1.ten"
    //       onClickSort={onClickSort}
    //       dataSort={sortData["nhomDichVuCap1.ten"] || 0}
    //       // searchSelect={
    //       //   <Select
    //       //     defaultValue=""
    //       //     data={[{ id: "", ten: "T???t c???" }, ...listAllNhomDichVuCap1]}
    //       //     placeholder="Ch???n nh??m dv c???p 1"
    //       //     onChange={(value) => {
    //       //       onSearchInput(value, "nhomDichVuCap1Id");
    //       //     }}
    //       //   />
    //       // }
    //     />
    //   ),
    //   width: 150,
    //   dataIndex: "nhomDichVuCap1",
    //   key: "nhomDichVuCap1",
    //   render: (item) => {
    //     return item?.ten;
    //   },
    // },
    {
      title: (
        <HeaderSearch
          title="Ti???p ????n CLS"
          sort_key="tiepDonCls"
          onClickSort={onClickSort}
          dataSort={sortData.tiepDonCls || 0}
          searchSelect={
            <Select
              data={YES_NO}
              defaultValue=""
              placeholder="Ch???n ti???p ????n CLS"
              onChange={(value) => {
                onSearchInput(value, "tiepDonCls");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "tiepDonCls",
      key: "tiepDonCls",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
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
              (e) => listtrangThaiKhongHoanThanh?.find((i) => i.id === e)?.ten
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
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  const onRow = (record) => ({
    onClick: () => {
      setEditStatus(true);
      setDataEditDefault(record.action);
      onEditGroup2(record.action);
    },
  });
  const data = listGroupService2.map((item, index) => {
    return {
      key: index,
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
                      />
                    </>
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
export default Index;
